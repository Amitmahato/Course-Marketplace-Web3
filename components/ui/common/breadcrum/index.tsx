import React from "react";
export default function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none divide-x divide-gray-400">
        <li className="pr-4 font-medium text-gray-500 hover:text-gray-900">
          <a href="#">Buy</a>
        </li>
        <li className="px-4 font-medium text-gray-500 hover:text-gray-900">
          <a href="#">My Courses</a>
        </li>
        <li className="px-4 font-medium text-gray-500 hover:text-gray-900">
          <a href="#">Manage Courses</a>
        </li>
      </ol>
    </nav>
  );
}
