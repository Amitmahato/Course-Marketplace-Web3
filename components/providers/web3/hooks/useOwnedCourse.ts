import { normalizeOwnedCourse } from "@utils/normalize";
import { course, CourseOwnership, IOwnedCourse } from "interfaces/course";
import { IUseOwnedCourse } from "interfaces/hooks/useOwnedCourse";
import useSWR from "swr";
import Web3, { Contract } from "web3";

export const handler =
  (web3: Web3, contract: Contract) =>
  (course: course, account: string): IUseOwnedCourse => {
    const swrResponse = useSWR<IOwnedCourse>(
      web3 && contract && account ? `web3-ownedCourse-${account}` : null,
      async () => {
        if (course.id) {
          const hexCourseId = web3.utils.utf8ToHex(course.id);
          const courseHash = web3.utils.soliditySha3(
            { type: "bytes16", value: hexCourseId },
            { type: "bytes20", value: account }
          );

          const ownedCourse = await contract.methods
            .getCourseByHash(courseHash)
            .call();

          const courseOwner = web3.utils.hexToNumberString(ownedCourse.owner);

          if (courseOwner != "0") {
            return normalizeOwnedCourse(web3)(course, ownedCourse);
          }
        }
        return null;
      }
    );

    return { ownedCourse: swrResponse };
  };
