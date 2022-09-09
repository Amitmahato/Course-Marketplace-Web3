import { course } from "interfaces/course";
import React from "react";
import { CourseCard } from "..";

interface IList {
  courses: course[];
  children: (course: course) => React.ReactElement<typeof CourseCard>;
}

const List: React.FC<IList> = ({ courses, children }) => {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => children(course))}
    </section>
  );
};

export default List;
