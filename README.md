# API Tools

Use appropriate Node.js version:
```bash
nvm use
```

General syntax of commands:
```bash
node <api> <handler>[ <params>][ <key=value>][ <flag>]
```

Full list of commands, params and options depends on implementation.

## Request

To run a scenario related to request processing of an API, change directory:
```bash
cd request
```

Example of commands for Bybit API:
```bash
node bybit.mjs
node bybit.mjs orderAll
node bybit.mjs order 1234567890123456789
node bybit.mjs order 1234567890123456789 symbol=BTC
node bybit.mjs order 1234567890123456789 symbol=BTC --snapshot
```


## Response

To run a scenario related to response processing of an API, change directory:
```bash
cd response
```

Example of commands for Bybit API:
```bash
node bybit.mjs
node bybit.mjs orderAll
node bybit.mjs order 1234567890123456789
node bybit.mjs order 1234567890123456789 symbol=BTC
node bybit.mjs order 1234567890123456789 symbol=BTC --snapshot
```
