"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    // Simulação de login bem-sucedido para demonstração
    setTimeout(() => {
      if (email && password) {
        router.push("/avisos"); // Redireciona para o portal após entrar
      } else {
        setErro("Por favor, preenche todos os campos.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
      {/* Imagem de Fundo Institucional com Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-25 filter blur-[2px]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1920&auto=format&fit=crop')` 
          /* Podes trocar o link acima pela imagem real da escola alojada em /public ou via URL */
        }}
      />

      {/* Gradiente de sobreposição para leitura perfeita */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-900/80 z-0" />

      {/* Efeitos de luz subtis em verde institucional */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00A651]/20 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="w-full max-w-md relative z-10">
        {/* Cartão de Login com Glassmorphism */}
        <div className="bg-slate-900/85 backdrop-blur-xl border border-slate-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
          
          {/* Cabeçalho / Logótipo */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#00A651]/10 border border-[#00A651]/30 flex items-center justify-center shadow-inner">
              <Sparkles className="w-8 h-8 text-[#00A651]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Colégio Académico da Beira
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Portal do Estudante — Ensino Secundário
              </p>
            </div>
          </div>

          {/* Mensagem de Erro se houver */}
          {erro && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {erro}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Correio Eletrónico / Utilizador
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="ex: ayrton.langa@colegio.mz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00A651] transition shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Palavra-passe
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#00A651] transition shadow-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-[#00A651] focus:ring-0" />
                Lembrar-me
              </label>
              <a href="#" className="text-[#00A651] hover:underline font-medium">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#00A651] hover:bg-[#008d44] text-white font-bold py-3.5 px-4 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#00A651]/20 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span className="animate-pulse">A entrar no portal...</span>
              ) : (
                <>
                  Entrar no Portal <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Rodapé do Cartão */}
          <div className="pt-4 border-t border-slate-800/80 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A651]" />
            Acesso seguro restrito a alunos e funcionários.
          </div>

        </div>
      </div>
    </div>
  );
}