import { SWRResponse } from "swr";
import { course, CourseOwnership } from "../course";

export interface IUseOwnedCourse {
  ownedCourse: SWRResponse<course & CourseOwnership>;
}
