"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { Role } from "@/lib/constants";
import type { Profile } from "@/lib/types";

type Session = {
  profile: Profile;
  /** Papel real (vem da base de dados). */
  actualRole: Role;
  /** Papel usado para mostrar a interface. Só a Direcção pode "ver como". */
  viewRole: Role;
  setViewRole: (role: Role) => void;
};

const Ctx = createContext<Session | null>(null);

export function SessionProvider({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const [viewRole, setViewRoleState] = useState<Role>(profile.role);

  const value = useMemo<Session>(
    () => ({
      profile,
      actualRole: profile.role,
      viewRole,
      // Segurança: o servidor/RLS decide sempre; isto só altera a vista.
      setViewRole: (role) => {
        if (profile.role === "admin") setViewRoleState(role);
      },
    }),
    [profile, viewRole],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSession(): Session {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSession fora do SessionProvider");
  return ctx;
}
