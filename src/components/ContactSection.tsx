
import { useState } from "react";
import { Phone, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Por favor, informe seu nome");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Por favor, informe seu email");
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error("Por favor, informe o assunto");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Use a função de serviço para criar cliente e agendamento
      // ao invés de tentar inserir diretamente com RLS
      const { data, error } = await supabase.functions.invoke('create-appointment', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message || null,
        }
      });
      
      if (error) {
        console.error("Erro ao agendar consulta:", error);
        throw error;
      }
      
      toast.success("Consulta agendada com sucesso! Entraremos em contato para confirmar.", {
        duration: 5000
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      
    } catch (error: any) {
      console.error("Erro ao agendar consulta:", error);
      toast.error("Erro ao agendar consulta. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="absolute inset-0 bg-tech-pattern opacity-5 z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Entre em</span> Contato
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Estou à disposição para ajudar você com suas questões jurídicas. 
            Entre em contato para uma consulta inicial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Telefone</h3>
                <p className="text-gray-300">(00) 00000-0000</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">E-mail</h3>
                <p className="text-gray-300">contato@advogada.com.br</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Endereço</h3>
                <p className="text-gray-300">
                  Av. Paulista, 1000, Sala 123<br />
                  Bela Vista, São Paulo - SP
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-lawyer-purple/10 text-lawyer-purple-light">
                <MessageSquare size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-300">(00) 00000-0000</p>
                <a 
                  href="https://wa.me/5500000000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-4 whatsapp-btn animate-pulse-glow"
                >
                  Enviar mensagem <Send size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-lawyer-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-lawyer-blue/20 rounded-full blur-3xl"></div>
            
            <div className="relative p-8 rounded-lg bg-lawyer-black/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-2xl font-semibold mb-6 gradient-text">Agende uma Consulta</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nome</Label>
                  <Input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lawyer-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lawyer-purple-light/50"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mail</Label>
                  <Input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lawyer-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lawyer-purple-light/50"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Telefone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lawyer-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lawyer-purple-light/50"
                    placeholder="(00) 00000-0000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Assunto</Label>
                  <Input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lawyer-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lawyer-purple-light/50"
                    placeholder="Assunto da mensagem"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Mensagem</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-lawyer-black/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-lawyer-purple-light/50"
                    placeholder="Descreva sua necessidade..."
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-gradient-to-r from-lawyer-purple to-lawyer-blue text-white font-medium rounded-lg hover:opacity-90 transition-opacity duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Agendando...
                    </span>
                  ) : (
                    <span>Enviar Mensagem</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
