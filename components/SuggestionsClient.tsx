"use client";

import { motion } from "framer-motion";
import { ChevronUp, Lightbulb, Plus } from "lucide-react";
import { useEffect, useState, useTransition, type FormEvent } from "react";
import { createSuggestion, setSuggestionStatus, toggleVote } from "@/app/actions";
import {
  STATUS_META,
  SUGGESTION_CATEGORIES,
  SUGGESTION_STATUSES,
} from "@/lib/constants";
import { formatDate } from "@/lib/format";
import type { Suggestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Modal } from "./Modal";
import { useSession } from "./SessionProvider";
import { btnGhost, btnPrimary, cardCls, inputCls, labelCls } from "./ui";

type Props = { suggestions: Suggestion[]; votedIds: string[] };

export function SuggestionsClient({ suggestions, votedIds }: Props) {
  const { viewRole } = useSession();
  const isAdmin = viewRole === "admin";

  const [items, setItems] = useState(suggestions);
  const [voted, setVoted] = useState(() => new Set(votedIds));
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();

  // Re-sincroniza quando o servidor revalida.
  useEffect(() => setItems(suggestions), [suggestions]);
  useEffect(() => setVoted(new Set(votedIds)), [votedIds]);

  const sorted = [...items].sort((a, b) => b.upvotes_count - a.upvotes_count);

  function vote(id: string) {
    const has = voted.has(id);
    // Actualização optimista
    setVoted((prev) => {
      const next = new Set(prev);
      has ? next.delete(id) : next.add(id);
      return next;
    });
    setItems((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, upvotes_count: Math.max(s.upvotes_count + (has ? -1 : 1), 0) } : s,
      ),
    );

    start(async () => {
      const r = await toggleVote(id, has);
      if (!r.ok) {
        // Reverte
        setVoted((prev) => {
          const next = new Set(prev);
          has ? next.add(id) : next.delete(id);
          return next;
        });
        setItems((prev) =>
          prev.map((s) =>
            s.id === id ? { ...s, upvotes_count: Math.max(s.upvotes_count + (has ? 1 : -1), 0) } : s,
          ),
        );
      }
    });
  }

  function changeStatus(id: string, status: string) {
    start(async () => {
      const r = await setSuggestionStatus(id, status);
      if (!r.ok) alert(r.error);
    });
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setError(null);
    start(async () => {
      const r = await createSuggestion(fd);
      if (!r.ok) return setError(r.error ?? "Erro ao enviar.");
      form.reset();
      setOpen(false);
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Caixa de Sugestões</h1>
          <p className="mt-0.5 text-sm text-slate-400">A voz dos alunos. Vote nas ideias que importam.</p>
        </div>
        <button onClick={() => setOpen(true)} className={btnPrimary}>
          <Plus size={16} /> Nova ideia
        </button>
      </div>

      <ul className="space-y-3">
        {sorted.map((s) => {
          const hasVoted = voted.has(s.id);
          return (
            <motion.li key={s.id} layout className={cn(cardCls, "flex gap-3")}>
              <button
                onClick={() => vote(s.id)}
                aria-pressed={hasVoted}
                aria-label={hasVoted ? "Remover voto" : "Votar"}
                className={cn(
                  "flex h-14 w-12 shrink-0 flex-col items-center justify-center rounded-xl ring-1 transition active:scale-95",
                  hasVoted
                    ? "bg-brand-green text-white ring-brand-green"
                    : "bg-white/5 text-slate-300 ring-white/10 hover:bg-white/10",
                )}
              >
                <ChevronUp size={18} />
                <span className="text-sm font-bold leading-none">{s.upvotes_count}</span>
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1", STATUS_META[s.status])}>
                    {s.status}
                  </span>
                  <span className="text-[11px] text-slate-500">{s.category} · {formatDate(s.created_at)}</span>
                </div>
                <h2 className="mt-1.5 font-serif text-base font-semibold leading-snug text-white">
                  {s.title}
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-300">{s.description}</p>

                {isAdmin && (
                  <label className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                    Estado
                    <select
                      value={s.status}
                      onChange={(e) => changeStatus(s.id, e.target.value)}
                      className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white ring-1 ring-white/10"
                    >
                      {SUGGESTION_STATUSES.map((st) => (
                        <option key={st} value={st} className="bg-brand-surface">{st}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            </motion.li>
          );
        })}
        {sorted.length === 0 && (
          <li className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-slate-500">
            <Lightbulb size={22} /> Ainda não há sugestões. Seja o primeiro!
          </li>
        )}
      </ul>

      <Modal open={open} onClose={() => setOpen(false)} title="Nova ideia">
        <form onSubmit={onSubmit} className="space-y-3.5">
          <div>
            <label className={labelCls} htmlFor="s-title">Título</label>
            <input id="s-title" name="title" required minLength={5} maxLength={100} className={inputCls} placeholder="Ex.: Mais iluminação no pátio" />
          </div>
          <div>
            <label className={labelCls} htmlFor="s-cat">Categoria</label>
            <select id="s-cat" name="category" defaultValue={SUGGESTION_CATEGORIES[0]} className={inputCls}>
              {SUGGESTION_CATEGORIES.map((c) => (
                <option key={c} value={c} className="bg-brand-surface">{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls} htmlFor="s-desc">Descrição</label>
            <textarea id="s-desc" name="description" required minLength={10} maxLength={1000} rows={4} className={inputCls} />
          </div>
          {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={() => setOpen(false)} className={btnGhost}>Cancelar</button>
            <button type="submit" disabled={pending} className={btnPrimary}>
              {pending ? "A enviar…" : "Enviar ideia"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
