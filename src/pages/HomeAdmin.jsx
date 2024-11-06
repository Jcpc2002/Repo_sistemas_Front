import React from "react";
import { NavbarHome } from "../Components/NavbarHome";
import { HeaderHome } from "../Components/HeaderHome";
import { Outlet } from "react-router-dom";
import withAuthCheck from "../Components/withAuthCheck";

const HomeAdmin = () => {
  return (
      <div className="grid lg:grid-cols-4 xl:grid-cols-6">
        <NavbarHome />
        <main className="lg:col-span-3 xl:col-span-5 bg-gray-100 min-h-[100vh]">
          <HeaderHome />
          <div>
            <Outlet />
          </div>
        </main>
      </div>
  );
};

export default withAuthCheck(HomeAdmin);