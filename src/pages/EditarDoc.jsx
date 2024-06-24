import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Titulo } from "../Components/Titulo";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";

const CLIENT_ID =
  "656150395710-piilf5k7dor29rpi15q80q20a5o5vld5.apps.googleusercontent.com"; // Reemplaza con tu CLIENT_ID de Google OAuth
const API_KEY = "AIzaSyCdqjyr2Y9j8RVbsbfWaBPJ_He0FBaGhak"; // Reemplaza con tu API KEY de Google

const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DRIVE_FOLDER_ID = "1L251mP-XeIuyK4Bf1tkd0T72n_8kGj51"; // Reemplaza con el ID de la carpeta de destino en Google Drive

export default function editarDocumento() {
  const [categorias, setCategorias] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const [fileNames, setFileNames] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [fileLinks, setFileLinks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [input1, setInput1] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const { id } = useParams();

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const regex = /^20\d{2}-[12]$/;
    if (regex.test(value) || value === "") {
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

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(
        "https://backayd-production.up.railway.app/traerCategoria"
      );
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

  const verifyTokenScopes = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
      );
      console.log(response.data);
      return response.data.scope;
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return null;
    }
  };

  const handleFileClick = async (event) => {
    event.preventDefault();

    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "No se ha autenticado con Google.",
      });
      console.error("No se ha autenticado con Google.");
      return;
    }

    const tokenScopes = await verifyTokenScopes(accessToken);
    if (!tokenScopes.includes(SCOPES)) {
      Swal.fire({
        icon: "error",
        title: "El token de acceso no tiene los scopes necesarios.",
      });
      console.error("El token de acceso no tiene los scopes necesarios.");
      return;
    }

    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    setFileNames(files);
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  const uploadFileToDrive = async (file) => {
    const metadata = {
      name: file.name,
      mimeType: file.type,
      parents: [DRIVE_FOLDER_ID], // ID de la carpeta de destino en Google Drive
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    try {
      const response = await axios.post(
        `https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id`,
        form,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/related",
          },
        }
      );

      const fileLink = `https://drive.google.com/file/d/${response.data.id}/view`;
      return fileLink;
    } catch (error) {
      console.error("Error al subir archivo a Google Drive:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileLinks = await Promise.all(
      fileNames.map((file) => uploadFileToDrive(file))
    );
    setFileLinks(fileLinks);

    const formData = {
      id,
      nombre: event.target.nombre.value,
      tipodocumento: event.target.tipodocumento.value,
      descripcion: event.target.descripcion.value,
      miembros: event.target.miembros.value,
      archivos: fileLinks,
      semestre: inputValue,
      estado: isOn ? "1" : "0",
    };

    console.log(formData);

    try {
      const response = await fetch(
        "https://backayd-production.up.railway.app/editarDocumento",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Documento editado con éxito:", data);
        Swal.fire({
          icon: "success",
          title: "Documento editado con éxito",
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
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      Swal.fire({
        icon: "success",
        title: "Autenticado con éxito",
      });
      console.log("Autenticación exitosa:", tokenResponse);
      setAccessToken(tokenResponse.access_token);
    },
    onError: (error) => console.error("Error al autenticar:", error),
    scope: SCOPES,
  });

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="flex flex-col items-center pt-6 pb-6">
        <Titulo name="Editar documento" />
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
              <p className="text-lg md:w-[30%]">Tipo de documento:</p>
              <div>
                <select
                  required
                  name="tipodocumento"
                  className="w-60 md:w-80 h-full bg-white outline-none border border-slate-400 rounded-md p-2 pl-5 pr-9 text-gray-500"
                >
                  <option value="">Seleccionar una opción</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Descripción:</p>
              <div>
                <textarea
                  value={input3}
                  onChange={handleChange3}
                  required
                  name="descripcion"
                  className="w-60 md:w-80 h-40 bg-white outline-none border border-slate-400 rounded-md p-2 pl-5 pr-9 text-gray-900"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Integrantes:</p>
              <div>
                <textarea
                  value={input4}
                  onChange={handleChange4}
                  required
                  type="text"
                  name="miembros"
                  className="resize-none w-60 md:w-80 border border-slate-400 rounded-md h-20 pl-2 pr-2 text-sm pt-2"
                />
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Adjuntar archivos:</p>
              <div className="flex flex-col items-center md:flex-row md:w-full md:gap-10">
                <button
                  onClick={handleFileClick}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Seleccionar archivos
                </button>
                <input
                  id="fileInput"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
                {fileNames.length > 0 && (
                  <ul className="mt-2">
                    {fileNames.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg md:w-[30%]">Habilitar/Desahibilitar vista de archivos:</p>
              <div>
                <div
                  onClick={toggleSwitch}
                  className={`relative inline-flex h-8 w-16 cursor-pointer rounded-full items-center transition-colors duration-300 ease-in-out ${
                    isOn ? "bg-violet-950" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`absolute left-0 inline-block h-7 w-7 transform rounded-full bg-white shadow transition-transform duration-300 ease-in-out  ${
                      isOn ? "translate-x-8" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                type="button"
                onClick={() => login()}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4"
              >
                Autenticarse con Google
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Enviar
              </button>
            </div>
            <div>
              <Link to={`/homeAdmin/documento/${id}`}>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md">
                  Regresar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
