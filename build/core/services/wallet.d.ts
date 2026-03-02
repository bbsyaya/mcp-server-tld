export interface ConfiguredWallet {
    privateKey: string;
    address: string;
}
/**
 * Get the configured wallet from environment variables.
 * Supports TRON_PRIVATE_KEY or TRON_MNEMONIC + TRON_ACCOUNT_INDEX.
 */
export declare function getConfiguredWallet(): ConfiguredWallet;
export declare function getConfiguredPrivateKey(): string;
export declare function getWalletAddress(): string;
/** Alias matching the mcp-server-tron API. */
export declare const getWalletAddressFromKey: typeof getWalletAddress;
/**
 * Sign an arbitrary message using the configured wallet.
 * TronWeb prefixes the message with the standard TRON message prefix.
 * @returns Signature as a hex string.
 */
export declare function signMessage(message: string): Promise<string>;
/**
 * Sign typed data (EIP-712 / TRON-712) using the configured wallet.
 * Requires a TronWeb version that supports _signTypedData.
 */
export declare function signTypedData(domain: object, types: object, value: object): Promise<string>;
//# sourceMappingURL=wallet.d.ts.map