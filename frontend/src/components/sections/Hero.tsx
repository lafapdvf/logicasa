import smarthome from "../../assets/smarthome.webp";
import logicasa from "../../assets/logicasa.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Background com Imagem e Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={smarthome}
          alt="Fundo de casa inteligente com automação"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060f] via-transparent to-[#02060f]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Título H1 para SEO (Escondido visualmente, mas visível para o Google) */}
        <h1 className="sr-only">
          LogiCasa | Automação Residencial Acessível em São Paulo - SP
        </h1>

        {/* Glow de fundo da logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#00c2ff]/20 blur-[100px] rounded-full -z-10"></div>

        {/* Logo */}
        <div className="mb-6 transition-transform duration-700 hover:scale-105">
          <img
            src={logicasa}
            alt="LogiCasa - Automação Residencial Inteligente"
            className="h-48 md:h-96 w-auto drop-shadow-[0_0_15px_rgba(0,194,255,0.4)]"
          />
        </div>

        {/* Descrição curta com tag de parágrafo (boa para semântica) */}
        <p className="mt-4 max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light">
          Sofisticação e conforto de alto padrão para todos os padrões de
          residências.
        </p>

        <div className="mt-12">
          <a
            href="#solucoes"
            className="animate-bounce inline-block text-[#00c2ff] group"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] group-hover:text-white transition-colors">
              Veja mais
            </span>
            <div className="text-2xl" aria-hidden="true">
              ↓
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
