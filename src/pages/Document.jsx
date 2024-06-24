import { Titulo } from "../Components/Titulo";
import { IoDocument } from "react-icons/io5";
import { Link, useParams, useNavigate } from "react-router-dom";
import ModalDocument from "../Components/ModalDocument";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Document() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [documento, setDocumento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Realizar la solicitud al backend para obtener los documentos
    infoDocumento();
  }, []);

  const data = {
    id,
  };
  console.log(data);
  

  const infoDocumento = async () => {
    try {
      const response = await axios.post(
        "https://backayd-production.up.railway.app/filtrarDocumentoPorID",
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

  const handleDeleteClick = async () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        "https://backayd-production.up.railway.app/eliminarDocumento",
        {
          data: { id },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Documento eliminado correctamente");
        // Redireccionar o actualizar la UI después de eliminar el documento
        Swal.fire({
          icon: "success",
          title: "Documento eliminado con éxito",
        });
        navigate("/homeAdmin/inicio-administrador");
      }
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
      // Manejar el error según tus necesidades (mostrar mensaje, etc.)
    }
    console.log("Elemento eliminado");
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar el documento: {error.message}</div>;
  }

  if (!documento) {
    return <div>No se encontró el documento</div>;
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Documento" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <h2 className="text-xl text-center font-bold">
          {documento.nombre}
        </h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Categoría</h3>
            <p>{documento.tipodocumento}</p>
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
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Visualización de archivos:</h3>
            {documento.estado === 1 &&(
              <p>Habilitado</p>
            )}
            {documento.estado === 0 &&(
              <p>Desahibitado</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Archivos</h3>
            <div className="flex gap-6">
              <div className="flex flex-col items-center w-[100px] break-all">
                <a href={documento.archivos} target="_blank" rel="noopener noreferrer">
                  <IoDocument className="text-4xl" />
                </a>
                <p className="text-center">Link</p>
              </div>
            </div>
          </div>
          <div className="flex gap-6">
            <button
              onClick={handleDeleteClick}
              className="bg-red-600 text-white px-3 py-1 rounded-md mt-4"
            >
              Eliminar documento
            </button>
            <ModalDocument
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
            <Link
              to={`/homeAdmin/editar-documento/${documento.id}`}
              className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4"
            >
              Editar documento
            </Link>
          </div>
        </div>
        <Link
          to={`/homeAdmin/lista-documentos/${documento.tipodocumento}`}
          className="bg-red-600 text-white py-2 px-4 rounded-md mt-10"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}

export default Document;
