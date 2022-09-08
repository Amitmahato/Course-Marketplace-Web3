import { IUseAccount } from "interfaces/hooks";
import Web3 from "web3";

export const handler = (web3: Web3) => (): IUseAccount => {
  return {
    account: web3 ? "A" : null,
  };
};
