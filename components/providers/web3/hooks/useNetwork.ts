import { IUseNetwork } from "interfaces/hooks/useNetwork";
import { useEffect } from "react";
import useSWR from "swr";
import Web3 from "web3";

const NETWORKS = {
  1: "Ethereum Main Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain",
  1337: "Ganache",
};

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler =
  (web3: Web3, provider: any): (() => IUseNetwork) =>
  () => {
    const { mutate, ...swrResponse } = useSWR(
      web3 ? "web3-network" : null,
      async () => {
        const chainId = await web3.eth.getChainId();
        return NETWORKS[chainId];
      }
    );

    const networkListener = (provider: any) => {
      provider.on("chainChanged", (chainId: string) => {
        mutate(NETWORKS[parseInt(chainId, 16)] ?? "");
      });
    };

    useEffect(() => {
      if (provider) {
        networkListener(provider);
      }
    }, [web3]);

    return {
      network: { mutate, ...swrResponse },
      isSupported: targetNetwork === swrResponse.data,
      targetNetwork: targetNetwork,
    };
  };
