import { IUseAccount } from "interfaces/hooks";
import { useEffect } from "react";
import useSWR from "swr";
import Web3 from "web3";

const adminAddress = {
  "0x95bDbD553b5848E10DDE013E32FfdDd9C28BD406": true,
};

export const handler = (web3: Web3, provider: any) => (): IUseAccount => {
  const { mutate, data, ...swrResponse } = useSWR(
    web3 ? "web3-account" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0] ?? "";
    }
  );

  const accountListener = (provider: any) => {
    provider.on("accountsChanged", (_accounts: string[]) => {
      mutate(_accounts[0] ?? "");
    });
  };

  useEffect(() => {
    if (provider) {
      accountListener(provider);
    }
  }, [provider]);

  return {
    account: {
      data,
      isAdmin: data ? adminAddress[data] : false,
      mutate,
      ...swrResponse,
    },
  };
};
