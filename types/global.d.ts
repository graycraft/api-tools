/**
 * JSDoc is not applicable for global type checks.
 * The only way to force the IDE to do this is to use a TypeScript declaration file.
 * After Node.js 16, the `NodeJS.Global` interface was replaced by `globalThis`.
 *
 * @global
 */

declare var apiTools: {
  bybit?: import('#types/bybit.ts').default;
  coinbase?: import('#types/coinbase.ts').default;
  example?: import('#types/example.ts').default;
  fameex?: import('#types/fameex.ts').default;
  options: import('#types/api.ts').options;
  output?: {
    [key: string]: {};
  } & {
    [key in import('#lib/constants.mjs').authSecurity]?: {};
  } & {
    [key in import('#lib/constants.mjs').httpMethod]?: {};
  } & {
    [key in import('#lib/constants.mjs').httpStatusText]?: {};
  };
  timestamp: number;
};

interface BigInt {
  toJSON(key: string): string;
}
interface JSON {
  rawJSON(key: string): string;
}
