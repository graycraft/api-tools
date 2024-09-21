# API Tools

Tools to work with a REST API (WebSocket and GraphQL support is on the way).

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

Optionally `NODE_NO_WARNINGS` can be exported from `.env` file to silence process warnings regarding experimental features:

```bash
$ export $(cat .env | xargs)
```

## Settings

Open settings file of an API and set appropriate fields in `account`, `address` and `authentication` sections.

## Usage

General syntax of commands:

```bash
$ node <request|response|socket>[ --<option|optionKey=optionValue>]
$ node <api>[ <handler>][ <parameter>][ <paramKey=paramValue>][ --<option>]
```

Full list of commands, parameters and options depends on API implementation.

See detailed syntax and command examples in **sub directory readme** files.

### Request

Run flow for **all requests** of **all APIs**:

```bash
$ node request
```

To run a flow related to an API request, change directory:

```bash
$ cd request
```

Run flow for **all requests** of a **specific API**:

```bash
$ node bybit
$ node bybit --flow=orders
```

Run **single request** with snapshot (option `--snap[shot]` is required if not enabled in settings):

```bash
$ node bybit currencyAll --snap
$ node bybit currencyAll --snapshot
  Snapped "2024-01-01T00:00:00.000Z.json" to "./snapshot/currency_all".
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

To run a flow related to an API response, change directory:

```bash
$ cd response
```

Run flow for **all responses** of a **specific API**:

```bash
$ node bybit
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_network_all".
```

Run **single response** aggregation (option `--aggr[egate]` is required if not enabled in settings):

```bash
$ node bybit currencyAll --aggr
$ node bybit currencyAll --aggregate
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
```
