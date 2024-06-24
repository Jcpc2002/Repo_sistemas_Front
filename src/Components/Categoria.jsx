export const Categoria = (props) => {
  return (
    <div className="bg-black text-white w-[300px] rounded-md h-[150px] flex justify-center items-center mt-10">
      <h1 className="text-xl">{props.nombre}</h1>
    </div>
  );
};
