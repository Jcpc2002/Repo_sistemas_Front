import { Titulo } from "../Components/Titulo";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ActualizarDatos() {
  const [fileName, setFileName] = useState("");
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "");
  const [correo, setCorreo] = useState(localStorage.getItem("correo") || "");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      // Leer el archivo y convertirlo a base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setFotoPerfil(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const codigo = localStorage.getItem("codigo");
    const data = {
      codigo,
      nombre,
      correo,
      fotoPerfil,
    };
    console.log(data);

    try {
      if (nombre || correo) {
        const response = await axios.put(
          "https://reposistemasback-production.up.railway.app/modificarDatos",
          data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Actualizar localStorage con los nuevos datos
          localStorage.setItem("nombre", response.data.nombre);
          localStorage.setItem("correo", response.data.correo);
          if (response.data.fotoPerfil) {
            localStorage.setItem("fotoPerfil", response.data.fotoPerfil);
          }
          Swal.fire({
            icon: "success",
            title: "Datos actualizados con éxito",
          });

          navigate("/homeAdmin/perfil");
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Tienes que cambiar minimo un dato.",
        });
      }
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Actualizar datos" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
        >
          <div className="flex items-center flex-col md:flex-row">
            <label
              htmlFor="imagen"
              className="cursor-pointer bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Seleccionar foto de perfil
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="ml-3 text-gray-600">{fileName}</span>
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Nombre:</p>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Correo:</p>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            />
          </div>
          <div className="flex w-full justify-center">
            <div className="flex gap-6">
              <Link
                to="/homeAdmin/perfil"
                className="bg-red-600 text-white px-3 py-1 rounded-md mt-4"
              >
                Volver
              </Link>
              <button
                type="submit"
                className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4"
              >
                Actualizar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
