import { Instagram } from "lucide-react";

export function InstagramFeed() {
  const posts = [
    {
      id: 1,
      link: "https://www.instagram.com/logicasa_automacao/EXEMPLO1",
      thumb: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      metric: "MAIS VISTO",
      legenda: "Automação completa em cobertura duplex.",
    },
    {
      id: 2,
      link: "https://www.instagram.com/logicasa_automacao/EXEMPLO2",
      thumb: "https://images.unsplash.com/photo-1558603668-6570496b66f8",
      metric: "DESTAQUE",
      legenda: "Iluminação inteligente e conforto térmico.",
    },
    {
      id: 3,
      link: "https://www.instagram.com/logicasa_automacao/EXEMPLO3",
      thumb: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
      metric: "TENDÊNCIA",
      legenda: "Cenas e rotinas: a experiência definitiva.",
    },
  ];

  return (
    <section
      className="px-6 py-24 bg-[#050a15] border-b border-white/5 overflow-hidden"
      aria-labelledby="instagram-title"
    >
      <div className="max-w-6xl mx-auto">
        {/* CABEÇALHO */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <h2
              id="instagram-title"
              className="text-4xl font-light text-white italic mb-4"
            >
              Nossos{" "}
              <span className="text-[#00c2ff] not-italic font-semibold">
                Destaques
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Confira nossos projetos de automação residencial e soluções
              inteligentes diretamente no Instagram da LogiCasa.
            </p>
          </div>
          <a
            href="https://instagram.com/logicasa_automacao"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-white bg-white/5 border border-white/10 px-6 py-3 rounded-full hover:bg-[#00c2ff]/10 transition-all duration-300"
          >
            <Instagram className="w-5 h-5 text-[#00c2ff]" aria-hidden="true" />
            <span className="text-sm font-bold tracking-widest uppercase">
              Seguir a LogiCasa
            </span>
          </a>
        </div>

        {/* CONTAINER DO SLIDER / GRID */}
        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {posts.map((post) => (
            <article
              key={post.id}
              className="min-w-[85%] md:min-w-full snap-center"
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                aria-label={`Ver post sobre: ${post.legenda}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all duration-500 group-hover:border-[#00c2ff]/40">
                  <img
                    src={post.thumb}
                    alt={`Projeto LogiCasa: ${post.legenda}`}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 grayscale-[30%] group-hover:grayscale-0"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-transparent opacity-90 group-hover:opacity-60 transition-opacity" />

                  <div className="absolute top-4 left-4">
                    <span className="bg-[#00c2ff] text-[#050a15] text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      {post.metric}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-medium leading-snug mb-2">
                      {post.legenda}
                    </p>
                    <span className="text-[#00c2ff] text-xs font-bold opacity-0 group-hover:opacity-100 transition-all">
                      Ver no Instagram →
                    </span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>

        {/* INDICADOR VISUAL PARA MOBILE */}
        <div
          className="flex justify-center gap-2 mt-4 md:hidden"
          aria-hidden="true"
        >
          {posts.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          ))}
        </div>
      </div>
    </section>
  );
}
