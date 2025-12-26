import { cachedFetch } from '~/fetch';

import { APP_ID, CURRENCY } from '../config';

export async function grabPrice(itemName: string): Promise<number | null> {
    try {
        const url = new URL('https://steamcommunity.com/market/priceoverview/');
        url.searchParams.set('appid', APP_ID);
        url.searchParams.set('currency', CURRENCY);
        url.searchParams.set('market_hash_name', itemName);
        console.debug(`Fetching price from API: ${url.toString()}`);

        const response = await cachedFetch(url.toString());
        const data = (await response.json()) as SteamPriceResponse;

        if (!response.ok) {
            throw Object.assign(new Error('HTTPError'), { status: response.status, data });
        }

        if (data.success && data.lowest_price) {
            return Number.parseFloat(
                data.lowest_price.replace('$', '').replace('€', '').replace(',', '.').trim(),
            );
        }

        return null;
    } catch (exception) {
        const error = exception as Error & { status?: number; data?: unknown };
        if (error.status) {
            console.error(`Error grabbing price (status: ${error.status}):`, error.data);
        } else {
            console.error('Error grabbing price:', error.message);
        }
        return null;
    }
}

interface SteamPriceResponse {
    success: boolean;
    lowest_price?: string;
    volume?: string;
    median_price?: string;
}
