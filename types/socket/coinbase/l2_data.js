/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels#level2-channel
 * @typedef {import("#types/coinbase.ts").productId} productId
 * @typedef default
 * @type {{
 *   channel: "l2_data";
 *   client_id: "";
 *   events: {
 *     product_id: productId;
 *     type: "snapshot";
 *     updates: {
 *       event_time: string;
 *       new_quantity: number;
 *       price_level: number;
 *       side: "ask" | "bid";
 *     }[];
 *   }[]
 *   sequence_num: 0;
 *   timestamp: string;
 * }}
 */
