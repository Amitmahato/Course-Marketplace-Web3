import { IUseAccount } from "./useAccount";
import { IUseNetwork } from "./useNetwork";

export interface IUseWalletInfo extends IUseNetwork, IUseAccount {
  canPurchaseCourse: boolean;
}
