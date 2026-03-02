import { TronWeb } from "tronweb";
/**
 * Get a read-only TronWeb instance for a specific network (cached).
 */
export declare function getTronWeb(network?: string): TronWeb;
/**
 * Create a TronWeb instance with private key for signing transactions.
 * NOT cached because each wallet is unique.
 */
export declare function getWallet(privateKey: string, network?: string): TronWeb;
//# sourceMappingURL=clients.d.ts.map