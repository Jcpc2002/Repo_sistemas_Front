import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import { useEffect, useState } from 'react';

export const Navbar = () => {

  useEffect(() => {
    const incrementarVisitas = async () => {
      try {
        const response = await fetch('https://reposistemasback-production.up.railway.app/vistas', {
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
        const response = await fetch("https://reposistemasback-production.up.railway.app/cantidadDeDocumentos");
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
      <div className="bg-[#07244C] p-3 flex justify-center gap-2 flex-wrap md:justify-end md:gap-6">
        <Link
          to="enviar-solicitud"
          className="text-[#07244C] font-bold bg-[#FFC107] px-2 md:px-3 py-1 rounded-md text-center"
        >
          Enviar solicitud
        </Link>
        <Link
          to="login"
          className="text-[#07244C] font-bold bg-[#FFC107] px-2 md:px-3 py-1 rounded-md text-center"
        >
          Iniciar sesión
        </Link>
        <Link
          to="/"
          className="text-[#07244C] font-bold bg-[#FFC107] px-2 md:px-3 py-1 rounded-md text-center"
        >
          Inicio
        </Link>
      </div>
      <div className="w-full relative hidden md:block md:overflow-hidden">
        <img src={banner} alt="banner" className="w-full h-auto block" />
        <div class="absolute inset-0 flex flex-col gap-1 pr-8 justify-center">

        </div>
      </div>
    </div>
  );
};
