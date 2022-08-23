require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
/** @type import('hardhat/config').HardhatUserConfig */
const ROPSTEN_RPC_URL =
    process.env.ROPSTEN_RPC_URL || "goerli url is not detected"
const PRIVATE_KEY = process.env.PRIVATE_KEY || "private key is not detected"
const ETHERSCAN_API_KEY =
    process.env.ETHERSCAN_API_KEY || "etherscan api is not defined"
const COIN_MARKET_CAP_API_KEY =
    process.env.COIN_MARKET_CAP_API_KEY || "coinmarketcap api is not defined"
module.exports = {
    //solidity: "0.8.9"
    solidity: {
        compilers: [{ version: "0.8.9" }, { version: "0.6.6" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: ROPSTEN_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmation: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    mocha: {
        timeout: 100000,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COIN_MARKET_CAP_API_KEY, //makes api calls
        token: "ETH", //if you deployedon ethereum
    },
    namedAccounts: {
        deployer: {
            default: 0,
            // on rinkeby the deployer will be the first address in the array
            // 5: 0,
        },
        // user: {
        //     default: 1,
        // },
    },
}
