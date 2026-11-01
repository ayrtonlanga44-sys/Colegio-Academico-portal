"use client";

import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Calendar, Award, User, Briefcase, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [cargo, setCargo] = useState<string>("estudante");

  const navItems = [
    { href: "/avisos", label: "Avisos", icon: Bell },
    { href: "/horario", label: "Horário", icon: Calendar },
    { href: "/notas", label: "Notas", icon: Award },
    { href: "/perfil", label: "Perfil", icon: User },
    { href: "/gestao", label: "Gestão", icon: ShieldCheck, adminOnly: true },
  ];

  const cargos = [
    { key: "estudante", label: "Estudante" },
    { key: "professor", label: "Professor" },
    { key: "secretario", label: "Secretário" },
    { key: "director", label: "Director" },
    { key: "pedagogico", label: "Pedagógico" },
    { key: "funcionario", label: "Funcionários" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            {/* Imagem real do Colégio Académico da Beira */}
            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-slate-300 dark:shadow-slate-900 shrink-0 border border-slate-200 dark:border-slate-700">
              <img 
                src="/colegio-logo.jpg" 
                alt="Colégio Académico da Beira" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide text-slate-900 dark:text-white block">
                Colégio Académico da Beira
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block capitalize">
                Portal • {cargo}
              </span>
            </div>
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl overflow-x-auto w-full md:w-auto max-w-full">
          <Briefcase className="w-4 h-4 ml-2 text-slate-400 shrink-0 hidden lg:block" />
          {cargos.map((c) => (
            <button
              key={c.key}
              onClick={() => setCargo(c.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 ${
                cargo === c.key
                  ? "bg-[#00A651] text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 flex gap-2 overflow-x-auto shadow-sm sticky top-[53px] md:top-[61px] z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-bold transition-all shrink-0 ${
                item.adminOnly ? "text-amber-600 dark:text-amber-400" : ""
              } ${
                isActive
                  ? "border-[#00A651] text-[#00A651]"
                  : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <main className="flex-1 w-full pb-12">{children}</main>
    </div>
  );
}