import { ContactForm } from "./../ContactForm";

interface ContactSectionProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  result: string;
}

export function Contact({ onSubmit, result }: ContactSectionProps) {
  return (
    <section id="contato" className="px-6 py-24 bg-[#02060f] scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-light mb-6 text-white">
              Vamos Conversar?
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Pronto para transformar sua casa? Será um prazer desenharmos um
              projeto exclusivo para você.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff]">
                  📱
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    WhatsApp
                  </p>
                  <a
                    href="https://wa.me/5511999999999"
                    className="text-white hover:text-[#00c2ff] transition text-lg"
                  >
                    +55 (11) 99999-9999
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff]">
                  ✉️
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    E-mail
                  </p>
                  <p className="text-white text-lg font-light">
                    contato@logicasa.com.br
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-[#00c2ff]/10 flex items-center justify-center border border-[#00c2ff]/20 text-[#00c2ff]">
                  📸
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                    Instagram
                  </p>
                  <a
                    href="https://instagram.com/logicasa_automacao"
                    target="_blank"
                    rel="noreferrer"
                    className="text-white hover:text-[#00c2ff] transition text-lg"
                  >
                    @logicasa_automacao
                  </a>
                </div>
              </div>
            </div>
          </div>

          <ContactForm onSubmit={onSubmit} result={result} />
        </div>
      </div>
    </section>
  );
}
