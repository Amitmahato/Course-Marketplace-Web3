import { course, IOwnedCourse } from "interfaces/course";
import Web3 from "web3";

export enum COURSE_STATE {
  PURCHASED = "purchased",
  ACTIVATED = "activated",
  DEACTIVATED = "deactivated",
}

export const COURSE_STATES = {
  0: "purchased",
  1: "activated",
  2: "deactivated",
};

export const normalizeOwnedCourse =
  (web3: Web3) =>
  (course: course, ownedCourse: Partial<IOwnedCourse>): IOwnedCourse => {
    return {
      ...course,
      ownedCourseId: String(ownedCourse.id),
      proof: ownedCourse.proof,
      owner: ownedCourse.owner,
      price: web3.utils.fromWei(ownedCourse.price),
      state: COURSE_STATES[ownedCourse.state],
    };
  };
