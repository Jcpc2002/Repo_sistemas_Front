import { Titulo } from "../Components/Titulo";
import { CategoriasAdmin } from "../Components/CategoriasAdmin";
import { useState, useEffect } from "react";
import ListDocumentos from "./ListDocumentos";

export default function () {
  
  const [categorias, setCategorias] = useState([]);
  const numCategories = categorias.length;
  const numVistas = localStorage.getItem("vistas");
  const numDocs = localStorage.getItem("NumDocs");
  console.log(categorias);
  useEffect(() => {
    // Realizar la solicitud al backend para obtener las categorías
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://reposistemasback-production.up.railway.app/traerCategoria",{
        
      });
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
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Inicio" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <h2 className="text-xl font-bold text-center">
          Estadísticas de la página
        </h2>
        <div className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-0 w-[80%]">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-900"># de visitas</h3>
            <p className="text-2xl font-bold text-red-700">{numVistas}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-900">
              # de categorías
            </h3>
            <p className="text-2xl font-bold text-red-700">{numCategories}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-900">
              # de documentos
            </h3>
            <p className="text-2xl font-bold text-red-700">{numDocs}</p>
          </div>
        </div>
      </div>
      <div className="grid-cols-1 pt-8 grid md:grid-cols-4 gap-6">
        {categorias.map((categoria) => (
          <CategoriasAdmin
            key={categoria.id} // Aquí agregas el prop 'key' con un valor único
            name={categoria.nombre}
            link={categoria.id}
          />
        ))}
      </div>
    </div>
  );
}
