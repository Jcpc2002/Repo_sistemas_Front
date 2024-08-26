import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import { useEffect, useState } from 'react';

export const Navbar = () => {

  useEffect(() => {
    const incrementarVisitas = async () => {
      try {
        const response = await fetch('http://localhost:3000/vistas', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("vistas", data.cantidadvisitas);
          
        } else {
          console.error('Error al incrementar las visitas');
        }
      } catch (error) {
        console.error('Error de red al incrementar las visitas:', error);
      }
    };

    incrementarVisitas();

    const cantidadDocs = async () => {
      try {
        const response = await fetch("http://localhost:3000/cantidadDeDocumentos");
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("NumDocs", data.documentos);
        } else {
          console.error("Error al obtener las categorías:", response.statusText);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    cantidadDocs();
  }, []);

  return (
    <div>
      <div className="bg-blue-950 p-3 flex justify-center gap-2 flex-wrap md:justify-end md:gap-6">
        <Link
          to="enviar-solicitud"
          className="text-white font-bold bg-blue-900 px-2 md:px-3 py-1 rounded-md text-center"
        >
          Enviar solicitud
        </Link>
        <Link
          to="login"
          className="text-white font-bold bg-blue-900 px-2 md:px-3 py-1 rounded-md text-center"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/"
          className="text-white font-bold bg-blue-900 px-2 md:px-3 py-1 rounded-md text-center"
        >
          Inicio
        </Link>
      </div>
      <div className="w-full relative hidden md:block">
        <img src={banner} alt="banner" className="w-full" />
        <div class="absolute inset-0 flex flex-col gap-1 pr-8 justify-center">
          <h1 class="text-white text-5xl text-right font-bold">
            Repositorio Digital
          </h1>
          <h1 class="text-white text-4xl text-right font-bold">
            Programa Ingeniería de Sistemas{" "}
            <span className="text-5xl text-red-600">UFPS</span>
          </h1>
        </div>
      </div>
    </div>
  );
};
