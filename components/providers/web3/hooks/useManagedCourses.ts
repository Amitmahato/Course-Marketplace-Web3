import { normalizeOwnedCourse } from "@utils/normalize";
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
        const managedCourses: IOwnedCourse[] = [];
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
            managedCourses.push(normalizedCourse);
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
