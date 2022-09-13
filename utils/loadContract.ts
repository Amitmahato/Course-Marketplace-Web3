import Web3 from "web3";

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, web3: Web3) => {
  try {
    const res = await fetch(`/contracts/${name}.json`);
    const Artifact = await res.json();

    const _contract = new web3.eth.Contract(
      Artifact.abi,
      Artifact.networks[NETWORK_ID].address
    );

    return _contract;
  } catch (e) {
    console.error(`Failed to load ${name} contract!, Error: `, e);
  }
};
