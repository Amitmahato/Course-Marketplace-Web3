import { IUseNetwork } from "interfaces/hooks/useNetwork";
import { useEffect } from "react";
import useSWR from "swr";
import Web3 from "web3";

export const handler =
  (web3: Web3, provider: any): (() => IUseNetwork) =>
  () => {
    const { mutate, ...swrResponse } = useSWR(
      web3 ? "web3-network" : null,
      async () => {
        const netId = await web3.eth.net.getId();
        return netId;
      }
    );

    const networkListener = (provider: any) => {
      provider.on("chainChanged", (networkId: number) => {
        mutate(networkId ?? 0);
      });
    };

    useEffect(() => {
      if (provider) {
        networkListener(provider);
      }
    }, [web3]);

    return {
      network: { mutate, ...swrResponse },
    };
  };
