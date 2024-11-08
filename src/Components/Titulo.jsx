import React from "react";

export const Titulo = (props) => {
  return (
    <div className="flex justify-center bg-[#07244C] text-white w-[80%] py-2 rounded-md">
      <h1 className="text-xl uppercase text-center">{props.name}</h1>
    </div>
  );
};
