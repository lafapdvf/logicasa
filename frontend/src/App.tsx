import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Wifi, Shield, Zap } from "lucide-react";
import "./App.css";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0b132b] to-[#05080f] text-slate-100">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6 bg-[#0f1a33] shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src="/logo-logicassa.png"
              alt="LogiCasa Automação Inteligente"
              className="h-10 w-auto"
            />
          </div>
          <nav className="space-x-6 text-sm">
            <a className="hover:text-slate-300" href="#services">
              Serviços
            </a>
            <a className="hover:text-slate-300" href="#solutions">
              Soluções
            </a>
            <a className="hover:text-slate-300" href="#about">
              Sobre
            </a>
            <a className="hover:text-slate-300" href="#contact">
              Contato
            </a>
          </nav>
        </header>

        {/* Hero */}
        <section className="px-8 py-24 text-center bg-gradient-to-b from-slate-900 to-slate-950">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Automação Inteligente para sua{" "}
            <span className="text-slate-300">Casa</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-300 mb-8">
            Conforto, segurança e eficiência energética com soluções modernas em
            automação residencial.
          </p>
          <Button className="bg-slate-300 hover:bg-slate-200 text-slate-900 font-semibold px-8 py-4 rounded-2xl">
            Solicitar Orçamento
          </Button>
        </section>

        {/* Services */}
        <section id="services" className="px-8 py-20">
          <h3 className="text-3xl font-semibold text-center mb-12">
            Nossos Serviços
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-[#0f1a33] border-slate-800 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Home className="mx-auto mb-4 text-slate-300" size={36} />
                <h4 className="text-xl font-semibold mb-2">
                  Automação Residencial
                </h4>
                <p className="text-slate-400 text-sm">
                  Controle de iluminação, climatização e dispositivos em um
                  único sistema.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#0f1a33] border-slate-800 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Shield className="mx-auto mb-4 text-slate-300" size={36} />
                <h4 className="text-xl font-semibold mb-2">
                  Segurança Inteligente
                </h4>
                <p className="text-slate-400 text-sm">
                  Câmeras, fechaduras eletrônicas e sensores integrados.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#0f1a33] border-slate-800 rounded-2xl">
              <CardContent className="p-6 text-center">
                <Wifi className="mx-auto mb-4 text-slate-300" size={36} />
                <h4 className="text-xl font-semibold mb-2">Integração IoT</h4>
                <p className="text-slate-400 text-sm">
                  Compatibilidade com Alexa, Google Home e Home Assistant.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="px-8 py-20 bg-[#0f1a33]">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-semibold mb-4">
                Tecnologia que simplifica
              </h3>
              <p className="text-slate-300 mb-6">
                Projetamos soluções sob medida, focadas em estabilidade,
                segurança e fácil expansão.
              </p>
              <Button className="bg-slate-300 hover:bg-slate-200 text-slate-900 font-semibold rounded-xl">
                Conhecer Soluções
              </Button>
            </div>
            <Card className="bg-[#05080f] border-slate-800 rounded-2xl">
              <CardContent className="p-8">
                <Zap className="text-slate-300 mb-4" size={40} />
                <p className="text-slate-400">
                  Automação eficiente reduz custos de energia e aumenta o valor
                  do imóvel.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer
          id="contact"
          className="px-8 py-10 bg-[#05080f] border-t border-slate-800 text-center"
        >
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} LogiCasa Automação Inteligente
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
