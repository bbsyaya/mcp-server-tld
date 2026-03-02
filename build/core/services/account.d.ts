export interface AccountPosition {
    jTokenAddress: string;
    symbol: string;
    underlyingSymbol: string;
    /** jToken balance (raw) */
    jTokenBalance: string;
    /** Supply balance in underlying token units */
    supplyBalance: string;
    /** Borrow balance in underlying token units */
    borrowBalance: string;
    /** Whether this market is used as collateral */
    isCollateral: boolean;
    /** Exchange rate at time of query */
    exchangeRate: string;
    /** Underlying price in USD */
    underlyingPriceUSD: string;
    /** Supply value in USD */
    supplyValueUSD: string;
    /** Borrow value in USD */
    borrowValueUSD: string;
}
export interface AccountSummary {
    address: string;
    network: string;
    positions: AccountPosition[];
    /** Total supply value across all markets (USD) */
    totalSupplyUSD: string;
    /** Total borrow value across all markets (USD) */
    totalBorrowUSD: string;
    /** Available liquidity before liquidation (USD) — 0 means at risk */
    liquidityUSD: string;
    /** Shortfall — if > 0, account is undercollateralized and can be liquidated */
    shortfallUSD: string;
    /** Health factor: liquidity ratio. >1 = safe, <1 = liquidatable */
    healthFactor: string;
    /** Net APY estimate (weighted average of supply APY minus borrow APY) */
    collateralMarkets: string[];
}
/**
 * Get a user's full position across all JustLend markets.
 */
export declare function getAccountSummary(userAddress: string, network?: string): Promise<AccountSummary>;
/**
 * Check if user has approved enough underlying tokens for a jToken market.
 */
export declare function checkAllowance(userAddress: string, jTokenSymbol: string, network?: string): Promise<{
    allowance: string;
    hasApproval: boolean;
    underlyingAddress: string;
    jTokenAddress: string;
}>;
/**
 * Get TRX balance for an address as a formatted string (TRX units).
 * For a richer return value use getTRXBalance from balance.ts.
 */
export declare function getAccountTRXBalance(address: string, network?: string): Promise<string>;
/**
 * Get TRC20 token balance for an address.
 */
export declare function getTokenBalance(address: string, tokenAddress: string, network?: string): Promise<{
    balance: string;
    symbol: string;
    decimals: number;
}>;
//# sourceMappingURL=account.d.ts.map