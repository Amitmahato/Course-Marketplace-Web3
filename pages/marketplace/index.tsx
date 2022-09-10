import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import React, { useState } from "react";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { course } from "interfaces/course";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { MarketHeader } from "@components/ui/marketplace";

export default function Marketplace({ courses }) {
  const { canPurchaseCourse } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState<course>(null);

  return (
    <>
      <div className="py-4">
        <MarketHeader />
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
