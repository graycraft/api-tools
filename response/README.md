# Response

```bash
$ cd response
```

Snapshot an API response to aggregate currencies and networks from it:

```bash
$ node bybit currency --snap
```

## Bybit

Run flow for full Bybit API response aggregation:

```bash
$ node bybit
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/network_all".
```

### Currency

Run flow for all currencies Bybit API response aggregation:

```bash
$ node bybit currency
$ node bybit currencyAll
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/currency_all".
```

### Network

Run flow for all networks Bybit API response aggregation:

```bash
$ node bybit network
$ node bybit networkAll
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/bybit/network_all".

```

## Coinbase Advanced

Run flow for full Coinbase Advanced API response aggregation:

```bash
$ node coinbase
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/coinbase/currency_all".
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/coinbase/network_all".
```

### Currency

Run flow for all currencies Coinbase Advanced API response aggregation:

```bash
$ node coinbase currency
$ node coinbase currencyAll
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/coinbase/currency_all".
```

### Network

Run flow for all networks Coinbase Advanced API response aggregation:

```bash
$ node coinbase network
$ node coinbase networkAll
  Aggregated "2024-01-01T00:00:00.000Z.json" to "../collection/coinbase/network_all".

```
