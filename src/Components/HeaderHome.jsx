import { useEffect, useState } from 'react';
import logo from '../assets/UFPS_Logo.png';
import sistemas from '../assets/logo_sistemas.jpg';
import { IoSearch } from "react-icons/io5";

export const HeaderHome = () => {
  
  useEffect(() => {
    const incrementarVisitas = async () => {
      try {
        const response = await fetch('https://backayd-production-d897.up.railway.app/vistas', {
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
        const response = await fetch("https://backayd-production-d897.up.railway.app/cantidadDeDocumentos");
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
    <header className='bg-white p-5 gap-4 justify-between flex flex-col md:flex-row shadow-xl'>
      <div className='md:flex flex-col text-center gap-3 md:flex-row items-center'>
        <h1 className='text-xl text-blue-950 md:text-2xl'>
          Repositorio Digital Ingeniería de Sistemas <span className='font-bold text-red-600'>UFPS</span>
        </h1>
      </div>
    </header>
  );
};
