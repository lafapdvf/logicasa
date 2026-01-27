export default function App() {
  return (
    <div className="min-h-screen font-sans">
      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-4xl md:text-6xl font-light tracking-wide">
          LogiCasa <span className="font-semibold">Automação Inteligente</span>
        </h1>
        <p className="mt-6 max-w-2xl text-neutral-400 text-lg">
          Tecnologia, conforto e sofisticação integrados para residências de
          alto padrão.
        </p>
      </section>

      {/* SOBRE */}
      <section className="px-6 py-24 bg-neutral-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-light mb-6">Sobre Nós</h2>
            <p className="text-neutral-400 leading-relaxed">
              A LogiCasa nasceu da união entre tecnologia e propósito. Somos
              dois amigos e sócios — apaixonados por automação, inovação e pela
              ideia de transformar casas em ambientes inteligentes, funcionais e
              elegantes.
            </p>
          </div>
          <div className="text-neutral-400 leading-relaxed">
            Atuamos com foco em soluções personalizadas, entendendo que cada
            residência é única. Nosso compromisso é entregar automação de alto
            nível, com atenção aos detalhes, segurança e conforto.
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-6">Nossa Missão</h2>
          <p className="text-neutral-400 text-lg leading-relaxed">
            Levar automação residencial inteligente a um novo patamar,
            oferecendo soluções confiáveis, sofisticadas e intuitivas que elevam
            a experiência de morar bem.
          </p>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="px-6 py-24 bg-neutral-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">Serviços</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Automação Residencial",
                desc: "Iluminação, climatização, cortinas e cenas inteligentes integradas ao seu estilo de vida.",
              },
              {
                title: "Segurança Inteligente",
                desc: "Câmeras, sensores, fechaduras digitais e monitoramento remoto com total confiabilidade.",
              },
              {
                title: "Integrações Personalizadas",
                desc: "Integração com Alexa, Google Home, Apple HomeKit e sistemas sob medida.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-neutral-800 p-8 rounded-xl hover:border-neutral-600 transition"
              >
                <h3 className="text-xl mb-4">{item.title}</h3>
                <p className="text-neutral-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-neutral-600 text-sm border-t border-neutral-800">
        © {new Date().getFullYear()} LogiCasa Automação Inteligente. Todos os
        direitos reservados.
      </footer>
    </div>
  );
}
