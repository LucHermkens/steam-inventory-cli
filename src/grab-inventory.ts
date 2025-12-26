import { cachedFetch } from '~/fetch';
import type { SteamAction, SteamDescription, SteamTag } from '~/types';

import { APP_ID, CONTEXT_ID, COOKIE } from '../config';

export async function grabInventory(steamId: string): Promise<InventoryResponse | null> {
    try {
        const url = new URL(
            `https://steamcommunity.com/profiles/${steamId}/inventory/json/${APP_ID}/${CONTEXT_ID}`,
        );
        console.debug(`Fetching inventory from API: ${url.toString()}`);

        const response = await cachedFetch(
            url.toString(),
            {
                headers: {
                    Cookie: COOKIE,
                },
            },
            true,
        );
        const data = (await response.json()) as InventoryResponse;
        // const raw = await response.text();
        // console.log(raw);
        // const data = JSON.parse(raw);

        if (!response.ok) {
            throw Object.assign(new Error('HTTPError'), { status: response.status, data });
        }

        return data;
    } catch (exception) {
        const error = exception as Error & { status?: number; data?: unknown };
        if (error.status) {
            console.error(`Error grabbing inventory (status: ${error.status}):`, error.data);
        } else {
            console.error('Error grabbing inventory:', error.message);
        }
        return null;
    }
}

export interface InventoryAsset {
    id: string;
    classid: string;
    instanceid: string;
    amount: string; // e.g. "1"
    hide_in_china: number; // 0 = not hidden, 1 = hidden
    pos: number; // position in inventory
}

export interface InventoryAssetDescription {
    appid: number; // e.g. 730 (CS2)
    classid: string; // class of the item
    instanceid: string; // instance variant
    icon_url: string;
    icon_drag_url: string;
    name: string;
    market_hash_name: string;
    market_name: string;
    name_color: string;
    background_color: string;
    type: string;
    tradeable: number; // 0 = not tradable, 1 = tradable
    marketable: number; // 0 = not marketable, 1 = marketable
    owner_only?: number; // TODO: explain
    commodity: number; // TODO: explain
    market_tradable_restriction: number; // days until tradable (always 7 for CS2 items)
    market_marketable_restriction: number; // days until marketable (always 7 for CS2 items)
    cache_expiration?: string; // ISO 8601 timestamp TODO: explain
    descriptions: SteamDescription[];
    owner_descriptions: '' | SteamDescription[]; // owner-only visible descriptions like "Tradable/Marketable After Nov 25, 2025 (8:00:00) GMT"
    actions?: SteamAction[];
    market_actions?: SteamAction[];
    tags: SteamTag[];
}

interface InventoryResponse {
    success: boolean;
    rgInventory: Record<string, InventoryAsset>;
    rgCurrency: any[]; // TODO: add type
    rgDescriptions: Record<string, InventoryAssetDescription>;
    more: boolean;
    more_start: boolean;
}
