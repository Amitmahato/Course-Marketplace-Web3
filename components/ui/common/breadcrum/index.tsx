import Link from "next/link";
import { useRouter } from "next/router";
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
  const { pathname } = useRouter();

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none divide-x divide-gray-400">
        {LINKS.map((item, index) => {
          return (
            <li
              key={item.href}
              className={`${
                index === 0 ? "pr-4" : "px-4"
              } font-medium text-gray-500 hover:text-gray-900`}
            >
              <Link href={item.href}>
                <a>{item.value}</a>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
