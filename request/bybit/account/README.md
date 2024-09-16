# Account

## Balance Rate

Get currencies balance and account risk rate by account wallet type:
```bash
node bybit.mjs accountBalance[Rate][ <wallet>][ <currency>]
```

Examples:
```bash
node bybit.mjs accountBalance
node bybit.mjs accountBalance SPOT
node bybit.mjs accountBalance SPOT USDT
node bybit.mjs accountBalanceRate
node bybit.mjs accountBalanceRate SPOT
node bybit.mjs accountBalanceRate SPOT USDT
```

## Balance Wallet

Get currencies balance by account wallet type:
```bash
node bybit.mjs accountBalanceWallet[ <wallet>][ <currency>][ <options>]
```

Examples:
```bash
node bybit.mjs accountBalanceWallet
node bybit.mjs accountBalanceWallet SPOT
node bybit.mjs accountBalanceWallet SPOT USDT
node bybit.mjs accountBalanceWallet SPOT USDT memberId=123456789 withBonus=1
```

## Information

Get margin mode information of an account:
```bash
node bybit.mjs account[Info[rmation]]
```

Examples:
```bash
node bybit.mjs account
node bybit.mjs accountInfo
node bybit.mjs accountInformation
```

## Wallets

Get available account wallet types of an account by member identifiers:
```bash
node bybit.mjs accountWallets[ <members>]
node bybit.mjs accountWallets
node bybit.mjs accountWallets 123456789
node bybit.mjs accountWallets 123456789,234567890
```
