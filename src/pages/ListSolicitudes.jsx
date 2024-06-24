import { Titulo } from "../Components/Titulo";
import { useState } from "react";
import NewSolicitudes from "../Components/NewSolicitudes";
import SolicitudesAceptadas from "../Components/SolicitudesAceptadas";

function ListSolicitudes() {
  const [activeTab, setActiveTab] = useState("nuevas");

  const renderForm = () => {
    switch (activeTab) {
      case "nuevas":
        return <NewSolicitudes />;
      case "aceptadas":
        return <SolicitudesAceptadas />;
      default:
        return <NewSolicitudes />;
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Solicitudes" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <div className="w-[100%] flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <button
              className={activeTab === "nuevas" ? "bg-blue-400 rounded-md px-3 py-1 font-bold text-white" : ""}
              onClick={() => setActiveTab("nuevas")}
            >
              Nuevas solicitudes
            </button>
            <button
              className={activeTab === "aceptadas" ? "bg-blue-400 rounded-md px-3 py-1 font-bold text-white" : ""}
              onClick={() => setActiveTab("aceptadas")}
            >
              Solicitudes aceptadas
            </button>
          </div>
          <div>
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListSolicitudes;
