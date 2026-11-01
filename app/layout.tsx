import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Colégio Académico da Beira - Portal do Estudante",
  description: "Portal académico oficial para consulta de avisos, horários, notas e perfil.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="dark">
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}