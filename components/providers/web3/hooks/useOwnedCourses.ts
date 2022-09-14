import { IUseOwnedCourses } from "interfaces/hooks/useOwnedCourses";

export const handler = (web3, contract) => (): IUseOwnedCourses => {
  return { data: "useOwnedCourses hook called" };
};
