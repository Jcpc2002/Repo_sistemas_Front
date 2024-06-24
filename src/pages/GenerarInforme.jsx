import { Titulo } from "../Components/Titulo";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import { PDFDocument, rgb } from "pdf-lib";

function GenerarInforme() {
  const generaInforme = async () => {
    try {
      const response = await fetch("https://backayd-production.up.railway.app/informe", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log("Data received:", data);

      // Create the PDF document
      const pdfDoc = await PDFDocument.create();
      let page = pdfDoc.addPage();
      const { width, height } = page.getSize();
      const fontSize = 18;

      let textYPosition = height - fontSize * 2;

      // Function to add a new page when necessary
      const addNewPage = () => {
        page = pdfDoc.addPage();
        textYPosition = height - fontSize;
      };

      // Add text to the page and check if a new page is needed
      const addText = (text, size = fontSize, lineSpacing = 12) => {
        if (textYPosition < size * 2) {
          addNewPage();
        }
        page.drawText(text, {
          x: 50,
          y: textYPosition,
          size: size,
          color: rgb(0, 0, 0),
        });
        textYPosition -= size + lineSpacing;
      };

      // Add title
      addText("*Informe de Proyectos y Solicitudes", fontSize, 30);

      // Add document types and project counts
      addText("*Categorías y Cantidad de Proyectos:", fontSize, 16);
      data.tipoDocumentoCantidad.forEach((tipo) => {
        addText(`${tipo.nombre}: ${tipo.cantidadDeProyectos} proyectos`, fontSize - 2, 12);
      });

      // Add total project count
      addText("*Cantidad Total de Proyectos:", fontSize, 16);
      addText(`${data.totalProyectos.cantidadTotalDeProyectos} proyectos`, fontSize - 2, 12);

      // Add projects in the last 10 days
      addText("*Cantidad de Proyectos en los Últimos 10 Días:", fontSize, 16);
      addText(`${data.proyectosUltimos10Dias.cantidadDeProyectosEnLosUltimos10Dias} proyectos`, fontSize - 2, 12);

      // Add request count
      addText("*Cantidad de Solicitudes:", fontSize, 16);
      addText(`${data.totalSolicitudes.cantidadDeSolicitudes} solicitudes`, fontSize - 2, 12);

      // Add view count
      addText("*Cantidad de Vistas:", fontSize, 16);
      addText(`${data.totalVistas.cantidadVistas} vistas`, fontSize - 2, 12);

      // Save the PDF document
      const pdfBytes = await pdfDoc.save();

      // Download the PDF
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      saveAs(blob, `informe_${new Date().toISOString().slice(0, 10)}.pdf`);

      Swal.fire({
        icon: "success",
        title: "Se ha descargado el informe.",
      });
    } catch (error) {
      console.error("Network error:", error);
      Swal.fire({
        icon: "error",
        title: "Error al generar el informe.",
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center pt-6 pb-6">
      <Titulo name="Generar informe" />
      <div className="border border-slate-300 mt-6 flex flex-col p-6 w-[80%] items-center gap-4 rounded-md bg-white">
        <p className="text-center">
          Generar informe con toda la información relevante del aplicativo web
        </p>
        <button
          className="bg-emerald-600 text-white px-3 py-1 rounded-md"
          onClick={generaInforme}
        >
          Generar
        </button>
      </div>
    </div>
  );
}

export default GenerarInforme;
