import React, { useState } from "react";
import banner from "../assets/banner.png";
import { Titulo } from "../Components/Titulo";
import FileUpload from "../Components/FileUpload";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { MdOutlineSignalWifiStatusbarConnectedNoInternet4 } from "react-icons/md";

const CLIENT_ID =
  "656150395710-piilf5k7dor29rpi15q80q20a5o5vld5.apps.googleusercontent.com"; // Reemplaza con tu CLIENT_ID de Google OAuth
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const DRIVE_FOLDER_ID = "1L251mP-XeIuyK4Bf1tkd0T72n_8kGj51"; // Reemplaza con el ID de la carpeta de destino en Google Drive

export default function EnviarDocumento() {
  const [codigousuario, setCodigo] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [archivo, setArchivo] = useState(null);

  const handleFileSelect = (file) => {
    setArchivo(file); // Guardar el archivo seleccionado en el estado
  };

  const uploadFileToDrive = async () => {
    if (!archivo) {
      console.error("No hay archivo seleccionado");
      return;
    }

    const metadata = {
      name: archivo.name,
      mimeType: archivo.type,
      parents: [DRIVE_FOLDER_ID],
    };

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", archivo);

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
      return;
    }

    const fileLink = await uploadFileToDrive();

    if (fileLink) {
      try {
        const response = await axios.put("https://reposistemasback-production.up.railway.app/subirArchivo", {
          codigo: codigousuario,
          archivo: fileLink,
        });

        if (response.status === 200) {
          setCodigo("");
          setArchivo("");
          Swal.fire({
            icon: "success",
            title: "Archivo subido con éxito",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al guardar el archivo en la base de datos",
          });
        }
      } catch (error) {
        if (error.response.status === 404) {
          console.log("Si sirve");
          Swal.fire({
            title: "Error!",
            text: "No hay una solicitud asociada a este código.",
            icon: "warning",
            confirmButtonText: "Volver",
          });
        } else {
          console.error("Error al enviar el archivo al backend:", error);
        }
      }
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      Swal.fire({
        icon: "success",
        title: "Autenticado con éxito",
      });
      setAccessToken(tokenResponse.access_token);
    },
    onError: (error) => console.error("Error al autenticar:", error),
    scope: SCOPES,
  });

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div>
        <div className="w-full relative hidden md:block">
          <img src={banner} alt="banner" className="w-full" />
          <div className="absolute inset-0 flex flex-col gap-1 pr-8 justify-center">
            <h1 className="text-white text-5xl text-right font-bold">
              Repositorio Digital
            </h1>
            <h1 className="text-white text-4xl text-right font-bold">
              Programa Ingeniería de Sistemas{" "}
              <span className="text-5xl text-red-600">UFPS</span>
            </h1>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 pt-4 pb-4 bg-gray-100">
          <div className="w-[90%] border border-slate-300 p-4 flex flex-col items-center gap-6 rounded-md bg-white">
            <Titulo name="Enviar archivos" />
            <div className="flex flex-col items-center gap-6 border border-slate-300 w-full py-10 shadow-md px-10">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-6 md:items-start md:w-full md:gap-10"
              >
                <div className="flex flex-col items-center md:w-full md:items-center gap-3">
                  <p className="text-lg md:w-[30%] text-center">
                    Dígite su código:
                  </p>
                  <input
                    required
                    value={codigousuario}
                    onChange={(e) => setCodigo(e.target.value)}
                    type="text"
                    className="w-60 md:w-96 h-full bg-white outline-none border border-slate-400 rounded-md p-1 pl-5 pr-9 text-gray-900"
                  />
                </div>

                <FileUpload onFileSelect={handleFileSelect} />
                <div className="flex items-center md:flex-row md:w-full justify-center">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white px-3 py-1 rounded-md mt-4 items-center"
                  >
                    Enviar
                  </button>
                </div>
              </form>
              <p>Debes autenticarte con Google para poder subir el archivo.</p>
              <button
                onClick={login}
                className="mt-6 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Autenticar con Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
