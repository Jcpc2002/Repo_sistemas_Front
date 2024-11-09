import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFile, FaFileDownload } from "react-icons/fa";

const FileUpload = ({ onFileSelect }) => {
  const [file, setFile] = useState(null); // Solo un archivo

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0]; // Seleccionar solo el primer archivo
    setFile(Object.assign(selectedFile, { preview: URL.createObjectURL(selectedFile) }));

    // Llamar a la función onFileSelect para pasar el archivo al componente padre
    if (onFileSelect) {
      onFileSelect(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null); // Eliminar el archivo
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Desactivar selección múltiple
  });

  return (
    <div className="w-full max-w-lg mx-auto">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center w-full h-64 p-4 border-2 border-dashed rounded-lg cursor-pointer focus:outline-none ${
          isDragActive ? 'border-blue-400' : 'border-gray-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <FaFileDownload className="text-7xl text-gray-600" />
          {isDragActive ? (
            <p className="text-blue-700 text-center">Suelta el archivo aquí...</p>
          ) : (
            <p className="text-gray-700 text-center">
              Arrastra y suelta un archivo aquí, o haz clic para seleccionarlo
            </p>
          )}
        </div>
      </div>

      {/* Mostrar archivo subido */}
      {file && (
        <div className="mt-4 flex items-center justify-between p-2 bg-white border rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <FaFile />
            <span className="text-gray-700">{file.name}</span>
          </div>
          <button
            onClick={removeFile}
            className="px-2 py-1 text-white bg-red-500 rounded"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
