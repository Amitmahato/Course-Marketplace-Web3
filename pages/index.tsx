import { useWeb3 } from "@components/providers";
import { Hero } from "@components/ui/common";
import { CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import React from "react";

export default function Home({ courses }) {
  const { web3, isLoading } = useWeb3();
  console.log(web3);
  return (
    <>
      {isLoading
        ? "Web3 Is Loading..."
        : web3
        ? "Web3 Initialised"
        : "Please, Install Metamask"}
      <Hero />
      <CourseList courses={courses} />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data },
  };
}
