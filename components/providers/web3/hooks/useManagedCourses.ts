import { normalizeOwnedCourse } from "@utils/normalize";
import { IManagedCourse } from "interfaces/course";
import { IAccount } from "interfaces/hooks/useAccount";
import { IUseManagedCourses } from "interfaces/hooks/useManagedCourses";
import useSWR from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export const handler =
  (web3: Web3, contract: Contract) =>
  (account: IAccount): IUseManagedCourses => {
    const swrResponse = useSWR<IManagedCourse[]>(
      web3 && contract && account.isAdmin
        ? `web3-manageCourses-${account}`
        : null,
      async () => {
        const managedCourses: IManagedCourse[] = [];
        const courseCount = await contract.methods.getCourseCount().call();

        for (let i = 0; i < Number(courseCount); i++) {
          const courseHash = await contract.methods
            .getCourseHashAtIndex(i)
            .call();
          const course = await contract.methods
            .getCourseByHash(courseHash)
            .call();

          if (course) {
            const normalizedCourse = normalizeOwnedCourse(web3)(null, course, {
              hash: courseHash,
            });
            managedCourses.push(normalizedCourse as IManagedCourse);
          }
        }

        return managedCourses;
      }
    );

    return {
      managedCourses: swrResponse,
      isInitialised: !!(swrResponse.data || swrResponse.error),
    };
  };
