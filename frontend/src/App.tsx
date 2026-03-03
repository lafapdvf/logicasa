import {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/sections/Hero";

// Lazy imports mantidos para code-splitting
const Experience = lazy(() =>
  import("./components/sections/Experience").then((m) => ({
    default: m.Experience,
  })),
);
const Solutions = lazy(() =>
  import("./components/sections/Solutions").then((m) => ({
    default: m.Solutions,
  })),
);
const Mission = lazy(() =>
  import("./components/sections/Mission").then((m) => ({ default: m.Mission })),
);
const About = lazy(() =>
  import("./components/sections/About").then((m) => ({ default: m.About })),
);
const Contact = lazy(() =>
  import("./components/sections/Contact").then((m) => ({ default: m.Contact })),
);
const Footer = lazy(() =>
  import("./components/sections/Footer").then((m) => ({ default: m.Footer })),
);
const SuccessScreen = lazy(() =>
  import("./components/sections/SuccessScreen").then((m) => ({
    default: m.SuccessScreen,
  })),
);
const NotFound = lazy(() =>
  import("./components/sections/NotFound").then((m) => ({
    default: m.NotFound,
  })),
);

export default function App() {
  const [result, setResult] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  // 1. Memoriza a lista de IDs para evitar recriação do array em cada render
  const sections = useMemo(
    () => ["solucoes", "sobre", "contato", "experiencia"],
    [],
  );

  useEffect(() => {
    if (window.location.pathname !== "/" && window.location.pathname !== "") {
      setIsNotFound(true);
      return;
    }

    const setupObserver = () => {
      const observers = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection((prev) =>
                prev !== entry.target.id ? entry.target.id : prev,
              );
            }
          });
        },
        { threshold: 0.2, rootMargin: "-10% 0px -70% 0px" },
      );

      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observers.observe(el);
      });

      return observers;
    };

    let observers: IntersectionObserver;

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        observers = setupObserver();
      });
    } else {
      setTimeout(() => {
        observers = setupObserver();
      }, 2000);
    }

    return () => observers?.disconnect();
  }, [sections]); // Agora depende de uma referência estável via useMemo

  const onSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setResult("Enviando...");
      const formData = new FormData(event.currentTarget);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setResult("Mensagem enviada com sucesso!");
          setIsSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          setResult(data.message || "Erro ao enviar formulário.");
        }
      } catch (error) {
        setResult("Erro de conexão.");
      }
    },
    [],
  );

  const handleBackToHome = useCallback(() => {
    window.history.pushState({}, "", "/");
    setIsNotFound(false);
    setIsSubmitted(false);
    setResult("");
  }, []);

  return (
    <div className="min-h-screen bg-[#02060f] text-white font-sans selection:bg-[#00c2ff] selection:text-black antialiased">
      {isNotFound ? (
        <Suspense fallback={null}>
          <NotFound onBack={handleBackToHome} />
        </Suspense>
      ) : isSubmitted ? (
        <Suspense fallback={null}>
          <SuccessScreen onBack={handleBackToHome} />
        </Suspense>
      ) : (
        <>
          <Header activeSection={activeSection} />
          <main>
            <Hero />
            <Suspense fallback={<div className="h-screen bg-[#02060f]" />}>
              <Experience />
              <Solutions />
              <Mission />
              <About />
              <Contact onSubmit={onSubmit} result={result} />
              <Footer />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
}
