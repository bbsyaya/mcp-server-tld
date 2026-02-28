import { TronWeb } from "tronweb";
import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english.js";
import { HDKey } from "@scure/bip32";

export interface ConfiguredWallet {
  privateKey: string;
  address: string;
}

/**
 * Get the configured wallet from environment variables.
 * Supports TRON_PRIVATE_KEY or TRON_MNEMONIC + TRON_ACCOUNT_INDEX.
 */
export function getConfiguredWallet(): ConfiguredWallet {
  const privateKey = process.env.TRON_PRIVATE_KEY;
  const mnemonic = process.env.TRON_MNEMONIC;
  const accountIndexStr = process.env.TRON_ACCOUNT_INDEX || "0";
  const accountIndex = parseInt(accountIndexStr, 10);

  if (isNaN(accountIndex) || accountIndex < 0 || !Number.isInteger(accountIndex)) {
    throw new Error(`Invalid TRON_ACCOUNT_INDEX: "${accountIndexStr}". Must be a non-negative integer.`);
  }

  if (privateKey) {
    const cleanKey = privateKey.startsWith("0x") ? privateKey.slice(2) : privateKey;
    const address = TronWeb.address.fromPrivateKey(cleanKey);
    if (!address) throw new Error("Invalid private key provided in TRON_PRIVATE_KEY");
    return { privateKey: cleanKey, address };
  }

  if (mnemonic) {
    if (!bip39.validateMnemonic(mnemonic, wordlist)) {
      throw new Error("Invalid mnemonic provided in TRON_MNEMONIC");
    }
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hdKey = HDKey.fromMasterSeed(seed);
    const child = hdKey.derive(`m/44'/195'/0'/0/${accountIndex}`);
    if (!child.privateKey) throw new Error("Failed to derive private key from mnemonic");

    const privateKeyHex = Buffer.from(child.privateKey).toString("hex");
    const address = TronWeb.address.fromPrivateKey(privateKeyHex);
    return { privateKey: privateKeyHex, address: address as string };
  }

  throw new Error(
    "Neither TRON_PRIVATE_KEY nor TRON_MNEMONIC environment variable is set.\n" +
    "Configure one to enable write operations (supply, borrow, repay, etc.).",
  );
}

export function getConfiguredPrivateKey(): string {
  return getConfiguredWallet().privateKey;
}

export function getWalletAddress(): string {
  return getConfiguredWallet().address;
}
