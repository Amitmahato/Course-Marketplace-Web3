import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount } from "./useAccount";

export const useAdmin = ({ redirectTo }: { redirectTo: string }) => {
  const { push } = useRouter();
  const { account } = useAccount();
  useEffect(() => {
    if ((account.data || account.error) && account.isAdmin) {
      return;
    } else {
      push(redirectTo);
    }
  }, [account]);
  return { account };
};
