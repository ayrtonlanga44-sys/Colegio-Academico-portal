-- =============================================================
-- Colégio Académico da Beira — Schema Supabase
-- Execute no SQL Editor do Supabase (projecto novo).
-- =============================================================

create extension if not exists "pgcrypto";

-- -------------------------------------------------------------
-- PROFILES
-- -------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'student'
    check (role in ('student', 'delegate', 'admin')),
  class_group text not null default '11ªA',
  student_id_code text unique,
  phone text,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- NOTICES
-- -------------------------------------------------------------
create table public.notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  priority text not null default 'Geral'
    check (priority in ('Urgente', 'Exames', 'Fardamento', 'Geral')),
  date_label text,
  issuer text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- SUGGESTIONS (+ votos únicos por utilizador)
-- -------------------------------------------------------------
create table public.suggestions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text not null,
  author_id uuid references public.profiles(id) on delete set null,
  status text not null default 'Em Análise'
    check (status in ('Em Análise', 'Aprovado pela Direcção', 'Em Implementação')),
  upvotes_count int not null default 0,
  created_at timestamptz not null default now()
);

create table public.suggestion_votes (
  suggestion_id uuid not null references public.suggestions(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (suggestion_id, user_id)
);

-- -------------------------------------------------------------
-- HOMEWORK
-- -------------------------------------------------------------
create table public.homework (
  id uuid primary key default gen_random_uuid(),
  subject text not null,
  title text not null,
  due_date text not null,
  kind text not null default 'TPC' check (kind in ('TPC', 'Exame')),
  class_group text not null,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create index homework_class_idx on public.homework (class_group, created_at desc);
create index notices_priority_idx on public.notices (priority, created_at desc);
create index suggestions_votes_idx on public.suggestions (upvotes_count desc);

-- -------------------------------------------------------------
-- HELPERS (security definer evita recursão nas policies)
-- -------------------------------------------------------------
create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.current_user_class()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select class_group from public.profiles where id = auth.uid()
$$;

-- -------------------------------------------------------------
-- TRIGGER: cria perfil ao registar utilizador
-- O papel é SEMPRE 'student'. Promova delegados/direcção manualmente
-- (SQL Editor) — nunca confie em metadata enviada pelo cliente.
-- -------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, class_group)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'full_name', ''), split_part(new.email, '@', 1)),
    coalesce(nullif(new.raw_user_meta_data->>'class_group', ''), '11ªA')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- -------------------------------------------------------------
-- TRIGGER: mantém upvotes_count sincronizado
-- -------------------------------------------------------------
create or replace function public.sync_upvotes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_op = 'INSERT' then
    update public.suggestions set upvotes_count = upvotes_count + 1 where id = new.suggestion_id;
  elsif tg_op = 'DELETE' then
    update public.suggestions set upvotes_count = greatest(upvotes_count - 1, 0) where id = old.suggestion_id;
  end if;
  return null;
end;
$$;

create trigger suggestion_votes_sync
  after insert or delete on public.suggestion_votes
  for each row execute function public.sync_upvotes();

-- Autor vota automaticamente na própria sugestão
create or replace function public.auto_vote_own_suggestion()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.author_id is not null then
    insert into public.suggestion_votes (suggestion_id, user_id)
    values (new.id, new.author_id)
    on conflict do nothing;
  end if;
  return null;
end;
$$;

create trigger suggestions_auto_vote
  after insert on public.suggestions
  for each row execute function public.auto_vote_own_suggestion();

-- -------------------------------------------------------------
-- TRIGGER: impede que utilizadores alterem o próprio papel / código
-- -------------------------------------------------------------
create or replace function public.protect_profile_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.current_user_role() is distinct from 'admin' then
    new.role := old.role;
    new.student_id_code := old.student_id_code;
  end if;
  return new;
end;
$$;

create trigger profiles_protect_fields
  before update on public.profiles
  for each row execute function public.protect_profile_privileged_fields();

