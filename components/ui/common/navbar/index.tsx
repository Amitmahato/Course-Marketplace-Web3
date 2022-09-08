import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/web3/hooks/useAccount";
import Link from "next/link";
import React from "react";
import Button from "../button";

export default function NavBar() {
  const { Connect, isLoading, web3 } = useWeb3();
  const { account } = useAccount();

  console.log("Account: ", account);

  return (
    <section>
      {account}
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between">
            <div>
              <Link href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </Link>
              <Link href="/">
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
    </section>
  );
}
