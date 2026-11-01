"use client";

import { Award, CheckCircle2, BookOpen } from "lucide-react";

export default function NotasPage() {
  const disciplinas = [
    { nome: "Matemática", trimestre1: 16, trimestre2: 17, media: 16.5, status: "Bom" },
    { nome: "Física", trimestre1: 15, trimestre2: 16, media: 15.5, status: "Bom" },
    { nome: "Português", trimestre1: 14, trimestre2: 15, media: 14.5, status: "Suficiente" },
    { nome: "Química", trimestre1: 17, trimestre2: 18, media: 17.5, status: "Excelente" },
    { nome: "Biologia", trimestre1: 16, trimestre2: 16, media: 16.0, status: "Bom" },
    { nome: "Filosofia", trimestre1: 15, trimestre2: 15, media: 15.0, status: "Bom" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-[#00A651]" />
          Avaliações e Notas
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Acompanha o teu desempenho académico ao longo dos trimestres.
        </p>
      </div>

      {/* Cartões de Notas com Hover Elevado */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disciplinas.map((disc, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#00A651]/50 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#00A651]/10 flex items-center justify-center text-[#00A651]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">{disc.nome}</h2>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {disc.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 block">1º Trim.</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{disc.trimestre1}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 block">2º Trim.</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{disc.trimestre2}</span>
              </div>
              <div className="bg-[#00A651]/10 p-2.5 rounded-xl border border-[#00A651]/30">
                <span className="text-[10px] font-semibold text-[#00A651] block">Média</span>
                <span className="text-sm font-bold text-[#00A651]">{disc.media}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}