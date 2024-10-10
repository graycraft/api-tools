/**
 * @typedef {import("#types/bybit.d.ts").category} category
 * @typedef {import("#types/bybit.d.ts").orderType} orderType
 * @typedef {import("#types/bybit.d.ts").side} side
 * @typedef {import("#types/bybit.d.ts").stopOrderType} stopOrderType
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     list: [{
 *       blockTradeId: "";
 *       closedSize: string;
 *       execFee: string;
 *       execId: string;
 *       execPrice: string;
 *       execQty: string;
 *       execTime: string;
 *       execType: string;
 *       execValue: string;
 *       feeCurrency: string;
 *       feeRate: string;
 *       indexPrice: "";
 *       isMaker: boolean;
 *       leavesQty: string;
 *       markIv: "";
 *       markPrice: string;
 *       marketUnit: "";
 *       orderId: string;
 *       orderLinkId: string;
 *       orderPrice: string;
 *       orderQty: string;
 *       orderType: orderType[number];
 *       seq: number;
 *       side: side[number];
 *       stopOrderType: stopOrderType;
 *       symbol: string;
 *       tradeIv: string;
 *       underlyingPrice: "";
 *     }];
 *     nextPageCursor: string;
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
