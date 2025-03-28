
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-tech-pattern opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-lawyer-black z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text">Advocacia</span> especializada em 
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
                className="whatsapp-btn flex items-center justify-center gap-2 animate-pulse-glow"
              >
                Fale comigo <ArrowRight size={18} />
              </a>
              
              <a 
                href="#services" 
                className="text-white bg-transparent border border-lawyer-purple/30 font-medium py-3 px-8 rounded-lg hover:bg-lawyer-purple/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Ver serviços <ArrowRight size={18} />
              </a>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-lawyer-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-lawyer-blue/20 rounded-full blur-3xl"></div>
            
            <div className="relative gradient-border animate-float p-6 rounded-lg">
              <div className="aspect-[4/5] bg-gradient-to-br from-lawyer-purple/5 to-lawyer-blue/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="font-bold text-xl mb-4 gradient-text">Segurança Jurídica</div>
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
