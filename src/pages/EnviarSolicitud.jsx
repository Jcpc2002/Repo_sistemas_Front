import { useState } from "react";
import { Titulo } from "../Components/Titulo";
import axios from "axios";
import Swal from "sweetalert2";

function EnviarSolicitud() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [correo, setCorreo] = useState("");
  const [codigousuario, setCodigo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      nombre,
      codigousuario,
      correo,
      descripcion,
    };

    try {
      const response = await axios.post(
        "https://reposistemasback-production.up.railway.app/enviarSolicitud",
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
        title: "Solicitud enviada",
      });

      setNombre("");
      setDescripcion("");
      setCodigo("");
      setCorreo("");
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      if (error.response.status === 409) {
        console.log("Si sirve");
        Swal.fire({
          title: "Error!",
          text: "Ya enviaste una solicitud y está pendiente",
          icon: "warning",
          confirmButtonText: "Volver",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "La solicitud no se envió",
          icon: "error",
          confirmButtonText: "Volver",
        });
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 pt-4 pb-4 bg-gray-100">
      <div className="w-[90%] border border-slate-300 p-4 flex flex-col items-center gap-6 rounded-md bg-white">
        <Titulo name="Enviar Solicitud" />
        <div className="flex flex-col items-center gap-6 border border-slate-300 w-full py-10 shadow-md px-10">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
          >
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Dígite su nombre:</p>
              <input
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Dígite su código:</p>
              <input
                required
                value={codigousuario}
                onChange={(e) => setCodigo(e.target.value)}
                type="text"
                className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">
                Dígite su correo institucional:
              </p>
              <input
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                type="email"
                className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Descripción de la solicitud:</p>
              <textarea
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Dígite el nombre de sus compañeros de equipo (en dado de que tenga), y una pequeña descripción de su proyecto"
                className="resize-none w-60 md:w-96 border border-slate-400 rounded-md h-40 pl-2 pr-2 text-sm pt-2"
              />
            </div>
            <button
              type="sumbit"
              className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnviarSolicitud;