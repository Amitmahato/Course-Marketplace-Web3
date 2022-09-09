import { CourseList } from "@components/ui/course";
import { Wallet } from "@components/ui/web3";
import { useAccount } from "@components/hooks/web3/useAccount";
import { getAllCourses } from "@content/courses/fetcher";
import React from "react";
import { useNetwork } from "@components/hooks/web3/useNetwork";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      <div className="py-4">
        <Wallet address={account.data} network={network.data} />
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
