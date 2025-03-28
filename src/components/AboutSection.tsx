
import { Award, Clock, Shield } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-20 relative bg-lawyer-blue-dark/30">
      <div className="absolute inset-0 bg-tech-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="gradient-text">Sobre</span> Mim
            </h2>
            
            <p className="text-gray-300 mb-6">
              Sou advogada especializada em direito contratual, com vasta experiência 
              na elaboração e revisão de contratos para empresas e profissionais liberais. 
              Meu foco é fornecer soluções jurídicas inovadoras e eficazes, sempre buscando 
              a melhor estratégia para cada cliente.
            </p>
            
            <p className="text-gray-300 mb-6">
              Com formação em Direito e especialização em Contratos, atuo há mais de 5 anos 
              no mercado, construindo uma reputação sólida baseada em resultados e no 
              compromisso com a excelência.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Experiência Comprovada</h3>
                  <p className="text-gray-300">Anos de experiência em casos complexos de direito contratual.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Comprometimento</h3>
                  <p className="text-gray-300">Dedicação total aos interesses e necessidades dos clientes.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Agilidade</h3>
                  <p className="text-gray-300">Soluções rápidas e eficientes para seus problemas jurídicos.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-lawyer-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-lawyer-blue/20 rounded-full blur-3xl"></div>
            
            <div className="relative gradient-border p-6 rounded-lg bg-lawyer-black/50 backdrop-blur-sm">
              <blockquote className="italic text-lg text-gray-300">
                "Minha missão é fornecer segurança jurídica aos meus clientes, através 
                de contratos bem elaborados e uma assessoria jurídica completa e personalizada. 
                Acredito que o direito deve ser acessível e compreensível para todos."
              </blockquote>
              
              <div className="mt-6 flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-lawyer-purple to-lawyer-blue flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div className="ml-4">
                  <div className="font-semibold">Dra. Ana Silva</div>
                  <div className="text-sm text-gray-400">OAB/XX 123.456</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
