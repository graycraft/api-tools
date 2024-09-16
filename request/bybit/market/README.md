# Market

## History

Get recent public market history:
```bash
node bybit.mjs marketHistory[ <symbol>][ <limit>][ category=inverse,linear,option,spot]
```

Examples:
```bash
node bybit.mjs marketHistory
node bybit.mjs marketHistory ETHUSDT
node bybit.mjs marketHistory ETHUSDT 3
node bybit.mjs marketHistory ETHUSDT 3 category=spot
```
