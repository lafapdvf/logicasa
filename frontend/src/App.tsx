import { useState, useEffect } from "react";
import { Header } from "./components/sections/Header";
import { About } from "./components/sections/About";
import { Services } from "./components/sections/Services";
import { ContactForm } from "./components/sections/ContactForm";
import smarthome from "./assets/smarthome.webp";

export default function App() {
  const [result, setResult] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [modalContent, setModalContent] = useState<
    "privacidade" | "termos" | null
  >(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("logicasa_cookie_consent");
    if (!consent) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("logicasa_cookie_consent", "true");
    setShowCookieBanner(false);
  };

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
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setResult("Mensagem enviada com sucesso!");
        setIsSubmitted(true);
        window.scrollTo(0, 0); // Sobe a página para o topo
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
      {isSubmitted ? (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#02060f]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00c2ff]/10 blur-[120px] rounded-full -z-10"></div>

          <div className="w-20 h-20 bg-[#00c2ff]/10 border border-[#00c2ff]/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
            <span className="text-4xl">✅</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light mb-6">
            Proposta{" "}
            <span className="text-[#00c2ff] font-semibold">Solicitada!</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
            Obrigado por escolher a <strong>LogiCasa</strong>. Já recebemos seus
            dados e um de nossos especialistas entrará em contato em breve para
            agendar sua visita técnica.
          </p>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-4">
              Enquanto isso, siga-nos
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://instagram.com/logicasa_automacao"
                className="text-white hover:text-[#00c2ff] transition"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/5511999999999"
                className="text-white hover:text-[#00c2ff] transition"
              >
                WhatsApp
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-12 text-slate-500 hover:text-white text-xs uppercase tracking-widest border-b border-slate-800 pb-1"
          >
            Voltar ao site
          </button>
        </section>
      ) : (
        <>
          {/* HEADER */}
          <Header activeSection={activeSection} />

          {/* HERO COM IMAGEM DE FUNDO */}
          <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* Imagem de Fundo Estilizada */}
            <div className="absolute inset-0 z-0">
              <img
                src={smarthome}
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
                Tecnologia, conforto e sofisticação integrados para residências
                de alto padrão.
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

          {/* SOBRE COM FOTOS DOS SÓCIOS */}
          <About />

          {/* MISSÃO */}
          <section className="px-6 py-24 bg-[#02060f]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl font-light mb-6 text-slate-400 uppercase tracking-[0.2em]">
                Nossa Missão
              </h2>
              <p className="text-white text-2xl md:text-4xl font-light leading-relaxed">
                "Difundir e levar a automação residencial a um novo patamar, com
                soluções{" "}
                <span className="text-[#00c2ff] font-medium">intuitivas</span>{" "}
                que elevam a experiência de morar bem."
              </p>
            </div>
          </section>

          {/* SERVIÇOS COM CARDS ILUSTRADOS */}
          <Services />

          {/* CONTATO (SEM ALTERAÇÕES DE LÓGICA OU TEXTO) */}
          <section
            id="contato"
            className="px-6 py-24 bg-[#02060f] scroll-mt-20"
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="flex flex-col justify-center">
                  <h2 className="text-4xl font-light mb-6 text-white">
                    Vamos Conversar?
                  </h2>
                  <p className="text-slate-400 text-lg mb-8">
                    Pronto para transformar sua casa? Será um prazer desenharmos
                    um projeto exclusivo para você.
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

                <ContactForm onSubmit={onSubmit} result={result} />
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
                      formulário (Nome e E-mail) para fins de orçamento e
                      contato comercial.
                    </p>
                    <h3 className="text-white mt-6 mb-2">
                      Tratamento de Dados
                    </h3>
                    <p>
                      Seus dados são armazenados de forma segura e nunca
                      compartilhados com terceiros, em conformidade com a Lei
                      Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                    </p>
                    <h3 className="text-white mt-6 mb-2">Cookies</h3>
                    <p>
                      Utilizamos cookies básicos para melhorar sua experiência
                      de navegação e para métricas de conversão do Google Ads.
                    </p>
                  </div>
                ) : (
                  <div className="prose prose-invert max-w-none text-slate-400">
                    <h2 className="text-[#00c2ff] text-2xl mb-6">
                      Termos de Uso
                    </h2>
                    <p>
                      Ao navegar neste site, você concorda com os termos aqui
                      estabelecidos.
                    </p>
                    <h3 className="text-white mt-6 mb-2">Uso de Conteúdo</h3>
                    <p>
                      Todo o material textual e visual é de propriedade da
                      LogiCasa. A reprodução não autorizada é proibida.
                    </p>
                    <h3 className="text-white mt-6 mb-2">Responsabilidade</h3>
                    <p>
                      As informações contidas são para fins informativos.
                      Projetos de automação dependem de avaliação técnica
                      específica no local.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* BANNER DE COOKIES */}
          {showCookieBanner && (
            <div className="fixed bottom-6 left-6 right-6 z-[60] animate-fade-in-up">
              <div className="max-w-4xl mx-auto bg-[#08101f]/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h4 className="text-[#00c2ff] text-sm font-bold uppercase tracking-widest mb-2">
                    Privacidade & Cookies
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Utilizamos cookies para personalizar sua experiência e
                    analisar nosso tráfego conforme nossa{" "}
                    <button
                      onClick={() => setModalContent("privacidade")}
                      className="text-white underline hover:text-[#00c2ff]"
                    >
                      Política de Privacidade
                    </button>
                    .
                  </p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                  <button
                    onClick={acceptCookies}
                    className="flex-1 md:flex-none px-8 py-3 bg-[#00c2ff] text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300"
                  >
                    Aceitar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
