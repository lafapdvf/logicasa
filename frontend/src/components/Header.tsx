import { useState, useEffect } from "react";
import logicasa from "../assets/logicasa.png";

interface HeaderProps {
  activeSection: string;
}

export function Header({ activeSection: initialActiveSection }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(initialActiveSection);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: "Soluções", id: "solucoes" },
    { name: "Sobre", id: "sobre" },
    { name: "Contato", id: "contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(
        "",
        document.title,
        window.location.pathname + window.location.search,
      );
    }
    closeMenu();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState(
      "",
      document.title,
      window.location.pathname + window.location.search,
    );
    closeMenu();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (id: string) => id === currentSection;

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] md:hidden transition-opacity duration-500"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out
          ${
            isScrolled
              ? "bg-[#02060f]/40 backdrop-blur-md border-b border-white/5 h-20"
              : "bg-transparent h-24 border-b border-transparent"
          } 
        `}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div
            className={`flex items-center cursor-pointer transition-all duration-700 ${
              !isScrolled
                ? "opacity-30 scale-90 grayscale blur-[1px]"
                : "opacity-100 scale-100 blur-0"
            }`}
            onClick={scrollToTop}
            role="button"
            aria-label="Voltar ao topo da página LogiCasa"
          >
            <img
              src={logicasa}
              alt="LogiCasa - Automação Residencial e Casa Inteligente"
              className="h-8 md:h-12 w-auto active:scale-95 transition-transform"
            />
          </div>

          {/* Navegação Principal Otimizada */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`text-[11px] uppercase tracking-[0.25em] transition-all duration-500 font-medium ${
                      isActive(link.id)
                        ? "text-[#00c2ff] drop-shadow-[0_0_8px_rgba(0,194,255,0.5)]"
                        : `${isScrolled ? "text-slate-200" : "text-slate-400"} hover:text-[#00c2ff]`
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`md:hidden p-2 z-[110] transition-colors ${isScrolled ? "text-[#00c2ff]" : "text-slate-400"}`}
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu de navegação"}
          >
            <div
              className="w-6 h-5 relative flex flex-col justify-between"
              aria-hidden="true"
            >
              <span
                className={`w-full h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`w-full h-0.5 bg-current transition-all duration-500 ${isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Menu Mobile Otimizado */}
        <div
          className={`fixed inset-x-0 top-0 bg-[#02060f]/95 backdrop-blur-3xl transition-all duration-700 ease-in-out md:hidden overflow-hidden ${
            isMenuOpen
              ? "h-screen opacity-100 py-32"
              : "h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="h-full">
            <ul className="flex flex-col items-center gap-12">
              {navLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    style={{
                      transitionDelay: isMenuOpen
                        ? `${(index + 1) * 70}ms`
                        : "0ms",
                    }}
                    className={`text-2xl uppercase tracking-[0.4em] transition-all duration-500 ${
                      isActive(link.id)
                        ? "text-[#00c2ff] font-bold"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
