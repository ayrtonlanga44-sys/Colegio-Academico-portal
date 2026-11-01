"use client";

import { useState } from "react";
import { Calendar as CalendarIcon, Clock, BookOpen, Coffee, Users } from "lucide-react";

type DiaSemana = "segunda" | "terca" | "quarta" | "quinta" | "sexta";
type Turma = "10A" | "11A" | "12A" | "12B";

export default function HorarioPage() {
  const [turmaSelecionada, setTurmaSelecionada] = useState<Turma>("11A");
  const [diaSelecionado, setDiaSelecionado] = useState<DiaSemana>("segunda");

  // Horários oficiais para a 11ª A (Sala 01)
  const horariosPorDia11A: Record<DiaSemana, Array<{ tempo: string; hora: string; disciplina: string; sala: string; intervalo?: boolean; saida?: boolean }>> = {
    segunda: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Português", sala: "Sala 01" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Biologia", sala: "Sala 01" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Física", sala: "Sala 01" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "DGD (Desenho Geométrico)", sala: "Sala 01" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "DGD (Desenho Geométrico)", sala: "Sala 01" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Geografia", sala: "Sala 01" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Geografia / Saída", sala: "Sala 01", saida: true },
    ],
    terca: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Filosofia", sala: "Sala 01" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Filosofia", sala: "Sala 01" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Química", sala: "Sala 01" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Química", sala: "Sala 01" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Inglês", sala: "Sala 01" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Biologia", sala: "Sala 01" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Biologia / Saída", sala: "Sala 01", saida: true },
    ],
    quarta: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Português", sala: "Sala 01" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Português", sala: "Sala 01" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "TICs", sala: "Sala de Informática" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Filosofia", sala: "Sala 01" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Física", sala: "Sala 01" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Inglês", sala: "Sala 01" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Inglês / Saída", sala: "Sala 01", saida: true },
    ],
    quinta: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Português", sala: "Sala 01" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Português", sala: "Sala 01" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Inglês", sala: "Sala 01" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Noções de Empreendedorismo", sala: "Sala 01" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Noções de Empreendedorismo", sala: "Sala 01" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Matemática", sala: "Sala 01" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Matemática / Saída", sala: "Sala 01", saida: true },
    ],
    sexta: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Química", sala: "Sala 01" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Física", sala: "Sala 01" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Matemática", sala: "Sala 01" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Matemática", sala: "Sala 01" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Educação Física", sala: "Sala 01" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Educação Física", sala: "Sala 01" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Reunião da Turma / Saída", sala: "Sala 01", saida: true },
    ],
  };

  // Horários oficiais para a 12ª A (Sala 02, TICs na Sala de Informática, Reunião de Turma à sexta no 7º tempo)
  const horariosPorDia12A: Record<DiaSemana, Array<{ tempo: string; hora: string; disciplina: string; sala: string; intervalo?: boolean; saida?: boolean }>> = {
    segunda: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Biologia", sala: "Sala 02" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "DGD (Desenho Geométrico)", sala: "Sala 02" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "DGD (Desenho Geométrico)", sala: "Sala 02" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Português", sala: "Sala 02" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Português", sala: "Sala 02" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Física", sala: "Sala 02" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Física / Saída", sala: "Sala 02", saida: true },
    ],
    terca: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Inglês", sala: "Sala 02" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Inglês", sala: "Sala 02" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Filosofia", sala: "Sala 02" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Biologia", sala: "Sala 02" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Biologia", sala: "Sala 02" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Química", sala: "Sala 02" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Química / Saída", sala: "Sala 02", saida: true },
    ],
    quarta: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Química", sala: "Sala 02" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Filosofia", sala: "Sala 02" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Filosofia", sala: "Sala 02" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Inglês", sala: "Sala 02" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Inglês", sala: "Sala 02" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "TICs", sala: "Sala de Informática" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Português / Saída", sala: "Sala 02", saida: true },
    ],
    quinta: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Física", sala: "Sala 02" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Matemática", sala: "Sala 02" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Matemática", sala: "Sala 02" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Português", sala: "Sala 02" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Português", sala: "Sala 02" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Noções de Empreendedorismo", sala: "Sala 02" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Noções de Empreendedorismo / Saída", sala: "Sala 02", saida: true },
    ],
    sexta: [
      { tempo: "1º Tempo", hora: "12:30 - 13:15", disciplina: "Geografia", sala: "Sala 02" },
      { tempo: "2º Tempo", hora: "13:15 - 14:00", disciplina: "Geografia", sala: "Sala 02" },
      { tempo: "3º Tempo", hora: "14:00 - 14:45", disciplina: "Educação Física", sala: "Sala 02" },
      { tempo: "Intervalo Maior", hora: "14:45 - 15:00", disciplina: "Pausa / Descanso", sala: "Pátio Central", intervalo: true },
      { tempo: "4º Tempo", hora: "15:00 - 15:45", disciplina: "Educação Física", sala: "Sala 02" },
      { tempo: "5º Tempo", hora: "15:45 - 16:30", disciplina: "Matemática", sala: "Sala 02" },
      { tempo: "6º Tempo", hora: "16:30 - 17:15", disciplina: "Matemática", sala: "Sala 02" },
      { tempo: "7º Tempo", hora: "17:15 - 17:40", disciplina: "Reunião da Turma / Saída", sala: "Sala 02", saida: true },
    ],
  };

  const dias: { key: DiaSemana; label: string }[] = [
    { key: "segunda", label: "Segunda" },
    { key: "terca", label: "Terça" },
    { key: "quarta", label: "Quarta" },
    { key: "quinta", label: "Quinta" },
    { key: "sexta", label: "Sexta" },
  ];

  const turmas: { key: Turma; label: string; destaque?: boolean }[] = [
    { key: "10A", label: "10ª A" },
    { key: "11A", label: "11ª A", destaque: true },
    { key: "12A", label: "12ª A" },
    { key: "12B", label: "12ª B" },
  ];

  const obterHorariosDaTurma = () => {
    if (turmaSelecionada === "11A") return horariosPorDia11A[diaSelecionado];
    if (turmaSelecionada === "12A") return horariosPorDia12A[diaSelecionado];
    return null;
  };

  const dadosHorario = obterHorariosDaTurma();

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-[#00A651]" />
            Horário Escolar
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Período da tarde (12:30 - 17:40) • Colégio Académico da Beira
          </p>
        </div>

        {/* Seletor de Turmas */}
        <div className="flex items-center gap-1 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
          <Users className="w-4 h-4 ml-2 text-slate-500" />
          {turmas.map((t) => (
            <button
              key={t.key}
              onClick={() => setTurmaSelecionada(t.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                turmaSelecionada === t.key
                  ? "bg-[#00A651] text-white shadow-md"
                  : t.destaque
                  ? "text-[#00A651] dark:text-emerald-400 hover:bg-white/50 dark:hover:bg-slate-700"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {t.label}
              {t.destaque && turmaSelecionada !== t.key && " ★"}
            </button>
          ))}
        </div>
      </div>

      {/* Seletor de Dias da Semana */}
      {(turmaSelecionada === "11A" || turmaSelecionada === "12A") && (
        <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-xl overflow-x-auto w-fit">
          {dias.map((d) => (
            <button
              key={d.key}
              onClick={() => setDiaSelecionado(d.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                diaSelecionado === d.key
                  ? "bg-[#00A651] text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      )}

      {/* Tabela de Horários */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden transition-all duration-300">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            Turma: <span className="text-[#00A651] font-extrabold text-sm">{turmaSelecionada}</span>
          </span>
          <span className="text-[11px] bg-[#00A651]/10 text-[#00A651] px-2.5 py-1 rounded-full font-semibold capitalize">
            {turmaSelecionada === "11A" || turmaSelecionada === "12A" ? `${diaSelecionado}-feira` : "Brevemente"}
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {dadosHorario ? (
            dadosHorario.map((item, index) => (
              <div 
                key={index} 
                className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 transition-colors ${
                  item.intervalo 
                    ? "bg-amber-500/5 dark:bg-amber-500/10" 
                    : item.saida
                    ? "bg-emerald-500/5 dark:bg-emerald-500/10"
                    : "hover:bg-slate-50/60 dark:hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.intervalo 
                      ? "bg-amber-500/10 text-amber-500" 
                      : item.saida 
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-[#00A651]/10 text-[#00A651]"
                  }`}>
                    {item.intervalo ? <Coffee className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {item.tempo}
                      {item.saida && <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-normal">Saída</span>}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> {item.hora}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-2 md:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left md:text-right">
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block flex items-center gap-1.5 md:justify-end">
                      {!item.intervalo && <BookOpen className="w-3.5 h-3.5 text-[#00A651]" />}
                      {item.disciplina}
                    </span>
                    <span className="text-[11px] text-slate-400 block">{item.sala}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-xs">
              O horário detalhado da turma <span className="font-bold text-slate-800 dark:text-white">{turmaSelecionada}</span> estará disponível em breve.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}