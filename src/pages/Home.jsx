import { useState, useEffect } from "react";
import { Navbar } from "../Components/Navbar";
import { Footer } from "../Components/Piedepagina";
import { Outlet } from "react-router-dom";

export const Home = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://backayd-production.up.railway.app/traerCategoria");
      if (response.ok) {
        const data = await response.json();
        setCategorias(data.data); // Guardar las categorías en el estado
      } else {
        console.error("Error al obtener las categorías:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <main>
        <div >
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};