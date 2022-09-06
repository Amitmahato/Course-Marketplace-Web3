import { Web3Provider } from "@components/providers";
import { NavBar, Footer } from "@components/ui/common";
import React from "react";

export default function Card({ children }) {
  return (
    <Web3Provider>
      <div className="max-w-7xl mx-auto px-4">
        <NavBar />
        <div className="fit">{children}</div>
      </div>
      <Footer />
    </Web3Provider>
  );
}
