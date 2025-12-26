import '~/setup';
import { argv, sleep } from 'bun';

import { grabInventory, type InventoryAsset, type InventoryAssetDescription } from '~/grab-inventory';
import { grabPrice } from '~/grab-price';

import {
    APP_ID,
    CONTEXT_ID,
    COOKIE,
    ITEMS_TO_SELL,
    STEAM_PROFILE_ID,
    STEAM_PROFILE_NAME,
    USER_AGENT,
} from '../config';

type Item = InventoryAsset & InventoryAssetDescription & { descriptionid: string };

switch (argv[2]) {
    case 'inventory': {
        const rawInventory = await grabInventory(STEAM_PROFILE_ID);
        if (rawInventory) {
            const inventory = Object.values(rawInventory.rgInventory)
                .map((item) => {
                    const description = Object.entries(rawInventory.rgDescriptions).find(
                        ([, description]) =>
                            description.instanceid === item.instanceid &&
                            description.classid === item.classid,
                    );
                    if (!description) return null;
                    return {
                        ...item,
                        descriptionid: description[0],
                        ...description[1],
                    };
                })
                .filter((item) => item !== null);

            const stickersData: Array<{
                name: string;
                inventory: number;
                inventoryWorth: string;
                marketable: number;
                marketableWorth: string;
                price: string;
            }> = [];

            for (const selling of ITEMS_TO_SELL) {
                const price = await grabPrice(selling);
                const inventoryWorth = price
                    ? price * inventory.filter((item) => item.name === selling).length
                    : 0;
                const marketableWorth = price
                    ? price *
                      inventory
                          .filter((item) => item.name === selling)
                          .filter((item) => item.marketable === 1).length
                    : 0;

                stickersData.push({
                    name: selling,
                    price: price ? `€ ${price.toFixed(2).padStart(5, ' ')}` : 'N/A',
                    inventory: inventory.filter((item) => item.name === selling).length,
                    inventoryWorth: inventoryWorth
                        ? `€ ${inventoryWorth.toFixed(2).padStart(5, ' ')}`
                        : 'N/A',
                    marketable: inventory
                        .filter((item) => item.name === selling)
                        .filter((item) => item.marketable === 1).length,
                    marketableWorth: marketableWorth
                        ? `€ ${marketableWorth.toFixed(2).padStart(5, ' ')}`
                        : 'N/A',
                });
            }

            const filteredInventory = inventory.filter((item) => ITEMS_TO_SELL.includes(item.name));
            const sellableInventory = filteredInventory.filter((item) => item.marketable === 1);
            console.table([
                ...stickersData
                    .sort((a, b) => b.marketableWorth.localeCompare(a.marketableWorth))
                    .map((item) => ({
                        name: item.name,
                        price: item.price,
                        inventory: item.inventory,
                        total: `€ ${item.inventoryWorth.replace('€ ', '').padStart(5, ' ')}`,
                        marketable: item.marketable,
                        'total ': `€ ${item.marketableWorth.replace('€ ', '').padStart(5, ' ')}`,
                    })),
                {
                    name: ''.padStart(Math.max(...ITEMS_TO_SELL.map((item) => item.length)), '-'),
                },
                {
                    name: 'Total (inventory)',
                    inventory: filteredInventory.length,
                    total: `€ ${stickersData
                        .reduce((acc, item) => {
                            const val = Number.parseFloat(item.inventoryWorth.replace('€ ', ''));
                            return acc + (Number.isNaN(val) ? 0 : val);
                        }, 0)
                        .toFixed(2)
                        .padStart(5, ' ')}`,
                },
                {
                    name: 'Total (marketable)',
                    marketable: sellableInventory.length,
                    'total ': `€ ${stickersData
                        .reduce((acc, item) => {
                            const val = Number.parseFloat(item.marketableWorth.replace('€ ', ''));
                            return acc + (Number.isNaN(val) ? 0 : val);
                        }, 0)
                        .toFixed(2)
                        .padStart(5, ' ')}`,
                },
            ]);
        } else {
            console.error('Failed to grab inventory');
        }
        break;
    }
    case 'prices': {
        const prices: Array<{ name: string; price: string }> = [];
        for (const item of ITEMS_TO_SELL) {
            const price = await grabPrice(item);
            prices.push({
                name: item,
                price: price ? `€ ${price.toFixed(2).padStart(5, ' ')}` : 'N/A',
            });
        }
        console.table(
            prices.sort((a, b) => b.price.localeCompare(a.price)),
            ['name', 'price'],
        );
        break;
    }
    case 'sell': {
        const rawInventory = await grabInventory(STEAM_PROFILE_ID);
        if (rawInventory) {
            const inventory = Object.values(rawInventory.rgInventory)
                .map((item) => {
                    const description = Object.entries(rawInventory.rgDescriptions).find(
                        ([, description]) =>
                            description.instanceid === item.instanceid &&
                            description.classid === item.classid,
                    );
                    if (!description) return null;
                    return {
                        ...item,
                        descriptionid: description[0],
                        ...description[1],
                    };
                })
                .filter((item) => item !== null)
                .filter((item) => item.marketable === 1)
                .filter((item) => ITEMS_TO_SELL.includes(item.name));

            const sellableInventory: Array<Item & { price: number }> = [];
            for (const item of inventory) {
                const price = await grabPrice(item.name);
                if (price) {
                    sellableInventory.push({ ...item, price });
                }
            }

            const sessionId = COOKIE.match(/sessionid=([^;]+)/)?.[1];
            if (!sessionId) {
                console.error('Session ID not found in cookie');
                break;
            }

            const success: Array<Item & { price: number; sellPrice: number }> = [];
            const failed: Array<Item & { price: number; sellPrice: number }> = [];

            for (const item of sellableInventory) {
                if (!item.price) continue;

                let rawSellPrice = item.price + 0.01;
                if (item.price > 0.3) {
                    rawSellPrice = item.price * 1.1;
                } else if (item.price > 1) {
                    rawSellPrice = item.price * 1.05;
                }

                const sellPrice = Math.round((rawSellPrice * 100) / 1.15);
                const response = await fetch('https://steamcommunity.com/market/sellitem/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                        Cookie: COOKIE,
                        Host: 'steamcommunity.com',
                        Origin: 'https://steamcommunity.com',
                        Priority: 'u=0',
                        Referer: `https://steamcommunity.com/id/${STEAM_PROFILE_NAME}/inventory`,
                        'User-Agent': USER_AGENT,
                    },
                    body: new URLSearchParams({
                        sessionid: sessionId,
                        appid: APP_ID,
                        contextid: CONTEXT_ID,
                        assetid: item.id,
                        amount: '1',
                        price: sellPrice.toString(),
                    }).toString(),
                });

                const result = (await response.json()) as
                    | {
                          success: false;
                          message: string;
                      }
                    | {
                          success: true;
                          requires_confirmation: 0 | 1;
                          needs_mobile_confirmation: boolean;
                          needs_email_confirmation: boolean;
                          email_domain: string;
                      };

                if (response.ok && result.success) {
                    console.log('Sold:', item.id, result);
                    // biome-ignore lint/style/noNonNullAssertion: item.price will not change and is checked above
                    success.push({ ...item, price: item.price!, sellPrice });
                } else {
                    console.error('Failed:', item.id, result);
                    // biome-ignore lint/style/noNonNullAssertion: item.price will not change and is checked above
                    failed.push({ ...item, price: item.price!, sellPrice });
                }

                console.log('Waiting 5 seconds before next item...');
                await sleep(5000);
            }

            console.log(`Success: ${success.length}, Failed: ${failed.length}`);
            console.table(
                success
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price ? `€ ${item.price.toFixed(2).padStart(5, ' ')}` : 'N/A',
                        'sell price': item.sellPrice
                            ? `€ ${(Math.round(item.sellPrice * 1.15) / 100).toFixed(2).padStart(5, ' ')}`
                            : 'N/A',
                    })),
                ['id', 'name', 'price', 'sell price'],
            );
            console.table(
                failed
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.price ? `€ ${item.price.toFixed(2).padStart(5, ' ')}` : 'N/A',
                        'sell price': item.sellPrice
                            ? `€ ${(Math.round(item.sellPrice * 1.15) / 100).toFixed(2).padStart(5, ' ')}`
                            : 'N/A',
                    })),
                ['id', 'name', 'price', 'sell price'],
            );
        }
        break;
    }
    default: {
        console.error('Invalid command:', argv[2]);
        break;
    }
}

// POST https://steamcommunity.com/market/sellitem/

// POST /market/sellitem/ HTTP/1.1
// Host: steamcommunity.com
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0
// Accept: */*
// Accept-Language: en-US,en;q=0.5
// Accept-Encoding: gzip, deflate, br, zstd
// Content-Type: application/x-www-form-urlencoded; charset=UTF-8
// Content-Length: 93
// Origin: https://steamcommunity.com
// Sec-GPC: 1
// Connection: keep-alive
// Referer: https://steamcommunity.com/id/${STEAM_PROFILE_NAME}/inventory
// Cookie: timezoneOffset=3600,0; cookieSettings=..................................................
// Sec-Fetch-Dest: empty
// Sec-Fetch-Mode: cors
// Sec-Fetch-Site: same-origin
// Priority: u=0
