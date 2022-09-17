import ActiveLink from "../ActiveLink";
import React from "react";

interface ILinks {
  href: string;
  value: string;
  policy?: { admin: boolean };
}

const LINKS: ILinks[] = [
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
    policy: { admin: true },
  },
];

export default function Breadcrumb({ isAdmin }: { isAdmin: boolean }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="flex leading-none divide-x divide-gray-400">
        {LINKS.filter((item: ILinks) =>
          item.hasOwnProperty("policy") ? item.policy?.admin === isAdmin : true
        ).map((item, index) => (
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
