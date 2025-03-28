
import { Facebook, Instagram, Linkedin, Twitter, Clock, MapPin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lawyer-black py-12 border-t border-gray-800 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-lawyer-purple/10 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-lawyer-blue/10 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4 title-font">Nathalia Advocacia</div>
            <p className="text-gray-400 mb-4 body-font">
              Advocacia especializada em Contratos e Prestação de Serviços. 
              Soluções jurídicas personalizadas para você e sua empresa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-lawyer-purple/10 rounded-full">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-lawyer-purple/10 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-lawyer-purple/10 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 p-2 hover:bg-lawyer-purple/10 rounded-full">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 title-font">Links Rápidos</h3>
            <ul className="space-y-2 body-font">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-lawyer-purple-light rounded-full"></span> Home
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-lawyer-purple-light rounded-full"></span> Serviços
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-lawyer-purple-light rounded-full"></span> Sobre
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <span className="h-1 w-1 bg-lawyer-purple-light rounded-full"></span> Contato
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 title-font">Contato</h3>
            <ul className="space-y-3 text-gray-400 body-font">
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-lawyer-purple-light" />
                <span>Segunda - Sexta: 9h às 18h</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-lawyer-purple-light" />
                <span>Sábado: 9h às 13h</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-lawyer-purple-light" />
                <span>São Paulo, SP</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-lawyer-purple-light" />
                <span>contato@nathalia.adv.br</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-lawyer-purple-light" />
                <span>(00) 00000-0000</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 body-font">
            &copy; {new Date().getFullYear()} Dra. Nathalia. Todos os direitos reservados. OAB/XX 123.456
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
