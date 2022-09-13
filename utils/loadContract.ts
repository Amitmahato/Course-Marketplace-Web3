import { Provider } from "web3";
import contract from "@truffle/contract";

export const loadContract = async (
  name: string,
  provider: Provider
): contract => {
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();

    const _contract = contract(artifact);
    _contract.setProvider(provider);

    const deployedContract = await _contract.deployed();

    return deployedContract;
  } catch {
    console.error(`Failed to load ${name} contract!`);
  }
};
