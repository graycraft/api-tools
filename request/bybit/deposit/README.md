# Deposit

## All

Get all deposit records:
```bash
node bybit.mjs depositAll[ <currency>]
```

Examples:
```bash
node bybit.mjs depositAll
node bybit.mjs depositAll USDT
```

## One

Get deposit record by transaction identifier:
```bash
node bybit.mjs deposit[One][ <transaction>]
```

Examples:
```bash
node bybit.mjs deposit 0x0123456789ABCDEF0123456789AbCdEf0123456789aBcDeF0123456789abcdef
node bybit.mjs depositOne 0x0123456789ABCDEF0123456789AbCdEf0123456789aBcDeF0123456789abcdef
```

## New Master

Get deposit address information of a master account:
```bash
node bybit.mjs depositNew[Master][ <currency>][ <network>]
```

Examples:
```bash
node bybit.mjs depositNew
node bybit.mjs depositNew USDT
node bybit.mjs depositNew USDT ETH
node bybit.mjs depositNewMaster
node bybit.mjs depositNewMaster USDT
node bybit.mjs depositNewMaster USDT ETH
```

## New Sub

Get deposit address information of a sub-account:
```bash
node bybit.mjs depositNewSub <member>[ <currency>][ <network>]
```

Examples:
```bash
node bybit.mjs depositNewSub 123456789
node bybit.mjs depositNewSub 123456789 USDT
node bybit.mjs depositNewSub 123456789 USDT ETH
```
