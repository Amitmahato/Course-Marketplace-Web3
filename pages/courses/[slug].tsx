import { useOwnedCourse } from "@components/hooks/web3/useOwnedCourse";
import { useWalletInfo } from "@components/hooks/web3/useWalletInfo";
import { Message, Modal } from "@components/ui/common";
import { MessageTypes } from "@components/ui/common/message";
import {
  CourseCurriculam,
  CourseHero,
  CourseKeypoints,
} from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { COURSE_STATE } from "@utils/normalize";
import { course } from "interfaces/course";
import React from "react";

interface ICourse {
  course: course;
}

const Course: React.FC<ICourse> = ({ course }) => {
  const { account } = useWalletInfo();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  const courseState = ownedCourse.data?.state;
  const isLocked = [COURSE_STATE.PURCHASED, COURSE_STATE.DEACTIVATED].includes(
    courseState
  );

  const lectures = [
    "How to init App",
    "How to get a help",
    "Introduction to Solidity",
    "Programing in C++",
    "How to write For Loops",
    "Safe operator",
  ];

  return (
    <>
      <div className="py-4">
        <CourseHero
          hasOwner={ownedCourse.data?.owner === account.data}
          title={course.title}
          description={course.description}
          coverImage={course.coverImage}
        />
      </div>
      <CourseKeypoints keypoints={course.wsl} />
      {courseState && (
        <div className="max-w-5xl mx-auto">
          {courseState === COURSE_STATE.PURCHASED && (
            <Message type={MessageTypes.warning}>
              Course is purchased and waiting for the activation. Process can
              take upto 24 hours.
              <i className="block font-normal">
                In case of any questions, please contact mahatoa90@gmail.com
              </i>
            </Message>
          )}
          {courseState === COURSE_STATE.ACTIVATED && (
            <Message type={MessageTypes.success}>
              Eincode wishes you happy watching the course.
            </Message>
          )}
          {courseState === COURSE_STATE.DEACTIVATED && (
            <Message type={MessageTypes.danger}>
              Course has been deactivated due to incorrect purchase data. The
              functionality to watch the course has been temporarily disabled.
              <i className="block font-normal">
                Please contact mahatoa90@gmail.com
              </i>
            </Message>
          )}
        </div>
      )}
      <CourseCurriculam
        lectures={lectures}
        locked={isLocked}
        state={courseState}
      />
      <Modal open={false} />
    </>
  );
};

export function getStaticPaths() {
  const { data } = getAllCourses();

  return {
    paths: data.map((course) => ({
      params: { slug: course.slug },
    })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  const course = data.find((c) => c.slug === params.slug);
  return {
    props: {
      course,
    },
  };
}

export default Course;
