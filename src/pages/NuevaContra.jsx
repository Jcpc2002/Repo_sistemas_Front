import logo from "../assets/UFPS_Logo.png";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaCode } from "react-icons/fa";

function NuevaContra() {
  return (
    <section className="bg-gray-200 min-h-screen grid place-content-center text-center">
    <div className="max-w-96 bg-white p-6 text-gray-900 border border-slate-300 rounded-lg shadow-2xl">
      <form>
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
            required
            className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
          />
          <FaCode className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
        </div>
        <div className="relative w-full h-8 mb-4">
          <input
            type="email"
            placeholder="Correo"
            required
            className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
          />
          <FaUser className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
        </div>
        <div className="relative w-full h-8 mb-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            required
            className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
          />
          <FaLock className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
        </div>
        <div className="relative w-full h-8 mb-4">
          <input
            type="password"
            placeholder="Repetir contraseña"
            required
            className="w-full h-full outline-none border border-slate-400 rounded-md p-4 pr-9 text-gray-900 placeholder:text-gray-700"
          />
          <FaLock className="absolute right-3 top-[50%] translate-y-[-50%] text-slate-500" />
        </div>
        <div className="flex flex-col gap-6 mt-6">
          <button
            type="submit"
            className="w-full h-11 bg-emerald-600 text-slate-50 rounded-md text-lg hover:bg-emerald-500"
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
  )
}

export default NuevaContra