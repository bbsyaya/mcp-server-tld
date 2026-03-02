type Block = any;
/**
 * Get a block by its number.
 */
export declare function getBlockByNumber(blockNumber: number, network?: string): Promise<Block>;
/**
 * Get a block by its hash.
 */
export declare function getBlockByHash(blockHash: string, network?: string): Promise<Block>;
/**
 * Get the most recently confirmed block.
 */
export declare function getLatestBlock(network?: string): Promise<Block>;
/**
 * Get the current block number.
 */
export declare function getBlockNumber(network?: string): Promise<number>;
/**
 * Get the chain ID for a given network.
 * TRON does not use EVM chain IDs natively; known IDs are returned for convenience.
 */
export declare function getChainId(network?: string): Promise<number>;
export {};
//# sourceMappingURL=blocks.d.ts.map