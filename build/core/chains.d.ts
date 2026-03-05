/**
 * TRON Network Definitions + JustLend Protocol Addresses
 *
 * JustLend DAO is a Compound V2-fork lending protocol on TRON.
 * Core contracts: Comptroller, jTokens, PriceOracle, Lens.
 *
 * VERSION: JustLend V1
 * All contract addresses, ABIs, and calculation logic in this file are for JustLend V1.
 */
export declare enum TronNetwork {
    Mainnet = "mainnet",
    Nile = "nile"
}
export interface NetworkConfig {
    name: string;
    fullNode: string;
    solidityNode: string;
    eventServer: string;
    explorer: string;
}
/**
 * JustLend V1 core contract addresses per network.
 *
 * NOTE: These addresses are based on publicly known JustLend V1 deployments.
 * Always verify against https://justlend.org and on-chain data.
 *
 * VERSION: V1
 * These are all JustLend V1 contracts.
 */
export interface JustLendAddresses {
    comptroller: string;
    priceOracle: string;
    lens: string;
    maximillion: string;
    governorAlpha: string;
    jst: string;
    wjst: string;
    /** Merkle distributor contracts for mining rewards */
    merkleDistributors: {
        main: string;
        usdd: string;
        strx: string;
        multi: string;
    };
    /** sTRX staking related contracts */
    strx: {
        proxy: string;
        market: string;
    };
    /** Map of symbol → jToken address */
    jTokens: Record<string, JTokenInfo>;
}
export interface JTokenInfo {
    address: string;
    underlying: string;
    symbol: string;
    underlyingSymbol: string;
    decimals: number;
    underlyingDecimals: number;
}
export declare const NETWORKS: Record<TronNetwork, NetworkConfig>;
/**
 * JustLend V1 mainnet and testnet contract addresses.
 *
 * VERSION: V1
 * All addresses below are for JustLend V1 protocol.
 *
 * jToken list sourced from JustLend official docs & TronScan verified contracts.
 * All 24 V1 jToken markets are included (synced from justlend-app config.js).
 */
export declare const JUSTLEND_ADDRESSES: Record<TronNetwork, JustLendAddresses>;
export declare const DEFAULT_NETWORK = TronNetwork.Mainnet;
export declare function getNetworkConfig(network?: string): NetworkConfig;
export declare function getJustLendAddresses(network?: string): JustLendAddresses;
export declare function getSupportedNetworks(): string[];
export declare function getJTokenInfo(symbolOrAddress: string, network?: string): JTokenInfo | undefined;
export declare function getAllJTokens(network?: string): JTokenInfo[];
//# sourceMappingURL=chains.d.ts.map