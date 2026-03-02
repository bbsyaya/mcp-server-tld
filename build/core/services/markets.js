import { getTronWeb } from "./clients.js";
import { getJustLendAddresses, getAllJTokens } from "../chains.js";
import { JTOKEN_ABI, COMPTROLLER_ABI, PRICE_ORACLE_ABI } from "../abis.js";
// TRON produces ~1 block per 3 seconds, ~28,800 blocks/day, ~10,512,000 blocks/year
const BLOCKS_PER_YEAR = 10_512_000;
const MANTISSA = 1e18;
/**
 * Convert per-block rate to APY percentage.
 * APY = ((1 + ratePerBlock)^blocksPerYear - 1) * 100
 */
function rateToAPY(ratePerBlock) {
    const rate = Number(ratePerBlock) / MANTISSA;
    const apy = (Math.pow(1 + rate, BLOCKS_PER_YEAR) - 1) * 100;
    return Math.round(apy * 100) / 100; // 2 decimals
}
/**
 * Format a raw amount using token decimals to a human-readable string.
 */
function formatUnits(raw, decimals) {
    const divisor = 10 ** decimals;
    const value = Number(raw) / divisor;
    // Use enough precision
    if (value > 1e6)
        return value.toFixed(2);
    if (value > 1)
        return value.toFixed(6);
    return value.toFixed(decimals);
}
/**
 * Get full market data for a single jToken market.
 */
export async function getMarketData(jTokenInfo, network = "mainnet") {
    const tronWeb = getTronWeb(network);
    const addresses = getJustLendAddresses(network);
    const jToken = tronWeb.contract(JTOKEN_ABI, jTokenInfo.address);
    const comptroller = tronWeb.contract(COMPTROLLER_ABI, addresses.comptroller);
    // Batch read calls
    const [supplyRatePerBlock, borrowRatePerBlock, totalSupplyRaw, totalBorrowsRaw, totalReservesRaw, cashRaw, exchangeRateRaw, reserveFactorRaw, marketInfo, mintPaused, borrowPaused,] = await Promise.all([
        jToken.methods.supplyRatePerBlock().call(),
        jToken.methods.borrowRatePerBlock().call(),
        jToken.methods.totalSupply().call(),
        jToken.methods.totalBorrows().call(),
        jToken.methods.totalReserves().call(),
        jToken.methods.getCash().call(),
        jToken.methods.exchangeRateStored().call(),
        jToken.methods.reserveFactorMantissa().call(),
        comptroller.methods.markets(jTokenInfo.address).call(),
        comptroller.methods.mintGuardianPaused(jTokenInfo.address).call(),
        comptroller.methods.borrowGuardianPaused(jTokenInfo.address).call(),
    ]);
    // Get price from oracle
    let underlyingPriceRaw;
    try {
        const oracle = tronWeb.contract(PRICE_ORACLE_ABI, addresses.priceOracle);
        underlyingPriceRaw = BigInt(await oracle.methods.getUnderlyingPrice(jTokenInfo.address).call());
    }
    catch {
        underlyingPriceRaw = 0n;
    }
    const supplyAPY = rateToAPY(BigInt(supplyRatePerBlock));
    const borrowAPY = rateToAPY(BigInt(borrowRatePerBlock));
    const totalBorrowsBig = BigInt(totalBorrowsRaw);
    const cashBig = BigInt(cashRaw);
    const totalSupplyBig = BigInt(totalSupplyRaw);
    // Utilization = borrows / (cash + borrows - reserves)
    const totalReservesBig = BigInt(totalReservesRaw);
    const denominator = cashBig + totalBorrowsBig - totalReservesBig;
    const utilizationRate = denominator > 0n
        ? Math.round(Number(totalBorrowsBig * 10000n / denominator)) / 100
        : 0;
    const collateralFactor = Number(BigInt(marketInfo.collateralFactorMantissa)) / MANTISSA * 100;
    const reserveFactor = Number(BigInt(reserveFactorRaw)) / MANTISSA * 100;
    // Exchange rate: how many underlying per 1 jToken
    // exchangeRate = (cash + totalBorrows - totalReserves) / totalSupply
    // Stored as mantissa with 18 + underlyingDecimals - jTokenDecimals precision
    const exchangeRateNum = Number(BigInt(exchangeRateRaw)) / MANTISSA;
    // Price: oracle returns price scaled to 36 - underlyingDecimals
    const priceScale = 10 ** (36 - jTokenInfo.underlyingDecimals);
    const priceUSD = Number(underlyingPriceRaw) / priceScale;
    return {
        symbol: jTokenInfo.symbol,
        underlyingSymbol: jTokenInfo.underlyingSymbol,
        jTokenAddress: jTokenInfo.address,
        underlyingAddress: jTokenInfo.underlying,
        supplyAPY,
        borrowAPY,
        totalSupply: formatUnits(totalSupplyBig, jTokenInfo.decimals),
        totalBorrows: formatUnits(totalBorrowsBig, jTokenInfo.underlyingDecimals),
        totalReserves: formatUnits(totalReservesBig, jTokenInfo.underlyingDecimals),
        availableLiquidity: formatUnits(cashBig, jTokenInfo.underlyingDecimals),
        exchangeRate: exchangeRateNum.toFixed(10),
        collateralFactor: Math.round(collateralFactor * 100) / 100,
        reserveFactor: Math.round(reserveFactor * 100) / 100,
        isListed: Boolean(marketInfo.isListed),
        mintPaused: Boolean(mintPaused),
        borrowPaused: Boolean(borrowPaused),
        underlyingPriceUSD: priceUSD.toFixed(6),
        utilizationRate,
    };
}
/**
 * Get market data for all listed JustLend markets.
 */
export async function getAllMarketData(network = "mainnet") {
    const tokens = getAllJTokens(network);
    const results = await Promise.allSettled(tokens.map((t) => getMarketData(t, network)));
    return results
        .filter((r) => r.status === "fulfilled")
        .map((r) => r.value);
}
/**
 * Get protocol-level summary from Comptroller.
 */
export async function getProtocolSummary(network = "mainnet") {
    const tronWeb = getTronWeb(network);
    const addresses = getJustLendAddresses(network);
    const comptroller = tronWeb.contract(COMPTROLLER_ABI, addresses.comptroller);
    const [closeFactor, liquidationIncentive, allMarkets, oracleAddress] = await Promise.all([
        comptroller.methods.closeFactorMantissa().call(),
        comptroller.methods.liquidationIncentiveMantissa().call(),
        comptroller.methods.getAllMarkets().call(),
        comptroller.methods.oracle().call(),
    ]);
    return {
        comptroller: addresses.comptroller,
        oracle: oracleAddress,
        closeFactor: `${(Number(BigInt(closeFactor)) / MANTISSA * 100).toFixed(1)}%`,
        liquidationIncentive: `${(Number(BigInt(liquidationIncentive)) / MANTISSA * 100).toFixed(1)}%`,
        totalMarkets: allMarkets.length,
        marketAddresses: allMarkets,
        network,
    };
}
//# sourceMappingURL=markets.js.map