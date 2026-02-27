import React, { useState, useEffect } from "react";
import TagManager from "react-gtm-module";

interface ContactFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  result: string;
}

export function ContactForm({ onSubmit, result }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  // Validação interna do Honeypot antes de prosseguir com o onSubmit original
  const handleInternalSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const isBot = data.get("botcheck") === "on";

    if (isBot) {
      console.warn("Spam detectado.");
      return;
    }

    // Disparo do evento de conversão para o GTM
    TagManager.dataLayer({
      dataLayer: {
        event: "generate_lead",
        formId: "contato_logicasa",
        formName: "Formulário de Contato",
      },
    });

    onSubmit(event);
  };

  const maskPhone = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .substring(0, 15);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "phone" ? maskPhone(value) : value;
    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length > 0) {
      setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }
  };

  // --- VALIDAÇÕES ---
  const isNameValid = formData.name.trim().length >= 3;

  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) &&
    !formData.email.endsWith(".");

  const isPhoneValid = formData.phone.replace(/\D/g, "").length >= 10;
  const isMessageValid =
    formData.message.trim().length > 0 && formData.message.length <= 500;
  const hasContactMethod = isEmailValid || isPhoneValid;

  useEffect(() => {
    const isFormEmpty = Object.values(formData).every(
      (val) => val.trim() === "",
    );
    if (isFormEmpty) {
      setTouched({ name: false, email: false, phone: false, message: false });
    }

    setIsFormValid(isNameValid && isMessageValid && hasContactMethod);
  }, [formData, isNameValid, isMessageValid, hasContactMethod]);

  const ErrorMsg = ({ text }: { text: string }) => (
    <p className="text-[10px] text-red-500/80 italic ml-1 mt-1 animate-in fade-in slide-in-from-left-1 duration-300">
      {text}
    </p>
  );

  return (
    <div className="bg-[#050a15] p-8 rounded-3xl border border-white/5 shadow-2xl relative group">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00c2ff]/5 blur-[80px] rounded-full pointer-events-none"></div>

      <form onSubmit={handleInternalSubmit} className="space-y-5 relative z-10">
        <input
          type="hidden"
          name="access_key"
          value={import.meta.env.VITE_WEB3FORMS_KEY}
        />
        <input type="hidden" name="from_name" value="Site LogiCasa" />
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          style={{ display: "none" }}
          tabIndex={-1}
          autoComplete="off"
        />

        {/* Nome Completo */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            Nome Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: Enrico Palazzo"
            className={`w-full bg-[#08101f] border ${touched.name && !isNameValid && formData.name.length > 0 ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 placeholder:text-slate-600`}
          />
          {touched.name && !isNameValid && formData.name.length > 0 && (
            <ErrorMsg text="Mínimo de 3 caracteres." />
          )}
        </div>

        {/* E-mail */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="seu@email.com.br"
            className={`w-full bg-[#08101f] border ${touched.email && formData.email.length > 0 && !isEmailValid ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 placeholder:text-slate-600`}
          />
          {touched.email && formData.email.length > 0 && !isEmailValid && (
            <ErrorMsg text="E-mail inválido." />
          )}
        </div>

        {/* Telefone */}
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
            Telefone / WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(11) 91234-5678"
            className={`w-full bg-[#08101f] border ${touched.phone && formData.phone.length > 0 && !isPhoneValid ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 placeholder:text-slate-600`}
          />
          {touched.phone && formData.phone.length > 0 && !isPhoneValid && (
            <ErrorMsg text="Número de telefone / WhatsApp incompleto." />
          )}
        </div>

        {/* Mensagem */}
        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1">
              Mensagem
            </label>
            <span className="text-[9px] text-slate-500 mb-1">
              {formData.message.length} / 500
            </span>
          </div>
          <textarea
            name="message"
            rows={4}
            maxLength={500}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Descreva sua solicitação ou dúvida."
            className={`w-full bg-[#08101f] border ${touched.message && formData.message.length > 0 && !isMessageValid ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 focus:ring-1 focus:ring-[#00c2ff]/30 transition-all duration-300 resize-none placeholder:text-slate-600`}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            animation:
              !isFormValid &&
              (touched.name ||
                touched.email ||
                touched.phone ||
                touched.message)
                ? "shake 0.5s cubic-bezier(.36,.07,.19,.97) both"
                : "none",
          }}
          className={`w-full font-black py-4 rounded-xl transition-all duration-500 uppercase text-xs tracking-[0.2em] mt-4 shadow-lg
            ${
              isFormValid
                ? "bg-[#00c2ff] text-black hover:bg-[#00e0ff] hover:scale-[1.01] active:scale-[0.98] cursor-pointer shadow-[#00c2ff]/20"
                : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"
            }`}
        >
          {isFormValid ? "Enviar Solicitação" : "Preencha os Campos Acima"}
        </button>

        <style>{`
          /* Remove o fundo branco/azul do preenchimento automático */
          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus {
            -webkit-text-fill-color: white !important;
            -webkit-box-shadow: 0 0 0px 1000px #08101f inset !important;
            transition: background-color 5000s ease-in-out 0s;
          }

          @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
          }
        `}</style>

        {result && (
          <div className="mt-4 p-4 rounded-xl bg-[#00c2ff]/5 border border-[#00c2ff]/20 animate-in fade-in slide-in-from-top-2 duration-500 text-center text-sm text-[#00c2ff] font-medium tracking-wide">
            {result}
          </div>
        )}
      </form>
    </div>
  );
}
