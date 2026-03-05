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
export interface MarketOverview {
    symbol: string;
    underlyingSymbol: string;
    jTokenAddress: string;
    underlyingAddress: string;
    /** Base supply APY from lending interest */
    supplyAPY: string;
    /** Borrow APY */
    borrowAPY: string;
    /** Total deposited value in USD */
    depositedUSD: string;
    /** Total borrowed value in USD */
    borrowedUSD: string;
    /** Collateral factor percentage */
    collateralFactor: string;
    /** Underlying asset increment APY (e.g. sTRX staking yield, wstUSDT staking yield) */
    underlyingIncrementAPY: string;
    /** Mining reward USD per day (from supply mining programs) */
    miningRewardUSD24h: number;
    /** Mining APY calculated from daily rewards and TVL */
    miningAPY: string;
    /** Mining reward breakdown */
    miningRewardDetail: string;
    /** Whether supply is paused */
    mintPaused: boolean;
    /** Whether borrow is paused */
    borrowPaused: boolean;
    /** Total APY = supplyAPY + underlyingIncrementAPY + miningAPY */
    totalSupplyAPY: string;
}
/**
 * Get all market data with mining rewards from API.
 * Combines markets list API with jToken details API to get mining APY.
 * This is the recommended method for comprehensive market overview.
 */
export declare function getAllMarketOverview(network?: string): Promise<MarketOverview[]>;
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