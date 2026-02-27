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
    { name: "Soluções", href: "#solucoes" },
    { name: "Sobre", href: "#sobre" },
    { name: "Contato", href: "#contato" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Ativa o efeito sutil logo no início do scroll
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
      const element = document.querySelector(link.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMenu();
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isActive = (href: string) => href.replace("#", "") === currentSection;

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] md:hidden transition-opacity duration-500"
          onClick={closeMenu}
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
          {/* LOGO - Agora com transição de opacidade mais suave */}
          <div
            className={`flex items-center cursor-pointer transition-all duration-700 ${
              !isScrolled
                ? "opacity-30 scale-90 grayscale blur-[1px]"
                : "opacity-100 scale-100 blur-0"
            }`}
            onClick={scrollToTop}
          >
            <img
              src={logicasa}
              alt="LogiCasa Logo"
              className="h-8 md:h-12 w-auto active:scale-95 transition-transform"
            />
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[11px] uppercase tracking-[0.25em] transition-all duration-500 font-medium ${
                  isActive(link.href)
                    ? "text-[#00c2ff] drop-shadow-[0_0_8px_rgba(0,194,255,0.5)]"
                    : `${isScrolled ? "text-slate-200" : "text-slate-400"} hover:text-[#00c2ff]`
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* MOBILE TOGGLE BUTTON */}
          <button
            className={`md:hidden p-2 z-[110] transition-colors ${isScrolled ? "text-[#00c2ff]" : "text-slate-400"}`}
            onClick={toggleMenu}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
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

        {/* MOBILE MENU OVERLAY - Super escuro para dar contraste */}
        <div
          className={`fixed inset-x-0 top-0 bg-[#02060f]/95 backdrop-blur-3xl transition-all duration-700 ease-in-out md:hidden overflow-hidden ${
            isMenuOpen ? "h-screen opacity-100 py-32" : "h-0 opacity-0"
          }`}
        >
          <nav className="flex flex-col items-center gap-12">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={closeMenu}
                style={{
                  transitionDelay: isMenuOpen ? `${(index + 1) * 70}ms` : "0ms",
                }}
                className={`text-2xl uppercase tracking-[0.4em] transition-all duration-500 ${
                  isActive(link.href)
                    ? "text-[#00c2ff] font-bold"
                    : "text-white/60 hover:text-white"
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
