import { Breadcrumb, Hero } from "@components/common";
import { CourseList } from "@components/course";
import { BaseLayout } from "@components/layout";
import { OrderCard } from "@components/order";
import { EthereumRate, Wallet } from "@components/web3";
import React from "react";

export default function Home() {
  return (
    <BaseLayout>
      <Hero />
      <Breadcrumb />
      <Wallet />
      <EthereumRate />
      <OrderCard />
      <CourseList />
    </BaseLayout>
  );
}
