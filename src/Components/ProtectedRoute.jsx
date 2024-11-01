import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  // Intenta leer el token de las cookies
  const token = Cookies.get("access_token");

  // Verifica si el token está presente
  if (!token) {
    // Si no hay token, redirige al usuario a la página de login
    return <Navigate to="/login" replace />;
  }

  // Si hay un token, renderiza el contenido protegido
  return children;
};

export default ProtectedRoute;
