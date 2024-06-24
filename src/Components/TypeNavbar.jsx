import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { NavbarHome } from "./NavbarHome";

export const TypeNavbar = () => {
  const location = useLocation();

  if (location.pathname === '/') {
    return <Navbar />
  } {/*else if (location.pathname === '/homeAdmin') {
    return <NavbarHome />
  }*/}
}
