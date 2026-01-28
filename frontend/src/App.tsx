import { useState, useEffect } from "react";
import logicasa from "./assets/logicasa.png";

export default function App() {
  const [result, setResult] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [modalContent, setModalContent] = useState<
    "privacidade" | "termos" | null
  >(null);

  useEffect(() => {
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
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
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#02060f]/90 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logicasa}
              alt="LogiCasa Logo"
              className="h-8 md:h-14 w-auto"
            />
          </div>

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
      </header>

      {/* HERO COM IMAGEM DE FUNDO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        {/* Imagem de Fundo Estilizada */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=2000"
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

      {/* SOBRE COM IMAGEM LATERAL */}
      <section
        id="sobre"
        className="px-6 py-32 bg-[#050a15] border-y border-white/5 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#00c2ff]/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1000"
              alt="Design de interior moderno"
              className="relative rounded-2xl grayscale hover:grayscale-0 transition duration-700 object-cover h-[500px] w-full shadow-2xl"
            />
          </div>
          <div className="text-slate-300">
            <h2 className="text-4xl font-light mb-8 text-white italic">
              Sobre{" "}
              <span className="text-[#00c2ff] not-italic font-semibold">
                Nós
              </span>
            </h2>
            <p className="leading-relaxed text-lg mb-6">
              A LogiCasa nasceu da união entre entusiasmo por tecnologia e
              propósito. Somos dois amigos entrosados há 3 décadas e que se
              realizam com a automação, inovação e com a ideia de transformar
              casas em ambientes inteligentes, funcionais e elegantes.
            </p>
            <p className="leading-relaxed border-l-2 border-[#00c2ff] pl-6 py-2 italic text-slate-400">
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
          <p className="text-white text-2xl md:text-4xl font-light leading-relaxed">
            "Difundir e levar a automação residencial a um novo patamar, com
            soluções{" "}
            <span className="text-[#00c2ff] font-medium">intuitivas</span> que
            elevam a experiência de morar bem."
          </p>
        </div>
      </section>

      {/* SERVIÇOS COM CARDS ILUSTRADOS */}
      <section
        id="servicos"
        className="px-6 py-32 bg-[#050a15] border-y border-white/5 scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light mb-16 text-center">
            Nossas{" "}
            <span className="text-[#00c2ff] font-semibold">Soluções</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Automação Residencial",
                desc: "Iluminação, climatização e cenas inteligentes integradas ao seu estilo de vida.",
                img: "https://images.unsplash.com/photo-1666401565408-9b6b0741f0d6?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Segurança Inteligente",
                desc: "Câmeras, fechaduras digitais e monitoramento remoto com total confiabilidade.",
                img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
              },
              {
                title: "Integrações Personalizadas",
                desc: "Integração total com Alexa, Google Home, Apple HomeKit e sistemas sob medida.",
                img: "https://www.deltalinkit.com/wp-content/uploads/2023/07/%D8%A8%D8%A7%D8%B1%D8%B2%D8%A9-1536x975.jpg?v=1713965881&auto=format&fit=crop&q=80&w=1000",
              },
            ].map((item) => (
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

      {/* CONTATO (SEM ALTERAÇÕES DE LÓGICA OU TEXTO) */}
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

            <div className="bg-[#050a15] p-8 rounded-3xl border border-white/5 shadow-2xl relative">
              <form onSubmit={onSubmit} className="space-y-5">
                <input type="hidden" name="from_name" value="Site LogiCasa" />
                <input type="checkbox" name="botcheck" className="hidden" />
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
                    Nome Completo
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
      <footer className="px-6 py-12 bg-[#02060f] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-400">LogiCasa</span> | Automação
            Inteligente. - Todos os direitos reservados.
            <p className="mt-1">CNPJ: 00.000.000/0001-00</p>{" "}
            {/* Importante para Google Ads */}
          </div>

          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-medium">
            <button
              onClick={() => setModalContent("privacidade")}
              className="text-slate-500 hover:text-[#00c2ff] transition"
            >
              Privacidade
            </button>
            <button
              onClick={() => setModalContent("termos")}
              className="text-slate-500 hover:text-[#00c2ff] transition"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </footer>

      {/* MODAL LGPD */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#050a15] border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-2xl"
            >
              ✕
            </button>

            {modalContent === "privacidade" ? (
              <div className="prose prose-invert max-w-none text-slate-400">
                <h2 className="text-[#00c2ff] text-2xl mb-6">
                  Política de Privacidade
                </h2>
                <p>
                  A <strong>LogiCasa</strong> valoriza sua privacidade.
                  Coletamos apenas os dados fornecidos voluntariamente no
                  formulário (Nome e E-mail) para fins de orçamento e contato
                  comercial.
                </p>
                <h3 className="text-white mt-6 mb-2">Tratamento de Dados</h3>
                <p>
                  Seus dados são armazenados de forma segura e nunca
                  compartilhados com terceiros, em conformidade com a Lei Geral
                  de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
                <h3 className="text-white mt-6 mb-2">Cookies</h3>
                <p>
                  Utilizamos cookies básicos para melhorar sua experiência de
                  navegação e para métricas de conversão do Google Ads.
                </p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-slate-400">
                <h2 className="text-[#00c2ff] text-2xl mb-6">Termos de Uso</h2>
                <p>
                  Ao navegar neste site, você concorda com os termos aqui
                  estabelecidos.
                </p>
                <h3 className="text-white mt-6 mb-2">Uso de Conteúdo</h3>
                <p>
                  Todo o material textual e visual é de propriedade da LogiCasa.
                  A reprodução não autorizada é proibida.
                </p>
                <h3 className="text-white mt-6 mb-2">Responsabilidade</h3>
                <p>
                  As informações contidas são para fins informativos. Projetos
                  de automação dependem de avaliação técnica específica no
                  local.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
