import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUser, FaUpload, FaUserEdit } from "react-icons/fa";
import { MdDocumentScanner, MdModeEdit } from "react-icons/md";
import { IoMdMore, IoMdClose } from "react-icons/io";
import { IoCreate, IoAccessibility } from "react-icons/io5";
import { HiDocumentArrowUp } from "react-icons/hi2";
import axios from "axios";

export const NavbarHome = () => {
  const navigate = useNavigate();
  const [showMenu, SetShowMenu] = useState(false);
  const nombre = localStorage.getItem("nombre");

  const handleLogout = async () => {
    try {
      await axios.get("https://backayd-production-d897.up.railway.app/logout", { withCredentials: true });
      navigate("/"); 
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  return (
    <React.Fragment>
      <div
        className={`bg-[#07244C] min-h-screen flex flex-col items-center gap-3 fixed lg:static w-[80%] md:w-[40%] lg:w-full transition-all z-50 duration-300 ${
          showMenu ? "left-0" : "-left-full"
        }`}
      >
        <h3 className="text-white m-2 py-1 px-3 bg-[#2a2870] rounded-lg">
          Usuario administrador
        </h3>
        <div className="flex flex-col items-center gap-2">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg"
            alt="Perfil"
          />
          <h2 className="text-white text-center">
            {nombre}
          </h2>
        </div>
        <hr className="text-gray-200 w-1/2 m-1" />
        <div className="flex-1 flex flex-col justify-between">
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/homeAdmin/inicio-administrador"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <IoAccessibility />
              Inicio
            </NavLink>
            <NavLink
              to="/homeAdmin/perfil"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <FaUser />
              Perfil
            </NavLink>
            <NavLink
              to="/homeAdmin/crear-categoria"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <IoCreate />
              Crear categoría
            </NavLink>
            <NavLink
              to="/homeAdmin/editar-categoria"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <MdModeEdit />
              Editar categoría
            </NavLink>
            <NavLink
              to="/homeAdmin/lista-solicitudes"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <FaUserEdit />
              Solicitudes
            </NavLink>
            <NavLink
              to="/homeAdmin/subir-documento"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <HiDocumentArrowUp />
              Subir documento
            </NavLink>
            <NavLink
              to="/homeAdmin/generar-informe"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-2 text-[#07244C] font-bold bg-[#FFC107] py-1 px-4 w-48 rounded-lg text-base transition-colors"
                  : "flex items-center gap-2 text-white bg-[#7671FA] py-1 px-4 w-48 rounded-lg text-base hover:bg-violet-600 transition-colors"
              }
            >
              <MdDocumentScanner />
              Generar informe
            </NavLink>
          </nav>
          <div className="flex justify-center my-4">
            <button
              onClick={handleLogout} // Llama a handleLogout al hacer clic
              className="bg-red-700 py-1 px-4 rounded-full text-white"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() => SetShowMenu(!showMenu)}
        className="lg:hidden fixed right-4 bottom-4 bg-violet-800 p-2.5 rounded-full text-white z-50"
      >
        {showMenu ? <IoMdClose /> : <IoMdMore />}
      </button>
    </React.Fragment>
  );
};
