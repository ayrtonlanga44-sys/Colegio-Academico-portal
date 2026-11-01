"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Phone, RotateCw, ScanLine, Shirt } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  SCHOOL_PHONE_DISPLAY,
  SCHOOL_RULES,
  SCHOOL_WHATSAPP,
} from "@/lib/constants";
import { formatClassLabel, initials } from "@/lib/utils";
import { Logo } from "./Logo";
import { Modal } from "./Modal";
import { useSession } from "./SessionProvider";

/* ---------- QR (simulação visual determinística, não é um QR real) ---------- */

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const N = 25;

function buildMatrix(seed: string): boolean[][] {
  const rand = mulberry32(hashString(seed));
  const m = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => rand() > 0.5),
  );

  const finder = (ox: number, oy: number) => {
    for (let y = -1; y <= 7; y++) {
      for (let x = -1; x <= 7; x++) {
        const px = ox + x;
        const py = oy + y;
        if (px < 0 || py < 0 || px >= N || py >= N) continue;
        const edge = x === 0 || x === 6 || y === 0 || y === 6;
        const core = x >= 2 && x <= 4 && y >= 2 && y <= 4;
        m[py]![px] = x >= 0 && x <= 6 && y >= 0 && y <= 6 && (edge || core);
      }
    }
  };
  finder(0, 0);
  finder(N - 7, 0);
  finder(0, N - 7);
  return m;
}

function QrSim({ value }: { value: string }) {
  const matrix = useMemo(() => buildMatrix(value), [value]);
  const [state, setState] = useState<"idle" | "scanning" | "ok">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function scan() {
    if (state === "scanning") return;
    setState("scanning");
    timer.current = setTimeout(() => setState("ok"), 1600);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          scan();
        }}
        aria-label="Simular leitura do QR"
        className="relative overflow-hidden rounded-xl bg-white p-2"
      >
        <svg viewBox={`0 0 ${N} ${N}`} width={96} height={96} shapeRendering="crispEdges">
          {matrix.flatMap((row, y) =>
            row.map((on, x) =>
              on ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#0B0F17" /> : null,
            ),
          )}
        </svg>
        {state === "scanning" && (
          <motion.span
            className="absolute inset-x-1 h-0.5 bg-brand-green shadow-[0_0_10px_2px_#00A651]"
            initial={{ top: "8%" }}
            animate={{ top: "88%" }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </button>
      <p className="flex items-center gap-1 text-[10px] font-medium text-white/80">
        {state === "ok" ? (
          <>
            <CheckCircle2 size={12} className="text-white" /> Cartão válido
          </>
        ) : (
          <>
            <ScanLine size={12} /> {state === "scanning" ? "A ler…" : "Toque para simular leitura"}
          </>
        )}
      </p>
    </div>
  );
}

/* ------------------------------- Cartão ------------------------------- */

export function StudentIdCard({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { profile } = useSession();
  const [flipped, setFlipped] = useState(false);
  const code = profile.student_id_code ?? "CA-2026-0000";

  useEffect(() => {
    if (!open) setFlipped(false);
  }, [open]);

  const face = "absolute inset-0 overflow-hidden rounded-3xl shadow-card";
  const hidden = { backfaceVisibility: "hidden" as const, WebkitBackfaceVisibility: "hidden" as const };

  return (
    <Modal open={open} onClose={onClose} title="Cartão do Estudante">
      <div className="mx-auto w-full max-w-[290px] [perspective:1200px]">
        <motion.div
          className="relative aspect-[5/7.4] w-full cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 120 }}
          onClick={() => setFlipped((f) => !f)}
        >
          {/* FRENTE */}
          <div
            className={`${face} bg-gradient-to-br from-emerald-600 via-brand-green to-emerald-800 p-4 text-white`}
            style={hidden}
          >
            <div className="flex items-center gap-2">
              <Logo size={34} />
              <div className="leading-tight">
                <p className="font-serif text-[11px] font-bold">COLÉGIO ACADÉMICO</p>
                <p className="text-[9px] tracking-[0.3em]">BEIRA · SOFALA</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-center">
              {profile.avatar_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/80"
                />
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/90 font-serif text-3xl font-bold text-brand-wine ring-4 ring-white/80">
                  {initials(profile.full_name)}
                </div>
              )}
              <h3 className="mt-3 text-center font-serif text-lg font-bold leading-tight">
                {profile.full_name}
              </h3>
              <p className="mt-0.5 text-xs text-white/85">
                {formatClassLabel(profile.class_group)}
              </p>
              <p className="mt-2 rounded-full bg-black/25 px-3 py-1 font-mono text-xs tracking-wider">
                {code}
              </p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-white/85">
                <Shirt size={12} /> Fardamento: Verde / Branco
              </p>
            </div>

            <div className="absolute inset-x-0 bottom-3 flex justify-center">
              <QrSim value={code} />
            </div>
          </div>

          {/* VERSO */}
          <div
            className={`${face} bg-brand-cream p-4 text-brand-obsidian`}
            style={{ ...hidden, transform: "rotateY(180deg)" }}
          >
            <div className="flex items-center justify-between">
              <p className="font-serif text-sm font-bold text-brand-wine">Em caso de emergência</p>
              <Logo size={30} />
            </div>

            <a
              href={`tel:+${SCHOOL_WHATSAPP}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-3 flex items-center gap-2 rounded-xl bg-brand-green px-3 py-2.5 text-sm font-bold text-white"
            >
              <Phone size={16} /> {SCHOOL_PHONE_DISPLAY}
            </a>

            <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-brand-wine">
              Regras do Colégio
            </p>
            <ul className="mt-1.5 space-y-1.5 text-[12px] leading-snug">
              {SCHOOL_RULES.map((rule) => (
                <li key={rule} className="flex gap-1.5">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {rule}
                </li>
              ))}
            </ul>

            <p className="absolute inset-x-4 bottom-3 border-t border-brand-wine/20 pt-2 text-center text-[10px] text-brand-wine/80">
              Este cartão é pessoal e intransmissível.
            </p>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="mx-auto mt-4 flex items-center gap-1.5 text-sm text-slate-300 transition hover:text-white"
      >
        <RotateCw size={15} /> Virar cartão
      </button>
    </Modal>
  );
}
