
import { FileText, Building, Landmark, Gavel, ShieldCheck, Users } from "lucide-react";

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
  return (
    <section id="services" className="py-20 relative">
      <div className="absolute inset-0 bg-tech-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Serviços</span> Jurídicos
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Soluções jurídicas personalizadas para atender às suas necessidades, 
            com foco em excelência e resultados.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
