import { useState, useEffect } from "react";
import logo from "./assets/logo.jpeg";

export default function App() {
  const [result, setResult] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(""); // Novo estado

  // Lógica para detectar a seção visível
  useEffect(() => {
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }, // Ativa quando 60% da seção estiver visível
    );

    navLinks.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observers.observe(el);
    });

    return () => observers.disconnect();
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Enviando...");
    const formData = new FormData(event.currentTarget);

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

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Soluções", href: "#servicos" },
    { name: "Contato", href: "#contato" },
  ];

  return (
    <div className="min-h-screen bg-[#02060f] text-white font-sans selection:bg-[#00c2ff] selection:text-black">
      {/* HEADER PERMANENTE */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#02060f]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO ESQUERDA */}
          <div className="flex items-center">
            <img
              src={logo}
              alt="LogiCasa Logo"
              className="h-8 md:h-20 w-auto"
            />
          </div>

          {/* LINKS DIREITA (DESKTOP) */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#00c2ff]"
                    : "text-slate-400 hover:text-[#00c2ff]"
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contato"
              className={`px-5 py-2 border text-xs uppercase tracking-widest rounded-full transition-all duration-300 ${
                activeSection === "contato"
                  ? "bg-[#00c2ff] text-black border-[#00c2ff]"
                  : "border-[#00c2ff]/30 text-[#00c2ff] hover:bg-[#00c2ff] hover:text-black"
              }`}
            >
              Orçamento
            </a>
          </nav>

          {/* BOTÃO HAMBÚRGUER (MOBILE) */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-[#00c2ff] transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-[#00c2ff] transition-all ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-[#00c2ff] transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* MENU MOBILE OVERLAY */}
        <div
          className={`absolute top-20 left-0 w-full bg-[#050a15] border-b border-white/10 transition-all duration-300 overflow-hidden md:hidden ${isMenuOpen ? "max-h-64" : "max-h-0"}`}
        >
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm uppercase tracking-widest transition-colors ${
                  activeSection === link.href.replace("#", "")
                    ? "text-[#00c2ff]"
                    : "text-slate-300"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 pt-48 relative overflow-hidden">
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

      {/* SOBRE */}
      <section
        id="sobre"
        className="px-6 py-24 bg-[#050a15] border-y border-white/5 scroll-mt-20"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-300">
          <div>
            <h2 className="text-3xl font-light mb-5 text-white italic">
              Sobre{" "}
              <span className="text-[#00c2ff] not-italic font-semibold">
                Nós
              </span>
            </h2>
            <p className="leading-relaxed">
              A LogiCasa nasceu da união entre entusiasmo por tecnologia e
              propósito. Somos dois melhores amigos há 30 anos e nos entendemos
              até sem falar — apaixonados por automação, inovação e pela ideia
              de transformar casas em ambientes inteligentes, funcionais e
              elegantes.
            </p>
          </div>
          <div className="flex flex-col justify-end">
            <p className="leading-relaxed border-l border-[#00c2ff]/30 pl-6">
              Atuamos com foco em soluções personalizadas, entendendo que cada
              residência é única. Nosso compromisso é entregar automação de alto
              nível, com atenção aos detalhes, segurança e conforto.
            </p>
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="px-6 py-24 bg-[#02060f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-light mb-6 text-slate-400 uppercase tracking-[0.2em]">
            Nossa Missão
          </h2>
          <p className="text-white text-2xl md:text-3xl font-light leading-relaxed">
            "Levar a automação residencial a um novo patamar, com soluções{" "}
            <span className="text-[#00c2ff] font-medium">intuitivas</span> que
            elevam a experiência de morar bem."
          </p>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section
        id="servicos"
        className="px-6 py-24 bg-[#050a15] border-y border-white/5 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light mb-12 text-center">
            Nossas{" "}
            <span className="text-[#00c2ff] font-semibold">Soluções</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Automação Residencial",
                desc: "Iluminação, climatização e cenas inteligentes integradas ao seu estilo de vida.",
              },
              {
                title: "Segurança Inteligente",
                desc: "Câmeras, fechaduras digitais e monitoramento remoto com total confiabilidade.",
              },
              {
                title: "Integrações Personalizadas",
                desc: "Integração total com Alexa, Google Home, Apple HomeKit e sistemas sob medida.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group bg-[#08101f] border border-white/5 p-8 rounded-2xl hover:border-[#00c2ff]/50 transition-all duration-500"
              >
                <div className="w-10 h-1 text-[#00c2ff] bg-[#00c2ff] mb-6 group-hover:w-full transition-all duration-500"></div>
                <h3 className="text-xl mb-4 font-semibold">{item.title}</h3>
                <p className="text-slate-400 group-hover:text-slate-200 transition-colors">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className="px-6 py-24 bg-[#02060f] scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="flex flex-col justify-center">
              <h2 className="text-4xl font-light mb-6 text-white">
                Vamos Conversar?
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Pronto para transformar sua casa? Será um prazer desenharmos um
                projeto exclusivo para você.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff]">
                    📱
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      WhatsApp
                    </p>
                    <a
                      href="https://wa.me/5511999999999"
                      className="text-white hover:text-[#00c2ff] transition text-lg"
                    >
                      +55 (11) 99999-9999
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff]">
                    ✉️
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      E-mail
                    </p>
                    <p className="text-white text-lg font-light">
                      contato@logicasa.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff]">
                    📸
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                      Instagram
                    </p>
                    <a
                      href="https://instagram.com/logicasa_automacao"
                      target="_blank"
                      rel="noreferrer"
                      className="text-white hover:text-[#00c2ff] transition text-lg"
                    >
                      @logicasa_automacao
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* FORMULÁRIO */}
            <div className="bg-[#050a15] p-8 rounded-3xl border border-white/5 shadow-2xl relative">
              <form onSubmit={onSubmit} className="space-y-5">
                <input type="hidden" name="from_name" value="Site LogiCasa" />
                <input type="checkbox" name="botcheck" className="hidden" />

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Seu nome"
                    className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
                    E-mail
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="seu@email.com"
                    className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition placeholder:text-slate-700"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    required
                    placeholder="Como podemos ajudar?"
                    className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition resize-none placeholder:text-slate-700"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#00c2ff] text-black font-bold py-4 rounded-xl hover:bg-[#00e0ff] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 uppercase text-xs tracking-widest mt-4 shadow-[0_0_25px_rgba(0,194,255,0.2)]"
                >
                  Enviar Solicitação
                </button>

                {result && (
                  <p className="mt-4 text-center text-sm text-[#00c2ff] font-medium animate-pulse">
                    {result}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 text-center text-slate-600 text-xs border-t border-white/5 bg-[#02060f]">
        © {new Date().getFullYear()}{" "}
        <span className="text-slate-400">LogiCasa</span> | Automação
        Inteligente.
      </footer>
    </div>
  );
}
