import { useHooks } from "@components/providers/web3";
import { course } from "interfaces/course";
import { IUseOwnedCourse } from "interfaces/hooks/useOwnedCourse";

export const useOwnedCourse = (
  course: course,
  account: string
): IUseOwnedCourse => {
  return useHooks((hooks) => hooks?.useOwnedCourse)?.(course, account);
};
