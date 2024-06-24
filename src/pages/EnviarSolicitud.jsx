import { Titulo } from "../Components/Titulo";

function EnviarSolicitud() {
  return (
    <div className="flex flex-col items-center gap-3 pt-4 pb-4 bg-gray-100">
      <div className="w-[90%] border border-slate-300 p-4 flex flex-col items-center gap-6 rounded-md bg-white">
        <Titulo name="Enviar Solicitud" />
        <div className="flex flex-col items-center gap-6 border border-slate-300 w-full py-10 shadow-md px-10">
          <form className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10">
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Dígite su nombre:</p>
              <input
                type="text"
                className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Dígite su código:</p>
              <input
                type="text"
                className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">
                Dígite su correo institucional:
              </p>
              <input
                type="email"
                className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Descripción de la solicitud:</p>
              <textarea className="resize-none w-60 md:w-96 border border-slate-400 rounded-md h-40 pl-2 pr-2 text-sm pt-2" />
            </div>
          </form>
          <button
            type="sumbit"
            className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnviarSolicitud;
