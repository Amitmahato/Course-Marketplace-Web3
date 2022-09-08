import { IUseAccount } from "interfaces/hooks";
import { useEffect, useState } from "react";
import Web3 from "web3";

export const handler = (web3: Web3) => (): IUseAccount => {
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    if (web3) {
      getAccount();
    }
  }, [web3]);

  return {
    account,
  };
};