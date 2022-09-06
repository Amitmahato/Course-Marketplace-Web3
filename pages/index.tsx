import { Breadcrumb, Hero } from "@components/common";
import { CourseList } from "@components/course";
import { BaseLayout } from "@components/layout";
import { OrderCard } from "@components/order";
import { EthereumRate, Wallet } from "@components/web3";
import { getAllCourses } from "@content/courses/fetcher";
import React from "react";

export default function Home({ courses }) {
  return (
    <BaseLayout>
      <Hero />
      {/* <Breadcrumb />
      <Wallet />
      <EthereumRate />
      <OrderCard /> */}
      <CourseList courses={courses} />
    </BaseLayout>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data },
  };
}
