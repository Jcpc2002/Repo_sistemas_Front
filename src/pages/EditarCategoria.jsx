import { Titulo } from "../Components/Titulo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import axios from "axios";
import Swal from "sweetalert2";

function EditarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(null);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [descripcionCategoria, setDescripcionCategoria] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://backayd-production.up.railway.app/traerCategoria");
      if (response.ok) {
        const data = await response.json();
        setCategorias(data.data);
      } else {
        console.error("Error al obtener las categorías:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!idCategoriaSeleccionada) {
      console.error("No se ha seleccionado ninguna categoría para eliminar.");
      return;
    }

    try {
      const response = await axios.delete(
        "https://backayd-production.up.railway.app/eliminarCategoria",
        {
          data: { id: idCategoriaSeleccionada }, // Enviar el id de la categoría seleccionada
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Categoría eliminada correctamente");
        // Redireccionar o actualizar la UI después de eliminar la categoría
        Swal.fire({
          icon: "success",
          title: "Categoría eliminada con éxito",
        });
        navigate("/homeAdmin/inicio-administrador");
        // Aquí puedes agregar el código necesario para mostrar un mensaje de éxito, etc.
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      // Manejar el error según tus necesidades (mostrar mensaje, etc.)
    }

    setIsModalOpen(false);
  };

  const handleCategoriaChange = (event) => {
    const selectedId = event.target.value;
    setIdCategoriaSeleccionada(selectedId);
  };

  const handleNombreChange = (event) => {
    const nuevoNombre = event.target.value;
    setNombreCategoria(nuevoNombre);
  };

  const handleDescripcionChange = (event) => {
    const nuevaDescripcion = event.target.value;
    setDescripcionCategoria(nuevaDescripcion);
  };

  const handleEditarCategoria = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    if (!idCategoriaSeleccionada) {
      Swal.fire({
        icon: "error",
        title: "No se ha seleccionado ninguna categoría para editar.",
      });
      console.error("No se ha seleccionado ninguna categoría para editar.");
      return;
    }

    try {
      if (nombreCategoria || descripcionCategoria) {
        const response = await axios.put(
          "https://backayd-production.up.railway.app/editarCategoria",
          {
            id: idCategoriaSeleccionada,
            nombre: nombreCategoria,
            descripcion: descripcionCategoria,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Categoría editada correctamente");
          setNombreCategoria("");
          setDescripcionCategoria("");
          Swal.fire({
            icon: "success",
            title: "Categoría editada con éxito",
          });
          fetchCategorias();
          // Aquí puedes agregar el código necesario para mostrar un mensaje de éxito, etc.
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Tienes que cambiar minimo un dato.",
        });
      }
    } catch (error) {
      console.error("Error al editar la categoría:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Editar categoría" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
          <p className="text-lg pb-2 md:w-[40%]">
            Elige que categoría quieres editar:
          </p>
          <select
            name="categoria"
            id="id"
            className="w-90 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            onChange={handleCategoriaChange}
          >
            <option value="">Selecciona una categoría...</option>
            {categorias.map((categoria) => (
              <option
                key={categoria.id}
                value={categoria.id}
                className="text-xl"
              >
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="md:border md:border-slate-300 mt-3 flex flex-col p-6 w-[90%] items-center gap-4 md:gap-10 rounded-md bg-white">
          <form
            onSubmit={handleEditarCategoria}
            className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
          >
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Nuevo nombre:</p>
              <input
                type="text"
                className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
                value={nombreCategoria}
                onChange={handleNombreChange}
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Nueva descripción:</p>
              <textarea
                className="resize-none w-60 md:w-80 border border-slate-400 rounded-md h-20 pl-2 pr-2 text-sm pt-2"
                value={descripcionCategoria}
                onChange={handleDescripcionChange}
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="sumbit"
                className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={handleDeleteClick}
          className="bg-red-600 text-white px-3 py-1 rounded-md mt-4"
        >
          Eliminar categoría
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </div>
  );
}

export default EditarCategoria;
