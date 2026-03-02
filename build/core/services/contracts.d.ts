/**
 * Read from a smart contract (view/pure functions).
 */
export declare function readContract(params: {
    address: string;
    functionName: string;
    args?: any[];
    abi?: any[];
}, network?: string): Promise<any>;
/**
 * Write to a smart contract (state-changing functions).
 */
export declare function writeContract(privateKey: string, params: {
    address: string;
    functionName: string;
    args?: any[];
    value?: string;
    abi?: any[];
}, network?: string): Promise<any>;
/**
 * Fetch the ABI for a verified contract from TronGrid.
 */
export declare function fetchContractABI(contractAddress: string, network?: string): Promise<any>;
/**
 * Parse and normalise an ABI (string or array) for TronWeb compatibility.
 */
export declare function parseABI(abiJson: string | any[]): any[];
/**
 * Return human-readable function signatures from an ABI array.
 */
export declare function getReadableFunctions(abi: any[]): string[];
/**
 * Find a specific function definition in an ABI array. Throws if not found.
 */
export declare function getFunctionFromABI(abi: any[], functionName: string): any;
/**
 * Execute multiple contract reads in a single Multicall (v2 or v3).
 * Falls back to sequential Promise.allSettled when no multicall address is given.
 */
export declare function multicall(params: {
    calls: Array<{
        address: string;
        functionName: string;
        args?: any[];
        abi: any[];
        allowFailure?: boolean;
    }>;
    multicallAddress?: string;
    version?: 2 | 3;
    allowFailure?: boolean;
}, network?: string): Promise<any>;
/**
 * Deploy a smart contract to TRON.
 */
export declare function deployContract(privateKey: string, params: {
    abi: any[];
    bytecode: string;
    args?: any[];
    name?: string;
    feeLimit?: number;
    originEnergyLimit?: number;
    userPercentage?: number;
}, network?: string): Promise<{
    txID: string;
    contractAddress: string;
    message: string;
}>;
/**
 * Estimate the energy required for a contract call using triggerConstantContract.
 */
export declare function estimateEnergy(params: {
    address: string;
    functionName: string;
    args?: any[];
    abi: any[];
    ownerAddress?: string;
}, network?: string): Promise<{
    energyUsed: number;
    energyPenalty: number;
    totalEnergy: number;
}>;
//# sourceMappingURL=contracts.d.ts.map