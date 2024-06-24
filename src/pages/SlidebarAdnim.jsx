import React from "react";
import { Routes, Route } from "react-router-dom";
import { CreateCategory } from "./CreateCategory";

export const SlidebarAdnim = () => {
  return (
    <React.Fragment>
      <section>
          <Routes>
            <Route
              path="/createCategory"
              element={<CreateCategory />}
            />
          </Routes>
      </section>
    </React.Fragment>
  );
};
