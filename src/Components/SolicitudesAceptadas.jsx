import { IoDocument } from "react-icons/io5";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SolicitudesAceptadas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch(
          "https://reposistemasback-production.up.railway.app/traerSolicitudesAceptadas"
        );
        const result = await response.json();
        console.log(result);
        if (response.ok) {
          setData(result.data);
        } else {
          console.error("Error al traer las solicitudes:", result.message);
        }
      } catch (error) {
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSolicitudes();
  }, []);

  return (
    <div className="overflow-x-auto w-[100%] flex justify-center">
      {loading ? (
        <div className="text-center py-4">
          <p>Cargando solicitudes...</p>
        </div>
      ) : data.length === 0 ? (
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
              <th className="py-2 px-4 border-b w-[15%]">Proyecto</th>
              <th className="py-2 px-4 border-b w-[40%]">Archivos</th>
              <th className="py-2 px-4 border-b w-[15%]">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((solicitud, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">
                  {solicitud.codigousuario}
                </td>
                <td className="py-2 px-4 border-b">{solicitud.nombre}</td>
                <td className="py-2 px-4 border-b break-all">
                  {solicitud.correo}
                </td>
                <td className="py-2 px-4 border-b">{solicitud.nombreproyecto}</td>
                <td className="py-2 px-4 border-b text-left">
                  <div className="flex justify-center gap-2">
                    {solicitud.archivo ? (
                      <a
                        href={solicitud.archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoDocument className="text-4xl text-blue-950" />
                      </a>
                    ) : (
                      <p></p>
                    )}
                  </div>
                </td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center gap-3">
                    <Link
                      to={`/homeAdmin/subir-doc-solicitudes/${solicitud.id}`}
                      className="bg-emerald-600 text-white p-2 rounded-md"
                      state={{
                        archivo: solicitud.archivo,
                        descripcion: solicitud.descripcion,
                        nombreproyecto: solicitud.nombreproyecto,
                      }}
                    >
                      Enviar
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SolicitudesAceptadas;
