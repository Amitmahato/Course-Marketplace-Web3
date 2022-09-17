import { course } from "interfaces/course";
import { IAccount, IUseAccount } from "./useAccount";
import { IUseNetwork } from "./useNetwork";
import { IUseOwnedCourses } from "./useOwnedCourses";
import { IUseOwnedCourse } from "./useOwnedCourse";
import { IUseManagedCourses } from "./useManagedCourses";

interface IHooks {
  useAccount: () => IUseAccount;
  useNetwork: () => IUseNetwork;
  useOwnedCourses: (courses: course[], account: string) => IUseOwnedCourses;
  useOwnedCourse: (courses: course, account: string) => IUseOwnedCourse;
  useManagedCourses: (account: IAccount) => IUseManagedCourses;
}

export type { IUseAccount, IHooks };
