import Image from "next/image";
import React from "react";

interface IList {
  courses: {
    id: string;
    type: string;
    title: string;
    description: string;
    coverImage: string;
    author: string;
    link: string;
    slug: string;
    wsl: string[];
    createdAt: string;
  }[];
}

const List: React.FC<IList> = ({ courses }) => {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => (
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
              <a
                href={course.link}
                className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
              >
                {course.title}
              </a>
              <p className="mt-2 text-gray-500">{course.description}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default List;
