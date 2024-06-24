import { Titulo } from "../Components/Titulo";
import { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function ListDocumentos() {
  const [documentos, setDocumentos] = useState([]);
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [temp, setTemp] = useState([]);

  function buscar(nombre) {
    const temp = [...documentos]
    console.log (temp)
    console.log(nombre)
    setTemp(temp.filter((doc)=>doc.nombre.startsWith(nombre)))
  }
  

  useEffect(() => {
    // Realizar la solicitud al backend para obtener info
    traerDocumentos();
    infoCategoria();
  }, []);

  const data = {
    id,
  };
  console.log(data);



  const infoCategoria = async () => {
    try {
      const response2 = await axios.post(
        "https://backayd-production.up.railway.app/traerCategoriasPorId",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response2.status === 200) {
        console.log("Informacion de categoria traida", response2.data);
        // Extraer la categoria de la respuesta y actualizar el estado
        const  categorias  = response2.data.data;
        if ( categorias.length > 0) {
          setCategoria(categorias[0]); // Obtener la primer categoria del array
        } else {
          console.error("La respuesta no contiene categorias:", response2.data.data);
          setCategoria(null);
        }
      }
    } catch (error) {
      console.error("Error al traer los datos:", error);
      setError(error);
      setCategoria(null);
    } finally {
      setLoading(false);
    }
  };

  const traerDocumentos = async () => {
    try {
      const response = await axios.post(
        "https://backayd-production.up.railway.app/filtrarDocumentosPorCategoria",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Documentos traidos", response.data);
        // Extraer los documentos de la respuesta y actualizar el estado
        const { documentos } = response.data;
        if (Array.isArray(documentos)) {
          setTemp(documentos);
          setDocumentos(documentos);
        } else {
          console.error("La respuesta no contiene un array de documentos:", response.data);
          setDocumentos([]);
        }
      }
    } catch (error) {
      console.error("Error al traer los datos:", error);
      setDocumentos([]);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error al cargar la categoria: {error.message}</div>;
  }

  if (!categoria) {
    return <div>No se encontró la categoria</div>;
  }

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name={categoria.nombre}/>
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <div className="w-[100%] flex justify-between">
          <div className="flex flex-col items-start gap-1 pr-24">
            <h2 className="font-bold text-lg">Descripción:</h2>
            <p>
              {categoria.descripcion}
            </p>
          </div>
          <div>
            <Link
              to="/homeAdmin/inicio-administrador"
              className="bg-red-600 text-white py-2 px-4 rounded-md"
            >
              Volver
            </Link>
          </div>
        </div>
        <div className="w-[100%] pt-4">
          <form className="flex gap-3" action="">
            <input
              type="text"
              className="w-[70%] md:w-[40%] border border-slate-500 rounded-md pl-3 pr-3"
              onChange={ (e)=> buscar(e.target.value)}

            />
            <button className="bg-emerald-600 text-white px-3 py-1 rounded-md">
              Buscar
            </button>
          </form>
        </div>
        <div className="overflow-x-auto w-[100%] flex justify-center">
          {documentos.length === 0 ? (
            <div className="text-center py-4">
              <p>No hay documentos almacenados en esta categoría.</p>
            </div>
          ) : (
            <table className="w-[100%] bg-white">
              <thead>
                <tr className="bg-cyan-100">
                  <th className="py-2 px-4 border-b w-[40%]">Nombre</th>
                  <th className="py-2 px-4 border-b w-[20%]">Categoría</th>
                  <th className="py-2 px-4 border-b w-[20%]">Miembros</th>
                  <th className="py-2 px-4 border-b w-[20%]">Ver más</th>
                </tr>
              </thead>
              <tbody>
              {temp.map((documento) => (
                  <tr className="text-center" key={documento.id}>
                    <td className="py-2 px-4 border-b text-left">{documento.nombre}</td>
                    <td className="py-2 px-4 border-b">{categoria.nombre}</td>
                    <td className="py-2 px-4 border-b">{documento.miembros.split("\n").join(", ")}</td>
                    <td className="py-2 px-4 border-b">
                      <Link
                        to={`/homeAdmin/documento/${documento.id}`}
                        className="flex justify-center"
                      >
                        <FaEye className="text-lg text-blue-950" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

