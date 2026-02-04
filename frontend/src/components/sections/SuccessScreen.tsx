interface SuccessScreenProps {
  onBack: () => void;
}

export function SuccessScreen({ onBack }: SuccessScreenProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#02060f] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00c2ff]/10 blur-[120px] rounded-full -z-10"></div>
      <div className="w-20 h-20 bg-[#00c2ff]/10 border border-[#00c2ff]/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
        <span className="text-4xl">✅</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-light mb-6">
        Proposta{" "}
        <span className="text-[#00c2ff] font-semibold">Solicitada!</span>
      </h1>
      <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
        Obrigado por escolher a <strong>LogiCasa</strong>. Já recebemos seus
        dados e um de nossos especialistas entrará em contato em breve.
      </p>
      <button
        onClick={onBack}
        className="text-slate-500 hover:text-white text-xs uppercase tracking-widest border-b border-slate-800 pb-1 transition-colors"
      >
        Voltar ao site
      </button>
    </section>
  );
}
