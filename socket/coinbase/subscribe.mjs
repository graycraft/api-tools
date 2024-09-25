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
 * @typedef {import('types/socket/message.d').Message} WebSocketMessage
 * @module socket/coinbase/subscribe
 */

import config from '#config/coinbase.json' with { type: 'json' };
import { signJwt } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';
import { socketData } from '#lib/socket.mjs';
import settings from '#settings/coinbase.json' with { type: 'json' };

/**
 * @returns {Promise<WebSocket>}
 */
const coinbaseSubscribe = async (security, channel, data = {}) => {
  const { timestamp } = global.apiTools,
    {
      ENCODING,
      SOCKET: { SUBSCRIBE, URL },
    } = config,
    { user, authentication } = settings,
    { portfolio } = user,
    { delay, keys, secrets } = authentication,
    key = keys[user[portfolio]],
    /** @type {WebSocketMessage} */
    message = {
      ...data,
      channel,
      type: /** @type {WebSocketMessage["type"]} */ (SUBSCRIBE),
    },
    secret = secrets[user[portfolio]],
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
    };

  if (security === AUTH.SECURITY.JWT) {
    message.jwt = signJwt(/** @type {"hex"}*/ (ENCODING), payload, secret, key);
  }

  const socket = socketData(URL, message);

  return socket;
};

export default coinbaseSubscribe;
