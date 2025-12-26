# Steam Inventory CLI

## Requirements

- [Bun](https://bun.sh)

## Setup

To install dependencies:

```bash
bun install
```

## Usage

To run the CLI:

```bash
bun start {command}
```

### Supported commands

- inventory
Shows the amount and prices for `ITEMS_TO_SELL` (from [config.ts](config.ts)) in your inventory.

- prices
Shows the prices of `ITEMS_TO_SELL` (from [config.ts](config.ts)) in your inventory.

- sell
Sells the items in your inventory from `ITEMS_TO_SELL` (from [config.ts](config.ts)).
