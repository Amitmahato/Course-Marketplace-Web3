import { IUseAccount } from "interfaces/hooks";
import { useEffect } from "react";
import useSWR from "swr";
import Web3 from "web3";

// keccack256 encoding - 2nd one for 0x95bDbD553b5848E10DDE013E32FfdDd9C28BD406 address
const adminAddress = {
  "0xdfc570d0aee530c31df1e5bbe7b16751900cfc45de8add8c5b171632ae39014d": true,
  "0x8ae6147204f29e745f1add9c189e17ea9f82c94a861bccd331fd3ab82d152571": true,
};

export const handler = (web3: Web3, provider: any) => (): IUseAccount => {
  const { mutate, data, ...swrResponse } = useSWR(
    web3 ? "web3-account" : null,
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0] ?? "";
    }
  );

  const accountListener = (_accounts: string[]) => {
    mutate(_accounts[0] ?? "");
  };

  useEffect(() => {
    if (provider) {
      provider.on("accountsChanged", accountListener);
      return () => provider.removeListener("accountsChanged", accountListener);
    }
  }, [provider]);

  const isAdmin = data ? adminAddress[web3.utils.keccak256(data)] : false;
  debugger;
  return {
    account: {
      data,
      isAdmin,
      mutate,
      ...swrResponse,
    },
  };
};
