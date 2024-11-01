import { Titulo } from "../Components/Titulo";
import { useState, useEffect } from "react";
import CategoriasUser from "../Components/CategoriasUser";

function InicioUser() {
  const [categorias, setCategorias] = useState([]);
  const numCategories = categorias.length;
  const numVistas = localStorage.getItem("vistas");
  const numDocs = localStorage.getItem("NumDocs");
  useEffect(() => {
    // Realizar la solicitud al backend para obtener las categorías
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://reposistemasback-production.up.railway.app/traerCategoria");
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
    <div className="flex flex-col items-center gap-3 pt-4 pb-4 bg-gray-100">
      <div className="w-[90%] border border-slate-300 p-4 flex flex-col items-center gap-6 rounded-md bg-white">
        <Titulo name="Información de la página" />
        <div className="flex justify-center border border-slate-300 w-full py-5 shadow-md">
          <div className="flex flex-col gap-3 md:flex-row md:justify-between md:gap-0 w-[80%]">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-slate-900">
                # de visitas
              </h3>
              <p className="text-5xl font-bold text-red-700">{numVistas}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-slate-900">
                # de categorías
              </h3>
              <p className="text-5xl font-bold text-red-700">{numCategories}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-slate-900">
                # de documentos
              </h3>
              <p className="text-5xl font-bold text-red-700">{numDocs}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] border border-slate-300 p-4 flex flex-col items-center gap-6 rounded-md bg-white">
        <Titulo name="Categorías" />
        <div className="flex justify-center border border-slate-300 w-full py-5 shadow-md">
          <div className="grid-cols-1 pt-8 grid md:grid-cols-4 gap-6">
            {categorias.map((categoria) => (
              <CategoriasUser name={categoria.nombre} link={categoria.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InicioUser;
