/**
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels#market-trades-channel
 * @typedef {import("#types/coinbase.ts").orderSide} orderSide
 * @typedef {import("#types/coinbase.ts").productId} productId
 * @typedef default
 * @type {{
 *   channel: "market_trades";
 *   client_id: "";
 *   events: {
 *     trades: {
 *       price: number;
 *       product_id: productId;
 *       side: orderSide;
 *       size: number;
 *       time: string;
 *       trade_id: number;
 *     }[];
 *     type: "snapshot";
 *   }[]
 *   sequence_num: 0;
 *   timestamp: string;
 * }}
 */
