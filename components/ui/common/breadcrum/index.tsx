import ActiveLink from "../ActiveLink";
import React from "react";

const LINKS = [
  {
    href: "/marketplace",
    value: "Buy",
  },
  {
    href: "/marketplace/courses/owned",
    value: "My Courses",
  },
  {
    href: "/marketplace/courses/manage",
    value: "Manage Courses",
  },
];

export default function Breadcrumb() {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none divide-x divide-gray-400">
        {LINKS.map((item, index) => (
          <li
            key={item.href}
            className={`${
              index === 0 ? "pr-4" : "px-4"
            } font-medium text-gray-500 hover:text-gray-900`}
          >
            <ActiveLink href={item.href}>
              <a>{item.value}</a>
            </ActiveLink>
          </li>
        ))}
      </ol>
    </nav>
  );
}
