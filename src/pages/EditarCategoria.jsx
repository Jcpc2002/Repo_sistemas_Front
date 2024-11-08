import { Titulo } from "../Components/Titulo";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditarCategoria() {
  const [categorias, setCategorias] = useState([]);
  const [idCategoriaSeleccionada, setIdCategoriaSeleccionada] = useState(null);
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [descripcionCategoria, setDescripcionCategoria] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch("https://reposistemasback-production.up.railway.app/traerCategoria");
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

  const handleConfirmDelete = async () => {
    if (!idCategoriaSeleccionada) {
      Swal.fire({
        icon: "error",
        title: "No se ha seleccionado ninguna categoría para eliminar.",
      });
      console.error("No se ha seleccionado ninguna categoría para eliminar.");
      return;
    }

    // Mostrar el cuadro de diálogo de confirmación con SweetAlert2
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminara todos los documentos asociados a esta categoria.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    // Si el usuario confirma, proceder con la eliminación
    if (resultado.isConfirmed) {
      try {
        const response = await axios.delete(
          "https://reposistemasback-production.up.railway.app/eliminarCategoria",
          {
            data: { id: idCategoriaSeleccionada },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("Categoría eliminada correctamente");
          Swal.fire({
            icon: "success",
            title: "Categoría eliminada con éxito",
          });
          navigate("/homeAdmin/inicio-administrador");
        }
      } catch (error) {
        console.error("Error al eliminar la categoría:", error);
      }
    }
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
    event.preventDefault();

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
          "https://reposistemasback-production.up.railway.app/editarCategoria",
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
        }
      } else {
        Swal.fire({
          icon: "warning",
          title: "Tienes que cambiar mínimo un dato.",
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
          <p className="text-lg pb-2 md:w-[40%]">Elige que categoría quieres editar:</p>
          <select
            name="categoria"
            id="id"
            className="w-90 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
            onChange={handleCategoriaChange}
          >
            <option value="">Selecciona una categoría...</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id} className="text-xl">
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
                placeholder="Dígite el nuevo nombre"
                onChange={handleNombreChange}
              />
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Nueva descripción:</p>
              <textarea
                className="resize-none w-60 md:w-80 border border-slate-400 rounded-md h-20 pl-2 pr-2 text-sm pt-2"
                value={descripcionCategoria}
                placeholder="Dígite la nueva descripción para la categoría"
                onChange={handleDescripcionChange}
              />
            </div>
            <div className="flex justify-center w-full">
              <button
                type="submit"
                className="bg-emerald-900 text-white px-3 py-1 rounded-md mt-4"
              >
                Guardar cambios
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={handleConfirmDelete}
          className="bg-red-700 text-white px-3 py-1 rounded-md mt-4"
        >
          Eliminar categoría
        </button>
      </div>
    </div>
  );
}

export default EditarCategoria;
