# Colégio Académico da Beira — Portal

Next.js 14 (App Router) + Supabase + Tailwind + Framer Motion.

## Arrancar

1. Crie um projecto no Supabase e execute `supabase/schema.sql` no SQL Editor.
2. `cp .env.example .env.local` e preencha `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. `npm install && npm run dev`

## Papéis (importante)

Todos os registos nascem como `student` (o trigger ignora qualquer papel enviado pelo cliente).
Promova manualmente no SQL Editor:

```sql
update public.profiles set role = 'delegate', phone = '258XXXXXXXXX' where id = '<uuid>';
update public.profiles set role = 'admin' where id = '<uuid>';
update public.profiles set student_id_code = 'CA-2026-9921' where id = '<uuid>';
```

- **Aluno**: lê tudo, sugere ideias e vota.
- **Delegado**: publica/remove TPC e exames **só da própria turma**.
- **Direcção**: publica avisos, altera estado das sugestões, gere TPC de qualquer turma.

As permissões são impostas por RLS na base de dados. O selector "Ver como" (só visível para a Direcção) altera apenas a vista.

## Estrutura

```
app/
  actions.ts            Server actions (auth, avisos, sugestões, TPC)
  login/                Entrar / criar conta
  (portal)/             Layout autenticado + /avisos /sugestoes /salas
components/             Logo SVG, Header, BottomNav, StudentIdCard (3D), clientes de cada secção
lib/supabase/           Clientes browser/server + refresh de sessão no middleware
supabase/schema.sql     Tabelas, triggers, RLS e seed
```

## Notas

- O QR do cartão é uma **simulação visual** (derivada do código do aluno). Para validação real, gere um token assinado no servidor e leia-o com um leitor próprio.
- Fotos de perfil: guarde em Supabase Storage e coloque o URL em `profiles.avatar_url`.
- Se o email de confirmação estiver activo no Supabase, o utilizador tem de confirmar antes de entrar.
