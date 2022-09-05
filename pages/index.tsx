import { Breadcrumb, Footer, Hero, NavBar } from "@components/common";
import { CourseList } from "@components/course";
import { OrderCard } from "@components/order";
import { EthereumRate, Wallet } from "@components/web3";
import React from "react";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <NavBar />
          <div className="fit">
            <Hero />
            <Breadcrumb />
            <Wallet />
            <EthereumRate />
            <OrderCard />
            <CourseList />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
