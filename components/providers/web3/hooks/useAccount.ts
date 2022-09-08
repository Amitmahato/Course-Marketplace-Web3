import { IUseAccount } from "interfaces/hooks";
import { useEffect } from "react";
import useSWR from "swr";
import Web3 from "web3";

export const handler = (web3: Web3, provider: any) => (): IUseAccount => {
  const { mutate, ...swrResponse } = useSWR(
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
      mutate,
      ...swrResponse,
    },
  };
};
