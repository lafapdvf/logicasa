interface ServiceItem {
  title: string;
  desc: string;
  img: string;
}

export function Services() {
  const services: ServiceItem[] = [
    // ... (seus itens de serviço permanecem os mesmos)
    {
      title: "Automação Residencial",
      desc: "Desde a iluminação até a irrigação das plantas ou a alimentação do seu pet, tudo ao seu total alcance e controle.",
      img: "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=1171&auto=format&fit=crop",
    },
    {
      title: "Segurança Inteligente",
      desc: "Controles de acesso individualizados, monitoramento de ambientes e proteção contra quaisquer riscos.",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Integrações Personalizadas",
      desc: "Criatividade ilimitada focada nas suas necessidades, nas suas rotinas e no seu conforto.",
      img: "https://www.deltalinkit.com/wp-content/uploads/2023/07/%D8%A8%D8%A7%D8%B1%D8%B2%D8%A9-1536x975.jpg?v=1713965881&auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Áudio & Vídeo Imersivos",
      desc: "Home Theaters, Home Cinemas e multirooms integrados à sua automação residencial.",
      img: "https://images.unsplash.com/photo-1721733258410-35e699661ad6?q=80&w=1170&auto=format&fit=crop",
    },
    {
      title: "Paineis & Displays de LED",
      desc: "Seja em ambientes residenciais ou comerciais, é a sua garantia de diversão e casa cheia na Copa do Mundo.",
      img: "https://i.pinimg.com/736x/77/fa/d0/77fad0c49d4eeafdce8a1d0e30647bda.jpg",
    },
    {
      title: "Soluções de Acessibilidade",
      desc: "Para que todos possam desfrutar do conforto que uma casa inteligente oferece de forma simplificada e inclusiva.",
      img: "https://i.pinimg.com/1200x/20/10/b6/2010b6687cde14c819718f1bd4526ec5.jpg",
    },
  ];

  return (
    <section
      id="solucoes"
      /* AJUSTE AQUI: scroll-mt deve bater com a altura do header. 
         Reduzi o padding superior (pt) e mantive o inferior (pb) para o respiro. */
      className="px-6 pt-16 pb-24 md:pt-24 md:pb-32 bg-[#02060f] border-y border-white/5 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-light mb-12 md:mb-20 text-center tracking-tight">
          Nossas <span className="text-[#00c2ff] font-semibold">Soluções</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((item) => (
            <div
              key={item.title}
              className="group bg-[#08101f] border border-white/5 rounded-3xl overflow-hidden hover:border-[#00c2ff]/50 transition-all duration-500 shadow-xl"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#00c2ff]/5 group-hover:bg-transparent transition duration-500 z-10"></div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-8">
                <div className="w-8 h-1 bg-[#00c2ff] mb-6 group-hover:w-full transition-all duration-500"></div>
                <h3 className="text-xl mb-3 font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed text-sm md:text-base">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
