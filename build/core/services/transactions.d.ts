type Transaction = any;
type TransactionInfo = any;
/**
 * Get full transaction details by hash.
 */
export declare function getTransaction(txHash: string, network?: string): Promise<Transaction>;
/**
 * Get transaction info (receipt) by hash.
 */
export declare function getTransactionInfo(txHash: string, network?: string): Promise<TransactionInfo>;
/** Alias for tools expecting 'receipt'. */
export declare const getTransactionReceipt: typeof getTransactionInfo;
/**
 * Poll until a transaction is confirmed and return its info.
 * Throws after maxAttempts * 2s.
 */
export declare function waitForTransaction(txHash: string, network?: string): Promise<TransactionInfo>;
export {};
//# sourceMappingURL=transactions.d.ts.map