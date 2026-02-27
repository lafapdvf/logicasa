import { Home, AlertCircle } from "lucide-react";

interface NotFoundProps {
  onBack: () => void;
}

export function NotFound({ onBack }: NotFoundProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#02060f] px-4 text-center">
      {/* Círculo de Alerta com Glow - aria-hidden pois é decorativo */}
      <div
        className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-[#00c2ff]/10 shadow-[0_0_50px_rgba(0,194,255,0.2)]"
        aria-hidden="true"
      >
        <AlertCircle className="h-12 w-12 text-[#00c2ff]" />
      </div>

      {/* Texto de Erro - H1 único para a página de erro */}
      <h1 className="mb-4 text-6xl font-bold tracking-tighter text-white md:text-8xl">
        404
      </h1>

      {/* H2 descritivo para contextualizar o robô de busca */}
      <h2 className="mb-6 text-xl font-medium text-gray-300 md:text-2xl">
        Página não encontrada | LogiCasa Automação
      </h2>

      <p className="mb-10 max-w-md text-gray-400">
        Parece que o caminho que você tentou acessar não existe ou foi movido.
        Não se preocupe, a LogiCasa ajuda você a encontrar o caminho de volta
        para o melhor da <strong>automação residencial</strong>.
      </p>

      {/* Botão de Voltar - Melhorado para acessibilidade */}
      <button
        onClick={onBack}
        className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-transparent border-2 border-[#00c2ff] px-8 py-3 font-bold text-[#00c2ff] transition-all duration-300 hover:bg-[#00c2ff] hover:text-black active:scale-95"
        aria-label="Voltar para a página inicial da LogiCasa"
      >
        <Home className="h-5 w-5" aria-hidden="true" />
        <span>Voltar para o Início</span>

        {/* Efeito de brilho no hover */}
        <div className="absolute inset-0 -z-10 bg-[#00c2ff] opacity-0 blur-xl transition-opacity group-hover:opacity-20"></div>
      </button>

      {/* Elementos Decorativos de Fundo (Blur) */}
      <div
        className="fixed -bottom-24 -left-24 h-96 w-96 rounded-full bg-[#00c2ff]/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="fixed -right-24 -top-24 h-96 w-96 rounded-full bg-[#00c2ff]/5 blur-[120px]"
        aria-hidden="true"
      />
    </main>
  );
}
