import { useHooks } from "@components/providers/web3";
import { course } from "interfaces/course";
import { IUseOwnedCourses } from "interfaces/hooks/useOwnedCourses";

export const useOwnedCourses = (
  courses: course[],
  account: string
): IUseOwnedCourses => {
  return useHooks((hooks) => hooks?.useOwnedCourses)?.(courses, account);
};
