const { network } = require("hardhat")

const {
    developmentChains,
    initialAnswer,
    DECIMALS,
} = require("../helper-hardhat-config")
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (developmentChains.includes(network.name)) {
        log("Local Network detected deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, initialAnswer],
        })
        log("Mocks deployed")
    }
}
module.exports.tags = ["all", "mocks"]
