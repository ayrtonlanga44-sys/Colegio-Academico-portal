"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IdCard, LogOut } from "lucide-react";
import { useTransition } from "react";
import { signOut } from "@/app/actions";
import { ROLE_LABEL, type Role } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { NAV_ITEMS } from "./BottomNav";
import { useSession } from "./SessionProvider";

export function Header({ onOpenCard }: { onOpenCard: () => void }) {
  const { profile, actualRole, viewRole, setViewRole } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [pending, start] = useTransition();

  function handleSignOut() {
    start(async () => {
      await signOut();
      router.replace("/login");
      router.refresh();
    });
  }

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-brand-obsidian/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-2.5">
        <Link href="/avisos" className="flex min-w-0 items-center gap-2.5">
          <Logo size={40} />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-serif text-[13px] font-bold tracking-wide text-white sm:text-sm">
              COLÉGIO ACADÉMICO
            </p>
            <p className="text-[11px] font-medium tracking-[0.25em] text-brand-green">
              BEIRA
            </p>
          </div>
        </Link>

        <nav aria-label="Navegação" className="ml-4 hidden items-center gap-1 sm:flex">
          {NAV_ITEMS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition",
                pathname.startsWith(href)
                  ? "bg-brand-green/15 text-brand-green"
                  : "text-slate-300 hover:bg-white/5",
              )}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {actualRole === "admin" ? (
            <label className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
              Ver como
              <select
                value={viewRole}
                onChange={(e) => setViewRole(e.target.value as Role)}
                className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-brand-green"
              >
                {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                  <option key={r} value={r} className="bg-brand-surface">
                    {ROLE_LABEL[r]}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <span className="hidden rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300 ring-1 ring-white/10 sm:inline">
              {ROLE_LABEL[actualRole]}
            </span>
          )}

          <button
            onClick={onOpenCard}
            className="flex items-center gap-1.5 rounded-xl bg-brand-green px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110 active:scale-[0.97]"
          >
            <IdCard size={16} />
            <span>Cartão Digital</span>
          </button>

          <button
            onClick={handleSignOut}
            disabled={pending}
            aria-label="Terminar sessão"
            title={profile.full_name}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {actualRole === "admin" && (
        <div className="border-t border-white/5 px-4 py-2 sm:hidden">
          <label className="flex items-center justify-between gap-2 text-xs text-slate-400">
            Ver como
            <select
              value={viewRole}
              onChange={(e) => setViewRole(e.target.value as Role)}
              className="rounded-lg bg-white/5 px-2 py-1.5 text-xs text-white ring-1 ring-white/10"
            >
              {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                <option key={r} value={r} className="bg-brand-surface">
                  {ROLE_LABEL[r]}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
    </header>
  );
}
