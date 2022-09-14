import { course } from "interfaces/course";
import { IUseAccount } from "./useAccount";
import { IUseNetwork } from "./useNetwork";
import { IUseOwnedCourses } from "./useOwnedCourses";

interface IHooks {
  useAccount: () => IUseAccount;
  useNetwork: () => IUseNetwork;
  useOwnedCourses: (courses: course[], account: string) => IUseOwnedCourses;
}

export type { IUseAccount, IHooks };
