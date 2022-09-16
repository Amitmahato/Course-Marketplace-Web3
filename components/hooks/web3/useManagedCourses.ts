import { useHooks } from "@components/providers/web3";
import { IUseManagedCourses } from "interfaces/hooks/useManagedCourses";

export const useManagedCourses = (account: string): IUseManagedCourses => {
  return useHooks((hooks) => hooks?.useManagedCourses)?.(account);
};
