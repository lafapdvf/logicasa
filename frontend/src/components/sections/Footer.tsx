import { useState, useEffect } from "react";

export function Footer() {
  const [modalContent, setModalContent] = useState<
    "privacidade" | "termos" | null
  >(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // Verifica o consentimento de cookies
    const consent = localStorage.getItem("logicasa_cookie_consent");
    if (!consent) {
      setShowCookieBanner(true);
    }

    // Lógica para mostrar o botão flutuante apenas após um certo scroll
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("logicasa_cookie_consent", "true");
    setShowCookieBanner(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="px-6 py-12 bg-[#02060f] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-600 text-xs text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-400">LogiCasa</span> | Automação
            Inteligente. - Todos os direitos reservados.
            <p className="mt-1">CNPJ: 00.000.000/0001-00</p>
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

      {/* BOTÃO FLUTUANTE VOLTAR AO TOPO */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[120] p-4 bg-[#00c2ff] text-black rounded-full shadow-2xl transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 flex items-center justify-center ${
          showScrollButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>

      {/* MODAL LGPD */}
      {modalContent && (
        <div className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#050a15] border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-2xl"
            >
              ✕
            </button>

            {modalContent === "privacidade" ? (
              <div className="prose prose-invert max-w-none text-slate-400">
                <h2 className="text-[#00c2ff] text-2xl mb-6 font-light">
                  Política de Privacidade
                </h2>
                <p>
                  A <strong>LogiCasa</strong> valoriza sua privacidade.
                  Coletamos apenas os dados fornecidos voluntariamente para fins
                  de contato comercial.
                </p>
                <h3 className="text-white mt-6 mb-2">Tratamento de Dados</h3>
                <p>
                  Seus dados são tratados conforme a LGPD (Lei nº 13.709/2018) e
                  nunca compartilhados com terceiros.
                </p>
              </div>
            ) : (
              <div className="prose prose-invert max-w-none text-slate-400">
                <h2 className="text-[#00c2ff] text-2xl mb-6 font-light">
                  Termos de Uso
                </h2>
                <p>
                  Ao navegar neste site, você concorda com os termos aqui
                  estabelecidos. Todo o conteúdo visual é de propriedade da
                  LogiCasa.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* BANNER DE COOKIES */}
      {showCookieBanner && (
        <div className="fixed bottom-6 left-6 right-6 z-[100] animate-fade-in-up">
          <div className="max-w-4xl mx-auto bg-[#08101f]/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-[#00c2ff] text-sm font-bold uppercase tracking-widest mb-2">
                Privacidade & Cookies
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizamos cookies para personalizar sua experiência conforme
                nossa{" "}
                <button
                  onClick={() => setModalContent("privacidade")}
                  className="text-white underline hover:text-[#00c2ff]"
                >
                  Política de Privacidade
                </button>
                .
              </p>
            </div>
            <button
              onClick={acceptCookies}
              className="px-8 py-3 bg-[#00c2ff] text-black text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-300"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
