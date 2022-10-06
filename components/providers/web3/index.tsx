import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";
import { provider } from "web3-core";
import { Contract } from "web3-eth-contract";

import detectEthereumProvider from "@metamask/detect-provider";
import { IHooks } from "interfaces/hooks";
import { setupHooks } from "./hooks/setupHooks";
import { loadContract } from "@utils/loadContract";

interface IWeb3ContextState {
  web3: Web3;
  provider: provider;
  contract: Contract;
  isLoading: boolean;
  hooks: IHooks;
}

interface IWeb3ContextMethod {
  Connect: () => void;
}

const createWeb3State = ({
  web3,
  contract,
  provider,
  isLoading,
}: Partial<IWeb3ContextState>): IWeb3ContextState & IWeb3ContextMethod => {
  return {
    web3,
    contract,
    provider,
    isLoading,
    Connect: () => {},
    hooks: setupHooks(web3, provider, contract),
  };
};

const Web3Context = createContext<IWeb3ContextState & IWeb3ContextMethod>(
  createWeb3State({
    web3: null,
    provider: null,
    contract: null,
    isLoading: true,
  })
);

const Web3Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<IWeb3ContextState>(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    })
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider as provider);
        const contract = await loadContract("CourseMarketplace", web3);
        setWeb3Api(
          createWeb3State({
            web3,
            provider: provider as provider,
            contract,
            isLoading: false,
          })
        );
      } else {
        setWeb3Api((api) =>
          createWeb3State({
            ...api,
            isLoading: false,
          })
        );
        console.log("Install Metamask");
      }
    };

    loadProvider();
  }, []);

  const connectWallet = useCallback(async () => {
    if (web3Api.provider) {
      try {
        // @ts-ignore
        await web3Api.provider?.request({ method: "eth_requestAccounts" });
        console.log("Connection to metamask successfull");
      } catch (e) {
        console.log("Cannot retrieve accounts! Error: ", e);
        location.reload();
      }
    } else {
      console.error(
        "Cannot connect to metamask, try to reload your browser please"
      );
    }
  }, [web3Api.provider]);

  return (
    <Web3Context.Provider value={{ ...web3Api, Connect: connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const useHooks = (cb: (param: IHooks) => (...params: any) => any) => {
  const { hooks } = useWeb3();
  return cb(hooks);
};
