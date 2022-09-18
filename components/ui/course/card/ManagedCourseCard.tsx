import { camelCaseToTitleCaseString } from "@utils/utilityFunctions";
import { IManagedCourse } from "interfaces/course";
import React from "react";

const Item: React.FC<{ title: string; value: string; className?: string }> = ({
  title,
  value,
  className = "bg-gray-50",
}) => {
  return (
    <div className={`px-4 py-5 sm:grid sm:px-6 ${className}`}>
      <div className="text-sm font-medium text-gray-500">{title}</div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
        {value}
      </div>
    </div>
  );
};

interface IManagedCourseCard {
  course: IManagedCourse;
}

const ManagedCourseCard: React.FC<
  React.PropsWithChildren & IManagedCourseCard
> = ({ children, course }) => {
  return (
    course && (
      <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
        <div className="border-t border-gray-200">
          {Object.keys(course)
            .filter((key) => course[key])
            .map((key, index) => (
              <Item
                key={index}
                title={camelCaseToTitleCaseString(key)}
                value={course[key]}
                {...(index % 2 === 1 ? { className: "bg-white-50" } : {})}
              />
            ))}
          <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
        </div>
      </div>
    )
  );
};

export default ManagedCourseCard;
