import React, { createContext, useContext, useEffect, useState } from "react";
import Web3, { Provider } from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Contract from "@truffle/contract";

interface IWeb3Context {
  web3: Web3;
  provider: Provider;
  contract: Contract;
  isLoading: boolean;
}

const Web3Context = createContext<IWeb3Context>({
  web3: null,
  provider: null,
  contract: null,
  isLoading: true,
});

const Web3Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<IWeb3Context>({
    web3: null,
    provider: null,
    contract: null,
    isLoading: true,
  });

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider);
        setWeb3Api({
          web3,
          provider,
          contract: null,
          isLoading: false,
        });
      } else {
        setWeb3Api((api) => ({
          ...api,
          isLoading: false,
        }));
        console.log("Install Metamask");
      }
    };

    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export default Web3Provider;

export const useWeb3 = () => {
  return useContext(Web3Context);
};
