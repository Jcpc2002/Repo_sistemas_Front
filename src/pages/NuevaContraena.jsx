import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Titulo } from "../Components/Titulo";
import axios from "axios";
import Swal from "sweetalert2";

export default function NuevaContraena() {
  const [codigo, setCodigo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (contrasena.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "La contraseña no puede estar vacía",
      });
      return;
    }

    try {
      const response = await axios.put("https://backayd-production-d897.up.railway.app/editarContrasena", {
        codigo,
        contrasena,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Contraseña actualizada con éxito",
        });
        navigate("/homeAdmin/perfil");
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "El código es incorrecto",
      });
    }
  };

  return (
    <section className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Actualizar contraseña" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
        >
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Ingrese su código:</p>
            <input
              type="text"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="Ingrese su código institucional"
              className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Ingrese su nueva contraseña:</p>
            <input
              minLength={3}
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              placeholder="Ingrese su nueva contraseña"
              className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            />
          </div>
          <div className="flex w-full justify-center">
            <div className="flex gap-6">
              <Link
                to="/homeAdmin/perfil"
                className="bg-red-700 text-white px-3 py-1 rounded-md mt-4"
              >
                Volver
              </Link>
              <button
                type="submit"
                className="bg-emerald-900 text-white px-3 py-1 rounded-md mt-4"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
