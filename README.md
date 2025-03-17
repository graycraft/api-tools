# API Tools

Tools to work with a REST API and WebSocket.

This package allows to:

- Request specific endpoint with parameters and options.
- Specify parameters and options within the settings or directly in CLI.
- Set default parameters and options.
- Validate parameters and options before a request.
- Parse API response by filtering, searching and mapping JSON data.
- Debug signature, request headers, submit data.
- Analyze API response time, HTTP status and returned code-description.
- Take snapshots of API response with timestamp to track structure changes.
- Test API response by validating the structure of an API response against a JSON-schema.

## Requirements

Bash ^5.0.0:

```bash
$ bash --version
  GNU bash, version 5.1.16(1)-release
```

Node.js 22.7.0:

```bash
$ node -v
  v22.7.0
```

NPM 10.8.3:

```bash
$ npm -v
  10.8.3
```

## Setup

### Git

Clone the Git repository:

```bash
$ git clone <gh|https|ssh>graycraft/api-tools.git
```

### Node.js

Use appropriate Node.js version:

```bash
$ nvm use
```

### NPM

Install modules for usage:

```bash
$ npm i --production
```

Install modules for development:

```bash
$ npm i
```

### Environment

Optionally `NODE_NO_WARNINGS` can be exported from `.env` file to silence process warnings regarding experimental features.

This command also enables `--experimental-vm-modules` option for running [Jest with ESM](https://jestjs.io/docs/ecmascript-modules):

```bash
$ export $(cat .env | xargs)
```

## Settings

Open settings file of an API and set appropriate fields in `account`, `address` and `authentication` sections.

## Usage

General syntax of commands:

```bash
$ node request|response|socket[ <option>]
$ node <api>[ <handler>[ <parameter>[ <option>]]]
```

Run all flows for all APIs:

```bash
$ node request
```

Run `currency` flow for all APIs:

```bash
$ node request --flow=currency
```

`<api>` is an API name implemented in API Tools:

```bash
$ node bybit
$ node coinbase
```

`<handler>` is an API request handler:

```bash
$ node bybit currencyAll
$ node bybit networkAll
```

`<implicit>` is implicit parameter (without value):

```bash
$ node bybit currencyAll 10
$ node bybit currencyAll ETHUSDT
```

`<explicit>` is explicit parameter (with a value):

```bash
$ node bybit currencyAll limit=10
$ node bybit currencyAll pair=ETHUSDT
```

`<option>` is option to apply while executing an API request handler or flow:

```bash
$ node bybit --flow=order
$ node bybit --verbose
$ node bybit currencyAll  --verbose
$ node bybit currencyAll 10
$ node bybit currencyAll limit=10 --verbose
```

- --auth[entication] - output authentication information from internal variables.
- --debug[ging] - output debugging information from internal variables.
- --head[ers] - output request and response headers.
- --verb[ose] - output verbose information about executed request.

Full list of handlers, parameters and options depends on API implementation.

### Request

Run flow for **all requests** of **all APIs**:

```bash
$ node request
```

To run a request flow related to a **specific API**, change directory:

```bash
$ cd request
```

Run flow for **all requests** of a **specific API**:

```bash
$ node bybit
$ node coinbase
```

Run flow for a **single request** of a **specific API**:

```bash
$ node bybit --flow=orders
$ node coinbase --flow=orders
```

Run **single request** with snapshot (option `--snap[shot]` is required if not enabled in settings):

```bash
$ node bybit currencyAll --snap
$ node bybit currencyAll --snapshot
  Snapped "2024-01-01T00:00:00.000Z.json" to "./snapshot/currency_all".
```

```bash
$ node coinbase currencyAll --snap
$ node coinbase currencyAll --snapshot
  Snapped "2024-01-01T00:00:00.000Z.json" to "./snapshot/currency_all".
```

```bash
  aggr: 'aggregate',
  auth: 'authentication',
  cont: 'continue',
  debu: 'debug',
  flow: 'flow',
  head: 'headers',
  snap: 'snapshot',
  thro: 'throw',
  vali: 'validate',
  verb: 'verbose',
```

### Response

Run flow for **all responses** of **all APIs** (option `--aggr[egate]` is required if not enabled in settings):

```bash
$ node response --aggr
$ node response --aggregate
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_network_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/coinbase/currency_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/coinbase/currency_network_all".
```

```bash
$ node response --vali
$ node response --validate
  AJV: validation of Bybit API response snapshot 2025-02-01T23:38:48.058Z.json passed.
  AJV: validation of Coinbase API response snapshot 2025-02-10T21:08:43.831Z.json passed.
```

To run a response flow related to a **specific API**, change directory:

```bash
$ cd response
```

Run flow for **all responses** of a **specific API**:

```bash
response$ node bybit
response$ node coinbase
```

Run **all response** aggregation (option `--aggr[egate]` is required if not enabled in settings):

```bash
response$ node bybit --aggr
response$ node bybit --aggregate
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_network_all".
```

Run **all response** validation (option `--vali[date]` is required if not enabled in settings):

```bash
response$ node bybit --vali
response$ node bybit --validate
  AJV: validation of Bybit API response snapshot 2025-02-01T23:38:48.058Z.json passed.
  AJV: validation of Bybit API response snapshot 2025-02-01T23:38:48.532Z.json passed.
```

Run a **single response** aggregation (option `--aggr[egate]` is required if not enabled in settings):

```bash
response$ node bybit currencyAll --aggr
response$ node bybit currencyAll --aggregate
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
```

Run a **single response** validation (option `--vali[date]` is required if not enabled in settings):

```bash
response$ node bybit currencyAll --vali
response$ node bybit currencyAll --validate
  AJV: validation of Bybit API response snapshot 2025-02-01T23:38:48.058Z.json passed.
```
