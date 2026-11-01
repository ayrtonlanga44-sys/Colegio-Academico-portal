"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpenCheck, CalendarDays, MessageCircle, Plus, Trash2, UserRound } from "lucide-react";
import { useState, useTransition, type FormEvent } from "react";
import { createHomework, deleteHomework } from "@/app/actions";
import { CLASS_GROUPS } from "@/lib/constants";
import { formatDue } from "@/lib/format";
import type { Homework, Profile } from "@/lib/types";
import { cn, formatClassLabel, whatsappLink } from "@/lib/utils";
import { Modal } from "./Modal";
import { useSession } from "./SessionProvider";
import { btnGhost, btnPrimary, cardCls, inputCls, labelCls } from "./ui";

type Props = { homework: Homework[]; delegates: Profile[] };

export function ClassroomsClient({ homework, delegates }: Props) {
  const { profile, viewRole } = useSession();

  const initial = (CLASS_GROUPS as readonly string[]).includes(profile.class_group)
    ? profile.class_group
    : CLASS_GROUPS[1];
  const [group, setGroup] = useState<string>(initial);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const canEdit =
    viewRole === "admin" || (viewRole === "delegate" && group === profile.class_group);

  const list = homework.filter((h) => h.class_group === group);
  const delegate = delegates.find((d) => d.class_group === group);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("class_group", group);
    setError(null);
    start(async () => {
      const r = await createHomework(fd);
      if (!r.ok) return setError(r.error ?? "Erro ao publicar.");
      form.reset();
      setOpen(false);
    });
  }

  function onDelete(id: string) {
    if (!confirm("Remover esta tarefa?")) return;
    start(async () => {
      await deleteHomework(id);
    });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-serif text-2xl font-bold text-white">Salas de Turma</h1>
        <p className="mt-0.5 text-sm text-slate-400">TPC, exames e contacto do delegado.</p>
      </div>

      <div className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10" role="tablist" aria-label="Turma">
        {CLASS_GROUPS.map((c) => (
          <button
            key={c}
            role="tab"
            aria-selected={group === c}
            onClick={() => setGroup(c)}
            className={cn(
              "rounded-lg py-2 text-sm font-semibold transition",
              group === c ? "bg-brand-green text-white" : "text-slate-300 hover:bg-white/5",
            )}
          >
            {c === "10ª" || c === "12ª" ? `${c} Classe` : c}
          </button>
        ))}
      </div>

      {/* Delegado */}
      <section className={cn(cardCls, "flex items-center gap-3")}>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-wine/40 text-rose-100 ring-1 ring-brand-wine">
          <UserRound size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Delegado de turma · {formatClassLabel(group)}
          </p>
          <p className="truncate font-semibold text-white">
            {delegate?.full_name ?? "Ainda não atribuído"}
          </p>
        </div>
        {delegate?.phone && (
          <a
            href={whatsappLink(delegate.phone, `Olá ${delegate.full_name}, `)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp de ${delegate.full_name}`}
            className="flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-[#06240f] transition hover:brightness-105 active:scale-95"
          >
            <MessageCircle size={15} /> WhatsApp
          </a>
        )}
      </section>

      {/* TPC e Exames */}
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-semibold text-white">TPC & Exames</h2>
        {canEdit && (
          <button onClick={() => setOpen(true)} className={btnPrimary}>
            <Plus size={16} /> Adicionar
          </button>
        )}
      </div>

      <ul className="space-y-3">
        <AnimatePresence mode="popLayout">
          {list.map((h) => (
            <motion.li
              key={h.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(cardCls, "flex items-start gap-3")}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1",
                  h.kind === "Exame"
                    ? "bg-amber-500/15 text-amber-200 ring-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
                )}
              >
                <BookOpenCheck size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  {h.kind} · {h.subject}
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-white">{h.title}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-400">
                  <CalendarDays size={13} /> Entrega: {formatDue(h.due_date)}
                </p>
              </div>
              {canEdit && (
                <button
                  onClick={() => onDelete(h.id)}
                  aria-label="Remover tarefa"
                  className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-red-300"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
        {list.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
            Sem TPC nem exames marcados para esta turma. 🎉
          </li>
        )}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)} title={`Nova tarefa · ${group}`}>
        <form onSubmit={onSubmit} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="h-kind">Tipo</label>
              <select id="h-kind" name="kind" defaultValue="TPC" className={inputCls}>
                <option value="TPC" className="bg-brand-surface">TPC</option>
                <option value="Exame" className="bg-brand-surface">Exame</option>
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="h-subject">Disciplina</label>
              <input id="h-subject" name="subject" required maxLength={60} className={inputCls} placeholder="Matemática" />
            </div>
          </div>
          <div>
            <label className={labelCls} htmlFor="h-title">Descrição</label>
            <textarea id="h-title" name="title" required minLength={3} maxLength={200} rows={3} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="h-due">Data de entrega</label>
            <input id="h-due" name="due_date" type="date" required className={inputCls} />
          </div>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => setOpen(false)} className={btnGhost}>Cancelar</button>
            <button type="submit" disabled={pending} className={btnPrimary}>
              {pending ? "A publicar…" : "Publicar"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
