/**!
 * Web socket instance events listener.
 *
 * @see https://datatracker.ietf.org/doc/html/rfc6455
 * @see https://tools.ietf.org/html/rfc6455#section-7.4.1
 * @see https://javascript.info/websocket
 * @see https://www.npmjs.com/package/ws
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/WebSocket
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-channels
 * @see https://docs.cdp.coinbase.com/advanced-trade/docs/ws-overview
 * @typedef {import("#types/socket/coinbase/candles.js").default} Candles
 * @typedef {import("#types/socket/coinbase/heartbeats.js").default} Heartbeats
 * @typedef {import("#types/socket/coinbase/l2_data.js").default} L2Data
 * @typedef {import("#types/socket/coinbase/market_trades.js").default} MarketTrades
 * @typedef {import("#types/socket/message.d.js").default} WebSocketMessage
 * @module library/socket
 */

import { entryHeaders } from './fetch.mjs';
import { dirObject } from './output.mjs';

/**
 * @param {string} url
 * @param {WebSocketMessage} message
 * @returns {WebSocket}
 */
export const socketData = (url, message) => {
  const socket = new WebSocket(url /*, protocols */);

  let count = 0;

  dirObject('WS', { message, url });

  socket.onclose = (event) => {
    const { code, reason, wasClean } = event;

    let output = 'Connection closed cleanly';

    if (!wasClean) output = 'Connection closed unexpectedly';

    dirObject(output, { code, reason, wasClean });
  };
  socket.onerror = (event) => {
    dirObject('WebSocket error', { event });
  };
  socket.onmessage = (event) => {
    const { data, origin, lastEventId, ports, source } = event,
      /** @type {Candles | Heartbeats | L2Data | MarketTrades | { channel: string; events: [] }} */
      json = JSON.parse(data);

    let events;

    switch (json.channel) {
      case 'candles':
        events = json.events
          .filter((event, index) => index < 2)
          .map((event) => ({
            ...event,
            candles: event.candles?.filter((event, index) => index < 2),
          }));
        break;
      case 'heartbeats':
        events = json.events.filter((event, index) => index < 2);
        break;
      case 'l2_data':
        events = json.events
          .filter((event, index) => index < 2)
          .map((event) => ({
            ...event,
            updates: event.updates?.filter((event, index) => index < 2),
          }));
        break;
      case 'market_trades':
        events = json.events
          .filter((event, index) => index < 2)
          .map((event) => ({
            ...event,
            trades: event.trades?.filter((event, index) => index < 2),
          }));
        break;
      default:
        events = json.events;
        break;
    }

    dirObject('Message', {
      json: {
        ...json,
        events: [...events],
      },
      origin,
      lastEventId,
      ports,
      source,
    });

    count++;

    if (count > 2) socket.close();
  };

  /** Connection established. */
  socket.onopen = (event) => {
    const kTarget = String(Object.getOwnPropertySymbols(event)[1]),
      /** @ts-expect-error */
      response = Object.getOwnPropertySymbols(event[kTarget])[9],
      /** @ts-expect-error */
      { headersList } = event[kTarget][response];

    dirObject('Headers', entryHeaders(headersList));
    socket.send(JSON.stringify(message));
  };

  return socket;
};
