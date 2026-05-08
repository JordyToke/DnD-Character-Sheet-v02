import React, { useState } from "react";
import type { Route } from "./+types/Layout";
import { Outlet } from "react-router";
import { Footer, Header } from "./components";
// import useMousePosition from "./hooks/useMousePosition";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "DnD Character Tracker" },
    { name: "description", content: "DnD Character Tracker" },
  ];
}

const Layout = () => {
  // const mousePosition = useMousePosition();

  return (
    <>
        <Header />
      <main>
        {/* <p>Mouse Position: x={mousePosition.x} y={mousePosition.y}</p> */}
        <Outlet />
      </main>
        <Footer />
    </>
  );
};

export default Layout;
