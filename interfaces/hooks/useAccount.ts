import { SWRResponse } from "swr";

export interface IUseAccount {
  account: SWRResponse & { isAdmin: boolean };
}
