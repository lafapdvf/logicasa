import React, { useState, useEffect, useCallback, useMemo } from "react";
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

  const validations = useMemo(() => {
    const isNameValid = formData.name.trim().length >= 3;
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email) &&
      !formData.email.endsWith(".");
    const isPhoneValid = formData.phone.replace(/\D/g, "").length >= 10;
    const isMessageValid =
      formData.message.trim().length > 0 && formData.message.length <= 500;
    const hasContactMethod = isEmailValid || isPhoneValid;

    return {
      isNameValid,
      isEmailValid,
      isPhoneValid,
      isMessageValid,
      allValid: isNameValid && isMessageValid && hasContactMethod,
    };
  }, [formData]);

  const handleInternalSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      if (data.get("botcheck") === "on") return;

      TagManager.dataLayer({
        dataLayer: {
          event: "generate_lead",
          formId: "contato_logicasa",
          formName: "Formulário de Contato",
        },
      });

      onSubmit(event);
    },
    [onSubmit],
  );

  const maskPhone = useCallback((value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length < 2) return cleanValue;

    return cleanValue
      .replace(/^(\d{2})/, "($1) ")
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2")
      .substring(0, 15);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: name === "phone" ? maskPhone(value) : value,
      }));
    },
    [maskPhone],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (e.target.value.length > 0) {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
      }
    },
    [],
  );

  useEffect(() => {
    setIsFormValid(validations.allValid);
  }, [validations.allValid]);

  const ErrorMsg = useMemo(
    () =>
      ({ text, id }: { text: string; id: string }) => (
        <p
          id={id}
          className="text-[10px] text-red-500/80 italic ml-1 mt-1 animate-in fade-in slide-in-from-left-1 duration-300"
          role="alert"
        >
          {text}
        </p>
      ),
    [],
  );

  return (
    <div className="bg-[#050a15] p-8 rounded-3xl border border-white/5 shadow-2xl relative group">
      <div
        className="absolute -top-10 -right-10 w-32 h-32 bg-[#00c2ff]/5 blur-[80px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <form
        onSubmit={handleInternalSubmit}
        className="space-y-5 relative z-10"
        aria-label="Formulário de contato LogiCasa"
      >
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

        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1"
          >
            Nome Completo
          </label>
          <input
            id="name"
            type="text"
            name="name"
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ex: Enrico Pallazzo"
            aria-required="true"
            className={`w-full bg-[#08101f] border ${touched.name && !validations.isNameValid && formData.name.length > 0 ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 transition-all duration-300 placeholder:text-slate-600`}
          />
          {touched.name &&
            !validations.isNameValid &&
            formData.name.length > 0 && (
              <ErrorMsg id="name-error" text="Mínimo de 3 caracteres." />
            )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1"
          >
            E-mail
          </label>
          <input
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="seu@email.com.br"
            aria-required="true"
            className={`w-full bg-[#08101f] border ${touched.email && formData.email.length > 0 && !validations.isEmailValid ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 transition-all duration-300 placeholder:text-slate-600`}
          />
          {touched.email &&
            formData.email.length > 0 &&
            !validations.isEmailValid && (
              <ErrorMsg id="email-error" text="E-mail inválido." />
            )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="phone"
            className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1"
          >
            Telefone / WhatsApp
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="(11) 91234-5678"
            className={`w-full bg-[#08101f] border ${touched.phone && formData.phone.length > 0 && !validations.isPhoneValid ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 transition-all duration-300 placeholder:text-slate-600`}
          />
          {touched.phone &&
            formData.phone.length > 0 &&
            !validations.isPhoneValid && (
              <ErrorMsg id="phone-error" text="Número incompleto." />
            )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-end">
            <label
              htmlFor="message"
              className="text-[10px] uppercase tracking-[0.2em] text-[#00c2ff] font-bold ml-1"
            >
              Mensagem
            </label>
            <span className="text-[9px] text-slate-500 mb-1">
              {formData.message.length} / 500
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={500}
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Descreva sua solicitação."
            aria-required="true"
            className={`w-full bg-[#08101f] border ${touched.message && formData.message.length > 0 && !validations.isMessageValid ? "border-red-500/40" : "border-white/10"} text-white rounded-xl p-4 outline-none focus:border-[#00c2ff]/50 transition-all duration-300 resize-none placeholder:text-slate-600`}
          />
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
          className={`w-full font-black py-4 rounded-xl transition-all duration-500 uppercase text-xs tracking-[0.2em] mt-4 ${isFormValid ? "bg-[#00c2ff] text-black hover:bg-[#00e0ff] cursor-pointer" : "bg-slate-800 text-slate-500 cursor-not-allowed opacity-50"}`}
        >
          {isFormValid ? "Enviar Solicitação" : "Preencha os Campos"}
        </button>

        <style>{`
          input:-webkit-autofill, textarea:-webkit-autofill { -webkit-text-fill-color: white !important; -webkit-box-shadow: 0 0 0px 1000px #08101f inset !important; }
          @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
        `}</style>

        {result && (
          <div
            role="status"
            className="mt-4 p-4 rounded-xl bg-[#00c2ff]/5 border border-[#00c2ff]/20 text-center text-sm text-[#00c2ff] font-medium"
          >
            {result}
          </div>
        )}
      </form>
    </div>
  );
}
