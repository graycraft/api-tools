/**
 * All messages have a type, new message types can be added at any time.
 * Multiple channels can be subscribed, with unique message for each.
 * Send `subscribe` message to begin, with channel and product identifiers to receive.
 * Send `unsubscribe` message to stop receiving data from a channel, a `subscriptions` message will be received.
 * Client must send a subscribe message within 5 seconds or it will be disconnected in 5 seconds.
 * 
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
 * @module socket/coinbase/subscribe
 */

import coinbaseUnsubscribe from "./unsubscribe.mjs";
import config from "../../configuration/coinbase.json" with { type: "json" };
import { signJwt } from "../../lib/authentication.mjs";
import { socketData } from "../../lib/socket.mjs";
import settings from "../../settings/coinbase.json" with { type: "json" };

/**
 * 
 * @param {*} sign 
 * @param {*} pathTemplate 
 * @param {*} data 
 * @param {*} parse 
 * @returns {Promise<object>}
 */
const coinbaseSubscribe = async (sign, channel, data = {}) => {
    const { ENCODING, SOCKET: { SUBSCRIBE, URL } } = config,
      { account, authentication } = settings,
      { wallet } = account,
      { delay, keys, secrets } = authentication,
      key = keys[account[wallet]],
      message = {
        ...data,
        channel,
        type: SUBSCRIBE
      },
      secret = secrets[account[wallet]],
      timestamp = Date.now(),
      payload = {
        exp: Math.floor(timestamp / delay) + 120,
        iss: "cdp",
        nbf: Math.floor(timestamp / delay),
        sub: key,
        //uri: URL,
      };

    console.log("coinbaseSubscribe", channel);
    if (sign === "JWT") {
      message.jwt = signJwt(ENCODING, payload, secret, key);
    };

    const { socket } = socketData(URL, message, coinbaseUnsubscribe);

    return socket;
  };

export default coinbaseSubscribe;
