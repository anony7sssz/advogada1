
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Outlet } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Users, FileText, LogOut, Menu, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    // Extract the active page from the URL path
    const path = location.pathname.split("/")[2] || "";
    setActivePage(path);
  }, [location]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const navItems = [
    {
      name: "Consultas",
      path: "",
      icon: Calendar,
    },
    {
      name: "Clientes",
      path: "clients",
      icon: Users,
    },
    {
      name: "Anotações",
      path: "notes",
      icon: FileText,
    },
  ];

  const isActive = (path: string) => {
    if (path === "" && activePage === "") return true;
    return activePage === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lawyer-black to-lawyer-black/95">
      <header className="bg-lawyer-black/50 backdrop-blur-md border-b border-white/10 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-lawyer-black/90 backdrop-blur-lg border-r border-white/10 text-white w-64 p-0">
                  <div className="flex flex-col h-full">
                    <div className="p-4 border-b border-white/10 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-lawyer-purple-light" />
                      </div>
                      <div>
                        <p className="font-medium gradient-text">{user?.email?.split('@')[0]}</p>
                        <p className="text-xs text-gray-400">Administrador</p>
                      </div>
                    </div>
                    <nav className="flex flex-col gap-1 p-3">
                      {navItems.map((item) => (
                        <Link 
                          key={item.path} 
                          to={`/admin${item.path ? `/${item.path}` : ''}`}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                            isActive(item.path) 
                              ? "bg-lawyer-purple/20 text-lawyer-purple-light" 
                              : "hover:bg-white/5 text-gray-300 hover:text-white"
                          }`}
                        >
                          <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-lawyer-purple-light" : ""}`} />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto p-4 border-t border-white/10">
                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 border-white/20 hover:bg-white/5 hover:text-white"
                        onClick={handleSignOut}
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sair</span>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            <h1 className="text-xl font-bold gradient-text">Painel Administrativo</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-2 rounded-full text-sm border border-white/10">
              <User className="h-4 w-4 text-lawyer-purple-light" />
              <span className="text-gray-300">{user?.email}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSignOut}
              className="border-white/20 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-4 w-4 md:mr-2" />
              <span className="hidden md:inline">Sair</span>
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar - desktop only */}
        <aside className="hidden md:block w-64 bg-lawyer-black/30 backdrop-blur-sm border-r border-white/10 p-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={`/admin${item.path ? `/${item.path}` : ''}`}
                className={`flex items-center gap-3 p-3 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? "bg-lawyer-purple/20 text-lawyer-purple-light" 
                    : "hover:bg-white/5 text-gray-300 hover:text-white"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive(item.path) ? "text-lawyer-purple-light" : ""}`} />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
