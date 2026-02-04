import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Mission } from "./components/sections/Mission";
import { Services } from "./components/sections/Services";
import { Contact } from "./components/sections/Contact";
import { Footer } from "./components/sections/Footer";
import { SuccessScreen } from "./components/sections/SuccessScreen";

export default function App() {
  const [result, setResult] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Lógica de Scroll Spy (Intersection Observer)
  useEffect(() => {
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Enviando...");
    // ... sua lógica de fetch do Web3Forms aqui ...
    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white font-sans selection:bg-[#00c2ff] selection:text-black">
      {isSubmitted ? (
        <SuccessScreen onBack={() => setIsSubmitted(false)} />
      ) : (
        <>
          <Header activeSection={activeSection} />
          <main>
            <Hero />
            <About />
            <Mission />
            <Services />
            <Contact onSubmit={onSubmit} result={result} />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
