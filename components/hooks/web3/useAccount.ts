import { useHooks } from "@components/providers/web3";
import { IUseAccount } from "interfaces/hooks";

export const useAccount = (): IUseAccount => {
  return useHooks((hooks) => hooks?.useAccount)?.();
};
