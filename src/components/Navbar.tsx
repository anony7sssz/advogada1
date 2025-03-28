
import { Menu, X, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Show notification after 3 seconds
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
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
      
      {/* Notification Pill */}
      {showNotification && (
        <div className="notification-pill">
          <MessageSquare size={16} />
          <span>Precisa de ajuda jurídica?</span>
        </div>
      )}
      
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5500000000000" 
        target="_blank" 
        rel="noopener noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Contact on WhatsApp"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-8 h-8"
        >
          <path 
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.172-.01-.371-.011-.57-.011-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.304-1.654a11.881 11.881 0 005.7 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
          />
        </svg>
      </a>
    </>
  );
};

export default Navbar;
