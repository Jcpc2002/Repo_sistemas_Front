import { Titulo } from "../Components/Titulo";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const CreateCategory = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      nombre,
      descripcion,
    };

    try {
      const response = await axios.post(
        "/api/categorias",
        body,
        {
          headers: {
            "content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Categoría creada con éxito",
        text: `La categoría ${nombre} ha sido creada.`,
      });
      setNombre("");
      setDescripcion("");
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      Swal.fire({
        title: "Error!",
        text: "La categoria no se creó",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Crear Categoría" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
        >
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Nombre de la categoría:</p>
            <input
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              type="text"
              className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Descripción:</p>
            <textarea
              required
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="resize-none w-60 md:w-80 border border-slate-400 rounded-md h-20 pl-2 pr-2 text-sm pt-2"
            />
          </div>
          <div className="flex justify-center w-full">
            <button
              type="sumbit"
              className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4"
            >
              Crear categoría
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
