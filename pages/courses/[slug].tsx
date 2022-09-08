import { Modal } from "@components/ui/common";
import {
  CourseCurriculam,
  CourseHero,
  CourseKeypoints,
} from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { course } from "interfaces/course";
import React from "react";

interface ICourse {
  course: course;
}

const Course: React.FC<ICourse> = ({ course }) => {
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
          title={course.title}
          description={course.description}
          coverImage={course.coverImage}
        />
      </div>
      <CourseKeypoints keypoints={course.wsl} />
      <CourseCurriculam lectures={lectures} locked={true} />
      <Modal />
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