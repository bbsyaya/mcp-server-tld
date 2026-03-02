import { TronWeb } from "tronweb";
/**
 * Utility functions for formatting and converting TRON values.
 * 1 TRX = 1,000,000 SUN
 */
export const utils = {
    /** Convert TRX to Sun (smallest unit). */
    toSun: (trx) => {
        return TronWeb.toSun(trx).toString();
    },
    /** Convert Sun to TRX. */
    fromSun: (sun) => {
        return TronWeb.fromSun(sun.toString()).toString();
    },
    /** Stringify a bigint or number. */
    formatBigInt: (value) => value.toString(),
    /** JSON-serialize an object, converting BigInts to strings. */
    formatJson: (obj) => JSON.stringify(obj, (_, value) => (typeof value === "bigint" ? value.toString() : value), 2),
    /** Format a number with locale comma separators. */
    formatNumber: (value) => Number(value).toLocaleString(),
    /** Convert a hex string to a decimal number. */
    hexToNumber: (hex) => parseInt(hex, 16),
    /** Convert a decimal number to a hex string (0x-prefixed). */
    numberToHex: (num) => "0x" + num.toString(16),
    /** Check whether a string is a valid TRON address. */
    isAddress: (address) => TronWeb.isAddress(address),
};
//# sourceMappingURL=utils.js.map