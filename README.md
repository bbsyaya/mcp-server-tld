# MCP Server JustLend

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TRON Network](https://img.shields.io/badge/Network-TRON-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-3178C6)
![MCP](https://img.shields.io/badge/MCP-1.22.0+-blue)
![JustLend](https://img.shields.io/badge/Protocol-JustLend_DAO-green)

A Model Context Protocol (MCP) server that enables AI agents to interact with the **JustLend DAO** lending protocol on TRON. Supply assets, borrow against collateral, manage positions, and analyze DeFi portfolios — all through a unified AI interface.

## Overview

[JustLend DAO](https://justlend.org) is the largest lending protocol on TRON, based on the Compound V2 architecture. This MCP server wraps the full protocol functionality into tools and guided prompts that AI agents (Claude Desktop, Cursor, etc.) can use.

### Key Capabilities

- **Market Data**: Real-time APYs, TVL, utilization rates, prices for all markets
- **Supply**: Deposit TRX or TRC20 tokens to earn interest (mint jTokens)
- **Borrow**: Borrow assets against your collateral with health factor monitoring
- **Repay**: Repay outstanding borrows with full or partial amounts
- **Withdraw**: Redeem jTokens back to underlying assets
- **Collateral Management**: Enter/exit markets, manage what counts as collateral
- **Portfolio Analysis**: AI-guided risk assessment, health factor monitoring, optimization
- **Token Approvals**: Manage TRC20 approvals for jToken contracts

## Supported Markets

| jToken | Underlying | Description |
|--------|-----------|-------------|
| jTRX   | TRX       | Native TRON token |
| jUSDT  | USDT      | Tether USD |
| jUSDC  | USDC      | USD Coin |
| jBTC   | BTC       | Bitcoin (wrapped) |
| jETH   | ETH       | Ethereum (wrapped) |
| jSUN   | SUN       | SUN token |
| jWIN   | WIN       | WINkLink |
| jTUSD  | TUSD      | TrueUSD |

## Prerequisites

- [Node.js](https://nodejs.org/) 20.0.0 or higher
- Optional: [TronGrid API key](https://www.trongrid.io/) for reliable mainnet access

## Installation

```bash
git clone https://github.com/your-org/mcp-server-justlend.git
cd mcp-server-justlend
npm install
```

## Configuration

### Environment Variables

> **SECURITY**: Never save private keys in config files. Use environment variables.

```bash
# Required for write operations (supply, borrow, repay, etc.)
export TRON_PRIVATE_KEY="your_private_key_hex"
# OR
export TRON_MNEMONIC="word1 word2 ... word12"
export TRON_ACCOUNT_INDEX="0"  # Optional, default: 0

# Recommended for mainnet (avoids rate limiting)
export TRONGRID_API_KEY="your_trongrid_api_key"
```

### Client Configuration

#### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "justlend": {
      "command": "npx",
      "args": ["tsx", "/path/to/mcp-server-justlend/src/index.ts"],
      "env": {
        "TRONGRID_API_KEY": "your_key (or set in system env)"
      }
    }
  }
}
```

#### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "justlend": {
      "command": "npx",
      "args": ["tsx", "/path/to/mcp-server-justlend/src/index.ts"]
    }
  }
}
```

## Usage

```bash
# Stdio mode (for MCP clients)
npm start

# HTTP/SSE mode (for remote clients)
npm run start:http

# Development with auto-reload
npm run dev
```

## API Reference

### Tools (20 total)

#### Wallet & Network
| Tool | Description | Write? |
|------|-------------|--------|
| `get_wallet_address` | Show configured wallet address | No |
| `get_supported_networks` | List available networks | No |
| `get_supported_markets` | List all jToken markets with addresses | No |

#### Market Data
| Tool | Description | Write? |
|------|-------------|--------|
| `get_market_data` | Detailed data for one market (APY, TVL, rates) | No |
| `get_all_markets` | Overview of all markets | No |
| `get_protocol_summary` | Comptroller config & protocol parameters | No |

#### Account & Balances
| Tool | Description | Write? |
|------|-------------|--------|
| `get_account_summary` | Full position: supplies, borrows, health factor | No |
| `check_allowance` | Check TRC20 approval for jToken | No |
| `get_trx_balance` | TRX balance | No |
| `get_token_balance` | TRC20 token balance | No |

#### Lending Operations
| Tool | Description | Write? |
|------|-------------|--------|
| `supply` | Deposit assets to earn interest | **Yes** |
| `withdraw` | Withdraw supplied assets | **Yes** |
| `withdraw_all` | Withdraw all from a market | **Yes** |
| `borrow` | Borrow against collateral | **Yes** |
| `repay` | Repay outstanding borrows | **Yes** |
| `enter_market` | Enable market as collateral | **Yes** |
| `exit_market` | Disable market as collateral | **Yes** |
| `approve_underlying` | Approve TRC20 for jToken | **Yes** |
| `claim_rewards` | Claim mining rewards | **Yes** |

### Prompts (AI-Guided Workflows)

| Prompt | Description |
|--------|-------------|
| `supply_assets` | Step-by-step supply with balance checks and approval |
| `borrow_assets` | Safe borrowing with risk assessment and health factor checks |
| `repay_borrow` | Guided repayment with verification |
| `analyze_portfolio` | Comprehensive portfolio analysis with risk scoring |
| `compare_markets` | Find best supply/borrow opportunities |

## Architecture

```
mcp-server-justlend/
├── src/
│   ├── core/
│   │   ├── chains.ts        # Network + JustLend contract addresses
│   │   ├── abis.ts          # jToken, Comptroller, Oracle ABIs
│   │   ├── tools.ts         # MCP tool registrations (20 tools)
│   │   ├── prompts.ts       # AI-guided workflow prompts (5 prompts)
│   │   ├── resources.ts     # Static protocol info resource
│   │   └── services/
│   │       ├── clients.ts   # TronWeb client factory (cached)
│   │       ├── wallet.ts    # Private key / mnemonic management
│   │       ├── markets.ts   # Market data reads (APY, TVL, prices)
│   │       ├── account.ts   # User positions, liquidity, balances
│   │       └── lending.ts   # Supply, borrow, repay, withdraw, collateral
│   ├── server/
│   │   ├── server.ts        # MCP server init
│   │   └── http-server.ts   # Express HTTP/SSE transport
│   └── index.ts             # Stdio entry point
├── bin/cli.js                # CLI entry for npx
└── tests/
```

## Security Considerations

- **Private keys** are read from environment variables only, never exposed via MCP tools
- **Write operations** are clearly marked with `destructiveHint: true` in MCP annotations
- **Health factor checks** in prompts prevent dangerous borrowing
- Always **test on Nile testnet** before mainnet
- Be cautious with **unlimited approvals** (`approve_underlying` with `max`)
- **Never share** your `claude_desktop_config.json` if it contains keys

## Example Conversations

**"What are the best supply rates on JustLend right now?"**
→ AI calls `get_all_markets`, sorts by supplyAPY, presents ranking

**"I want to supply 10,000 USDT to earn interest"**
→ AI uses `supply_assets` prompt: checks balance → approves USDT → supplies → verifies

**"Am I at risk of liquidation?"**
→ AI calls `get_account_summary`, analyzes health factor, warns if < 1.5

**"Borrow 500 USDT against my TRX collateral"**
→ AI uses `borrow_assets` prompt: checks collateral → calculates new health factor → executes if safe

## License

MIT
