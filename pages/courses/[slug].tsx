import { Modal } from "@components/common";
import {
  CourseCurriculam,
  CourseHero,
  CourseKeypoints,
} from "@components/course";
import { BaseLayout } from "@components/layout";
import React from "react";

export default function Course() {
  const lectures = [
    "How to init App",
    "How to get a help",
    "Introduction to Solidity",
    "Programing in C++",
    "How to write For Loops",
    "Safe operator",
  ];

  return (
    <BaseLayout>
      <div className="py-4">
        <CourseHero />
      </div>
      <CourseKeypoints />
      <CourseCurriculam lectures={lectures} />
      <Modal />
    </BaseLayout>
  );
}
