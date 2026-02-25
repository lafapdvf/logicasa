import rafa from "../../assets/rafael.webp";
import lafa from "../../assets/lafaiete.webp";

export function About() {
  const socios = [
    {
      nome: "Rafael Camargo",
      foto: rafa,
      bio: "Administrador e entusiasta de tecnologia, principalmente quando aplicada à arquitetura. Com mais de 20 anos de atuação junto a escritórios, indústria e obras, falando a mesma linguagem do projeto e da execução.",
    },
    {
      nome: "Lafaiete Pereira",
      foto: lafa,
      bio: "Analista de sistemas experiente em desenvolvimento de softwares e explorador de novas tecnologias. Focado em transformar complexidade técnica em conforto para o usuário.",
    },
  ];

  return (
    <section
      id="sobre"
      /* Ajuste de scroll-mt e paddings responsivos */
      className="px-6 pt-16 pb-24 md:py-32 bg-[#02060f] border-y border-white/5 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* TEXTO DE INTRODUÇÃO + IMAGEM DESTAQUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mb-24">
          {/* Container da Imagem: Usando order-last no mobile para o título aparecer antes, 
              OU mantendo no topo com margem negativa sutil para "subir" a imagem */}
          <div className="relative group order-first lg:order-first">
            <div className="absolute -inset-4 bg-[#00c2ff]/10 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <img
              src="https://i.pinimg.com/1200x/65/db/fe/65dbfe6053b93395a44a55f35679e70c.jpg"
              alt="Casa inteligente"
              className="relative rounded-2xl grayscale-[50%] hover:grayscale-0 transition duration-700 object-cover h-[300px] md:h-[450px] w-full shadow-2xl"
            />
          </div>

          <div className="text-slate-300">
            <h2 className="text-3xl md:text-5xl font-light mb-6 md:mb-8 text-white italic">
              Sobre{" "}
              <span className="text-[#00c2ff] not-italic font-semibold">
                Nós
              </span>
            </h2>
            <p className="leading-relaxed text-base md:text-lg mb-3">
              Uma casa inteligente é aquela que se adapta ao estilo de vida dos
              moradores e torna suas vidas mais confortáveis, fazendo com que se
              procupem apenas com o que mais importa: aproveitarem o conforto do
              lar.
            </p>
            <p className="leading-relaxed text-base md:text-lg mb-6">
              A LogiCasa nasceu do entusiasmo pelo conforto que a tecnologia
              pode trazer à vida e da curiosidade em como maximizar esse
              conforto sem sacrificar a simplicidade e a acessibilidade.
            </p>

            <p className="leading-relaxed border-l-2 border-[#00c2ff] pl-6 py-2 italic text-slate-400 text-sm md:text-base">
              Somos dois melhores amigos que uniram experiências e conhecimentos
              para transformar residências em ambientes inteligentes, funcionais
              e fáceis de usar. Entendemos que cada indivíduo tem sua própria
              personalidade e que o seu lar é a extensão dela.
            </p>
          </div>
        </div>

        {/* CARDS DOS SÓCIOS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {socios.map((socio) => (
            <div
              key={socio.nome}
              className={`group relative flex flex-col items-center md:flex-row md:items-end gap-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 hover:border-[#00c2ff]/30 transition-all duration-500 ${
                socio.nome.includes("Lafaiete") ? "md:flex-row-reverse" : ""
              }`}
            >
              <div
                className={`absolute top-10 ${
                  socio.nome.includes("Rafael") ? "left-10" : "right-10"
                } w-32 h-32 bg-[#00c2ff]/10 blur-[60px] rounded-full group-hover:bg-[#00c2ff]/30 transition-all`}
              ></div>

              <div className="relative w-40 md:w-52 shrink-0">
                <img
                  src={socio.foto}
                  alt={socio.nome}
                  className="w-full h-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="relative z-10 text-center md:text-left">
                <span className="text-[10px] uppercase tracking-[0.4em] text-[#00c2ff] font-bold">
                  {socio.nome === "Rafael Camargo" ? "Rafa" : "Lafa"}
                </span>
                <h3 className="text-2xl md:text-3xl font-light text-white mb-3">
                  {socio.nome}
                </h3>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                  {socio.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
