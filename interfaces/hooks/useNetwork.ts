import { SWRResponse } from "swr";

export interface IUseNetwork {
  network: SWRResponse;
  isInitialised: boolean;
  targetNetwork: string;
  isSupported: boolean;
}
