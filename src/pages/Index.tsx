
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Shield } from "lucide-react";

export default function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Toaster />
      <Navbar />
      <div className="flex-1">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
        <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
          {user ? (
            <Button onClick={() => navigate("/admin")}>
              <Shield className="h-5 w-5" />
            </Button>
          ) : (
            <Button variant="ghost" onClick={() => navigate("/login")} className="opacity-70 hover:opacity-100">
              <Shield className="h-5 w-5 text-gray-300" />
            </Button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
