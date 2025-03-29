
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("admin@advogada.com");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        console.error("Erro de login:", error);
        toast.error("Erro ao fazer login: " + error.message);
      } else {
        toast.success("Login realizado com sucesso!");
        navigate("/admin");
      }
    } catch (error: any) {
      console.error("Erro ao tentar login:", error);
      toast.error("Erro ao fazer login: " + (error.message || "Credenciais inválidas"));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-lawyer-black to-lawyer-purple-dark/80">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl border border-white/10">
        <div className="text-center">
          <h1 className="text-3xl font-bold gradient-text title-font">Acesso Administrativo</h1>
          <p className="mt-2 text-gray-300">Entre com suas credenciais para acessar o painel</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                required
                className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-lawyer-purple-light"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-gray-200">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                  className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-lawyer-purple-light pr-10"
                />
                <button 
                  type="button" 
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-lawyer-purple to-lawyer-blue hover:brightness-110 transition-all font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Entrando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LogIn size={20} />
                Entrar
              </span>
            )}
          </Button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-400 p-3 bg-white/5 rounded-lg">
          <p>Usuário padrão: admin@advogada.com</p>
          <p className="mt-1">Senha: Solicite ao administrador</p>
        </div>
      </div>
    </div>
  );
}
