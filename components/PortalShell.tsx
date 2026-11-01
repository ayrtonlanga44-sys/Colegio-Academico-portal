"use client";

import { useState } from "react";
import type { Profile } from "@/lib/types";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";
import { SessionProvider } from "./SessionProvider";
import { StudentIdCard } from "./StudentIdCard";

export function PortalShell({
  profile,
  children,
}: {
  profile: Profile;
  children: React.ReactNode;
}) {
  const [cardOpen, setCardOpen] = useState(false);

  return (
    <SessionProvider profile={profile}>
      <Header onOpenCard={() => setCardOpen(true)} />
      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-5 sm:pb-12">
        {children}
      </main>
      <BottomNav />
      <StudentIdCard open={cardOpen} onClose={() => setCardOpen(false)} />
    </SessionProvider>
  );
}
