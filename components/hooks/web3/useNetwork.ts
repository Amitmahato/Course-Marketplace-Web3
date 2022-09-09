import { useHooks } from "@components/providers/web3";
import { IUseNetwork } from "interfaces/hooks/useNetwork";

export const useNetwork = (): IUseNetwork => {
  return useHooks((hooks) => hooks?.useNetwork)?.();
};
