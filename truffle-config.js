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
            phrase: mnemonicPhrase,
          },
          providerOrUrl: "https://ropsten.infura.io/v3/YOUR-PROJECT-ID",
          addressIndex: 0, // responsible for creating, signing the transaction and forwarding to ropsten infura API
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
