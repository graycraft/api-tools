/**
 * @typedef {import("#types/bybit.d.ts").category} category
 * @typedef {import("#types/bybit.d.ts").side} side
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     list: {
 *       execId: string;
 *       isBlockTrade: boolean;
 *       price: string;
 *       side: side[number];
 *       size: string;
 *       symbol: string;
 *       time: string;
 *     }[]
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
