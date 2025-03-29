
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { Menu, Users, Calendar, FileText, LogOut } from "lucide-react";

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Painel Administrativo</h1>
          
          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col h-full">
                <div className="py-4 border-b">
                  <h2 className="text-lg font-medium">Menu</h2>
                </div>
                <nav className="flex flex-col gap-2 py-4">
                  <Link to="/admin" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <Calendar className="h-5 w-5" />
                    <span>Consultas</span>
                  </Link>
                  <Link to="/admin/clients" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <Users className="h-5 w-5" />
                    <span>Clientes</span>
                  </Link>
                  <Link to="/admin/notes" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
                    <FileText className="h-5 w-5" />
                    <span>Anotações</span>
                  </Link>
                </nav>
                <div className="mt-auto pb-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center gap-2"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm">Olá, {user?.email}</span>
            <Button variant="secondary" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:block w-64 bg-gray-50 border-r p-4">
          <nav className="flex flex-col gap-2">
            <Link to="/admin" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
              <Calendar className="h-5 w-5" />
              <span>Consultas</span>
            </Link>
            <Link to="/admin/clients" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
              <Users className="h-5 w-5" />
              <span>Clientes</span>
            </Link>
            <Link to="/admin/notes" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md">
              <FileText className="h-5 w-5" />
              <span>Anotações</span>
            </Link>
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
