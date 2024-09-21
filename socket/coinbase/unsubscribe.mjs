/**
 * All messages have a type, new message types can be added at any time.
 * Multiple channels can be subscribed, with unique message for each.
 * Send `subscribe` message to begin, with channel and product identifiers to receive.
 * Send `unsubscribe` message to stop receiving data from a channel, a `subscriptions` message will be received.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-auth
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
 * @module socket/coinbase/unsubscribe
 */

import config from '../../configuration/coinbase.json' with { type: 'json' };
import { signJwt } from '../../lib/authentication.mjs';
import { AUTH } from '../../lib/constants.mjs';
import settings from '../../settings/coinbase.json' with { type: 'json' };

/**
 * @returns {Promise<object>}
 */
const coinbaseUnsubscribe = async (data, socket) => {
  const { timestamp } = global.apiTools,
    {
      ENCODING,
      SOCKET: { UNSUBSCRIBE },
    } = config,
    { user, authentication } = settings,
    { portfolio } = user,
    { delay, keys, secrets, security } = authentication,
    key = keys[user[portfolio]],
    message = {
      ...data,
      type: UNSUBSCRIBE,
    },
    secret = secrets[user[portfolio]],
    payload = {
      exp: Math.floor(timestamp / delay) + 120,
      iss: 'cdp',
      nbf: Math.floor(timestamp / delay),
      sub: key,
      //uri: URL,
    };

  console.log('coinbaseUnsubscribe', message);
  if (security === AUTH.SECURITY.JWT) {
    message.jwt = signJwt(ENCODING, payload, secret, key);
  }
  socket.send(JSON.stringify(message));

  return socket;
};

export default coinbaseUnsubscribe;
