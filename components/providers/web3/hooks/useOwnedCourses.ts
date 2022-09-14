import { course } from "interfaces/course";
import { IUseOwnedCourses } from "interfaces/hooks/useOwnedCourses";
import useSWR from "swr";
import Web3, { Contract } from "web3";

export const handler =
  (web3: Web3, contract: Contract) =>
  (courses: course[], account: string): IUseOwnedCourses => {
    const swrResponse = useSWR(
      web3 && contract && account ? "web3-ownedCourses" : null,
      async () => {
        const ownedCourses = [];

        for (let index = 0; index < courses.length; index++) {
          const course = courses[index];

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

            if (courseOwner !== "0") {
              ownedCourses.push(ownedCourse);
            }
          }
        }

        return ownedCourses;
      }
    );

    return { ownedCourses: swrResponse };
  };
