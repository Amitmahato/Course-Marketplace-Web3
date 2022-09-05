import { Modal } from "@components/common";
import {
  CourseCurriculam,
  CourseHero,
  CourseKeypoints,
} from "@components/course";
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
    <div className="relative max-w-7xl mx-auto px-4">
      <CourseHero />
      <CourseKeypoints />
      <CourseCurriculam lectures={lectures} />
      <Modal />
    </div>
  );
}
