import { Link } from "react-router-dom";
import { Titulo } from "../Components/Titulo";

export default function Perfil() {
  const nombre = localStorage.getItem("nombre");
  const correo = localStorage.getItem("correo");
  const codigo = localStorage.getItem("codigo");

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Perfil" />
      <div className='border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white'>
        <div className="flex flex-col items-center gap-2">
          <figure className="w-[40%] md:w-[20%]">
            <img
              className="rounded-full w-full"
              src="https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg"
              alt="Foto-Perfil"
            />
          </figure>
          <h2 className="font-bold text-xl pl-4 md:text-2xl text-center">
          {nombre}
          </h2>
        </div>
        <div className="flex flex-col gap-3 items-center"> 
          <p className="text-xl break-all text-center">{correo}</p>
          <p className="text-xl">{codigo}</p>
        </div>
        <div className="flex flex-col gap-4 items-center md:flex-row md:gap-10"> 
          <Link to="/homeAdmin/actualizar-datos" className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4">Actualizar datos</Link>
          <Link to="/homeAdmin/actualizar-contraseña" className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4">Actualizar contraseña</Link>
        </div>
      </div>
    </div>
  );
}
