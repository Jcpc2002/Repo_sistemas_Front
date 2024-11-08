import { Link } from "react-router-dom";

function CategoriasUser(props) {
  return (
    <Link
      to={`lista-docs/${props.link}`}
      style={{
        backgroundImage:
          "url('data:image/svg+xml,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221440%22 height=%22160%22 viewBox=%220 0 1440 160%22%3e%3cpath fill=%22%230e2a47%22 d=%22M0,0 L0,50 Q 360,150 720,50 Q 1080,0 1440,50 L 1440,160 L 0,160 Z%22 /%3e%3c/svg%3e')",
      }}
      className="bg-[#0e4694] w-[200px] text-wrap text-white flex justify-center items-center text-center h-[100px] rounded-md uppercase border border-b-8 transition-transform transform hover:scale-105 hover:shadow-xl hover:border-[#FFC107] p-4"
    >
      <h2 className="text-xl font-semibold tracking-wide">{props.name}</h2>
    </Link>
  );
}


export default CategoriasUser;

