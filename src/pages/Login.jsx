import { FaUser, FaLock, FaCode } from "react-icons/fa";
import logo from "../assets/UFPS_Logo.png";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const [correo, setUser] = useState("");
  const [contrasena, setPass] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const body = {
      codigo,
      correo,
      contrasena,
    };
  
    try {
      const response = await axios.post("/api/login", body, {
        headers: {
          "content-Type": "application/json",
        },
        withCredentials: true,
      });
  
      console.log(response.data);
      if (response.data.autenticado === true) {
        // Guardar los datos en localStorage
        localStorage.setItem("nombre", response.data.nombre); // Asumiendo que la respuesta contiene el nombre
        localStorage.setItem("correo", correo);
        localStorage.setItem("codigo", codigo);
  
        navigate("/homeAdmin/inicio-administrador", {
          replace: true,
          state: {
            logged: true,
          },
        });
        console.log("Es administrador");
      }
    } catch (error) {
      console.error("Error al realizar la petición:", error);
      Swal.fire({
        title: "Error!",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonText: "Volver",
      });
    }
  };

  return (
    <section className="bg-gray-200 min-h-screen grid place-content-center text-center">
      <div className="max-w-96 bg-white p-6 text-gray-900 border border-slate-300 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <picture className="max-w-20">
              <img src={logo} alt="Logo UFPS" className="w-full rounded-md" />
            </picture>
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
              onChange={(e) => setUser(e.target.value)}
              required
              className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
            />
            <FaUser className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
          </div>
          <div className="relative w-full h-8 mb-4">
            <input
              minLength={4}
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setPass(e.target.value)}
              required
              className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
            />
            <FaLock className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <Link 
              to="/olvidaste-contraseña"
            className="no-underline text-gray-900 hover:underline">
              ¿Olvidaste tú contraseña?
            </Link>
            <button
              type="submit"
              className="w-full h-11 bg-emerald-600 text-slate-50 rounded-md text-lg hover:bg-emerald-500"
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link to="/" className="">
            Volver
          </Link>
        </div>
      </div>
    </section>
  );
};
