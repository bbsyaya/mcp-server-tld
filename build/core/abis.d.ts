/**
 * JustLend Contract ABIs (Compound V2 fork)
 *
 * Only the function signatures used by this MCP server are included.
 * Full ABIs can be fetched on-chain via TronWeb for verified contracts.
 */
export declare const JTOKEN_ABI: ({
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
    }[];
    stateMutability: string;
} | {
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
        name: string;
    }[];
    stateMutability: string;
})[];
/**
 * jTRX-specific mint (payable, no params — callValue carries TRX amount)
 */
export declare const JTRX_MINT_ABI: {
    type: string;
    name: string;
    inputs: never[];
    outputs: never[];
    stateMutability: string;
}[];
export declare const COMPTROLLER_ABI: ({
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
    }[];
    stateMutability: string;
} | {
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
        name: string;
    }[];
    stateMutability: string;
})[];
export declare const PRICE_ORACLE_ABI: {
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
    }[];
    stateMutability: string;
}[];
export declare const TRC20_ABI: {
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
    }[];
    stateMutability: string;
}[];
export declare const INTEREST_RATE_MODEL_ABI: {
    type: string;
    name: string;
    inputs: {
        type: string;
        name: string;
    }[];
    outputs: {
        type: string;
    }[];
    stateMutability: string;
}[];
//# sourceMappingURL=abis.d.ts.map