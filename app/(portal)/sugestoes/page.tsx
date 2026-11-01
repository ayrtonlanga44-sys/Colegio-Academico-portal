import { SuggestionsClient } from "@/components/SuggestionsClient";
import { createClient } from "@/lib/supabase/server";
import type { Suggestion } from "@/lib/types";

export const metadata = { title: "Sugestões · Colégio Académico da Beira" };

export default async function SugestoesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: suggestions }, { data: votes }] = await Promise.all([
    supabase
      .from("suggestions")
      .select("*")
      .order("upvotes_count", { ascending: false })
      .order("created_at", { ascending: false })
      .returns<Suggestion[]>(),
    supabase
      .from("suggestion_votes")
      .select("suggestion_id")
      .eq("user_id", user?.id ?? "")
      .returns<{ suggestion_id: string }[]>(),
  ]);

  return (
    <SuggestionsClient
      suggestions={suggestions ?? []}
      votedIds={(votes ?? []).map((v) => v.suggestion_id)}
    />
  );
}
