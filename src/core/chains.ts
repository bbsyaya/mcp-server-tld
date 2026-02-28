/**
 * TRON Network Definitions + JustLend Protocol Addresses
 *
 * JustLend DAO is a Compound V2-fork lending protocol on TRON.
 * Core contracts: Comptroller, jTokens, PriceOracle, Lens.
 */

export enum TronNetwork {
  Mainnet = "mainnet",
  Nile = "nile",
}

export interface NetworkConfig {
  name: string;
  fullNode: string;
  solidityNode: string;
  eventServer: string;
  explorer: string;
}

/**
 * JustLend core contract addresses per network.
 *
 * NOTE: These addresses are based on publicly known deployments.
 * Always verify against https://justlend.org and on-chain data.
 */
export interface JustLendAddresses {
  comptroller: string; // Unitroller (proxy for Comptroller)
  priceOracle: string; // Price oracle used by Comptroller
  lens: string; // CompoundLens helper (batch reads)
  maximillion: string; // Helper for repaying TRX borrows
  /** Map of symbol → jToken address */
  jTokens: Record<string, JTokenInfo>;
}

export interface JTokenInfo {
  address: string;
  underlying: string; // underlying token address, empty string for TRX
  symbol: string; // e.g. "jTRX"
  underlyingSymbol: string; // e.g. "TRX"
  decimals: number; // jToken decimals (usually 8)
  underlyingDecimals: number; // underlying token decimals
}

export const NETWORKS: Record<TronNetwork, NetworkConfig> = {
  [TronNetwork.Mainnet]: {
    name: "Mainnet",
    fullNode: "https://api.trongrid.io",
    solidityNode: "https://api.trongrid.io",
    eventServer: "https://api.trongrid.io",
    explorer: "https://tronscan.org",
  },
  [TronNetwork.Nile]: {
    name: "Nile Testnet",
    fullNode: "https://nile.trongrid.io",
    solidityNode: "https://nile.trongrid.io",
    eventServer: "https://nile.trongrid.io",
    explorer: "https://nile.tronscan.org",
  },
};

/**
 * JustLend mainnet contract addresses.
 *
 * jToken list sourced from JustLend official docs & TronScan verified contracts.
 * Only the most common markets are included; more can be added.
 */
export const JUSTLEND_ADDRESSES: Record<TronNetwork, JustLendAddresses> = {
  [TronNetwork.Mainnet]: {
    comptroller: "TGjYzgCyPobsNS9n6WcbdLVR9dH7mWqFx7",
    priceOracle: "TXjzHPaDeR2KYXQ3Gfwj82PQ2qHaGThFhi",
    lens: "TFTBTMrrMDBbAGrFQzsSiMdoTSMvkung8V",
    maximillion: "T9gCxZ3YpmGftPmGPUNTFfMX7pJNPob4s1",
    jTokens: {
      jTRX: {
        address: "TLeEu311Mgm2Kft9XAUhc5hdiXpQgPBMmP",
        underlying: "", // native TRX
        symbol: "jTRX",
        underlyingSymbol: "TRX",
        decimals: 8,
        underlyingDecimals: 6,
      },
      jUSDT: {
        address: "TXJgMdjVX5dKiQaUi9QobR2d1pTdip5xG3",
        underlying: "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",
        symbol: "jUSDT",
        underlyingSymbol: "USDT",
        decimals: 8,
        underlyingDecimals: 6,
      },
      jSUN: {
        address: "TGBr8uh9JBQ2cjWpPEjDHMhkwCBBKaP84K",
        underlying: "TKkeiboTkxXKJpbmVFbv4a8ov5rAfRDMf9",
        symbol: "jSUN",
        underlyingSymbol: "SUN",
        decimals: 8,
        underlyingDecimals: 18,
      },
      jWIN: {
        address: "TRg6MnpsFXc82ymUFgHTRDiVfCJXVbCqGy",
        underlying: "TLa2f6VPqDgRE67v1736s7bJ8Ray5wYjU7",
        symbol: "jWIN",
        underlyingSymbol: "WIN",
        decimals: 8,
        underlyingDecimals: 6,
      },
      jBTC: {
        address: "TLeEu311Mgm2Kft9XAUhc5hdiXpQgPBMmP",
        underlying: "TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9",
        symbol: "jBTC",
        underlyingSymbol: "BTC",
        decimals: 8,
        underlyingDecimals: 8,
      },
      jETH: {
        address: "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF",
        underlying: "THb4CqiFdwNHsWsQCs4JhzwjMWys4aqCbF",
        symbol: "jETH",
        underlyingSymbol: "ETH",
        decimals: 8,
        underlyingDecimals: 18,
      },
      jUSDC: {
        address: "TXMSMnSxCUgr8FYhQK8bfjRhBJGMSrc1iF",
        underlying: "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8",
        symbol: "jUSDC",
        underlyingSymbol: "USDC",
        decimals: 8,
        underlyingDecimals: 6,
      },
      jTUSD: {
        address: "TEMBnEbKFPA1GJwkJEMfBHkMqXgMnCbzE1",
        underlying: "TUpMhErZL2fhh4sVNULAbNKLokS4GjC1F4",
        symbol: "jTUSD",
        underlyingSymbol: "TUSD",
        decimals: 8,
        underlyingDecimals: 18,
      },
    },
  },
  [TronNetwork.Nile]: {
    // Nile testnet addresses — placeholders, replace with actual testnet deployments
    comptroller: "TTestComptrollerNileXXXXXXXXXXXXXX",
    priceOracle: "TTestPriceOracleNileXXXXXXXXXXXXXX",
    lens: "TTestLensNileXXXXXXXXXXXXXXXXXXXXX",
    maximillion: "TTestMaximillionNileXXXXXXXXXXXXXX",
    jTokens: {},
  },
};

export const DEFAULT_NETWORK = TronNetwork.Mainnet;

export function getNetworkConfig(network: string = DEFAULT_NETWORK): NetworkConfig {
  const n = network.toLowerCase();
  if (n === "mainnet" || n === "tron" || n === "trx") return NETWORKS[TronNetwork.Mainnet];
  if (n === "nile" || n === "testnet") return NETWORKS[TronNetwork.Nile];
  throw new Error(`Unsupported network: ${network}. Supported: mainnet, nile`);
}

export function getJustLendAddresses(network: string = DEFAULT_NETWORK): JustLendAddresses {
  const n = network.toLowerCase();
  if (n === "mainnet" || n === "tron" || n === "trx") return JUSTLEND_ADDRESSES[TronNetwork.Mainnet];
  if (n === "nile" || n === "testnet") return JUSTLEND_ADDRESSES[TronNetwork.Nile];
  throw new Error(`Unsupported network: ${network}`);
}

export function getSupportedNetworks(): string[] {
  return Object.values(TronNetwork);
}

export function getJTokenInfo(symbolOrAddress: string, network: string = DEFAULT_NETWORK): JTokenInfo | undefined {
  const addresses = getJustLendAddresses(network);
  // Search by symbol first
  const bySymbol = addresses.jTokens[symbolOrAddress] || addresses.jTokens[symbolOrAddress.toUpperCase()];
  if (bySymbol) return bySymbol;
  // Search by address
  return Object.values(addresses.jTokens).find(
    (t) => t.address.toLowerCase() === symbolOrAddress.toLowerCase(),
  );
}

export function getAllJTokens(network: string = DEFAULT_NETWORK): JTokenInfo[] {
  const addresses = getJustLendAddresses(network);
  return Object.values(addresses.jTokens);
}
