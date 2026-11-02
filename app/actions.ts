"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signIn(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true };
}

export async function signUp(formData: FormData): Promise<{ ok: boolean; error?: string; message?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("full_name") as string;
  const classGroup = formData.get("class_group") as string;
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        class_group: classGroup,
      },
    },
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, message: "Conta criada com sucesso! Por favor entra." };
}

export async function signOut() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );

  await supabase.auth.signOut();
  redirect("/login");
}

// Ações auxiliares tipadas com { ok: boolean; error?: string }
export async function createHomework(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}

export async function deleteHomework(id: string): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}

export async function toggleVote(suggestionId: string, hasVoted?: boolean): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}

export async function setSuggestionStatus(suggestionId: string, status: string): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}

export async function createSuggestion(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}

export async function createNotice(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}

export async function deleteNotice(id: string): Promise<{ ok: boolean; error?: string }> {
  return { ok: true };
}