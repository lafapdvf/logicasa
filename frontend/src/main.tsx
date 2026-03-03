import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Carregamento dinâmico e atrasado do GTM para não travar o Main Thread
const initializeGTM = async () => {
  const gtmId = import.meta.env.VITE_GTM_ID;

  if (!gtmId) return;

  try {
    // Importa a biblioteca apenas quando necessário
    const TagManager = (await import("react-gtm-module")).default;

    const tagManagerArgs = {
      gtmId: gtmId,
    };

    // Aguarda o navegador ficar ocioso ou um tempo mínimo de 3.5 segundos
    // Isso garante que o LCP e o TBT inicial não sejam prejudicados
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(
        () => {
          TagManager.initialize(tagManagerArgs);
        },
        { timeout: 4000 },
      );
    } else {
      setTimeout(() => {
        TagManager.initialize(tagManagerArgs);
      }, 3500);
    }
  } catch (error) {
    console.error("Erro ao carregar o GTM:", error);
  }
};

// Dispara a inicialização sem bloquear o render do React
initializeGTM();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
