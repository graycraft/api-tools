# Bybit API

Run scenario for testing full request flow:
```bash
node request.mjs bybit
```

Run scenario for testing full response flow:
```bash
node response.mjs bybit
```

## Request

```bash
cd request
```

### Account

### Currency

## Response

```bash
cd response
```

Run scenario related to response processing for an API, e.g. Bybit:

```bash
node bybit.mjs
node bybit.mjs orderAll
node bybit.mjs order 1234567890123456789
node bybit.mjs order 1234567890123456789 symbol=BTC
node bybit.mjs order 1234567890123456789 symbol=BTC --snapshot
```

https://bybit-exchange.github.io/docs/v5/intro
