import { useHooks } from "@components/providers/web3";
import { IUseOwnedCourses } from "interfaces/hooks/useOwnedCourses";

export const useOwnedCourses = (): IUseOwnedCourses => {
  return useHooks((hooks) => hooks?.useOwnedCourses)?.();
};
