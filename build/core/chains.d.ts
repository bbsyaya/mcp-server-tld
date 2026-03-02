/**
 * TRON Network Definitions + JustLend Protocol Addresses
 *
 * JustLend DAO is a Compound V2-fork lending protocol on TRON.
 * Core contracts: Comptroller, jTokens, PriceOracle, Lens.
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
 * JustLend core contract addresses per network.
 *
 * NOTE: These addresses are based on publicly known deployments.
 * Always verify against https://justlend.org and on-chain data.
 */
export interface JustLendAddresses {
    comptroller: string;
    priceOracle: string;
    lens: string;
    maximillion: string;
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
 * JustLend mainnet contract addresses.
 *
 * jToken list sourced from JustLend official docs & TronScan verified contracts.
 * Only the most common markets are included; more can be added.
 */
export declare const JUSTLEND_ADDRESSES: Record<TronNetwork, JustLendAddresses>;
export declare const DEFAULT_NETWORK = TronNetwork.Mainnet;
export declare function getNetworkConfig(network?: string): NetworkConfig;
export declare function getJustLendAddresses(network?: string): JustLendAddresses;
export declare function getSupportedNetworks(): string[];
export declare function getJTokenInfo(symbolOrAddress: string, network?: string): JTokenInfo | undefined;
export declare function getAllJTokens(network?: string): JTokenInfo[];
//# sourceMappingURL=chains.d.ts.map