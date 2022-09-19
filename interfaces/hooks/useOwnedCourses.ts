import { IOwnedCourse } from "interfaces/course";
import { SWRResponse } from "swr";

export interface IUseOwnedCourses {
  ownedCourses: SWRResponse<IOwnedCourse[]>;
  isInitialised: boolean;
  lookUp: Object;
}
