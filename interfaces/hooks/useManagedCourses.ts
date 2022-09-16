import { IOwnedCourse } from "interfaces/course";
import { SWRResponse } from "swr";

export interface IUseManagedCourses {
  managedCourses: SWRResponse<IOwnedCourse[]>;
  isInitialised: boolean;
}
