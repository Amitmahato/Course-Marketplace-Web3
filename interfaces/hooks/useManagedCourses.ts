import { IManagedCourse } from "interfaces/course";
import { SWRResponse } from "swr";

export interface IUseManagedCourses {
  managedCourses: SWRResponse<IManagedCourse[]>;
  isInitialised: boolean;
}
