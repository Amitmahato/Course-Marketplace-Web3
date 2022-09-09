import { SWRResponse } from "swr";

export interface IUseNetwork {
  network: SWRResponse;
  targetNetwork: string;
  isSupported: boolean;
}
