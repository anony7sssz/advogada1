
import { ArrowRight, Send } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-tech-pattern opacity-10 z-0"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-lawyer-black z-0"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-lawyer-purple/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-lawyer-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-lawyer-blue/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="gradient-text animate-text-shimmer">Nathalia</span> especializada em 
              <span className="glow-text block mt-2 animate-pulse-slow">Contratos e Serviços</span>
            </h1>
            
            <p className="text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0">
              Soluções jurídicas modernas e personalizadas para proteger seus interesses 
              com a segurança e tranquilidade que você precisa.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <a 
                href="https://wa.me/5500000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-btn animate-pulse-glow relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Fale comigo <Send size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </a>
              
              <a 
                href="#services" 
                className="text-white bg-transparent border border-lawyer-purple/30 font-medium py-3 px-8 rounded-lg hover:bg-lawyer-purple/10 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Ver serviços <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-lawyer-purple/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
              </a>
            </div>
          </div>
          
          <div className={`relative mx-auto max-w-lg lg:max-w-none transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-lawyer-purple/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-lawyer-blue/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
            
            <div className="relative p-2 animate-border-glow">
              <img 
                src="/lovable-uploads/476edd46-cdc4-4130-ab03-0f4cbcafcc0f.png" 
                alt="Dra. Nathalia" 
                className="rounded-lg h-[460px] w-auto mx-auto object-cover border-2 border-lawyer-purple/30 shadow-2xl shadow-lawyer-purple/20 transition-transform duration-500 hover:scale-[1.02]"
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-lawyer-black/90 to-transparent p-6 rounded-b-lg backdrop-blur-sm">
                <div className="text-center">
                  <div className="font-bold text-2xl mb-2 gradient-text">Segurança Jurídica</div>
                  <p className="text-gray-300">
                    Contratos bem elaborados são a base para relações seguras e duradouras.
                    <span className="block mt-1">Proteja seus interesses com quem entende do assunto.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-gray-400 mb-2 text-sm">Scroll</span>
        <div className="h-12 w-0.5 bg-gradient-to-b from-lawyer-purple-light/80 to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
