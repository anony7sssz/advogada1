
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-lawyer-black to-lawyer-purple-dark/80">
        <div className="animate-spin h-12 w-12 border-4 border-lawyer-purple-light border-t-transparent rounded-full mb-4"></div>
        <p className="text-gray-300">Carregando...</p>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
}
