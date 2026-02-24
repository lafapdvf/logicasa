interface ContactFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  result: string;
}

export function ContactForm({ onSubmit, result }: ContactFormProps) {
  return (
    <div className="bg-[#050a15] p-8 rounded-3xl border border-white/5 shadow-2xl relative group">
      {/* Detalhe de luz sutil no canto do formulário para dar profundidade */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00c2ff]/5 blur-[80px] rounded-full pointer-events-none"></div>

      <form onSubmit={onSubmit} className="space-y-5 relative z-10">
        <input type="hidden" name="from_name" value="Site LogiCasa" />
        <input type="checkbox" name="botcheck" className="hidden" />

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Ex: Enrico Palazzo"
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 placeholder:text-slate-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="seu@email.com.br"
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 placeholder:text-slate-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            Telefone / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="(11) 91234-5678"
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 placeholder:text-slate-600"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            Mensagem
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Descreva brevemente seu projeto ou dúvida..."
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 resize-none placeholder:text-slate-600"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00c2ff] text-black font-black py-4 rounded-xl hover:bg-[#00e0ff] hover:scale-[1.01] active:scale-[0.98] transition-all duration-500 uppercase text-xs tracking-[0.2em] mt-4 shadow-[0_0_20px_rgba(0,194,255,0.15)] hover:shadow-[#00c2ff]/40"
        >
          Enviar Solicitação
        </button>

        {result && (
          <div className="mt-4 p-4 rounded-xl bg-[#00c2ff]/5 border border-[#00c2ff]/20 animate-in fade-in slide-in-from-top-2 duration-500">
            <p className="text-center text-sm text-[#00c2ff] font-medium tracking-wide">
              {result}
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
