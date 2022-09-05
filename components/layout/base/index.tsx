import { NavBar, Footer } from "@components/common";
import React from "react";

export default function Card({ children }) {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <NavBar />
        <div className="fit">{children}</div>
      </div>
      <Footer />
    </>
  );
}
