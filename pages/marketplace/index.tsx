import { CourseCard, CourseList } from "@components/ui/course";
import { EthereumRate, Wallet } from "@components/ui/web3";
import { getAllCourses } from "@content/courses/fetcher";
import React, { useState } from "react";
import { Breadcrumb, Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { course } from "interfaces/course";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";

export default function Marketplace({ courses }) {
  const { canPurchaseCourse } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState<course>(null);

  return (
    <>
      <div className="pt-4">
        <Wallet />
        <EthereumRate />
        <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumb />
        </div>
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            disabled={!canPurchaseCourse}
            key={course.id}
            course={course}
            Footer={() => (
              <Button
                title="Purchase"
                variant="lightPurple"
                disabled={!canPurchaseCourse}
                onClick={() => setSelectedCourse(course)}
              />
            )}
          />
        )}
      </CourseList>

      <OrderModal
        open={!!selectedCourse}
        onClose={() => {
          setSelectedCourse(null);
        }}
        onSubmit={() => {
          setSelectedCourse(null);
        }}
        course={selectedCourse}
      />
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data },
  };
}
