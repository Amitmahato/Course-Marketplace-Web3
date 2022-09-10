import { SWRResponse } from "swr";

export interface IUseEthPrice {
  rate: SWRResponse;
  courseEthRate: number;
}
