import { Coffee, Moon, ShieldCheck, Home } from "lucide-react";

const scenarios = [
  {
    icon: <Coffee className="w-8 h-8 text-[#00c2ff]" />,
    title: "O Despertar Perfeito",
    description:
      "Esqueça o despertador estridente. Imagine as cortinas se abrindo suavemente e o café começando a passar no momento exato em que você abre os olhos.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-[#00c2ff]" />,
    title: "Paz de Espírito",
    description:
      "Aquela dúvida se trancou a porta ou desligou o ferro acabou. Sua casa se auto-configura para o 'Modo Sair' com um único toque no celular ou um comando de voz.",
  },
  {
    icon: <Moon className="w-8 h-8 text-[#00c2ff]" />,
    title: "Seu Refúgio Particular",
    description:
      "Chegue em casa e ative o 'Modo Relaxar'. Luzes em tom âmbar, temperatura ideal e sua playlist favorita. O estresse do trabalho fica da porta para fora.",
  },
  {
    icon: <Home className="w-8 h-8 text-[#00c2ff]" />,
    title: "Presença Inteligente",
    description:
      "Mesmo viajando, sua casa simula movimento e te avisa sobre qualquer irregularidade. Segurança que você sente, de qualquer lugar do mundo.",
  },
];

export function Experience() {
  const scrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="experiencia"
      className="py-24 px-6 bg-[#050a15] border-b border-white/5"
      aria-labelledby="experience-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2
            id="experience-title"
            className="text-4xl md:text-5xl font-light text-white italic mb-6"
          >
            Não é sobre tecnologia,{" "}
            <span className="text-[#00c2ff] not-italic font-semibold">
              é sobre viver bem.
            </span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A automação residencial não serve para complicar, mas para eliminar
            as pequenas dores diárias que você já se acostumou a aguentar e não
            sabe como resolver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((item, index) => (
            <article
              key={index}
              className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#00c2ff]/30 transition-all duration-500 group cursor-default"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-500 flex justify-center md:justify-start">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {item.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button
            onClick={scrollToContact}
            className="group relative overflow-hidden bg-[#00c2ff] text-[#050a15] font-black py-4 px-10 rounded-xl transition-all duration-500 uppercase text-xs tracking-[0.2em] shadow-lg shadow-[#00c2ff]/20 hover:bg-[#00e0ff] hover:scale-[1.02] active:scale-[0.98]"
          >
            Quero sentir essa liberdade
          </button>
        </div>
      </div>
    </section>
  );
}
