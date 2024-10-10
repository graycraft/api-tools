/**
 * @typedef {import("#types/bybit.d.ts").cancelType} cancelType
 * @typedef {import("#types/bybit.d.ts").category} category
 * @typedef {import("#types/bybit.d.ts").positionIdx} positionIdx
 * @typedef {import("#types/bybit.d.ts").orderStatus} orderStatus
 * @typedef {import("#types/bybit.d.ts").orderType} orderType
 * @typedef {import("#types/bybit.d.ts").rejectReason} rejectReason
 * @typedef {import("#types/bybit.d.ts").side} side
 * @typedef {import("#types/bybit.d.ts").smpType} smpType
 * @typedef {import("#types/bybit.d.ts").stopOrderType} stopOrderType
 * @typedef {import("#types/bybit.d.ts").timeInForce} timeInForce
 * @typedef {import("#types/bybit.d.ts").triggerBy} triggerBy
 * @typedef default
 * @type {{
 *   result: {
 *     category: category;
 *     list: [{
 *       activationPrice: string;
 *       avgPrice: "" | "0" | string;
 *       basePrice: string;
 *       blockTradeId: "";
 *       cancelType: cancelType;
 *       closeOnTrigger: boolean;
 *       createdTime: string;
 *       cumExecFee: string;
 *       cumExecQty: string;
 *       cumExecValue: string;
 *       isLeverage: "0" | "1";
 *       lastPriceOnCreated: "";
 *       leavesQty: string;
 *       leavesValue: string;
 *       marketUnit: "";
 *       orderId: string;
 *       orderIv: "";
 *       orderLinkId: string;
 *       orderType: orderType[number];
 *       orderStatus: orderStatus;
 *       placeType: "" | "iv" | "option" | "price";
 *       positionIdx: positionIdx;
 *       price: string;
 *       qty: string;
 *       reduceOnly: boolean;
 *       rejectReason: rejectReason;
 *       side: side[number];
 *       slLimitPrice: string;
 *       slTriggerBy: triggerBy;
 *       smpGroup: 0 | number;
 *       smpOrderId: "";
 *       smpType: smpType;
 *       stopLoss: string;
 *       stopOrderType: stopOrderType;
 *       symbol: string;
 *       takeProfit: string;
 *       timeInForce: timeInForce;
 *       tpLimitPrice: string;
 *       tpTriggerBy: triggerBy;
 *       triggerDirection: 0 | 1 | 2;
 *       trailingPercentage: string;
 *       trailingValue: string;
 *       triggerBy: triggerBy;
 *       triggerPrice: string;
 *       updatedTime: string;
 *     }];
 *     nextPageCursor: string;
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
