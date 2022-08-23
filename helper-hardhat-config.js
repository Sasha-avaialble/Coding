const networkConfig = {
    4: {
        name: "rinkeby",
        ethUSDPriceFeedAddress: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
    },
    5: {
        name: "goerli",
        ethUSDPriceFeedAddress: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    },
    137: {
        name: "polygon",
        ethUSDPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    },
    //31337:?
}
const developmentChains = ["hardhat", "localhost"]
const DECIMALS = 8
const initialAnswer = 20000000000

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
    initialAnswer,
}
