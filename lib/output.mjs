/**!
 * Output message to a console or throw exception for critical error.
 * 
 * @module lib/output
 */

//import config from "../configuration/bybit.json" with { type: "json" };
import { fallback, invalid, optional, required } from "./template.mjs";
import { obtainName } from "./utility.mjs";

export const dirObject = (name, object) => {
    console.dir({ [name]: object }, { depth: null, maxArrayLength: null })
};
export const infoName = (PATH, path) => {
    console.info(obtainName(path, PATH))
};
/**
 * Can not determine param value and can not substitute with default, e.g. random values.
 * API has no predefined value, e.g. `orderId`, `price`, `qty`, `subMemberId`.
 */
export const throwRequired = (PATH, path, param) => {
    throw new Error(obtainName(path, PATH) + ". " + required(param))
};
/**
 * Can not determine param value but can substitute with default.
 * API might has or has no predefined value.
 */
export const warnOptional = (PATH, path, param, value) => {
    console.warn(obtainName(path, PATH) + ": " + optional(param) + fallback(value))
};
/**
 * Can not determine param value and can not substitute with default, e.g. range values.
 * API has predefined value, e.g. `coin`, `limit`.
 */
export const warnRequired = (PATH, path, param) => {
    console.warn(obtainName(path, PATH) + ": " + invalid(param))
};
