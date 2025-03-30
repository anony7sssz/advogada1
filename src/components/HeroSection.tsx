
import { ArrowRight, Send } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-tech-pattern opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-lawyer-black z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Nathalia</span> especializada em 
              <span className="glow-text block mt-2">Contratos e Serviços</span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Soluções jurídicas modernas e personalizadas para proteger seus interesses 
              com a segurança e tranquilidade que você precisa.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://wa.me/5500000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn animate-pulse-glow"
              >
                Fale comigo <Send size={18} />
              </a>
              
              <a 
                href="#services" 
                className="text-white bg-transparent border border-lawyer-purple/30 font-medium py-3 px-8 rounded-lg hover:bg-lawyer-purple/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Ver serviços <ArrowRight size={18} />
              </a>
            </div>
          </div>
          
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-lawyer-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-lawyer-blue/20 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <img 
                src="/lovable-uploads/476edd46-cdc4-4130-ab03-0f4cbcafcc0f.png" 
                alt="Dra. Nathalia" 
                className="rounded-lg h-[460px] w-auto mx-auto object-cover border-2 border-lawyer-purple/30 shadow-2xl shadow-lawyer-purple/20"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lawyer-black/90 to-transparent p-6 rounded-b-lg">
                <div className="text-center">
                  <div className="font-bold text-2xl mb-2 gradient-text">Segurança Jurídica</div>
                  <p className="text-gray-300">
                    Contratos bem elaborados são a base para relações seguras e duradouras.
                    Proteja seus interesses com quem entende do assunto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
