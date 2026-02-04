import { useState, useEffect } from "react";
import { ChevronUp, X } from "lucide-react"; // Aproveitando que já instalamos o lucide

export function Footer() {
  const [modalContent, setModalContent] = useState<
    "privacidade" | "termos" | null
  >(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("logicasa_cookie_consent");
    if (!consent) setShowCookieBanner(true);

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
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
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* LOGO E INFOS */}
          <div className="text-slate-600 text-[11px] text-center md:text-left leading-relaxed">
            <p className="mb-1 uppercase tracking-widest font-semibold text-slate-400">
              © {new Date().getFullYear()} LogiCasa
            </p>
            <p>Automação Inteligente. Todos os direitos reservados.</p>
            <p className="opacity-50 mt-1">CNPJ: 00.000.000/0001-00</p>
          </div>

          {/* LINKS LEGAIS */}
          <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-bold">
            <button
              onClick={() => setModalContent("privacidade")}
              className="text-slate-500 hover:text-[#00c2ff] transition-colors duration-300"
            >
              Privacidade
            </button>
            <button
              onClick={() => setModalContent("termos")}
              className="text-slate-500 hover:text-[#00c2ff] transition-colors duration-300"
            >
              Termos de Uso
            </button>
          </div>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE VOLTAR AO TOPO (Efeito ContactForm) */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-[120] p-4 bg-[#00c2ff] text-black rounded-full shadow-[0_0_20px_rgba(0,194,255,0.2)] transition-all duration-500 hover:bg-[#00e0ff] hover:scale-110 hover:shadow-[#00c2ff]/50 active:scale-95 flex items-center justify-center ${
          showScrollButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ChevronUp size={24} strokeWidth={3} />
      </button>

      {/* MODAL LGPD */}
      {modalContent && (
        <div className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#050a15] border border-white/10 w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative shadow-2xl">
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-6 right-6 text-slate-500 hover:text-[#00c2ff] transition-colors"
            >
              <X size={24} />
            </button>

            <div className="prose prose-invert max-w-none">
              {modalContent === "privacidade" ? (
                <>
                  <h2 className="text-[#00c2ff] text-2xl mb-6 font-light italic">
                    Política de{" "}
                    <span className="not-italic font-semibold">
                      Privacidade
                    </span>
                  </h2>
                  <p className="text-slate-400 leading-relaxed">
                    A LogiCasa valoriza sua privacidade. Coletamos apenas os
                    dados fornecidos voluntariamente para fins de contato
                    comercial através da nossa seção de atendimento.
                  </p>
                  <h3 className="text-white mt-8 mb-3 text-sm uppercase tracking-widest">
                    Tratamento de Dados
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    Seus dados são tratados estritamente conforme a LGPD (Lei nº
                    13.709/2018). Não compartilhamos informações com terceiros
                    ou as utilizamos para fins de spam.
                  </p>
                </>
              ) : (
                <>
                  <h2 className="text-[#00c2ff] text-2xl mb-6 font-light italic">
                    Termos de{" "}
                    <span className="not-italic font-semibold">Uso</span>
                  </h2>
                  <p className="text-slate-400 leading-relaxed">
                    Todo o conteúdo visual, marcas e projetos apresentados neste
                    site são de propriedade intelectual da LogiCasa ou de seus
                    parceiros. A reprodução sem autorização é proibida.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BANNER DE COOKIES */}
      {showCookieBanner && (
        <div className="fixed bottom-6 left-6 right-6 z-[100] animate-in slide-in-from-bottom-10 duration-700">
          <div className="max-w-4xl mx-auto bg-[#08101f]/95 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h4 className="text-[#00c2ff] text-xs font-black uppercase tracking-[0.2em] mb-2">
                Privacidade & Cookies
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Utilizamos cookies para otimizar sua experiência conforme nossa{" "}
                <button
                  onClick={() => setModalContent("privacidade")}
                  className="text-white border-b border-white/30 hover:text-[#00c2ff] hover:border-[#00c2ff] transition-all"
                >
                  Política de Privacidade
                </button>
                .
              </p>
            </div>
            <button
              onClick={acceptCookies}
              className="w-full md:w-auto px-10 py-3 bg-[#00c2ff] text-black text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-[#00e0ff] hover:scale-[1.05] transition-all duration-300 shadow-lg shadow-[#00c2ff]/20"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
