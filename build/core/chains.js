/**
 * TRON Network Definitions + JustLend Protocol Addresses
 *
 * JustLend DAO is a Compound V2-fork lending protocol on TRON.
 * Core contracts: Comptroller, jTokens, PriceOracle, Lens.
 */
export var TronNetwork;
(function (TronNetwork) {
    TronNetwork["Mainnet"] = "mainnet";
    TronNetwork["Nile"] = "nile";
})(TronNetwork || (TronNetwork = {}));
export const NETWORKS = {
    [TronNetwork.Mainnet]: {
        name: "Mainnet",
        fullNode: "https://api.trongrid.io",
        solidityNode: "https://api.trongrid.io",
        eventServer: "https://api.trongrid.io",
        explorer: "https://tronscan.org",
    },
    [TronNetwork.Nile]: {
        name: "Nile Testnet",
        fullNode: "https://nile.trongrid.io",
        solidityNode: "https://nile.trongrid.io",
        eventServer: "https://nile.trongrid.io",
        explorer: "https://nile.tronscan.org",
    },
};
/**
 * JustLend mainnet contract addresses.
 *
 * jToken list sourced from JustLend official docs & TronScan verified contracts.
 * Only the most common markets are included; more can be added.
 */
export const JUSTLEND_ADDRESSES = {
    [TronNetwork.Mainnet]: {
        comptroller: "TGjYzgCyPobsNS9n6WcbdLVR9dH7mWqFx7",
        priceOracle: "TXjzHPaDeR2KYXQ3Gfwj82PQ2qHaGThFhi",
        lens: "TFTBTMrrMDBbAGrFQzsSiMdoTSMvkung8V",
        maximillion: "T9gCxZ3YpmGftPmGPUNTFfMX7pJNPob4s1",
        jTokens: {
            jTRX: {
                address: "TLeEu311Mgm2Kft9XAUhc5hdiXpQgPBMmP",
                underlying: "", // native TRX
                symbol: "jTRX",
                underlyingSymbol: "TRX",
                decimals: 8,
                underlyingDecimals: 6,
            },
            jUSDT: {
                address: "TXJgMdjVX5dKiQaUi9QobR2d1pTdip5xG3",
                underlying: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
                symbol: "jUSDT",
                underlyingSymbol: "USDT",
                decimals: 8,
                underlyingDecimals: 6,
            },
            jSUN: {
                address: "TGBr8uh9JBQ2cjWpPEjDHMhkwCBBKaP84K",
                underlying: "TKkeiboTkxXKJpbmVFbv4a8ov5rAfRDMf9",
                symbol: "jSUN",
                underlyingSymbol: "SUN",
                decimals: 8,
                underlyingDecimals: 18,
            },
            jWIN: {
                address: "TRg6MnpsFXc82ymUFgHTRDiVfCJXVbCqGy",
                underlying: "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7",
                symbol: "jWIN",
                underlyingSymbol: "WIN",
                decimals: 8,
                underlyingDecimals: 6,
            },
            jBTC: {
                address: "TLeEu311Mgm2Kft9XAUhc5hdiXpQgPBMmP",
                underlying: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9",
                symbol: "jBTC",
                underlyingSymbol: "BTC",
                decimals: 8,
                underlyingDecimals: 8,
            },
            jETH: {
                address: "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF",
                underlying: "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF",
                symbol: "jETH",
                underlyingSymbol: "ETH",
                decimals: 8,
                underlyingDecimals: 18,
            },
            jUSDC: {
                address: "TXMSMnSxCUgr8FYhQK8bfjRhBJGMSrc1iF",
                underlying: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
                symbol: "jUSDC",
                underlyingSymbol: "USDC",
                decimals: 8,
                underlyingDecimals: 6,
            },
            jTUSD: {
                address: "TEMBnEbKFPA1GJwkJEMfBHkMqXgMnCbzE1",
                underlying: "TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4",
                symbol: "jTUSD",
                underlyingSymbol: "TUSD",
                decimals: 8,
                underlyingDecimals: 18,
            },
        },
    },
    [TronNetwork.Nile]: {
        // Nile testnet addresses — placeholders, replace with actual testnet deployments
        comptroller: "TTestComptrollerNileXXXXXXXXXXXXXX",
        priceOracle: "TTestPriceOracleNileXXXXXXXXXXXXXX",
        lens: "TTestLensNileXXXXXXXXXXXXXXXXXXXXX",
        maximillion: "TTestMaximillionNileXXXXXXXXXXXXXX",
        jTokens: {},
    },
};
export const DEFAULT_NETWORK = TronNetwork.Mainnet;
export function getNetworkConfig(network = DEFAULT_NETWORK) {
    const n = network.toLowerCase();
    if (n === "mainnet" || n === "tron" || n === "trx")
        return NETWORKS[TronNetwork.Mainnet];
    if (n === "nile" || n === "testnet")
        return NETWORKS[TronNetwork.Nile];
    throw new Error(`Unsupported network: ${network}. Supported: mainnet, nile`);
}
export function getJustLendAddresses(network = DEFAULT_NETWORK) {
    const n = network.toLowerCase();
    if (n === "mainnet" || n === "tron" || n === "trx")
        return JUSTLEND_ADDRESSES[TronNetwork.Mainnet];
    if (n === "nile" || n === "testnet")
        return JUSTLEND_ADDRESSES[TronNetwork.Nile];
    throw new Error(`Unsupported network: ${network}`);
}
export function getSupportedNetworks() {
    return Object.values(TronNetwork);
}
export function getJTokenInfo(symbolOrAddress, network = DEFAULT_NETWORK) {
    const addresses = getJustLendAddresses(network);
    // Search by symbol first
    const bySymbol = addresses.jTokens[symbolOrAddress] || addresses.jTokens[symbolOrAddress.toUpperCase()];
    if (bySymbol)
        return bySymbol;
    // Search by address
    return Object.values(addresses.jTokens).find((t) => t.address.toLowerCase() === symbolOrAddress.toLowerCase());
}
export function getAllJTokens(network = DEFAULT_NETWORK) {
    const addresses = getJustLendAddresses(network);
    return Object.values(addresses.jTokens);
}
//# sourceMappingURL=chains.js.map