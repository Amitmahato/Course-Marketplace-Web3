import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3/useAccount";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Button from "../button";
import PurpleSpan from "../purple-span";

export default function NavBar() {
  const { Connect, isLoading, web3 } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();

  console.log("Account: ", account);

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </Link>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </Link>
              {isLoading ? (
                <Button disabled title="Loading..." />
              ) : account.data ? (
                <PurpleSpan>
                  Hi {account.isAdmin ? "Admin" : "There"}
                </PurpleSpan>
              ) : web3 ? (
                <Button onClick={Connect} title="Connect" />
              ) : (
                <Button
                  onClick={() =>
                    window.open("https://metamask.io/download/", "_blank")
                  }
                  title="Install Metamask"
                />
              )}
            </div>
          </div>
        </nav>
      </div>
      {account.data && !pathname.includes("/marketplace") && (
        <div className="flex justify-end pt-3 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {account.data}
          </div>
        </div>
      )}
    </section>
  );
}
