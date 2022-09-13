import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import React, { useState } from "react";
import { Button } from "@components/ui/common";
import { IOrderState, OrderModal } from "@components/ui/order";
import { course } from "interfaces/course";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";

export default function Marketplace({ courses }) {
  const { canPurchaseCourse } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState<course>(null);
  const { contract } = useWeb3();

  const purchaseCourse = (order: IOrderState) => {
    console.log("Purchased Course Order: ", order);
  };

  return (
    <>
      {contract?.address}
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

      {!!selectedCourse && (
        <OrderModal
          open={!!selectedCourse}
          onClose={() => {
            setSelectedCourse(null);
          }}
          onSubmit={(order: IOrderState) => {
            purchaseCourse(order);
            setSelectedCourse(null);
          }}
          course={selectedCourse}
        />
      )}
    </>
  );
}

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: { courses: data },
  };
}
