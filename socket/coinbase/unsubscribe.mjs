/**
 * All messages have a type, new message types can be added at any time.
 * Multiple channels can be subscribed, with unique message for each.
 * Send `subscribe` message to begin, with channel and product identifiers to receive.
 * Send `unsubscribe` message to stop receiving data from a channel, a `subscriptions` message will be received.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
 * @typedef {import('#types/coinbase.ts').default} ICoinbase
 * @module socket/coinbase/unsubscribe
 */

import config from '#config/coinbase.json' with { type: 'json' };
import { signJwt } from '#lib/authentication.mjs';
import { AUTH } from '#lib/constants.mjs';
import settings from '#settings/coinbase.json' with { type: 'json' };

/**
 * @param {{}} data
 * @param {WebSocket} socket
 * @returns {Promise<{}>}
 */
const coinbaseUnsubscribe = async (data, socket) => {
  const { timestamp } = global.apiTools,
    {
      SOCKET: { UNSUBSCRIBE },
    } = /** @type {ICoinbase["config"]} */ (config),
    { user, authentication } = /** @type {ICoinbase["settings"]} */ (settings),
    { portfolio } = user,
    { delay, keys, secrets, security } = authentication,
    key = keys[user[portfolio].uuid],
    /**
     * @type {{
     *   jwt?: string;
     *   type: string;
     * }}
     */
    message = {
      ...data,
      type: UNSUBSCRIBE,
    },
    secret = secrets[user[portfolio].uuid],
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      // uri: URL,
    };

  console.info('coinbaseUnsubscribe', message);

  if (security === AUTH.SECURITY.JWT) {
    message.jwt = signJwt('hex', payload, secret, key);
  }

  socket.send(JSON.stringify(message));

  return socket;
};

export default coinbaseUnsubscribe;
