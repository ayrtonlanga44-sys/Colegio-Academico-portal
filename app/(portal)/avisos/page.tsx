"use client";

import { Bell, Calendar, Megaphone, CheckCircle2, ArrowRight } from "lucide-react";

export default function AvisosPage() {
  const avisos = [
    {
      id: 1,
      titulo: "Inscrições Abertas para o Ano Letivo de 2027",
      data: "1 de Novembro de 2026",
      tipo: "Urgente",
      descricao: "Informamos a todos os estudantes e encarregados de educação que já se encontram abertas as inscrições e matrículas para o ano letivo de 2027. Garanta a sua vaga o quanto antes junto da secretaria escolar ou através dos canais oficiais do colégio.",
      destaque: true,
    },
    {
      id: 2,
      titulo: "Ajuste de Horários do Período da Tarde",
      data: "28 de Outubro de 2026",
      tipo: "Geral",
      descricao: "Recordamos que o funcionamento das aulas decorre no período da tarde, com início às 12:30 e término às 17:40, incluindo o intervalo maior às 14:45.",
      destaque: false,
    },
    {
      id: 3,
      titulo: "Manutenção na Sala de Informática",
      data: "25 de Outubro de 2026",
      tipo: "Aviso",
      descricao: "As aulas e sessões práticas da disciplina de TICs na Sala de Informática continuam a decorrer normalmente conforme o horário estabelecido para cada turma.",
      destaque: false,
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Bell className="w-6 h-6 text-[#00A651]" />
          Avisos e Comunicados
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Mantenha-te atualizado com as últimas novidades e diretrizes do Colégio Académico da Beira.
        </p>
      </div>

      {/* Lista de Avisos */}
      <div className="space-y-4">
        {avisos.map((aviso) => (
          <div
            key={aviso.id}
            className={`p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
              aviso.destaque
                ? "bg-gradient-to-br from-[#00A651]/10 via-white to-white dark:from-[#00A651]/20 dark:via-slate-900 dark:to-slate-900 border-[#00A651]/40 shadow-md shadow-[#00A651]/10"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {/* Tag de Destaque */}
            {aviso.destaque && (
              <div className="absolute top-0 right-0 bg-[#00A651] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                <Megaphone className="w-3 h-3" /> Destaque Oficial
              </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
              <span className="text-[11px] font-semibold text-[#00A651] bg-[#00A651]/10 px-2.5 py-1 rounded-full w-fit">
                {aviso.tipo}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {aviso.data}
              </span>
            </div>

            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {aviso.titulo}
            </h2>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {aviso.descricao}
            </p>

            {aviso.destaque && (
              <div className="pt-3 border-t border-[#00A651]/20 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00A651]" /> Vagas limitadas para o próximo ano letivo
                </span>
                <span className="text-xs font-bold text-[#00A651] flex items-center gap-1 cursor-pointer hover:underline">
                  Secretaria Aberta <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}