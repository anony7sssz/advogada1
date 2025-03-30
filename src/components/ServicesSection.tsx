
import { FileText, Building, Landmark, Gavel, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";

const services = [
  {
    title: "Contratos Comerciais",
    description: "Elaboração e revisão de contratos para empresas, com foco na proteção dos seus interesses.",
    icon: <FileText size={28} />
  },
  {
    title: "Contratos Imobiliários",
    description: "Assessoria jurídica em contratos de compra, venda e locação de imóveis.",
    icon: <Building size={28} />
  },
  {
    title: "Contratos Societários",
    description: "Elaboração de contratos sociais, alterações contratuais e acordos de sócios.",
    icon: <Users size={28} />
  },
  {
    title: "Contratos de Prestação de Serviços",
    description: "Elaboração de contratos de prestação de serviços para profissionais autônomos e empresas.",
    icon: <Landmark size={28} />
  },
  {
    title: "Consultoria Preventiva",
    description: "Análise preventiva de contratos e situações jurídicas para evitar riscos futuros.",
    icon: <ShieldCheck size={28} />
  },
  {
    title: "Solução de Conflitos",
    description: "Mediação e resolução de conflitos contratuais de forma rápida e eficiente.",
    icon: <Gavel size={28} />
  }
];

const ServicesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-tech-pattern opacity-5 z-0"></div>
      
      {/* Animated background gradient */}
      <div className="absolute -top-40 left-1/3 w-80 h-80 bg-lawyer-purple/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-lawyer-blue/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text animate-text-shimmer">Serviços</span> Jurídicos
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Soluções jurídicas personalizadas para atender às suas necessidades, 
            com foco em excelência e resultados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card backdrop-blur-md"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`service-icon transition-all duration-300 ${hoveredIndex === index ? 'scale-110 text-white bg-gradient-to-br from-lawyer-purple/40 to-lawyer-blue/40' : ''}`}>
                {service.icon}
              </div>
              <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${hoveredIndex === index ? 'gradient-text' : ''}`}>
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
              
              {/* Subtle decoration element */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-lawyer-purple to-lawyer-blue transition-all duration-300 ${hoveredIndex === index ? 'w-full' : 'w-0'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
