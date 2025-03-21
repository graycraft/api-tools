/**
 * All messages have a type, new message types can be introduced by Coinbase at any time.
 * Multiple channels can be subscribed, with unique message for each.
 * Send `subscribe` message to begin, with channel and product identifiers to receive.
 * Send `unsubscribe` message to stop receiving data from a channel, a `subscriptions` message will be received.
 * Client must send a subscribe message within 5 seconds or it will be disconnected in 5 seconds.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
 * @typedef {import('#lib/constants.mjs').authSecurity} authSecurity
 * @typedef {import('#types/coinbase.ts').default} ICoinbase
 * @typedef {import('#types/socket/message.js').default} JWebSocketMessage
 * @module socket/coinbase/subscribe
 */

import config from '#config/coinbase.json' with { type: 'json' };
import { signJwt } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';
import { socketData } from '#lib/socket.mjs';
import settings from '#settings/coinbase.json' with { type: 'json' };

/**
 * @param {authSecurity} security
 * @param {JWebSocketMessage["channel"]} channel
 * @param {{}} data
 * @returns {Promise<WebSocket>}
 */
const coinbaseSubscribe = async (security, channel, data = {}) => {
  const { timestamp } = global.apiTools,
    {
      SOCKET: { SUBSCRIBE, URL },
    } = /** @type {ICoinbase["config"]} */ (config),
    { user, authentication } = /** @type {ICoinbase["settings"]} */ (settings),
    { portfolio } = user,
    { delay, keys, secrets } = authentication,
    key = keys[user[portfolio].uuid],
    /** @type {JWebSocketMessage} */
    message = {
      ...data,
      channel,
      type: /** @type {JWebSocketMessage["type"]} */ (SUBSCRIBE),
    },
    secret = secrets[user[portfolio].uuid],
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
    };

  if (security === AUTH.SECURITY.JWT) {
    message.jwt = signJwt('hex', payload, secret, key);
  }

  const socket = socketData(URL, message);

  return socket;
};

export default coinbaseSubscribe;
