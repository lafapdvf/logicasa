import smarthome from "../../assets/smarthome.webp";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={smarthome}
          alt="Smart Home background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02060f] via-transparent to-[#02060f]"></div>
      </div>

      <div className="relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00c2ff]/10 blur-[120px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-7xl font-light tracking-wide leading-tight">
          LogiCasa
          <br />
          <span className="font-semibold text-[#00c2ff]">
            Automação Inteligente
          </span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light">
          Tecnologia, conforto e sofisticação integrados para residências de
          alto padrão.
        </p>
        <div className="mt-10">
          <a
            href="#servicos"
            className="animate-bounce inline-block text-[#00c2ff]"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Descubra
            </span>
            <div className="text-2xl">↓</div>
          </a>
        </div>
      </div>
    </section>
  );
}
