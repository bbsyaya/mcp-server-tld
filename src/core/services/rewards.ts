/**
 * JustLend Mining Rewards
 *
 * Handles mining rewards for supply markets (USDD, WBTC, etc.)
 * Based on JustLend's merkle distributor system
 */

import { getTronWeb } from "./clients.js";
import { getJustLendAddresses } from "../chains.js";

// Merkle Distributor ABI (simplified)
const MERKLE_DISTRIBUTOR_ABI = [
  {
    "name": "claim",
    "inputs": [
      {"name": "index", "type": "uint256"},
      {"name": "account", "type": "address"},
      {"name": "amount", "type": "uint256"},
      {"name": "merkleProof", "type": "bytes32[]"}
    ],
    "outputs": [],
    "stateMutability": "Nonpayable",
    "type": "Function"
  },
  {
    "name": "isClaimed",
    "inputs": [{"name": "index", "type": "uint256"}],
    "outputs": [{"name": "", "type": "bool"}],
    "stateMutability": "View",
    "type": "Function"
  }
];

/**
 * Mining reward types supported by JustLend
 */
export enum RewardType {
  USDD = "USDD",
  TRX = "TRX",
  WBTC = "WBTC",
  SUN = "SUN",
}

export interface MiningReward {
  type: RewardType;
  jTokenAddress: string;
  jTokenSymbol: string;
  underlyingSymbol: string;
  /** Unclaimed reward amount */
  unclaimedAmount: string;
  /** Claimed reward amount */
  claimedAmount: string;
  /** Total reward amount */
  totalAmount: string;
  /** Reward APY (additional to supply APY) */
  miningAPY: number;
}

export interface MiningRewardsResult {
  address: string;
  network: string;
  /** Total unclaimed rewards across all markets */
  totalUnclaimedUSD: string;
  /** Rewards by market */
  rewards: MiningReward[];
  /** Mining start/end times */
  usddV1MiningEndTime: number; // 2025-01-26 21:00:00
  usddV2MiningStartTime: number; // 2025-02-01 20:00:00
  dualMiningStartTime: number; // Future date for dual mining
}

/**
 * Get mining rewards from JustLend API
 * The API provides comprehensive mining reward data including USDD and WBTC rewards
 */
export async function getMiningRewardsFromAPI(address: string, network = "mainnet"): Promise<any> {
  const apiEndpoints = {
    mainnet: "https://labc.ablesdxd.link",
    nile: "https://nileapi.justlend.org",
  };

  const host = network.toLowerCase() === "nile" ? apiEndpoints.nile : apiEndpoints.mainnet;
  const url = `${host}/justlend/account?addr=${address}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    if (data.code !== 0) {
      throw new Error(`API returned error code: ${data.code}`);
    }

    // Extract mining reward information from account data
    const accountData = data.data;
    return {
      assetList: accountData.assetList || [],
      farmReward: accountData.farmReward || {},
      totalMiningRewards: accountData.totalMiningRewards || "0",
      miningAPY: accountData.miningAPY || {},
    };
  } catch (error) {
    throw new Error(`Failed to fetch mining rewards from API: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Check if user has claimable rewards for a specific distributor
 */
export async function checkClaimableRewards(
  userAddress: string,
  distributorType: "main" | "usdd" | "strx" | "multi",
  network = "mainnet"
): Promise<{ hasRewards: boolean; isClaimed: boolean }> {
  const tronWeb = getTronWeb(network);
  const addresses = getJustLendAddresses(network);

  const distributorAddress = addresses.merkleDistributors[distributorType];
  const distributor = tronWeb.contract(MERKLE_DISTRIBUTOR_ABI, distributorAddress);

  // Note: This is a simplified check. Real implementation would need:
  // 1. Fetch merkle proof data from API or backend
  // 2. Check if index is claimed
  // For now, we recommend using the API method getMiningRewardsFromAPI

  return {
    hasRewards: false,
    isClaimed: false,
  };
}

/**
 * Claim mining rewards (requires merkle proof from API/backend)
 *
 * NOTE: This function requires merkle proof data which is typically
 * provided by the JustLend backend API. Users should:
 * 1. Check rewards via getMiningRewardsFromAPI()
 * 2. Get merkle proof from JustLend API
 * 3. Call this function with the proof data
 */
export async function claimMiningRewards(
  index: number,
  amount: string,
  merkleProof: string[],
  distributorType: "main" | "usdd" | "strx" | "multi" = "main",
  network = "mainnet"
): Promise<{ txid: string; success: boolean }> {
  const tronWeb = getTronWeb(network);
  const addresses = getJustLendAddresses(network);
  const userAddress = tronWeb.defaultAddress.base58;

  if (!userAddress) {
    throw new Error("No wallet address configured. Set TRON_PRIVATE_KEY or TRON_MNEMONIC.");
  }

  const distributorAddress = addresses.merkleDistributors[distributorType];
  const distributor = tronWeb.contract(MERKLE_DISTRIBUTOR_ABI, distributorAddress);

  try {
    const tx = await distributor.methods.claim(
      index,
      userAddress,
      amount,
      merkleProof
    ).send({
      feeLimit: 100_000_000, // 100 TRX
      callValue: 0,
      shouldPollResponse: true,
    });

    return {
      txid: tx,
      success: true,
    };
  } catch (error) {
    throw new Error(`Failed to claim rewards: ${error instanceof Error ? error.message : String(error)}`);
  }
}

/**
 * Get USDD mining configuration
 * USDD has special mining periods with different reward tokens
 */
export function getUSDDMiningConfig() {
  return {
    usddV1: {
      endTime: 1737896400000, // 2025-01-26 21:00:00
      rewardToken: "USDD",
      jToken: "TX7kybeP6UwTBRHLNPYmswFESHfyjm9bAS", // jUSDD OLD
    },
    usddV2: {
      startTime: 1738411200000, // 2025-02-01 20:00:00
      rewardTokens: ["USDD", "TRX"], // Dual token rewards
      jToken: "TKFRELGGoRgiayhwJTNNLqCNjFoLBh3Mnf", // jUSDD
    },
    dualMining: {
      startTime: 1764041700000, // Future date
      description: "Enhanced dual-token mining program"
    }
  };
}

/**
 * Get WBTC mining configuration
 * WBTC market has supply mining activity
 */
export function getWBTCMiningConfig() {
  return {
    jToken: "TVyvpmaVmz25z2GaXBDDjzLZi5iR5dBzGd", // jWBTC
    rewardToken: "Multiple tokens based on campaign",
    active: true,
    description: "WBTC Market Supply Mining Activity",
    announcementLink: "https://support.justlend.org/hc/en-us/articles/54740066620569",
  };
}
