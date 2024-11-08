import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

function NewSolicitudes() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchSolicitudes = async () => {
      try {
        const response = await fetch("https://reposistemasback-production.up.railway.app/traerSolicitudesPendientes");
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
  
  const handleAceptarSolicitud = async (solicitud) => {
    try {
      const response = await fetch("https://reposistemasback-production.up.railway.app/enviarCorreo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo: solicitud.correo, codigo: solicitud.codigousuario, nombre: solicitud.nombre }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Solicitud aceptada",
        });
        console.log(`Correo enviado a ${solicitud.correo} exitosamente.`);

        setData(data.filter((item) => item.codigousuario !== solicitud.codigousuario));
      } else {
        console.error("Error al enviar el correo.");
      }
    } catch (error) {
      console.error("Error de conexión al enviar el correo:", error);
    }
  };

  const handleRechazarSolicitud = async (solicitud) => {
    
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer. ¿Deseas rechazar esta solicitud?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, rechazar",
      cancelButtonText: "Cancelar",
    });
  
    
    if (resultado.isConfirmed) {
      try {
        const response = await fetch("https://reposistemasback-production.up.railway.app/rechazarSolicitud", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ codigousuario: solicitud.codigousuario }),
        });
  
        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Solicitud rechazada",
          });
          
          
          setData(data.filter((item) => item.codigousuario !== solicitud.codigousuario));
        } else {
          console.error("Error al rechazar la solicitud.");
        }
      } catch (error) {
        console.error("Error de conexión al rechazar la solicitud:", error);
      }
    }
  };

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
              <th className="py-2 px-4 border-b w-[40%]">Descripción</th>
              <th className="py-2 px-4 border-b w-[15%]">Acción</th>
            </tr>
          </thead>
          <tbody>
            {data.map((solicitud, index) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b">{solicitud.codigousuario}</td>
                <td className="py-2 px-4 border-b">{solicitud.nombre}</td>
                <td className="py-2 px-4 border-b break-all">{solicitud.correo}</td>
                <td className="py-2 px-4 border-b text-center">{solicitud.descripcion}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-center gap-3">
                    <button
                      className="bg-green-500 text-white p-2 rounded-full"
                      onClick={() => handleAceptarSolicitud(solicitud)}
                    >
                      <FaCheck />
                    </button>
                    <button className="bg-red-700 text-white p-2 rounded-full"
                      onClick={() => handleRechazarSolicitud(solicitud)}
                    >
                      <IoClose />
                    </button>
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

export default NewSolicitudes;