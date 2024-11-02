import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("https://reposistemasback-production.up.railway.app/auth/check", {
          method: "GET",
          credentials: "include", // Incluye cookies para verificar autenticación
        });

        if (!response.ok) {
          // Si la autenticación falla, redirige al login
          navigate("/login");
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
        navigate("/login");
      }
    };

    verifyAuth();
  }, [navigate]);
};

export default useAuthCheck;