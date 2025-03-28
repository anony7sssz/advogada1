
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-lawyer-black py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">Nathalia Advocacia</div>
            <p className="text-gray-400 mb-4">
              Advocacia especializada em Contratos e Prestação de Serviços. 
              Soluções jurídicas personalizadas para você e sua empresa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">Serviços</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">Sobre</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">Contato</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Horário de Atendimento</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Segunda - Sexta: 9h às 18h</li>
              <li>Sábado: 9h às 13h</li>
              <li>Domingo: Fechado</li>
            </ul>
            
            <div className="mt-6">
              <a 
                href="https://wa.me/5500000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block py-2 px-4 bg-lawyer-purple text-white font-medium rounded hover:bg-lawyer-purple-dark transition-colors duration-300"
              >
                Agendar Consulta
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Dra. Nathalia. Todos os direitos reservados. OAB/XX 123.456
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
