import { useState } from "react";

export default function App() {
  const [result, setResult] = useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Enviando...");
    const formData = new FormData(event.currentTarget);

    // TODO: Substitua pelo seu token real do Web3Forms
    formData.append("access_key", "SEU-TOKEN-AQUI");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Mensagem enviada com sucesso!");
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message || "Ocorreu um erro ao enviar.");
      }
    } catch (error) {
      setResult("Erro de conexão. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white font-sans selection:bg-[#00c2ff] selection:text-black scroll-smooth">
      {/* HEADER / NAV FIXO */}
      <header className="fixed top-0 w-full z-50 bg-[#02060f]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Espaço para sua Logomarca (Imagem enviada) */}
            <span className="text-xl font-light tracking-tighter uppercase">
              Logi
            </span>
            <span className="text-xl font-bold tracking-tighter text-[#00c2ff] uppercase">
              Casa
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] font-medium text-slate-400">
            <a
              href="#inicio"
              className="hover:text-[#00c2ff] transition-colors"
            >
              Início
            </a>
            <a href="#sobre" className="hover:text-[#00c2ff] transition-colors">
              Sobre
            </a>
            <a
              href="#solucoes"
              className="hover:text-[#00c2ff] transition-colors"
            >
              Soluções
            </a>
            <a
              href="#contato"
              className="bg-[#00c2ff]/10 text-[#00c2ff] px-4 py-2 rounded-full border border-[#00c2ff]/20 hover:bg-[#00c2ff] hover:text-black transition-all"
            >
              Orçamento
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center text-center px-6 py-48 relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00c2ff]/10 blur-[120px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-6xl font-light tracking-wide">
          LogiCasa{" "}
          <span className="font-semibold text-[#00c2ff]">
            Automação Inteligente
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-slate-400 text-lg">
          Tecnologia, conforto e sofisticação integrados para residências de
          alto padrão.
        </p>
      </section>

      {/* SOBRE SECTION */}
      <section
        id="sobre"
        className="px-6 py-32 bg-[#050a15] border-y border-white/5"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-300">
          <div>
            <h2 className="text-3xl font-light mb-5 text-white">
              Sobre <span className="text-[#00c2ff] font-semibold">Nós</span>
            </h2>
            <p className="leading-relaxed">
              A LogiCasa nasceu da união entre entusiasmo por tecnologia e
              propósito. Somos dois melhores amigos há 30 anos apaixonados por
              transformar casas em ambientes inteligentes.
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="leading-relaxed border-l border-[#00c2ff]/30 pl-6">
              Nosso compromisso é entregar automação de alto nível, com atenção
              aos detalhes, segurança e conforto.
            </p>
          </div>
        </div>
      </section>

      {/* SOLUÇÕES SECTION */}
      <section id="solucoes" className="px-6 py-32 bg-[#02060f]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-light mb-16">
            Nossas{" "}
            <span className="text-[#00c2ff] font-semibold">Soluções</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                t: "Automação Residencial",
                d: "Iluminação, climatização e cenas inteligentes.",
              },
              {
                t: "Segurança Inteligente",
                d: "Monitoramento remoto e fechaduras digitais.",
              },
              {
                t: "Integrações",
                d: "Sistemas sob medida com Alexa e Apple HomeKit.",
              },
            ].map((s) => (
              <div
                key={s.t}
                className="group bg-[#08101f] border border-white/5 p-8 rounded-2xl hover:border-[#00c2ff]/50 transition-all text-left"
              >
                <div className="w-10 h-1 bg-[#00c2ff] mb-6 group-hover:w-full transition-all"></div>
                <h3 className="text-xl mb-4 font-semibold">{s.t}</h3>
                <p className="text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO SECTION */}
      <section
        id="contato"
        className="px-6 py-32 bg-[#050a15] border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-light mb-6">
              Pronto para o <span className="text-[#00c2ff]">Futuro?</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 italic">
              Desenhamos projetos exclusivos para o seu estilo de vida.
            </p>
            <div className="space-y-4">
              <p className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                E-mail
              </p>
              <p className="text-xl">contato@logicasa.com.br</p>
            </div>
          </div>

          <div className="bg-[#08101f] p-8 rounded-3xl border border-white/5 shadow-2xl">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-[#00c2ff] font-bold tracking-widest">
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-[#02060f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-[#00c2ff] font-bold tracking-widest">
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#02060f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-[#00c2ff] font-bold tracking-widest">
                  Mensagem
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-[#02060f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#00c2ff] text-black font-bold py-4 rounded-xl hover:bg-[#00e0ff] transition-all uppercase text-xs tracking-widest mt-4"
              >
                Enviar Solicitação
              </button>
              {result && (
                <p className="mt-4 text-center text-sm text-[#00c2ff] font-medium">
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-slate-600 text-[10px] uppercase tracking-widest">
        © {new Date().getFullYear()} LogiCasa | Automação Inteligente
      </footer>
    </div>
  );
}
