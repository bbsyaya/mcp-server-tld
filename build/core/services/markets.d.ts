import { type JTokenInfo } from "../chains.js";
export interface MarketData {
    symbol: string;
    underlyingSymbol: string;
    jTokenAddress: string;
    underlyingAddress: string;
    supplyAPY: number;
    borrowAPY: number;
    totalSupply: string;
    totalBorrows: string;
    totalReserves: string;
    availableLiquidity: string;
    exchangeRate: string;
    collateralFactor: number;
    reserveFactor: number;
    isListed: boolean;
    mintPaused: boolean;
    borrowPaused: boolean;
    underlyingPriceUSD: string;
    utilizationRate: number;
}
/**
 * Get full market data for a single jToken market.
 */
export declare function getMarketData(jTokenInfo: JTokenInfo, network?: string): Promise<MarketData>;
/**
 * Get market data for all listed JustLend markets.
 */
export declare function getAllMarketData(network?: string): Promise<MarketData[]>;
/**
 * Get protocol-level summary from Comptroller.
 */
export declare function getProtocolSummary(network?: string): Promise<{
    comptroller: string;
    oracle: any;
    closeFactor: string;
    liquidationIncentive: string;
    totalMarkets: any;
    marketAddresses: any;
    network: string;
}>;
/**
 * Get market data from JustLend API (more stable than direct contract queries).
 * API returns comprehensive market data including APY, TVL, prices, etc.
 */
export declare function getMarketDataFromAPI(network?: string): Promise<any>;
/**
 * Get market dashboard data from JustLend API.
 * Includes protocol-level statistics like total supply, total borrow, etc.
 */
export declare function getMarketDashboardFromAPI(network?: string): Promise<any>;
/**
 * Get detailed jToken information from JustLend API.
 * @param jtokenAddr - jToken contract address
 */
export declare function getJTokenDetailsFromAPI(jtokenAddr: string, network?: string): Promise<any>;
//# sourceMappingURL=markets.d.ts.map