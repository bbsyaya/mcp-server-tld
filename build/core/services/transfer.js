import { getWallet } from "./clients.js";
import { utils } from "./utils.js";
/**
 * Transfer TRX to an address.
 * @param amount - Amount in TRX (not Sun).
 */
export async function transferTRX(privateKey, to, amount, network = "mainnet") {
    const tronWeb = getWallet(privateKey, network);
    const amountSun = utils.toSun(amount);
    const tx = await tronWeb.trx.sendTransaction(to, amountSun);
    if (tx.result === true && tx.transaction) {
        return tx.transaction.txID;
    }
    if (tx.txID) {
        return tx.txID;
    }
    throw new Error(`Transaction failed: ${JSON.stringify(tx)}`);
}
/**
 * Transfer TRC20 tokens.
 * @param amount - Raw token amount (accounting for decimals).
 */
export async function transferTRC20(tokenAddress, to, amount, privateKey, network = "mainnet") {
    const tronWeb = getWallet(privateKey, network);
    try {
        const contract = await tronWeb.contract().at(tokenAddress);
        const txId = await contract.methods.transfer(to, amount).send();
        const symbol = await contract.methods.symbol().call();
        const decimals = await contract.methods.decimals().call();
        const decimalsNum = Number(decimals);
        const divisor = BigInt(10) ** BigInt(decimalsNum);
        const formatted = (Number(BigInt(amount)) / Number(divisor)).toString();
        return {
            txHash: txId,
            amount: { raw: amount, formatted },
            token: { symbol: String(symbol), decimals: decimalsNum },
        };
    }
    catch (error) {
        throw new Error(`Failed to transfer TRC20: ${error.message}`);
    }
}
/**
 * Approve a spender to spend TRC20 tokens.
 * @param amount - Raw approval amount.
 */
export async function approveTRC20(tokenAddress, spenderAddress, amount, privateKey, network = "mainnet") {
    const tronWeb = getWallet(privateKey, network);
    try {
        const contract = await tronWeb.contract().at(tokenAddress);
        const txId = await contract.methods.approve(spenderAddress, amount).send();
        return txId;
    }
    catch (error) {
        throw new Error(`Failed to approve TRC20: ${error.message}`);
    }
}
//# sourceMappingURL=transfer.js.map