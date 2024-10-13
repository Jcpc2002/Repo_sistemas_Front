import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaFile, FaFileDownload } from "react-icons/fa";

const FileUpload = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);

    // Llamar a la función onFileSelect para pasar el archivo al componente padre
    if (onFileSelect) {
      onFileSelect(acceptedFiles[0]); // Pasamos solo el primer archivo para simplicidad
    }
  };

  const removeFile = (file) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
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
            <p className="text-blue-700 text-center">Suelta los archivos aquí...</p>
          ) : (
            <p className="text-gray-700 text-center">
              Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar archivos
            </p>
          )}
        </div>
      </div>

      {/* Lista de archivos subidos */}
      <div className="mt-4">
        {files.map((file, index) => (
          <div
            key={file.name}
            className="flex items-center justify-between p-2 mb-2 bg-white border rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-2">
              <FaFile />
              <span className="text-gray-700">{file.name}</span>
            </div>
            <button
              onClick={() => removeFile(file)}
              className="px-2 py-1 text-white bg-red-500 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
