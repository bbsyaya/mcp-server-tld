/**
 * Freeze TRX to obtain BANDWIDTH or ENERGY resources (Stake 2.0).
 * @param amount - Amount in Sun (as a decimal string for precision).
 * @param resource - "BANDWIDTH" or "ENERGY".
 * @returns Transaction hash.
 */
export declare function freezeBalanceV2(privateKey: string, amount: string, resource?: "BANDWIDTH" | "ENERGY", network?: string): Promise<string>;
/**
 * Unfreeze staked TRX to release resources (Stake 2.0).
 * @param amount - Amount in Sun (as a decimal string for precision).
 * @param resource - "BANDWIDTH" or "ENERGY".
 * @returns Transaction hash.
 */
export declare function unfreezeBalanceV2(privateKey: string, amount: string, resource?: "BANDWIDTH" | "ENERGY", network?: string): Promise<string>;
/**
 * Withdraw expired unfrozen balance after the unbonding period ends (Stake 2.0).
 * @returns Transaction hash.
 */
export declare function withdrawExpireUnfreeze(privateKey: string, network?: string): Promise<string>;
//# sourceMappingURL=staking.d.ts.map