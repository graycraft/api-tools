# API Tools

Tools to work with a REST API (WebSocket and GraphQL support is on the way).

This package allows to:
* Request specific endpoint with parameters and options.
* Specify parameters and options within the settings or directly in CLI.
* Set default parameters and options.
* Validate parameters and options before a request.
* Parse API response by filtering, searching and mapping JSON data.
* Debug signature, request headers, submit data,
* Analyze API response time, HTTP status and returned code-description.
* Take snapshots of API response with timestamp to track structure changes.
* Test API response by validating the structure of an API response against a JSON-schema.

## Setup

### Clone

Clone Git repository:
```bash
git clone
```

### Node.js

Use appropriate Node.js version:
```bash
nvm use
```

### Install

Install modules for usage:
```bash
npm i --production
```

Install modules for development:
```bash
nvm i
```

Install modules for pull requests:
```bash
npm ci
```

## Usage

General syntax of commands:
```bash
node <api> <handler>[ <parameter>][ <parameterKey=parameterValue>][ --<option>]
```

Full list of commands, params and options depends on API implementation.

### Request

To run a scenario related to API request processing, change directory:
```bash
cd request
```

Example of commands for Bybit API:
```bash
node bybit.mjs
node bybit.mjs orderAll
node bybit.mjs order 1234567890123456789
node bybit.mjs order 1234567890123456789 symbol=BTC
node bybit.mjs order 1234567890123456789 symbol=BTC --snap
```

### Response

To run a scenario related to API response processing, change directory:
```bash
cd response
```

Example of commands for Bybit API:
```bash
node bybit.mjs
node bybit.mjs orderAll
node bybit.mjs order 1234567890123456789
node bybit.mjs order 1234567890123456789 symbol=BTC
node bybit.mjs order 1234567890123456789 symbol=BTC --snap
```
