import { Titulo } from "../Components/Titulo";
import { IoDocument } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import ModalDocument from "../Components/ModalDocument";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

function DocsUser() {
  const { id } = useParams();
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    infoDocumento();
  }, []);

  const data = {
    id,
  };
  console.log(data);

  const infoDocumento = async () => {
    try {
      const response = await axios.post(
        "https://backayd-production-d897.up.railway.app/filtrarDocumentoPorID",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Informacion de documento traida", response.data);
        // Extraer el documento de la respuesta y actualizar el estado
        const { documentos } = response.data;
        if (Array.isArray(documentos) && documentos.length > 0) {
          setDocumento(documentos[0]); // Obtener el primer documento del array
        } else {
          console.error("La respuesta no contiene documentos:", response.data);
          setDocumento(null);
        }
      }
    } catch (error) {
      console.error("Error al traer los datos:", error);
      setError(error);
      setDocumento(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
        }}
      >
        <ReactLoading type="spin" color="#00BFFF" height={100} width={100} />
      </div>
    );
  }

  if (error) {
    return <div>Error al cargar el documento: {error.message}</div>;
  }

  if (!documento) {
    return <div>No se encontró el documento</div>;
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-6 bg-gray-100">
      <Titulo name="Documento" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <h2 className="text-xl text-center font-bold">{documento.nombre}</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Categoría</h3>
            <p>{documento.nombreCategoria}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Descripción</h3>
            <p>{documento.descripcion}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Miembros</h3>
            <p>{documento.miembros.split("\n").join(", ")}</p>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Semestre</h3>
            <p>{documento.semestre}</p>
          </div>
          {documento.estado === 1 && (
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold">Archivos</h3>
              <div className="flex gap-6">
                <div className="flex flex-col items-center w-[100px] break-all">
                  <a
                    href={documento.archivos}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoDocument className="text-4xl" />
                  </a>
                  <p className="text-center">Link</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <Link
          to={`/lista-docs/${documento.tipodocumento}`}
          className="bg-red-700 text-white py-2 px-4 rounded-md mt-10"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}

export default DocsUser;
