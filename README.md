# Steam Inventory CLI

## Requirements

- [Bun](https://bun.sh)

## Setup

1. Clone the repository:

   ```bash
   git clone git@github.com:LucHermkens/steam-inventory-cli.git
   cd steam-inventory-cli
   ```

2. Copy [`.env.example`](.env.example) to `.env` and populate it with the appropriate values:

   ```bash
   cp .env.example .env
   ```

3. Install the project dependencies:

   ```bash
   bun install
   ```

## Usage

To run the CLI:

```bash
bun start {command}
```

### Example

```bash
bun start sell
```

### Supported commands

- `inventory`

   Shows the amount and prices for `ITEMS_TO_SELL` (from [config.ts](config.ts)) in your inventory.

   *Example output:*

   ```text
   ┌────┬─────────────────────────────────────┬─────────┬─────────┬───────────┬─────────┬────────────┬─────────┐
   │    │ name                                │ market  │ sell    │ inventory │ total   │ marketable │ total   │
   ├────┼─────────────────────────────────────┼─────────┼─────────┼───────────┼─────────┼────────────┼─────────┤
   │  0 │ Sticker | Rainbow Route (Holo)      │ €  1.79 │ €  1.71 │ 2         │ €  3.42 │ 1          │ €  1.71 │
   │  1 │ Sticker | Ruby Wave (Lenticular)    │ € 12.28 │ € 11.75 │ 0         │ €     - │ 0          │ €     - │
   │  2 │ Sticker | Ruby Stream (Lenticular)  │ €  7.40 │ €  7.08 │ 2         │ € 14.16 │ 0          │ €     - │
   │  3 │ Sticker | Winding Scorch (Foil)     │ €  4.29 │ €  4.10 │ 1         │ €  4.10 │ 0          │ €     - │
   │  4 │ Sticker | Bolt Charge (Foil)        │ €  4.19 │ €  4.01 │ 0         │ €     - │ 0          │ €     - │
   │  5 │ Sticker | Bolt Strike (Foil)        │ €  2.55 │ €  2.44 │ 0         │ €     - │ 0          │ €     - │
   │  6 │ Sticker | Bolt Energy (Foil)        │ €  1.56 │ €  1.49 │ 0         │ €     - │ 0          │ €     - │
   │  7 │ Sticker | Boom Trail (Glitter)      │ €  0.35 │ €  0.33 │ 2         │ €  0.67 │ 0          │ €     - │
   │  8 │ Sticker | Boom Detonation (Glitter) │ €  0.19 │ €  0.17 │ 3         │ €  0.55 │ 0          │ €     - │
   │  9 │ Sticker | Boom Blast (Glitter)      │ €  0.17 │ €  0.16 │ 2         │ €  0.33 │ 0          │ €     - │
   │ 10 │ Sticker | Boom Epicenter (Glitter)  │ €  0.14 │ €  0.13 │ 1         │ €  0.13 │ 0          │ €     - │
   │ 11 │ Sticker | High Heat                 │ €  0.93 │ €  0.89 │ 3         │ €  2.67 │ 0          │ €     - │
   │ 12 │ Sticker | Bolt Charge               │ €  0.38 │ €  0.36 │ 6         │ €  2.18 │ 0          │ €     - │
   │ 13 │ Sticker | Winding Scorch            │ €  0.26 │ €  0.23 │ 2         │ €  0.50 │ 0          │ €     - │
   │ 14 │ Sticker | Hydro Wave                │ €  0.26 │ €  0.23 │ 4         │ €  0.99 │ 0          │ €     - │
   │ 15 │ Sticker | Bolt Strike               │ €  0.18 │ €  0.17 │ 0         │ €     - │ 0          │ €     - │
   │ 16 │ Sticker | Scorch Loop               │ €  0.20 │ €  0.18 │ 1         │ €  0.18 │ 0          │ €     - │
   │ 17 │ Sticker | Scorch Loop (Reverse)     │ €  0.17 │ €  0.16 │ 0         │ €     - │ 0          │ €     - │
   │ 18 │ Sticker | Boom Trail                │ €  0.11 │ €  0.10 │ 2         │ €  0.20 │ 0          │ €     - │
   │ 19 │ Sticker | Hydro Stream              │ €  0.15 │ €  0.14 │ 2         │ €  0.27 │ 0          │ €     - │
   │ 20 │ Sticker | Hot Rod Heat              │ €  0.12 │ €  0.11 │ 2         │ €  0.22 │ 0          │ €     - │
   │ 21 │ Sticker | Bolt Energy               │ €  0.08 │ €  0.08 │ 0         │ €     - │ 0          │ €     - │
   │ 22 │ Sticker | Hydro Geyser              │ €  0.08 │ €  0.08 │ 2         │ €  0.15 │ 0          │ €     - │
   │ 23 │ Sticker | Boom Epicenter            │ €  0.05 │ €  0.05 │ 1         │ €  0.05 │ 0          │ €     - │
   │ 24 │ Sticker | Boom Detonation           │ €  0.05 │ €  0.05 │ 5         │ €  0.23 │ 0          │ €     - │
   │ 25 │ Sticker | Boom Blast                │ €  0.05 │ €  0.05 │ 1         │ €  0.05 │ 0          │ €     - │
   │ 26 │ ----------------------------------- │ ------- │ ------- │ --------- │ ------- │ ---------- │ ------- │
   │ 27 │ Total (Sell price, what you get)    │         │         │ 44        │ € 31.05 │ 1          │ €  1.71 │
   └────┴─────────────────────────────────────┴─────────┴─────────┴───────────┴─────────┴────────────┴─────────┘
   ```

- `prices`

   Shows the current market prices of `ITEMS_TO_SELL` (from [config.ts](config.ts)).

   *Example output:*

   ```text
   ┌────┬─────────────────────────────────────┬────────────┬────────────┐
   │    │ name                                │ price      │ sell price │
   ├────┼─────────────────────────────────────┼────────────┼────────────┤
   │  0 │ Sticker | Ruby Wave (Lenticular)    │ €    12.28 │ €    11.75 │
   │  1 │ Sticker | Ruby Stream (Lenticular)  │ €     7.42 │ €     7.10 │
   │  2 │ Sticker | Winding Scorch (Foil)     │ €     4.37 │ €     4.18 │
   │  3 │ Sticker | Bolt Charge (Foil)        │ €     4.19 │ €     4.01 │
   │  4 │ Sticker | Bolt Strike (Foil)        │ €     2.57 │ €     2.46 │
   │  5 │ Sticker | Rainbow Route (Holo)      │ €     1.80 │ €     1.72 │
   │  6 │ Sticker | Bolt Energy (Foil)        │ €     1.56 │ €     1.49 │
   │  7 │ Sticker | High Heat                 │ €     0.95 │ €     0.91 │
   │  8 │ Sticker | Bolt Charge               │ €     0.39 │ €     0.37 │
   │  9 │ Sticker | Boom Trail (Glitter)      │ €     0.35 │ €     0.33 │
   │ 10 │ Sticker | Hydro Wave                │ €     0.27 │ €     0.24 │
   │ 11 │ Sticker | Winding Scorch            │ €     0.26 │ €     0.23 │
   │ 12 │ Sticker | Scorch Loop               │ €     0.20 │ €     0.18 │
   │ 13 │ Sticker | Boom Detonation (Glitter) │ €     0.19 │ €     0.17 │
   │ 14 │ Sticker | Bolt Strike               │ €     0.18 │ €     0.17 │
   │ 15 │ Sticker | Boom Blast (Glitter)      │ €     0.17 │ €     0.16 │
   │ 16 │ Sticker | Scorch Loop (Reverse)     │ €     0.17 │ €     0.16 │
   │ 17 │ Sticker | Boom Epicenter (Glitter)  │ €     0.14 │ €     0.13 │
   │ 18 │ Sticker | Hydro Stream              │ €     0.14 │ €     0.13 │
   │ 19 │ Sticker | Hot Rod Heat              │ €     0.12 │ €     0.11 │
   │ 20 │ Sticker | Boom Trail                │ €     0.11 │ €     0.10 │
   │ 21 │ Sticker | Bolt Energy               │ €     0.08 │ €     0.08 │
   │ 22 │ Sticker | Hydro Geyser              │ €     0.08 │ €     0.08 │
   │ 23 │ Sticker | Boom Epicenter            │ €     0.05 │ €     0.05 │
   │ 24 │ Sticker | Boom Detonation           │ €     0.05 │ €     0.05 │
   │ 25 │ Sticker | Boom Blast                │ €     0.05 │ €     0.05 │
   └────┴─────────────────────────────────────┴────────────┴────────────┘
   ```

- `sell`

   Sells the items in your inventory from `ITEMS_TO_SELL` (from [config.ts](config.ts)).

   *Example output:*

   ```text
   Failed: 48440****** {
     success: false,
     message: "You already have a listing for this item pending confirmation. Please confirm or cancel the existing listing.",
   }
   Waiting 5 seconds before next item...
   Sold: 89253****** {
     success: true,
     requires_confirmation: 1,
     needs_mobile_confirmation: true,
     needs_email_confirmation: false,
     email_domain: "gmail.com",
   }
   Waiting 5 seconds before next item...
   Success: 1
   ┌───┬─────────────┬──────────────────────────────────┬─────────┬────────────┐
   │   │ id          │ name                             │ price   │ sell price │
   ├───┼─────────────┼──────────────────────────────────┼─────────┼────────────┤
   │ 0 │ 89253****** │ Sticker | Ruby Wave (Lenticular) │ € 12.28 │ € 13.50    │
   └───┴─────────────┴──────────────────────────────────┴─────────┴────────────┘
   Failed: 1
   ┌───┬─────────────┬────────────────────────────────┬─────────┬────────────┐
   │   │ id          │ name                           │ price   │ sell price │
   ├───┼─────────────┼────────────────────────────────┼─────────┼────────────┤
   │ 0 │ 48440****** │ Sticker | Rainbow Route (Holo) │ €  1.79 │ €  1.97    │
   └───┴─────────────┴────────────────────────────────┴─────────┴────────────┘
   ```
