import { Routes, Route } from "react-router-dom";
import { Home, HomeAdmin, Login } from "../pages/index";
import { CreateCategory } from "../pages/CreateCategory";
import Perfil from "../pages/Perfil";
import NuevaContraena from "../pages/NuevaContraena";
import ActualizarDatos from "../pages/ActualizarDatos";
import SubirDocumento from "../pages/SubirDocumento";
import InicioAdmin from "../pages/InicioAdmin";
import ListDocumentos from "../pages/ListDocumentos";
import GenerarInforme from "../pages/GenerarInforme";
import ListSolicitudes from "../pages/ListSolicitudes";
import Document from "../pages/Document";
import EditarCategoria from "../pages/EditarCategoria";
import InicioUser from "../pages/InicioUser";
import ListDocsUser from "../pages/ListDocsUser";
import DocsUser from "../pages/DocsUser";
import EnviarSolicitud from "../pages/EnviarSolicitud";
import NuevaContra from "../pages/NuevaContra";
import EditarDoc from "../pages/EditarDoc";
import EnviarDocumento from "../pages/EnviarDocumento";

const AppRouter = () => {
  return (
    <>
      <Routes>
      <Route path="enviar" element={<EnviarDocumento />} />
        <Route path="/" element={<Home />}>
          <Route index element={<InicioUser />} />
          <Route path="lista-docs/:id" element={<ListDocsUser />} />
          <Route path="documentoUser/:id" element={<DocsUser />} />
          <Route path="enviar-solicitud" element={<EnviarSolicitud />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="olvidaste-contraseña" element={<NuevaContra />} />
        <Route path="homeAdmin" element={<HomeAdmin />}>
          <Route path="crear-categoria" element={<CreateCategory />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="actualizar-contraseña" element={<NuevaContraena />} />
          <Route path="actualizar-datos" element={<ActualizarDatos />} />
          <Route path="subir-documento" element={<SubirDocumento />} />
          <Route path="inicio-administrador" element={<InicioAdmin />} />
          <Route path="lista-documentos/:id" element={<ListDocumentos />} />
          <Route path="documento/:id" element={<Document />} />
          <Route path="editar-documento/:id" element={<EditarDoc />} />
          <Route path="generar-informe" element={<GenerarInforme />} />
          <Route path="lista-solicitudes" element={<ListSolicitudes />} />
          <Route path="editar-categoria" element={<EditarCategoria />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
