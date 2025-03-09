/**
 * @typedef {import("#types/bybit.ts").depositStatus} depositStatus
 * @typedef default
 * @type {{
 *   result: {
 *     nextPageCursor: string;
 *     rows: [{
 *       amount: string;
 *       batchReleaseLimit: string;
 *       blockHash: string;
 *       chain: string;
 *       coin: string;
 *       confirmations: string;
 *       depositFee: string;
 *       depositType: string;
 *       status: depositStatus;
 *       successAt: string;
 *       tag: string;
 *       toAddress: string;
 *       txID: string;
 *       txIndex: string;
 *     }];
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
