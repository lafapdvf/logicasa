interface ServiceItem {
  title: string;
  desc: string;
  img: string;
}

export function Services() {
  const services: ServiceItem[] = [
    {
      title: "Automação Residencial",
      desc: "Iluminação, climatização, jardinagem e outras cenas inteligentes integradas ao seu estilo de vida.",
      img: "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=1171&auto=format&fit=crop",
    },
    {
      title: "Segurança Inteligente",
      desc: "Câmeras, fechaduras digitais, controles de acesso e monitoramento remoto com total confiabilidade.",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    },
    {
      title: "Integrações Personalizadas",
      desc: "Integração total com Alexa, Google Home e outros sistemas sob medida.",
      img: "https://www.deltalinkit.com/wp-content/uploads/2023/07/%D8%A8%D8%A7%D8%B1%D8%B2%D8%A9-1536x975.jpg?v=1713965881&auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "Áudio & Vídeo",
      desc: "Sistemas de áudio e vídeo para entretenimento, como Home Theaters, Home Cinemas e multirooms.",
      img: "https://images.unsplash.com/photo-1721733258410-35e699661ad6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Paineis de LED & Displays",
      desc: "Paineis de LED e displays personalizados para ambientes comerciais e residenciais.",
      img: "https://i.pinimg.com/736x/77/fa/d0/77fad0c49d4eeafdce8a1d0e30647bda.jpg",
    },
    {
      title: "Soluções de Acessibilidade",
      desc: "Pensadas em garantir que todos possam desfrutar do conforto que a tecnologia oferece de forma simplificada e inclusiva.",
      img: "https://i.pinimg.com/1200x/20/10/b6/2010b6687cde14c819718f1bd4526ec5.jpg",
    },
  ];

  return (
    <section
      id="servicos"
      className="px-6 py-32 bg-[#02060f] border-y border-white/5 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light mb-16 text-center">
          Nossas <span className="text-[#00c2ff] font-semibold">Soluções</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item) => (
            <div
              key={item.title}
              className="group bg-[#08101f] border border-white/5 rounded-3xl overflow-hidden hover:border-[#00c2ff]/50 transition-all duration-500 shadow-xl"
            >
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#00c2ff]/10 group-hover:bg-transparent transition duration-500 z-10"></div>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
              </div>
              <div className="p-8">
                <div className="w-10 h-1 bg-[#00c2ff] mb-6 group-hover:w-full transition-all duration-500"></div>
                <h3 className="text-xl mb-4 font-semibold">{item.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
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
