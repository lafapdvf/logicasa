import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/sections/Hero";
import { Services } from "./components/sections/Services";
import { Mission } from "./components/sections/Mission";
import { About } from "./components/sections/About";
import { InstagramFeed } from "./components/sections/InstagramFeed";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { SuccessScreen } from "./components/sections/SuccessScreen";
import { NotFound } from "./components/sections/NotFound";

export default function App() {
  const [result, setResult] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  // Lógica de Detecção de Rota e Scroll Spy
  useEffect(() => {
    if (window.location.pathname !== "/" && window.location.pathname !== "") {
      setIsNotFound(true);
    }

    const sections = ["sobre", "servicos", "contato"];
    const observers = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.6 },
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observers.observe(el);
    });

    return () => observers.disconnect();
  }, []);

  // FUNÇÃO DE SUBMISSÃO ATUALIZADA
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Enviando...");

    // Captura os dados do formulário (incluindo a access_key que está no ContactForm)
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
        window.scrollTo(0, 0);
      } else {
        // Caso a chave esteja errada ou a API retorne erro
        setResult(data.message || "Erro ao enviar formulário.");
        console.error("Erro Web3Forms:", data);
      }
    } catch (error) {
      setResult("Erro de conexão. Verifique sua internet.");
      console.error("Erro na requisição:", error);
    }
  };

  const handleBackToHome = () => {
    window.history.pushState({}, "", "/");
    setIsNotFound(false);
    setIsSubmitted(false);
    setResult(""); // Limpa o status para um novo envio
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white font-sans selection:bg-[#00c2ff] selection:text-black">
      {isNotFound ? (
        <NotFound onBack={handleBackToHome} />
      ) : isSubmitted ? (
        <SuccessScreen onBack={handleBackToHome} />
      ) : (
        <>
          <Header activeSection={activeSection} />
          <main>
            <Hero />
            <Services />
            <Mission />
            <About />
            <InstagramFeed />
            <Contact onSubmit={onSubmit} result={result} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
