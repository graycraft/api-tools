/**
 * Market history schema for Coinbase Advanced API response structure.
 * 
 * @module response/coinbase/market/history
 * @see https://json-schema.org/draft/2020-12/release-notes
 */

const schema = {
    // "$schema": "https://json-schema.org/draft/2020-12/schema",
    additionalProperties: false,
    properties: {
        best_ask: { type: "string" },
        best_bid: { type: "string" },
        trades: { type: "array" },
    },
    required: ["best_ask", "best_bid"],
    type: "object",
}

export default schema
