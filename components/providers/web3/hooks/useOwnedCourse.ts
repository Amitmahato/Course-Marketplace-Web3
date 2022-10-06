import { createCourseHash } from "@utils/hash";
import { normalizeOwnedCourse } from "@utils/normalize";
import { course, IOwnedCourse } from "interfaces/course";
import { IUseOwnedCourse } from "interfaces/hooks/useOwnedCourse";
import useSWR from "swr";
import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export const handler =
  (web3: Web3, contract: Contract) =>
  (course: course, account: string): IUseOwnedCourse => {
    const swrResponse = useSWR<IOwnedCourse>(
      web3 && contract && account ? `web3-ownedCourse-${account}` : null,
      async () => {
        let ownerCourse: IOwnedCourse;
        if (course.id) {
          const courseHash = createCourseHash(web3)(course.id, account);

          const ownedCourse = await contract.methods
            .getCourseByHash(courseHash)
            .call();

          const courseOwner = web3.utils.hexToNumberString(ownedCourse.owner);

          if (courseOwner != "0") {
            ownerCourse = normalizeOwnedCourse(web3)(
              course,
              ownedCourse
            ) as IOwnedCourse;
          }
        }
        return ownerCourse;
      }
    );

    return { ownedCourse: swrResponse };
  };
