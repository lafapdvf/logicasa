import { useState } from "react";
import logicasa from "../assets/logicasa.png";

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Sobre", href: "#sobre" },
    { name: "Soluções", href: "#servicos" },
    { name: "Contato", href: "#contato" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Função auxiliar para normalizar e comparar as seções
  const isActive = (href: string) => {
    const sectionId = href.replace("#", "");
    return activeSection === sectionId;
  };

  return (
    <>
      {/* OVERLAY: Fundo escurecido suave */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[90] md:hidden transition-opacity duration-500"
          onClick={closeMenu}
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#02060f]/95 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center">
            <img
              src={logicasa}
              alt="LogiCasa Logo"
              className="h-8 md:h-14 w-auto"
            />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-xs uppercase tracking-[0.2em] transition-colors font-medium ${
                  isActive(link.href)
                    ? "text-[#00c2ff]"
                    : "text-slate-400 hover:text-[#00c2ff]"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className="md:hidden text-[#00c2ff] p-2 z-[110]"
            onClick={toggleMenu}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <div
          className={`fixed inset-x-0 top-[80px] bg-[#02060f]/70 backdrop-blur-2xl border-b border-white/10 transition-all duration-500 ease-in-out md:hidden overflow-hidden ${
            isMenuOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col items-center justify-start py-12 gap-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                style={{
                  transitionDelay: isMenuOpen
                    ? `${(index + 1) * 100}ms`
                    : "0ms",
                }}
                className={`text-xl uppercase tracking-[0.3em] transition-all duration-500 transform ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                } ${
                  isActive(link.href)
                    ? "text-[#00c2ff] font-bold"
                    : "text-white/80"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
