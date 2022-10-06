import { COURSE_STATE } from "@utils/normalize";
import { course } from "interfaces/course";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AnimateKeyframes } from "react-simple-animate";

interface ICourse {
  course: course;
  disabled?: boolean;
  Footer?: React.JSXElementConstructor<any>;
  courseState?: COURSE_STATE;
}

const List: React.FC<ICourse> = ({
  course,
  disabled = false,
  Footer,
  courseState,
}) => {
  return (
    <div
      key={course.id}
      className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div className="flex h-full">
        <div className="flex-1 h-full">
          <Image
            className={`${disabled && "filter grayscale"} object-cover`}
            src={course.coverImage}
            alt={course.title}
            layout="responsive"
            width="200"
            height="320"
          />
        </div>
        <div className="flex-2 p-8 pb-4 flex flex-col">
          <div className="flex items-center">
            <div className="uppercase mr-2 tracking-wide text-sm text-indigo-500 font-semibold">
              {course.type}
            </div>
            <div>
              {courseState === COURSE_STATE.ACTIVATED && (
                <div className="text-xs text-black bg-green-200 p-1 px-3 rounded-full">
                  Activated
                </div>
              )}
              {courseState === COURSE_STATE.DEACTIVATED && (
                <div className="text-xs text-black bg-red-200 p-1 px-3 rounded-full">
                  Deactivated
                </div>
              )}
              {courseState === COURSE_STATE.PURCHASED && (
                <AnimateKeyframes
                  play
                  duration={2}
                  keyframes={["opacity: 0.4", "opacity: 1", "opacity: 0.4"]}
                  iterationCount="infinite"
                >
                  <div className="text-xs text-black bg-yellow-200 p-1 px-3 rounded-full">
                    Pending
                  </div>
                </AnimateKeyframes>
              )}
            </div>
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="block mt-1 text-sm sm:text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            {course.description.substring(0, 70)}...
          </p>
          {Footer && (
            <div className="mt-4 flex-1 flex">
              <div className="h-45 flex flex-col justify-end flex-grow">
                <Footer />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
