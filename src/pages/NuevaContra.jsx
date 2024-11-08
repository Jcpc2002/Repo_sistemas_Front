import logo from "../assets/UFPS_Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaLock, FaCode } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";

function NuevaContra() {
  const [codigo, setCodigo] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (contrasena !== repetirContrasena) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden",
      });
      return;
    }

    try {
      const response = await axios.put(
        "https://reposistemasback-production.up.railway.app/editarContrasena",
        {
          codigo,
          contrasena,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Muestra un mensaje de éxito si la solicitud se realizó correctamente
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "La contraseña se ha cambiado correctamente",
        });
        navigate("/login");
      }
    } catch (error) {
      // Maneja los errores de la solicitud
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No coincide el código",
      });
    }
  };

  return (
    <section className="bg-gray-200 min-h-screen grid place-content-center text-center">
      <div className="max-w-96 bg-white p-6 text-gray-900 border border-slate-300 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <h2 className="text-lg uppercase font-bold">
              Repositorio digital ingeniería de sistemas UFPS
            </h2>
          </div>

          <hr className="bg-slate-500 h-0.5 border-none m-4" />

          <h1 className="text-2xl uppercase m-4 font-semibold">Login</h1>

          <div className="relative w-full h-8 mb-4">
            <input
              type="text"
              placeholder="Código"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
              className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
            />
            <FaCode className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
          </div>
          <div className="relative w-full h-8 mb-4">
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
            />
            <FaUser className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
          </div>
          <div className="relative w-full h-8 mb-4">
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
            />
            <FaLock className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
          </div>
          <div className="relative w-full h-8 mb-4">
            <input
              type="password"
              placeholder="Repetir contraseña"
              value={repetirContrasena}
              onChange={(e) => setRepetirContrasena(e.target.value)}
              required
              className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
            />
            <FaLock className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
          </div>
          <div className="flex flex-col gap-6 mt-6">
            <button
              type="submit"
              className="w-full h-11 bg-emerald-900 text-slate-50 rounded-md text-lg hover:bg-emerald-950"
            >
              Enviar
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link to="/login" className="">
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NuevaContra;
