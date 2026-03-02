import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
/**
 * Register all JustLend MCP tools.
 *
 * SECURITY: Private keys are read from environment variables, never passed as tool arguments.
 * Write operations require TRON_PRIVATE_KEY or TRON_MNEMONIC to be set.
 */
export declare function registerJustLendTools(server: McpServer): void;
//# sourceMappingURL=tools.d.ts.map