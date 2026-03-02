/**
 * Utility functions for formatting and converting TRON values.
 * 1 TRX = 1,000,000 SUN
 */
export declare const utils: {
    /** Convert TRX to Sun (smallest unit). */
    toSun: (trx: number | string) => string;
    /** Convert Sun to TRX. */
    fromSun: (sun: number | string | bigint) => string;
    /** Stringify a bigint or number. */
    formatBigInt: (value: bigint | number) => string;
    /** JSON-serialize an object, converting BigInts to strings. */
    formatJson: (obj: unknown) => string;
    /** Format a number with locale comma separators. */
    formatNumber: (value: number | string) => string;
    /** Convert a hex string to a decimal number. */
    hexToNumber: (hex: string) => number;
    /** Convert a decimal number to a hex string (0x-prefixed). */
    numberToHex: (num: number) => string;
    /** Check whether a string is a valid TRON address. */
    isAddress: (address: string) => boolean;
};
//# sourceMappingURL=utils.d.ts.map