/**
 * @typedef {import("#types/bybit.ts").category} category
 * @typedef {import("./history-one.js").default} JTradeHistoryOne
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     list: JTradeHistoryOne["result"]["list"][0][];
 *     nextPageCursor: string;
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
