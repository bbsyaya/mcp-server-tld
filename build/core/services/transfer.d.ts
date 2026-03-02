/**
 * Transfer TRX to an address.
 * @param amount - Amount in TRX (not Sun).
 */
export declare function transferTRX(privateKey: string, to: string, amount: string, network?: string): Promise<any>;
/**
 * Transfer TRC20 tokens.
 * @param amount - Raw token amount (accounting for decimals).
 */
export declare function transferTRC20(tokenAddress: string, to: string, amount: string, privateKey: string, network?: string): Promise<{
    txHash: any;
    amount: {
        raw: string;
        formatted: string;
    };
    token: {
        symbol: string;
        decimals: number;
    };
}>;
/**
 * Approve a spender to spend TRC20 tokens.
 * @param amount - Raw approval amount.
 */
export declare function approveTRC20(tokenAddress: string, spenderAddress: string, amount: string, privateKey: string, network?: string): Promise<any>;
//# sourceMappingURL=transfer.d.ts.map