import type { NoticePriority, Role, SuggestionStatus } from "./constants";

export type Profile = {
  id: string;
  full_name: string;
  role: Role;
  class_group: string;
  student_id_code: string | null;
  phone: string | null;
  avatar_url: string | null;
};

export type Notice = {
  id: string;
  title: string;
  body: string;
  priority: NoticePriority;
  date_label: string | null;
  issuer: string;
  created_at: string;
};

export type Suggestion = {
  id: string;
  title: string;
  description: string;
  category: string;
  author_id: string | null;
  status: SuggestionStatus;
  upvotes_count: number;
  created_at: string;
};

export type Homework = {
  id: string;
  subject: string;
  title: string;
  due_date: string;
  kind: "TPC" | "Exame";
  class_group: string;
  created_at: string;
};
