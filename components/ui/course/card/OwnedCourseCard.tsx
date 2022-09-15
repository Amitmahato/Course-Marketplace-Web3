import { course, CourseOwnership } from "interfaces/course";
import Image from "next/image";
import React from "react";

interface IOwnedCourseCard {
  course: course & CourseOwnership & { ownedCourseId: string };
}

const OwnedCourseCard: React.FC<React.PropsWithChildren & IOwnedCourseCard> = ({
  children,
  course,
}) => {
  return (
    course && (
      <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
        <div className="flex">
          <div className="flex-1">
            <div className="h-full next-image-wrapper">
              <Image
                className="object-cover"
                src={course.coverImage}
                layout="responsive"
                width="200"
                height="240"
              />
            </div>
          </div>
          <div className="flex-4">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {course.title}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {course.price} ETH
              </p>
            </div>

            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Course ID
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.ownedCourseId}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-9 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Proof</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {course.proof}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OwnedCourseCard;
