import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Web3, { Provider } from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import Contract from "@truffle/contract";
import { IHooks, IUseAccount } from "interfaces/hooks";
import { setupHooks } from "./hooks/setupHooks";

interface IWeb3ContextState {
  web3: Web3;
  provider: Provider;
  contract: Contract;
  isLoading: boolean;
  getHooks: () => IHooks;
}

interface IWeb3ContextMethod {
  Connect: () => void;
}

const Web3Context = createContext<IWeb3ContextState & IWeb3ContextMethod>({
  web3: null,
  provider: null,
  contract: null,
  isLoading: true,
  Connect: () => {},
  getHooks: () => setupHooks(null),
});

const Web3Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState<IWeb3ContextState>({
    web3: null,
    provider: null,
    contract: null,
    isLoading: true,
    getHooks: () => setupHooks(null),
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
          getHooks: () => setupHooks(web3),
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

export const useHooks = (cb: (param: IHooks) => () => IUseAccount) => {
  const { getHooks } = useWeb3();
  return cb(getHooks());
};
