"use client";

import { useState } from "react";
import { ShieldCheck, UserCheck, UserX, Lock } from "lucide-react";

interface Utilizador {
  id: string;
  nome: string;
  email: string;
  cargo: "estudante" | "professor" | "secretario" | "director" | "pedagogico" | "funcionario";
  verificado: boolean;
  isSuperAdmin?: boolean;
}

export default function GestaoPage() {
  // Apenas a tua conta oficial de Super Admin permanece por defeito
  const [utilizadores, setUtilizadores] = useState<Utilizador[]>([
    {
      id: "1",
      nome: "Ayrton Langa",
      email: "ayrtonlanga48@gmail.com",
      cargo: "director",
      verificado: true,
      isSuperAdmin: true,
    },
  ]);

  const alternarVerificacao = (email: string) => {
    if (email === "ayrtonlanga48@gmail.com") return;

    setUtilizadores((prev) =>
      prev.map((user) => {
        if (user.email === email) {
          return { ...user, verificado: !user.verificado };
        }
        return user;
      })
    );
  };

  const alterarCargo = (email: string, novoCargo: Utilizador["cargo"]) => {
    if (email === "ayrtonlanga48@gmail.com") return;

    setUtilizadores((prev) =>
      prev.map((user) => {
        if (user.email === email) {
          return { ...user, cargo: novoCargo };
        }
        return user;
      })
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#00A651]" />
          Gestão de Permissões e Contas
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Aprovação de contas, atribuição de cargos e controlo de acessos institucionais.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Contas Registadas no Sistema
          </span>
          <span className="text-[11px] bg-[#00A651]/10 text-[#00A651] px-2.5 py-1 rounded-full font-semibold">
            Sessão Ativa: ayrtonlanga48@gmail.com
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {utilizadores.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Nenhuma outra conta registada de momento.
            </div>
          ) : (
            utilizadores.map((u) => {
              const isMe = u.email === "ayrtonlanga48@gmail.com";

              return (
                <div
                  key={u.id}
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isMe
                          ? "bg-amber-500/10 text-amber-500"
                          : u.verificado
                          ? "bg-[#00A651]/10 text-[#00A651]"
                          : "bg-slate-200 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isMe ? <Lock className="w-5 h-5" /> : <UserCheck className="w-5 h-5" />}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        {u.nome}
                        {isMe && (
                          <span className="text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded-full font-semibold">
                            Super Admin (Director)
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <select
                      disabled={isMe}
                      value={u.cargo}
                      onChange={(e) => alterarCargo(u.email, e.target.value as Utilizador["cargo"])}
                      className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <option value="estudante">Estudante</option>
                      <option value="professor">Professor</option>
                      <option value="secretario">Secretário</option>
                      <option value="pedagogico">Pedagógico</option>
                      <option value="director">Director</option>
                      <option value="funcionario">Funcionário</option>
                    </select>

                    {!isMe ? (
                      <button
                        onClick={() => alternarVerificacao(u.email)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                          u.verificado
                            ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20"
                            : "bg-[#00A651] text-white hover:bg-[#008d44] shadow-sm"
                        }`}
                      >
                        {u.verificado ? (
                          <>
                            <UserX className="w-3.5 h-3.5" /> Suspender
                          </>
                        ) : (
                          <>
                            <UserCheck className="w-3.5 h-3.5" /> Aprovar Conta
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-bold px-3 py-1 bg-amber-500/10 rounded-lg flex items-center gap-1">
                        <ShieldCheck className="w-4 h-4" /> Acesso Absoluto
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}