import { Provider } from "web3";

type TruffleContract = window.TruffleContract;

export const loadContract = async (
  name: string,
  provider: Provider
): TruffleContract => {
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const artifact = await res.json();

    const _contract = window.TruffleContract(artifact);
    _contract.setProvider(provider);

    const deployedContract = await _contract.deployed();

    return deployedContract;
  } catch {
    console.error(`Failed to load ${name} contract!`);
  }
};
