export const SCHOOL_WHATSAPP =
  process.env.NEXT_PUBLIC_SCHOOL_WHATSAPP ?? "258825897409";

export const SCHOOL_PHONE_DISPLAY = "+258 82 589 7409";

export const CLASS_GROUPS = ["10ª", "11ªA", "12ª"] as const;
export type ClassGroup = (typeof CLASS_GROUPS)[number];

export const NOTICE_PRIORITIES = [
  "Urgente",
  "Exames",
  "Fardamento",
  "Geral",
] as const;
export type NoticePriority = (typeof NOTICE_PRIORITIES)[number];

export const PRIORITY_META: Record<
  NoticePriority,
  { label: string; emoji: string; chip: string }
> = {
  Urgente: {
    label: "Urgente",
    emoji: "🔴",
    chip: "bg-red-500/15 text-red-300 ring-red-500/30",
  },
  Exames: {
    label: "Exames & Provas",
    emoji: "📝",
    chip: "bg-amber-500/15 text-amber-200 ring-amber-500/30",
  },
  Fardamento: {
    label: "Fardamento Oficial",
    emoji: "👔",
    chip: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  },
  Geral: {
    label: "Geral",
    emoji: "📌",
    chip: "bg-slate-500/15 text-slate-300 ring-slate-500/30",
  },
};

export const SUGGESTION_STATUSES = [
  "Em Análise",
  "Aprovado pela Direcção",
  "Em Implementação",
] as const;
export type SuggestionStatus = (typeof SUGGESTION_STATUSES)[number];

export const STATUS_META: Record<SuggestionStatus, string> = {
  "Em Análise": "bg-slate-500/15 text-slate-300 ring-slate-500/30",
  "Aprovado pela Direcção": "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
  "Em Implementação": "bg-sky-500/15 text-sky-300 ring-sky-500/30",
};

export const SUGGESTION_CATEGORIES = [
  "Infraestrutura",
  "Actividades",
  "Biblioteca",
  "Tecnologia",
  "Segurança",
  "Outro",
] as const;

export const ROLE_LABEL = {
  student: "Aluno",
  delegate: "Delegado de Turma",
  admin: "Direcção",
} as const;
export type Role = keyof typeof ROLE_LABEL;

export const SCHOOL_RULES = [
  "Cartão obrigatório à entrada e nas provas.",
  "Fardamento oficial verde e branco completo.",
  "Telemóveis desligados em sala de aula.",
  "Respeito por colegas, professores e funcionários.",
];