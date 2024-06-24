import React from "react";
import { Link } from "react-router-dom";

export const CategoriasAdmin = (props) => {
  return (
    <Link 
      to={`/homeAdmin/lista-documentos/${props.link}`} 
      className="bg-slate-950 w-[200px] text-wrap text-white flex justify-center items-center h-[100px] rounded-md uppercase border border-b-8 border-blue-900"
    >
      <h2>{props.name}</h2>
    </Link>
  );
};
