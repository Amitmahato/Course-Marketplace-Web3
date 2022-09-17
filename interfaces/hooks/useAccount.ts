import { SWRResponse } from "swr";

export type IAccount = SWRResponse & { isAdmin: boolean };

export interface IUseAccount {
  account: IAccount;
}
