import { IoDocument } from "react-icons/io5";

function SolicitudesAceptadas() {
    const data = [
        // Deja el array vacío para probar el mensaje de "No hay datos"
        { col1: "Data 1", col2: "Data 2", col3: "Data 3", col4: "Data 4" },
        { col1: "Data 5", col2: "Data 6", col3: "Data 7", col4: "Data 8" },
        { col1: "Data 9", col2: "Data 10", col3: "Data 11", col4: "Data 12" },
      ];
    
  return (
    <div className="overflow-x-auto w-[100%] flex justify-center">
    {data.length === 0 ? (
      <div className="text-center py-4">
        <p>No hay solicitudes disponibles D:</p>
      </div>
    ) : (
      <table className="w-[100%] bg-white">
        <thead>
          <tr className="bg-cyan-100">
            <th className="py-2 px-4 border-b w-[15%]">Código</th>
            <th className="py-2 px-4 border-b w-[15%]">Nombre</th>
            <th className="py-2 px-4 border-b w-[15%]">Correo</th>
            <th className="py-2 px-4 border-b w-[40%]">Archivos</th>
            <th className="py-2 px-4 border-b w-[15%]">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="py-2 px-4 border-b">1152018</td>
            <td className="py-2 px-4 border-b">
              Steeven André Sayago Zumarraga
            </td>
            <td className="py-2 px-4 border-b break-all">
              steevenandresazu@ufps.edu.co
            </td>
            <td className="py-2 px-4 border-b text-left">
              <div className="flex justify-center gap-2 break-">
                <IoDocument className="text-4xl text-blue-950" />
                <IoDocument className="text-4xl text-blue-950" />
                <IoDocument className="text-4xl text-blue-950" />
              </div>
            </td>
            <td className="py-2 px-4 border-b">
              <div className="flex justify-center gap-3">
                <button className="bg-green-500 text-white p-2 rounded-md">
                  Subir
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    )}
  </div>
  )
}

export default SolicitudesAceptadas