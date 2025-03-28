
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-lawyer-black/90 backdrop-blur-md py-2" : "bg-lawyer-black/70 backdrop-blur-sm py-4"
      } border-b border-gray-800`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className={`text-2xl font-bold title-font ${scrolled ? "gradient-text" : "text-white"}`}>
              Nathalia
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors duration-300 body-font">
                Home
              </a>
              <a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300 body-font">
                Serviços
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300 body-font">
                Sobre
              </a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300 body-font">
                Contato
              </a>
            </div>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-lawyer-black/90 backdrop-blur-md border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#home" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white transition-colors duration-300 body-font"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a 
              href="#services" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white transition-colors duration-300 body-font"
              onClick={() => setIsOpen(false)}
            >
              Serviços
            </a>
            <a 
              href="#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white transition-colors duration-300 body-font"
              onClick={() => setIsOpen(false)}
            >
              Sobre
            </a>
            <a 
              href="#contact" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white transition-colors duration-300 body-font"
              onClick={() => setIsOpen(false)}
            >
              Contato
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
