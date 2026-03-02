/**
 * Convert a Base58 TRON address to its hex representation.
 * If already hex, returns as-is.
 */
export declare function toHexAddress(address: string): string;
/**
 * Convert a hex TRON address to its Base58 representation.
 * If already Base58, returns as-is.
 */
export declare function toBase58Address(address: string): string;
/**
 * Returns true if the address is a valid TRON Base58 address (starts with 'T').
 */
export declare function isBase58(address: string): boolean;
/**
 * Returns true if the address is a valid TRON hex address (41... or 0x...).
 */
export declare function isHex(address: string): boolean;
/**
 * Resolve a TRON address or name to its canonical address.
 * Currently supports direct addresses only (no name service).
 */
export declare const resolveAddress: (nameOrAddress: string, _network?: string) => Promise<string>;
//# sourceMappingURL=address.d.ts.map