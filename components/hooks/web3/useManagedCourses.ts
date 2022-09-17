import { useHooks } from "@components/providers/web3";
import { IAccount } from "interfaces/hooks/useAccount";
import { IUseManagedCourses } from "interfaces/hooks/useManagedCourses";

export const useManagedCourses = (account: IAccount): IUseManagedCourses => {
  return useHooks((hooks) => hooks?.useManagedCourses)?.(account);
};
