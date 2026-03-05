/**
 * JustLend V1 Lending Operations
 *
 * VERSION: JustLend V1
 * All lending methods (supply, withdraw, borrow, repay, collateral management) are for JustLend V1.
 * Based on Compound V2 protocol architecture with jToken (cToken) mechanism.
 *
 * Core operations:
 * - Supply/Mint: Deposit assets to receive jTokens
 * - Withdraw/Redeem: Burn jTokens to receive underlying assets
 * - Borrow: Take loans against supplied collateral
 * - Repay: Return borrowed assets
 * - Enter/Exit Market: Enable/disable assets as collateral
 */
/**
 * Supply (deposit) assets into a JustLend V1 market.
 *
 * VERSION: V1 - Uses JustLend V1 mint() function (Compound V2-style)
 *
 * For TRC20 tokens: requires prior approve() of underlying to jToken contract.
 * For TRX: sends TRX as callValue.
 *
 * @param privateKey - Wallet private key
 * @param jTokenSymbol - e.g. "jUSDT", "jTRX"
 * @param amount - Amount in underlying token units (human-readable, e.g. "100.5")
 * @param network - Network name
 * @returns Transaction ID
 */
export declare function supply(privateKey: string, jTokenSymbol: string, amount: string, network?: string): Promise<{
    txID: string;
    jTokenSymbol: string;
    amount: string;
    message: string;
}>;
/**
 * Withdraw assets from a JustLend V1 market.
 *
 * VERSION: V1 - Uses JustLend V1 redeemUnderlying() function (Compound V2-style)
 *
 * @param privateKey - Wallet private key
 * @param jTokenSymbol - e.g. "jUSDT"
 * @param amount - Amount in underlying units to withdraw (human-readable)
 * @param network - Network name
 */
export declare function withdraw(privateKey: string, jTokenSymbol: string, amount: string, network?: string): Promise<{
    txID: string;
    jTokenSymbol: string;
    amount: string;
    message: string;
}>;
/**
 * Withdraw ALL supply from a V1 market by redeeming all jTokens.
 *
 * VERSION: V1 - Uses JustLend V1 redeem() function
 */
export declare function withdrawAll(privateKey: string, jTokenSymbol: string, network?: string): Promise<{
    txID: string;
    jTokenSymbol: string;
    message: string;
}>;
/**
 * Borrow assets from a JustLend V1 market.
 *
 * VERSION: V1 - Uses JustLend V1 borrow() function (Compound V2-style)
 * Requires the user to have collateral enabled (enterMarkets) and sufficient liquidity.
 */
export declare function borrow(privateKey: string, jTokenSymbol: string, amount: string, network?: string): Promise<{
    txID: string;
    jTokenSymbol: string;
    amount: string;
    message: string;
}>;
/**
 * Repay borrowed assets to a JustLend V1 market.
 *
 * VERSION: V1 - Uses JustLend V1 repayBorrow() function (Compound V2-style)
 *
 * For TRC20: requires approval of underlying to jToken.
 * For TRX: sends callValue.
 * Use amount = "-1" or "max" to repay full borrow balance.
 */
export declare function repay(privateKey: string, jTokenSymbol: string, amount: string, network?: string): Promise<{
    txID: string;
    jTokenSymbol: string;
    amount: string;
    message: string;
}>;
/**
 * Enable a jToken market as collateral in V1 Comptroller.
 *
 * VERSION: V1 - Uses JustLend V1 enterMarkets() function
 */
export declare function enterMarket(privateKey: string, jTokenSymbol: string, network?: string): Promise<{
    txID: string;
    message: string;
}>;
/**
 * Disable a jToken market as collateral in V1 Comptroller.
 *
 * VERSION: V1 - Uses JustLend V1 exitMarket() function
 * Will fail if it would make the account undercollateralized.
 */
export declare function exitMarket(privateKey: string, jTokenSymbol: string, network?: string): Promise<{
    txID: string;
    message: string;
}>;
/**
 * Approve a V1 jToken contract to spend underlying TRC20 tokens.
 *
 * VERSION: V1 - Approves underlying token for JustLend V1 jToken contracts
 * Required before supply() or repay() for TRC20-backed markets.
 *
 * @param amount - Amount to approve (human-readable), or "max" for unlimited
 */
export declare function approveUnderlying(privateKey: string, jTokenSymbol: string, amount?: string, network?: string): Promise<{
    txID: string;
    message: string;
}>;
/**
 * Claim accrued JustLend rewards for the connected wallet.
 */
export declare function claimRewards(privateKey: string, network?: string): Promise<{
    txID: string;
    message: string;
}>;
//# sourceMappingURL=lending.d.ts.map