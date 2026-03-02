/**
 * Get TRC20 token metadata (name, symbol, decimals, totalSupply).
 */
export declare function getTRC20TokenInfo(tokenAddress: string, network?: string): Promise<{
    name: string;
    symbol: string;
    decimals: number;
    totalSupply: bigint;
    formattedTotalSupply: string;
}>;
/**
 * Get TRC721 (NFT) token metadata for a specific tokenId.
 */
export declare function getTRC721TokenMetadata(tokenAddress: string, tokenId: bigint, network?: string): Promise<{
    name: string;
    symbol: string;
    tokenURI: string;
}>;
/**
 * Get the URI for a TRC1155 token ID.
 */
export declare function getTRC1155TokenURI(tokenAddress: string, tokenId: bigint, network?: string): Promise<string>;
//# sourceMappingURL=tokens.d.ts.map