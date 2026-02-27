import { ContactForm } from "./../ContactForm";
import { Mail, Instagram, MessageCircle } from "lucide-react";

interface ContactSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  result: string;
}

export function Contact({ onSubmit, result }: ContactSectionProps) {
  return (
    <section
      id="contato"
      className="px-6 py-24 bg-[#02060f]"
      aria-labelledby="contact-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            {/* H2 com ID para acessibilidade */}
            <h2
              id="contact-title"
              className="text-4xl font-light mb-6 text-white italic"
            >
              Vamos{" "}
              <span className="text-[#00c2ff] not-italic font-semibold">
                Conversar?
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-2">
              Pronto para transformar sua casa? Será um prazer desenvolvermos
              uma solução exclusiva para você.
            </p>
            <p className="text-slate-400 text-lg mb-2">
              Entre em contato através de um dos nossos canais ou preencha o
              formulário ao lado. Estamos ansiosos para ouvir suas ideias!
            </p>
            <p className="text-slate-400 text-lg mb-8">
              Atendemos principalmente na **Grande São Paulo**, mas estamos
              abertos a projetos em outras regiões.
            </p>

            {/* address: Tag semântica para informações de contato de uma empresa */}
            <address className="space-y-8 not-italic">
              {/* WHATSAPP */}
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff] group-hover:bg-[#00c2ff]/20 group-hover:border-[#00c2ff]/40 transition-all duration-300">
                  <MessageCircle size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    className="text-white hover:text-[#00c2ff] transition-colors text-lg font-light"
                  >
                    +55 (11) 99999-9999
                  </a>
                </div>
              </div>

              {/* E-MAIL */}
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff] group-hover:bg-[#00c2ff]/20 group-hover:border-[#00c2ff]/40 transition-all duration-300">
                  <Mail size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                    E-mail
                  </p>
                  <a
                    href="mailto:contato@logicasa.com.br"
                    className="text-white hover:text-[#00c2ff] transition-colors text-lg font-light"
                  >
                    contato@logicasa.com.br
                  </a>
                </div>
              </div>

              {/* INSTAGRAM */}
              <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff] group-hover:bg-[#00c2ff]/20 group-hover:border-[#00c2ff]/40 transition-all duration-300">
                  <Instagram size={20} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/logicasa_automacao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#00c2ff] transition-colors text-lg font-light"
                  >
                    @logicasa_automacao
                  </a>
                </div>
              </div>
            </address>
          </div>

          <ContactForm onSubmit={onSubmit} result={result} />
        </div>
      </div>
    </section>
  );
}
