import React, { createContext, useContext } from "react";

const Web3Context = createContext<{ web3: any; provider: any }>({
  web3: null,
  provider: null,
});

const Web3Provider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Web3Context.Provider value={{ web3: null, provider: null }}>
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Provider;

export const useWeb3 = () => {
  return useContext(Web3Context);
};
