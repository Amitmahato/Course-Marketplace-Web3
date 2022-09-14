import { IUseAccount } from "./useAccount";
import { IUseNetwork } from "./useNetwork";
import { IUseOwnedCourses } from "./useOwnedCourses";

interface IHooks {
  useAccount: () => IUseAccount;
  useNetwork: () => IUseNetwork;
  useOwnedCourses: () => IUseOwnedCourses;
}

export type { IUseAccount, IHooks };
