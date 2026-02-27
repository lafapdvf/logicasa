export function Mission() {
  return (
    <section
      className="px-6 py-24 bg-[#050a15]"
      aria-labelledby="mission-title"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* h2: Define o título da seção para hierarquia de SEO */}
        <h2
          id="mission-title"
          className="text-2xl font-light mb-6 text-slate-400 uppercase tracking-[0.2em]"
        >
          Nossa Missão
        </h2>

        {/* blockquote: Tag semântica ideal para frases de missão ou citações */}
        <blockquote className="text-white text-2xl md:text-4xl font-light leading-relaxed">
          <p>
            "Difundir e levar a automação residencial a todos, com soluções{" "}
            <span className="text-[#00c2ff] font-medium">intuitivas</span> e{" "}
            <span className="text-[#00c2ff] font-medium">acessíveis</span> que
            elevam a experiência de morar bem e valorizam o imóvel de forma
            relevante."
          </p>
        </blockquote>
      </div>
    </section>
  );
}
