import { Web3Provider } from "@components/providers";
import { NavBar, Footer } from "@components/ui/common";
import React from "react";
import Script from "next/script";

export default function Card({ children }) {
  return (
    <>
      <Script src="/js/truffle-contract.js" strategy="beforeInteractive" />
      <Web3Provider>
        <div className="max-w-7xl mx-auto px-4">
          <NavBar />
          <div className="fit">{children}</div>
        </div>
        <Footer />
      </Web3Provider>
    </>
  );
}
