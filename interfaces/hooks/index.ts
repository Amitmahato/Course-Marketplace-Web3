import { IUseAccount } from "./useAccount";
import { IUseNetwork } from "./useNetwork";

interface IHooks {
  useAccount: () => IUseAccount;
  useNetwork: () => IUseNetwork;
}

export type { IUseAccount, IHooks };
