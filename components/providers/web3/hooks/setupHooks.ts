import { IHooks } from "interfaces/hooks";
import Web3 from "web3";
import { handler as createUseAccount } from "./useAccount";

/**
 * The method registered in the default value should contain exactly the same
 * hooks as used by the actual value when default one is replaced later
 * For example, here, `useState` & `useEffect` has to be compulsorily be used
 *
 * Not aligning with this requirement will cause the error:
 *  Warning: React has detected a change in the order of Hooks
 *  called by <component calling the inconsistent hook>.
 *  This will lead to bugs and errors if not fixed. For more information,
 *  read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks
 */
// export const DEFAULT_HOOKS: IHooks = {
//   useAccount: (): IUseAccount => {
//     let web3: Web3;
//     const [account] = useState<string>("");

//     useEffect(() => {}, [web3]);

//     return { account };
//   },
// };

export const setupHooks = (web3: Web3, provider: any): IHooks => {
  return {
    useAccount: createUseAccount(web3, provider),
  };
};
