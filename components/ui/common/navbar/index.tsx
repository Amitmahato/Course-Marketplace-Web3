import { useWeb3 } from "@components/providers";
import { useAccount } from "@components/hooks/web3/useAccount";
import ActiveLink from "../ActiveLink";
import { useRouter } from "next/router";
import React from "react";
import Button from "../button";
import PurpleSpan from "../purple-span";

export default function NavBar() {
  const { Connect, isLoading, web3 } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();

  return (
    <section>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink href="/">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Home
                </a>
              </ActiveLink>
              <ActiveLink href="/marketplace">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Marketplace
                </a>
              </ActiveLink>
              <ActiveLink href="/blogs">
                <a className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                  Blogs
                </a>
              </ActiveLink>
            </div>
            <div className="text-center">
              <ActiveLink href="/wishlist">
                <a className="font-medium sm:mr-8 mr-1 text-gray-500 hover:text-gray-900">
                  Wishlist
                </a>
              </ActiveLink>
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
