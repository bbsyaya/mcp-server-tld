import { getTronWeb } from "./clients.js";
/**
 * Get a block by its number.
 */
export async function getBlockByNumber(blockNumber, network = "mainnet") {
    const tronWeb = getTronWeb(network);
    return tronWeb.trx.getBlock(blockNumber);
}
/**
 * Get a block by its hash.
 */
export async function getBlockByHash(blockHash, network = "mainnet") {
    const tronWeb = getTronWeb(network);
    return tronWeb.trx.getBlock(blockHash);
}
/**
 * Get the most recently confirmed block.
 */
export async function getLatestBlock(network = "mainnet") {
    const tronWeb = getTronWeb(network);
    return tronWeb.trx.getCurrentBlock();
}
/**
 * Get the current block number.
 */
export async function getBlockNumber(network = "mainnet") {
    const block = await getLatestBlock(network);
    return block.block_header.raw_data.number;
}
/**
 * Get the chain ID for a given network.
 * TRON does not use EVM chain IDs natively; known IDs are returned for convenience.
 */
export async function getChainId(network = "mainnet") {
    if (network === "mainnet")
        return 728126428;
    if (network === "nile")
        return 20191029;
    if (network === "shasta")
        return 1;
    return 0;
}
//# sourceMappingURL=blocks.js.map