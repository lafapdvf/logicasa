interface ContactFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  result: string;
}

export function ContactForm({ onSubmit, result }: ContactFormProps) {
  return (
    <div className="bg-[#050a15] p-8 rounded-3xl border border-white/5 shadow-2xl relative">
      <form onSubmit={onSubmit} className="space-y-5">
        <input type="hidden" name="from_name" value="Site LogiCasa" />
        <input type="checkbox" name="botcheck" className="hidden" />

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="Seu nome"
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition placeholder:text-slate-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="seu@email.com"
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition placeholder:text-slate-700"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold">
            Mensagem
          </label>
          <textarea
            name="message"
            rows={4}
            required
            placeholder="Como podemos ajudar?"
            className="w-full bg-[#08101f] border border-white/10 text-white rounded-xl p-4 outline-none focus:border-[#00c2ff] transition resize-none placeholder:text-slate-700"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#00c2ff] text-black font-bold py-4 rounded-xl hover:bg-[#00e0ff] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 uppercase text-xs tracking-widest mt-4 shadow-[0_0_25px_rgba(0,194,255,0.2)]"
        >
          Enviar Solicitação
        </button>

        {result && (
          <p className="mt-4 text-center text-sm text-[#00c2ff] font-medium animate-pulse">
            {result}
          </p>
        )}
      </form>
    </div>
  );
}
