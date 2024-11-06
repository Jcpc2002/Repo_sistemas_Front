import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuthCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await fetch("https://reposistemasback-production.up.railway.app/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
        navigate("/login");
      } finally {
        setIsLoading(false); // Cambia el estado de carga una vez completada la verificación
      }
    };

    verifyAuth();
  }, [navigate]);

  return isLoading;
};

export default useAuthCheck;