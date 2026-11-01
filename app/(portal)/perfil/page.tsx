"use client";

import { useState } from "react";
import { User, Mail, Phone, MapPin, Shield, CheckCircle2 } from "lucide-react";

export default function PerfilPage() {
  const [salvo, setSalvo] = useState(false);
  const [telefone, setTelefone] = useState("+258 84 123 4567");
  const [morada, setMorada] = useState("Macuti, Beira, Moçambique");

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    setSalvo(true);
    setTimeout(() => setSalvo(false), 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <User className="w-6 h-6 text-[#00A651]" />
          Perfil do Estudante
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Gerencia as tuas informações pessoais e dados de contacto oficiais.
        </p>
      </div>

      {/* Alerta de Sucesso */}
      {salvo && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 transition-all duration-300">
          <CheckCircle2 className="w-4 h-4" /> Alterações guardadas com sucesso!
        </div>
      )}

      {/* Cartão de Perfil Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Coluna da Esquerda: Resumo do Aluno */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm text-center space-y-4 transition-all duration-300 hover:shadow-md">
          <div className="w-24 h-24 mx-auto rounded-2xl bg-[#00A651]/10 border border-[#00A651]/30 flex items-center justify-center text-[#00A651] text-3xl font-bold shadow-inner">
            AL
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Ayrton Langa</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">12º Ano • Turma A</p>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-left space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Código de Estudante:</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">CAB-2026-089</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Estado:</span>
              <span className="font-semibold text-[#00A651] bg-[#00A651]/10 px-2 py-0.5 rounded-full">Matriculado</span>
            </div>
          </div>
        </div>

        {/* Coluna da Direita: Formulário de Edição */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <form onSubmit={handleSalvar} className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Informações de Contacto
            </h3>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Nome Completo
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  disabled
                  value="Ayrton Langa"
                  className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
              <span className="text-[10px] text-slate-400">O nome institucional só pode ser alterado via secretaria.</span>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Correio Eletrónico Institucional
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value="ayrton.langa@colegio.mz"
                  className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Telemóvel / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00A651] transition"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Morada / Bairro
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={morada}
                    onChange={(e) => setMorada(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#00A651] transition"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Shield className="w-4 h-4 text-[#00A651]" /> Conta protegida e encriptada.
              </div>
              <button
                type="submit"
                className="bg-[#00A651] hover:bg-[#008d44] text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 active:scale-95 shadow-md shadow-[#00A651]/20 cursor-pointer text-xs"
              >
                Salvar Alterações
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}