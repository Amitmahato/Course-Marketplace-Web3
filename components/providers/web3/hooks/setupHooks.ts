import { IHooks } from "interfaces/hooks";
import { IUseAccount } from "interfaces/hooks/useAccount";
import Web3 from "web3";
import { handler as createUseAccount } from "./useAccount";

export const DEFAULT_HOOKS = {
  useAccount: (): IUseAccount => ({ account: null }),
};

export const setupHooks = (web3: Web3): IHooks => {
  if (web3) {
    return {
      useAccount: createUseAccount(web3),
    };
  } else {
    return DEFAULT_HOOKS;
  }
};
