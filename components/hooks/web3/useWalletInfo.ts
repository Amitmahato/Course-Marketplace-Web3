import { IUseWalletInfo } from "interfaces/hooks/useWalletInfo";
import { useAccount } from "./useAccount";
import { useNetwork } from "./useNetwork";

export const useWalletInfo = (): IUseWalletInfo => {
  const accountData = useAccount();
  const networkData = useNetwork();
  return {
    ...accountData,
    ...networkData,
    canPurchaseCourse: !!(
      accountData.account.data && networkData.isInitialised
    ),
  };
};
