/**
 * @typedef {import("#types/bybit.ts").category} category
 * @typedef {import("#types/bybit.ts").withdrawStatus} withdrawStatus
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     rows: [{
 *       amount: string;
 *       chain: string;
 *       coin: string;
 *       createTime: string;
 *       status: withdrawStatus;
 *       tag: string;
 *       toAddress: string;
 *       txID: string;
 *       updateTime: string;
 *       withdrawFee: string;
 *       withdrawId: string;
 *       withdrawType: 0 | 1;
 *     }];
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
