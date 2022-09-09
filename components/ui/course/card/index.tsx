import { course } from "interfaces/course";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ICourse {
  course: course;
}

const List: React.FC<ICourse> = ({ course }) => {
  return (
    <div
      key={course.id}
      className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"
    >
      <div className="flex h-full">
        <div className="flex h-full">
          <Image
            className="object-cover"
            src={course.coverImage}
            alt={course.title}
            layout="fixed"
            width={200}
            height={230}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <a className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </a>
          </Link>
          <p className="mt-2 text-gray-500">{course.description}</p>
        </div>
      </div>
    </div>
  );
};

export default List;