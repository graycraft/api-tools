/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels#candles-channel
 * @typedef {import("#types/coinbase.ts").productId} productId
 * @typedef default
 * @type {{
 *   channel: "candles";
 *   client_id: "";
 *   events: {
 *     candles: {
 *       close: number;
 *       high: number;
 *       low: number;
 *       open: number;
 *       product_id: productId;
 *       start: number;
 *       volume: number;
 *     }[];
 *     type: "snapshot";
 *   }[]
 *   sequence_num: 0;
 *   timestamp: string;
 * }}
 */
