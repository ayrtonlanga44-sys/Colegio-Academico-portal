export const ROLE_LABEL = {
  admin: "Administrador",
  teacher: "Professor",
  student: "Estudante",
  guardian: "Encarregado de Educação",
} as const;

export type Role = keyof typeof ROLE_LABEL;

export const SCHOOL_RULES = [
  "Cartão obrigatório à entrada e nas provas.",
  "Fardamento oficial verde e branco completo.",
  "Telemóveis desligados em sala de aula.",
  "Respeito por colegas, professores e funcionários.",
];

export const CLASS_GROUPS = ["10A", "11A", "12A", "12B"] as const;

export type ClassGroup = (typeof CLASS_GROUPS)[number];// deploy fix 
