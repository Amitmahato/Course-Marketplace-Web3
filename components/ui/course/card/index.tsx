import { course } from "interfaces/course";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ICourse {
  course: course;
  Footer?: React.JSXElementConstructor<any>;
}

const List: React.FC<ICourse> = ({ course, Footer }) => {
  return (
    <div
      key={course.id}
      className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div className="flex h-full">
        <div className="flex-1 h-full">
          <Image
            className="object-cover"
            src={course.coverImage}
            alt={course.title}
            layout="responsive"
            width="200"
            height="320"
          />
        </div>
        <div className="flex-2 p-8 pb-4 flex flex-col">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-gray-500">{course.description}</p>
          {Footer && (
            <div className="mt-4 flex-1 flex">
              <div className="h-45 flex flex-col justify-end">
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
