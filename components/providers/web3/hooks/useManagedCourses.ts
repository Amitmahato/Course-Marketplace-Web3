import { IOwnedCourse } from "interfaces/course";
import { IUseManagedCourses } from "interfaces/hooks/useManagedCourses";
import useSWR from "swr";
import Web3, { Contract } from "web3";

export const handler =
  (web3: Web3, contract: Contract) =>
  (account: string): IUseManagedCourses => {
    const swrResponse = useSWR<IOwnedCourse[]>(
      web3 && contract && account ? `web3-manageCourses-${account}` : null,
      async () => {
        const ownedCourses: IOwnedCourse[] = [];
        return ownedCourses;
      }
    );

    return {
      managedCourses: swrResponse,
      isInitialised: !!(swrResponse.data || swrResponse.error),
    };
  };
