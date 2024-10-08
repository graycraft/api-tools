/**
 * @typedef {import("#types/bybit.d.ts").category} category
 * @typedef {import("./history-one.d.js").default} TradeHistoryOne
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     list: TradeHistoryOne["result"]["list"][0][];
 *     nextPageCursor: string;
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
