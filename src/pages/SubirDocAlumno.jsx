import React, { useState, useEffect, useRef } from "react";
import { Titulo } from "../Components/Titulo";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { IoDocument } from "react-icons/io5";

export default function SubirDocAlumno() {
  const location = useLocation();
  const { archivo, descripcion, nombreproyecto } = location.state || {};

  const [categorias, setCategorias] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [input1, setInput1] = useState(nombreproyecto || "");
  const [input3, setInput3] = useState(descripcion || "");
  const [input4, setInput4] = useState("");
  const [fileLink, setFileLink] = useState(archivo || "");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const regex = /^20\d{2}-[12]$/;
    const currentYear = new Date().getFullYear();
    const inputYear = parseInt(value.slice(0, 4), 10);

    if (regex.test(value) && inputYear <= currentYear || value === "") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleChange1 = (e) => {
    const value = e.target.value;
    setInput1(value);
  };

  const handleChange3 = (e) => {
    const value = e.target.value;
    setInput3(value);
  };

  const handleChange4 = (e) => {
    const value = e.target.value;
    setInput4(value);
  };

  const handleCategoryChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedName = e.target.options[selectedIndex].text;
    setSelectedCategoryName(selectedName);
  };

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

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      nombre: input1,
      tipodocumento: event.target.tipodocumento.value,
      categoriaNombre: selectedCategoryName,
      descripcion: input3,
      miembros: input4,
      archivos: fileLink,
      semestre: inputValue,
      estado: isOn ? "1" : "0",
    };

    console.log(formData);

    try {
      const response = await fetch("https://reposistemasback-production.up.railway.app/insertarDocumento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Documento insertado con éxito:", data);
        Swal.fire({
          icon: "success",
          title: "Documento enviado con éxito",
        });
        setInput1("");
        setInputValue("");
        setInput3("");
        setInput4("");
        
      } else {
        console.error("Error al insertar el documento:", data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }

    try {
      const response = await fetch(
        "https://reposistemasback-production.up.railway.app/cantidadDeDocumentos"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        localStorage.setItem("NumDocs", data.documentos);
      } else {
        console.error("Error al obtener las categorías:", response.statusText);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Subir documento de Solicitud" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
        >
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Nombre del documento:</p>
            <div>
              <input
                value={input1}
                onChange={handleChange1}
                required
                type="text"
                name="nombre"
                placeholder="Dígite el nombre del documento"
                className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Semestre:</p>
            <div className="flex flex-col">
              <input
                required
                type="text"
                name="semestre"
                value={inputValue}
                onChange={handleChange}
                placeholder="Ingrese el semestre (ej, 2024-1)"
                className={`p-2 border w-60 md:w-80 h-full ${
                  isValid ? "border-slate-400" : "border-red-500"
                } rounded-md`}
              />
              {!isValid && (
                <p className="text-red-500 mt-2">
                  El formato debe ser 20XX-1 o 20XX-2.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Descripción:</p>
            <div>
              <textarea
                onChange={handleChange3}
                value={input3}
                required
                name="descripcion"
                className="w-60 md:w-80 h-40 bg-white outline-none border border-slate-400 rounded-md p-2 pl-5 pr-9 text-gray-900"
              />
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg md:w-[30%]">Integrantes:</p>
            <textarea
              onChange={handleChange4}
              value={input4}
              required
              name="miembros"
              placeholder="Ingrese los integrantes del documento"
              className="resize-none w-60 md:w-80 border border-slate-400 rounded-md h-20 pl-2 pr-2 text-sm pt-2"
            />
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg pb-2 md:w-[30%]">Categoría:</p>
            <div>
              <select
                name="tipodocumento"
                id="tipodocumento"
                className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
                onChange={(e) => {
                  handleCategoryChange(e);
                }}
              >
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
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg pb-2 md:w-[30%]">Archivos:</p>
            <div>
            <a
                        href={archivo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IoDocument className="text-4xl text-blue-950" />
                      </a>
            </div>
          </div>
          <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
            <p className="text-lg pb-2 md:w-[30%]">
              Habilitar/Desahibilitar vista de archivos:
            </p>
            <div
              className={`relative inline-flex h-8 w-16 cursor-pointer rounded-full items-center transition-colors duration-300 ease-in-out ${
                isOn ? "bg-violet-950" : "bg-gray-300"
              }`}
              onClick={toggleSwitch}
            >
              <span
                className={`absolute left-0 inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform duration-300 ease-in-out ${
                  isOn ? "translate-x-8" : "translate-x-0"
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center md:flex-row md:w-full md:items-start">
            <button
              type="submit"
              className="bg-emerald-900 text-white py-2 px-4 rounded-md hover:bg-emerald-950"
              disabled={!isValid}
            >
              Subir
            </button>
            {!isValid && (
              <p style={{ color: "red" }}>
                El formato del semestre es incorrecto.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
