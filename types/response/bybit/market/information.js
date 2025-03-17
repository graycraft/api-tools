/**
 * @typedef {import("#types/bybit.ts").category} category
 * @typedef {import("#types/bybit.ts").contractType} contractType
 * @typedef {import("#types/bybit.ts").marginTrading} marginTrading
 * @typedef {import("#types/bybit.ts").tradeStatus} tradeStatus
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     list: {
 *       baseCoin: string;
 *       contractType?: contractType
 *       innovation: "0";
 *       lotSizeFilter: {
 *         basePrecision: string;
 *         maxOrderAmt: string;
 *         maxOrderQty: string;
 *         minOrderAmt: string;
 *         minOrderQty: string;
 *         quotePrecision: string;
 *       },
 *       marginTrading: marginTrading;
 *       priceFilter: {
 *         tickSize: string;
 *       },
 *       quoteCoin: string;
 *       riskParameters: {
 *         limitParameter: string;
 *         marketParameter: string;
 *       };
 *       status: tradeStatus;
 *       symbol: string;
 *     }[];
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
