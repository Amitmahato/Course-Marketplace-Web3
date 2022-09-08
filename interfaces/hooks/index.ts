import { IUseAccount } from "./useAccount";

interface IHooks {
  useAccount: () => IUseAccount;
}

export type { IUseAccount, IHooks };
