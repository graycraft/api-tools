/**!
 * Fetch data from an endpoint with parameters.
 * 
 * @module lib/socket
 */

import { blind } from "./authentication.mjs";
import { dirObject } from "./output.mjs";

export const socketData = (url, data, headers) => {
    dirObject("WS", {
      data,
      headers,
      url
    });

    const socket = new WebSocket(url);
    
    socket.onopen = (event, a, b, c) => {
      console.log('onopen', { event, a, b, c });
      /* onopen {
        event: Event {
          type: 'open',
          defaultPrevented: false,
          cancelable: false,
          timeStamp: 1586.364686
        }
      } */   
      socket.send(JSON.stringify(data));
    };
    socket.onmessage = (event, a, b, c) => {
      console.log('onmessage', { event , a, b, c});
      /* onmessage {
        event: MessageEvent {
          type: 'message',
          defaultPrevented: false,
          cancelable: false,
          timeStamp: 2673.199733
        }
      } */
    };
  }

  socketData("wss://advanced-trade-ws.coinbase.com", {
    "channel": "level2",
    "product_ids": [
        "ETH-USD",
        "ETH-EUR"
    ],
    "type": "subscribe",
  });
