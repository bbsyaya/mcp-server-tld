/**
 * JustLend V1 Market Data Services
 *
 * VERSION: JustLend V1
 * All calculation functions (APY, utilization, exchange rate) are based on JustLend V1 logic.
 * Interest rate model: Compound V2-style per-block rates.
 */
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
 * Get full market data for a single jToken market (V1).
 *
 * VERSION: V1 - Queries JustLend V1 contracts using Compound V2 ABI
 */
export declare function getMarketData(jTokenInfo: JTokenInfo, network?: string): Promise<MarketData>;
/**
 * Get market data for all listed JustLend V1 markets.
 *
 * VERSION: V1 - Queries all V1 jToken markets
 */
export declare function getAllMarketData(network?: string): Promise<MarketData[]>;
/**
 * Get protocol-level summary from V1 Comptroller.
 *
 * VERSION: V1 - Queries JustLend V1 Comptroller contract
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
 * Get market data from JustLend V1 API (more stable than direct contract queries).
 * API returns comprehensive market data including APY, TVL, prices, etc.
 *
 * VERSION: V1 - Queries JustLend V1 API endpoints
 * API calculates data using same V1 contract logic but provides pre-computed results.
 */
export declare function getMarketDataFromAPI(network?: string): Promise<any>;
/**
 * Get market dashboard data from JustLend V1 API.
 * Includes protocol-level statistics like total supply, total borrow, etc.
 *
 * VERSION: V1 - Queries JustLend V1 API
 */
export declare function getMarketDashboardFromAPI(network?: string): Promise<any>;
/**
 * Get detailed jToken information from JustLend V1 API.
 * @param jtokenAddr - jToken contract address (V1)
 *
 * VERSION: V1 - Queries JustLend V1 API for jToken details
 */
export declare function getJTokenDetailsFromAPI(jtokenAddr: string, network?: string): Promise<any>;
//# sourceMappingURL=markets.d.ts.map