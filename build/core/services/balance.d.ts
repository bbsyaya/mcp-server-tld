/**
 * Get TRX balance for an address.
 * Returns a rich object with wei (Sun), ether (TRX), formatted string, symbol, and decimals.
 */
export declare function getTRXBalance(address: string, network?: string): Promise<{
    wei: bigint;
    ether: string;
    formatted: string;
    symbol: string;
    decimals: number;
}>;
/**
 * Get TRC20 token balance for an address.
 */
export declare function getTRC20Balance(tokenAddress: string, walletAddress: string, network?: string): Promise<{
    raw: bigint;
    formatted: string;
    token: {
        symbol: string;
        decimals: number;
        address: string;
    };
}>;
/**
 * Get TRC1155 token balance for a given token ID and owner address.
 */
export declare function getTRC1155Balance(contractAddress: string, ownerAddress: string, tokenId: bigint, network?: string): Promise<bigint>;
//# sourceMappingURL=balance.d.ts.map