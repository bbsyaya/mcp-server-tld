#!/usr/bin/env node

/**
 * CLI entry point for mcp-server-TLD
 *
 * Usage:
 *   npx mcp-server-TLD          # stdio mode (default)
 *   npx mcp-server-TLD --http   # HTTP/SSE mode
 */

const args = process.argv.slice(2);

if (args.includes("--http") || args.includes("-h")) {
  import("../build/server/http-server.js").catch((err) => {
    console.error("Failed to start HTTP server:", err.message);
    console.error("Did you run `npm run build` first?");
    process.exit(1);
  });
} else {
  import("../build/index.js").catch((err) => {
    console.error("Failed to start stdio server:", err.message);
    console.error("Did you run `npm run build` first?");
    process.exit(1);
  });
}
