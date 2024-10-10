/**
 * @typedef {import("#types/bybit.d.ts").kycLevel} kycLevel
 * @typedef {import("#types/bybit.d.ts").vipLevel} vipLevel
 * @typedef default
 * @type {{
 *   result: {
 *     affiliateID: 0 | number;
 *     apiKey: string;
 *     createdAt: string;
 *     deadlineDay: -2;
 *     expiredAt: string;
 *     id: string;
 *     inviterID: number;
 *     ips: string[];
 *     kycLevel: kycLevel;
 *     kycRegion: string;
 *     main: boolean;
 *     mktMakerLevel: "0";
 *     note: string;
 *     parentUid: "0" | string;
 *     permissions: {
 *       Affiliate: [];
 *       BlockTrade: [];
 *       ContractTrade: ("Order" | "Position")[];
 *       CopyTrading: [];
 *       Derivatives: ["DerivativesTrade"] | [];
 *       Exchange: ["ExchangeHistory"];
 *       NFT: ["NFTQueryProductList"] | [];
 *       Options: ["OptionsTrade"];
 *       Spot: ["SpotTrade"];
 *       Wallet: ("AccountTransfer" |"SubMemberTransfer" | "SubMemberTransferList" | "Withdraw")[];
 *     },
 *     readOnly: 0 | 1,
 *     rsaPublicKey: "";
 *     secret: "",
 *     type: 1 | 2;
 *     unified: 0;
 *     userID: number;
 *     uta: 0 | 1;
 *     vipLevel: vipLevel;
 *   };
 *   retCode: 0;
 *   retExtInfo: {};
 *   retMsg: "success";
 *   time: number;
 * }}
 */
