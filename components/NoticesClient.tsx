"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Plus, Shirt, ClipboardCheck, Trash2 } from "lucide-react";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import { createNotice, deleteNotice } from "@/app/actions";
import {
  NOTICE_PRIORITIES,
  PRIORITY_META,
  type NoticePriority,
} from "@/lib/constants";
import { formatDate } from "@/lib/format";
import type { Notice } from "@/lib/types";
import { cn, schoolWhatsappLink } from "@/lib/utils";
import { Modal } from "./Modal";
import { useSession } from "./SessionProvider";
import { btnGhost, btnPrimary, cardCls, inputCls, labelCls } from "./ui";

type Filter = "Todos" | NoticePriority;

export function NoticesClient({ notices }: { notices: Notice[] }) {
  const { viewRole } = useSession();
  const canPublish = viewRole === "admin";

  const [filter, setFilter] = useState<Filter>("Todos");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  const visible = useMemo(() => {
    const list = filter === "Todos" ? notices : notices.filter((n) => n.priority === filter);
    // Urgentes primeiro, depois por data (a query já vem ordenada por data).
    return [...list].sort(
      (a, b) => Number(b.priority === "Urgente") - Number(a.priority === "Urgente"),
    );
  }, [notices, filter]);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setError(null);
    start(async () => {
      const r = await createNotice(fd);
      if (!r.ok) return setError(r.error ?? "Erro ao publicar.");
      form.reset();
      setOpen(false);
    });
  }

  function onDelete(id: string) {
    if (!confirm("Remover este aviso?")) return;
    start(async () => {
      await deleteNotice(id);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Comunicados e Avisos</h1>
          <p className="mt-0.5 text-sm text-slate-400">Informação oficial da Direcção.</p>
        </div>
        {canPublish && (
          <button onClick={() => setOpen(true)} className={btnPrimary}>
            <Plus size={16} /> Novo aviso
          </button>
        )}
      </div>

      {/* Regras oficiais em destaque */}
      <section className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-700/40 to-emerald-900/20 p-4 ring-1 ring-emerald-500/30">
          <p className="flex items-center gap-2 text-sm font-bold text-emerald-200">
            <Shirt size={16} /> Fardamento oficial
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-emerald-50/85">
            Camisa branca e verde completa, conforme o modelo do Colégio. Sem fardamento não há entrada no recinto.
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-brand-wine/50 to-brand-wine/10 p-4 ring-1 ring-brand-wine/60">
          <p className="flex items-center gap-2 text-sm font-bold text-rose-100">
            <ClipboardCheck size={16} /> Entrada em exames
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-rose-50/85">
            Só é permitida com o Cartão do Estudante e fardamento completo. Chegue 15 minutos antes.
          </p>
        </div>
      </section>

      <a
        href={schoolWhatsappLink("Olá, Direcção do Colégio Académico da Beira.")}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-bold text-[#06240f] transition hover:brightness-105 active:scale-[0.99]"
      >
        <MessageCircle size={18} /> Falar com a Direcção no WhatsApp
      </a>

      {/* Filtros */}
      <div className="-mx-4 overflow-x-auto px-4">
        <div className="flex w-max gap-2" role="tablist" aria-label="Filtrar avisos">
          {(["Todos", ...NOTICE_PRIORITIES] as Filter[]).map((f) => {
            const active = filter === f;
            const label = f === "Todos" ? "Todos" : `${PRIORITY_META[f].emoji} ${PRIORITY_META[f].label}`;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold ring-1 transition",
                  active
                    ? "bg-brand-green text-white ring-brand-green"
                    : "bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10",
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lista */}
      <ul className="space-y-3">
        <AnimatePresence mode="popLayout">
          {visible.map((n) => {
            const meta = PRIORITY_META[n.priority];
            return (
              <motion.li
                key={n.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                className={cn(cardCls, n.priority === "Urgente" && "ring-red-500/40")}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1", meta.chip)}>
                    {meta.emoji} {meta.label}
                  </span>
                  {canPublish && (
                    <button
                      onClick={() => onDelete(n.id)}
                      aria-label="Remover aviso"
                      className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-red-300"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
                <h2 className="mt-2.5 font-serif text-lg font-semibold leading-snug text-white">
                  {n.title}
                </h2>
                <p className="mt-1.5 whitespace-pre-line text-sm leading-relaxed text-slate-300">
                  {n.body}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {n.issuer}
                  {n.date_label ? ` · ${n.date_label}` : ""} · publicado a {formatDate(n.created_at)}
                </p>
              </motion.li>
            );
          })}
        </AnimatePresence>
        {visible.length === 0 && (
          <li className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">
            Sem avisos nesta categoria.
          </li>
        )}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)} title="Novo aviso oficial">
        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className={labelCls} htmlFor="n-title">Título</label>
            <input id="n-title" name="title" required maxLength={140} className={inputCls} />
          </div>
          <div>
            <label className={labelCls} htmlFor="n-body">Texto</label>
            <textarea id="n-body" name="body" required rows={4} maxLength={2000} className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls} htmlFor="n-priority">Categoria</label>
              <select id="n-priority" name="priority" defaultValue="Geral" className={inputCls}>
                {NOTICE_PRIORITIES.map((p) => (
                  <option key={p} value={p} className="bg-brand-surface">
                    {PRIORITY_META[p].label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="n-date">Data / prazo</label>
              <input id="n-date" name="date_label" placeholder="Ex.: Segunda, 08h00" className={inputCls} />
            </div>
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
