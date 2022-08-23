const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config.js")
const { network, ethers } = require("hardhat")
const { verify } = require("../utils/verify")
//const helperConfig = require("../helper-hardhat-config.js")
//const networkConfig = helperConfig.networkConfig
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    // const ethUSDPriceFeedAddress =
    //     networkConfig[chainId]["ethUSDPriceFeedAddress"]
    let ethUSDPriceFeedAddress
    if (developmentChains.includes(network.name)) {
        const ethUSDAggregator = await get("MockV3Aggregator")
        ethUSDPriceFeedAddress = ethUSDAggregator.address
    } else {
        ethUSDPriceFeedAddress =
            networkConfig[chainId]["ethUSDPriceFeedAddress"]
    }
    const args = [ethUSDPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }
    console.log(network.config.name)
    log(
        "--------------------------------------------------------------------------"
    )
    // console.log(
    //     `The storage one is: ${await ethers.provider.getStorageAt(
    //         fundMe.address,
    //         0
    //     )}`
    // )
    // console.log(
    //     `The storage one is: ${await ethers.provider.getStorageAt(
    //         fundMe.address,
    //         1
    //     )}`
    // )
    // console.log(
    //     `The storage one is: ${await ethers.provider.getStorageAt(
    //         fundMe.address,
    //         2
    //     )}`
    // )
    // console.log(
    //     `The storage one is: ${await ethers.provider.getStorageAt(
    //         fundMe.address,
    //         3
    //     )}`
    // )
    // console.log(
    //     `The storage one is: ${await ethers.provider.getStorageAt(
    //         fundMe.address,
    //         4
    //     )}`
    // )
}

module.exports.tags = ["all", "fundme"]
