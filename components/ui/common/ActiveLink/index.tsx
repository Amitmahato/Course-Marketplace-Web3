import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { twMerge } from "tailwind-merge";

const ActiveLink: React.FC<
  LinkProps & {
    activeLinkClass?: string;
    children: React.ReactElement<{ className?: string }>;
  }
> = ({ children, activeLinkClass, ...props }) => {
  let className = children.props.className || "";
  const { pathname } = useRouter();
  if (pathname === props.href) {
    className = twMerge(className, activeLinkClass ?? "text-indigo-600");
  }

  return <Link {...props}>{React.cloneElement(children, { className })}</Link>;
};
export default ActiveLink;
