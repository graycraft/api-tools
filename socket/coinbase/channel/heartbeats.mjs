/**
 * Handle subscription to Coinbase Advanced web socket `heartbeats` channel.
 * Real-time server pings to keep all connections open.
 * Heartbeats include a `heartbeat_counter` which verifies that no messages were missed.
 * Subscribing to the heartbeats channel ensures that all subscriptions stay open when updates are sparse.
 * This is useful, for example, when fetching market data for illiquid pairs.
 *
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels/#heartbeats-channel
 * @module socket/coinbase/channel/heartbeats
 */

import coinbaseSubscribe from '../subscribe.mjs';

const heartbeats = () => {
  const { config } = global.apiTools.coinbase,
    {
      SOCKET: {
        CHANNEL: { HEARTBEATS },
      },
    } = config;

  return coinbaseSubscribe(null, HEARTBEATS);
};

export default heartbeats;