-- -------------------------------------------------------------
-- ROW LEVEL SECURITY
-- -------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.notices enable row level security;
alter table public.suggestions enable row level security;
alter table public.suggestion_votes enable row level security;
alter table public.homework enable row level security;

-- profiles
create policy "profiles_select_authenticated" on public.profiles
  for select to authenticated using (true);
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = auth.uid()) with check (id = auth.uid());
create policy "profiles_update_admin" on public.profiles
  for update to authenticated using (public.current_user_role() = 'admin');

-- notices
create policy "notices_select_authenticated" on public.notices
  for select to authenticated using (true);
create policy "notices_insert_admin" on public.notices
  for insert to authenticated with check (public.current_user_role() = 'admin');
create policy "notices_update_admin" on public.notices
  for update to authenticated using (public.current_user_role() = 'admin');
create policy "notices_delete_admin" on public.notices
  for delete to authenticated using (public.current_user_role() = 'admin');

-- suggestions
create policy "suggestions_select_authenticated" on public.suggestions
  for select to authenticated using (true);
create policy "suggestions_insert_own" on public.suggestions
  for insert to authenticated
  with check (author_id = auth.uid() and status = 'Em Análise');
create policy "suggestions_update_admin" on public.suggestions
  for update to authenticated using (public.current_user_role() = 'admin');
create policy "suggestions_delete_admin" on public.suggestions
  for delete to authenticated using (public.current_user_role() = 'admin');

-- suggestion_votes
create policy "votes_select_authenticated" on public.suggestion_votes
  for select to authenticated using (true);
create policy "votes_insert_own" on public.suggestion_votes
  for insert to authenticated with check (user_id = auth.uid());
create policy "votes_delete_own" on public.suggestion_votes
  for delete to authenticated using (user_id = auth.uid());

-- homework: delegado só publica na própria turma; direcção em qualquer
create policy "homework_select_authenticated" on public.homework
  for select to authenticated using (true);
create policy "homework_insert_delegate_or_admin" on public.homework
  for insert to authenticated
  with check (
    public.current_user_role() = 'admin'
    or (public.current_user_role() = 'delegate' and class_group = public.current_user_class())
  );
create policy "homework_delete_delegate_or_admin" on public.homework
  for delete to authenticated
  using (
    public.current_user_role() = 'admin'
    or (public.current_user_role() = 'delegate' and class_group = public.current_user_class())
  );

-- -------------------------------------------------------------
-- SEED (conteúdo inicial — opcional)
-- -------------------------------------------------------------
insert into public.notices (title, body, priority, date_label, issuer) values
('Uso obrigatório do fardamento oficial',
 'O fardamento oficial (camisa branca e verde, conforme modelo do Colégio) é obrigatório para entrada no recinto escolar. Alunos sem fardamento devem dirigir-se à Direcção.',
 'Fardamento', 'Em vigor', 'Direcção'),
('Calendário de provas do 3.º trimestre',
 'A entrada na sala de exame só é permitida com o Cartão do Estudante e fardamento completo. Chegue 15 minutos antes do início.',
 'Exames', 'Próximas semanas', 'Direcção Pedagógica'),
('Alteração temporária de horário',
 'Devido a manutenção, as aulas da tarde começam às 13h30 até novo aviso.',
 'Urgente', 'Esta semana', 'Direcção'),
('Reunião geral de encarregados de educação',
 'A reunião decorrerá no auditório do Colégio. Presença recomendada.',
 'Geral', 'Sábado, 09h00', 'Secretaria');

insert into public.suggestions (title, description, category, status, upvotes_count) values
('Melhorar a iluminação do campus',
 'Os corredores e o pátio ficam escuros ao fim da tarde.',
 'Infraestrutura', 'Aprovado pela Direcção', 0),
('Clube de Robótica',
 'Criar um clube de robótica com sessões semanais.',
 'Actividades', 'Em Análise', 0),
('Mais livros na biblioteca',
 'Actualizar o acervo com livros de preparação para exames.',
 'Biblioteca', 'Em Implementação', 0);
