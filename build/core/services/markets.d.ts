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
//# sourceMappingURL=markets.d.ts.map