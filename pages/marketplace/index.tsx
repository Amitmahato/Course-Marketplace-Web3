import { CourseList } from "@components/ui/course";
import { Wallet } from "@components/ui/web3";
import { useAccount } from "@components/web3/hooks/useAccount";
import { getAllCourses } from "@content/courses/fetcher";
import React from "react";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  return (
    <>
      <div className="py-4">
        <Wallet address={account.data} />
      </div>
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
