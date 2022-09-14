import { course } from "interfaces/course";
import { IUseOwnedCourses } from "interfaces/hooks/useOwnedCourses";
import useSWR from "swr";

export const handler =
  (web3, contract) =>
  (courses: course[], account: string): IUseOwnedCourses => {
    const swrResponse = useSWR(
      web3 && contract && account ? "web3-ownedCourses" : null,
      async () => {
        const ownedCourses = courses.map((course) => course.id);
        return ownedCourses;
      }
    );

    return { ownedCourses: swrResponse };
  };
