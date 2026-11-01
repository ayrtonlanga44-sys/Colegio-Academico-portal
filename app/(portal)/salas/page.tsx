import { ClassroomsClient } from "@/components/ClassroomsClient";
import { createClient } from "@/lib/supabase/server";
import type { Homework, Profile } from "@/lib/types";

export const metadata = { title: "Salas de Turma · Colégio Académico da Beira" };

export default async function SalasPage() {
  const supabase = createClient();

  const [{ data: homework }, { data: delegates }] = await Promise.all([
    supabase
      .from("homework")
      .select("*")
      .order("due_date", { ascending: true })
      .returns<Homework[]>(),
    supabase
      .from("profiles")
      .select("id, full_name, role, class_group, student_id_code, phone, avatar_url")
      .eq("role", "delegate")
      .returns<Profile[]>(),
  ]);

  return <ClassroomsClient homework={homework ?? []} delegates={delegates ?? []} />;
}
