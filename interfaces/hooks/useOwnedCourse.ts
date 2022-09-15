import { SWRResponse } from "swr";
import { IOwnedCourse } from "../course";

export interface IUseOwnedCourse {
  ownedCourse: SWRResponse<IOwnedCourse>;
}
