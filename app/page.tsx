"use client";

import { useState } from "react";
import { LogIn, Lock, User, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = "/avisos";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-900 relative overflow-hidden">
      {/* Luzes de Fundo (Glow Effect) */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00A651]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cartão Glassmorphism */}
      <div className="w-full max-w-md bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative z-10">
        
        {/* Logótipo e Título */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto bg-[#00A651] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#00A651]/30">
            <GraduationCap className="w-9 h-9" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            Colégio Académico da Beira
          </h1>
          <p className="text-xs text-slate-300">
            Portal do Estudante • Aceda à sua conta
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 block">
              Código de Estudante
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Ex: CAB-2026-089"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00A651] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-300 block">
              Palavra-passe
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00A651] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#00A651] hover:bg-[#008d44] text-white font-bold py-3 px-4 rounded-xl transition duration-200 active:scale-95 shadow-lg shadow-[#00A651]/25 flex items-center justify-center gap-2 text-sm cursor-pointer mt-2"
          >
            <LogIn className="w-4 h-4" /> Entrar no Portal
          </button>
        </form>

        <p className="text-[11px] text-center text-slate-400">
          Esqueceu-se dos dados? Contacte a secretaria escolar.
        </p>
      </div>
    </div>
  );
}