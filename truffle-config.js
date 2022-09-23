const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json");

module.exports = {
  contracts_build_directory: "./public/contracts",

  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.mnemonic,
          },
          providerOrUrl: `wss://ropsten.infura.io/ws/v3/${keys.infura_project_id}`,

          /**
           * Deployer Account at index 0, as defined by the `mnemonic` - `secret recovery passphrase`,
           * responsible for creating, signing the transaction and forwarding to ropsten infura API
           *
           * From the mnemonic total of 10 accounts are generated,
           * if index is set to 0,
           * the account with given `secret recovery passphrase` is also counted and available at index 0
           * then additional 9 accounts are generated
           *
           * if index was set to any other value, the account for given `secret recovery passphrase` would not have been used,
           * and all the 10 accounts would be atomatically generated, all with 0 ETH balance.
           *
           * To display these automatically generated accounts in the metamask,
           * we can use the create account functionality after already logging in using the `secret recovery passphrase`
           * the created accounts will then be available in metamask,
           * and will have the addresses serially from those automatically generated accounts
           **/
          addressIndex: 0,
        }),
      network_id: 3,
      gas: 5500000, // 5,500,000 - maximum gas that you are willing to spend
      gasPrice: 20000000000, // 20 Gwei - how much we are willing to spend for a unit of gas
      confirmations: 2, // number of blocks to wait between deployment
      timeoutBlocks: 200, // number of blocks before deployment times out, from the time at which your trx was added to mempool and number of blocks that were added after that
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11",
    },
  },
};

// Expenditure to deploy the contract
// 5500000 * 20000000000 = 110000000000000000 Wei = 0.11 ETH => 141.60 USD as of `Sep 22, 2022`
