import React, { useState, useEffect } from "react";
import axios from "axios";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Titulo } from "../Components/Titulo";
import Swal from "sweetalert2";

const CLIENT_ID =
  "656150395710-piilf5k7dor29rpi15q80q20a5o5vld5.apps.googleusercontent.com"; // Reemplaza con tu CLIENT_ID de Google OAuth
const API_KEY = "AIzaSyCdqjyr2Y9j8RVbsbfWaBPJ_He0FBaGhak"; // Reemplaza con tu API KEY de Google

const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DRIVE_FOLDER_ID = "1L251mP-XeIuyK4Bf1tkd0T72n_8kGj51"; // Reemplaza con el ID de la carpeta de destino en Google Drive

export default function SubirDocumento() {
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

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setFileNames(files);
  };

  const toggleSwitch = () => {
    setIsOn(!isOn);
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
      console.error("El token de acceso no tiene los scopes necesarios.");
      return;
    }

    const fileLinks = await Promise.all(
      fileNames.map((file) => uploadFileToDrive(file))
    );
    setFileLinks(fileLinks);

    const formData = {
      nombre: input1,
      tipodocumento: event.target.tipodocumento.value,
      descripcion: input3,
      miembros: input4,
      archivos: fileLinks,
      semestre: inputValue,
      estado: isOn ? "1" : "0",
    };

    console.log(formData);

    try {
      const response = await fetch("https://backayd-production.up.railway.app/insertarDocumento", {
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
        setFileNames([]);
      } else {
        console.error("Error al insertar el documento:", data.message);
      }
    } catch (error) {
      console.error("Error de red:", error);
    }

    try {
      const response = await fetch(
        "https://backayd-production.up.railway.app/cantidadDeDocumentos"
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
        <Titulo name="Subir documento" />
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
                <input type="file" multiple onChange={handleFileChange} />
              </div>
            </div>
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <p className="text-lg pb-2 md:w-[30%]">Habilitar/Desahibilitar vista de archivos:</p>
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
            <div className="flex flex-col items-center md:flex-row md:w-full md:items-start">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                disabled = {!isValid}
              >
                Subir
              </button>
              {!isValid && <p style={{ color: 'red' }}>El formato del semestre es incorrecto.</p>}
            </div>
          </form>
          <p>Debes autenticarte con Google para poder subir el archivo al documento.</p>
          <button
            onClick={() => login()}
            className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Autenticar con Google
          </button>
          
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
