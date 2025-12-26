/** biome-ignore-all lint/style/noNonNullAssertion: assume populated .env file */
import { SteamCurrency } from '~/types';

export const APP_ID = '730';
export const CONTEXT_ID = '2';
export const CURRENCY = SteamCurrency.EUR;
export const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0';
export const STEAM_PROFILE_NAME = import.meta.env.STEAM_PROFILE_NAME!;
export const STEAM_PROFILE_ID = import.meta.env.STEAM_PROFILE_ID!;
export const COOKIE = import.meta.env.COOKIE!.startsWith('Cookie:')
    ? import.meta.env.COOKIE!.replace(/^Cookie: ?/, '').trim()
    : import.meta.env.COOKIE!.trim();

if (!(STEAM_PROFILE_NAME && STEAM_PROFILE_ID && COOKIE)) {
    throw new Error('Missing environment variables');
}

export const ITEMS_TO_SELL = [
    'Sticker | Ruby Wave (Lenticular)',
    'Sticker | Ruby Stream (Lenticular)',
    'Sticker | Winding Scorch (Foil)',
    'Sticker | Bolt Charge (Foil)',
    'Sticker | Bolt Strike (Foil)',
    'Sticker | Bolt Energy (Foil)',
    'Sticker | Rainbow Route (Holo)',
    'Sticker | Boom Trail (Glitter)',
    'Sticker | Boom Detonation (Glitter)',
    'Sticker | Boom Blast (Glitter)',
    'Sticker | Boom Epicenter (Glitter)',
    'Sticker | High Heat',
    'Sticker | Bolt Charge',
    'Sticker | Winding Scorch',
    'Sticker | Hydro Wave',
    'Sticker | Bolt Strike',
    'Sticker | Scorch Loop',
    'Sticker | Scorch Loop (Reverse)',
    'Sticker | Boom Trail',
    'Sticker | Hydro Stream',
    'Sticker | Hot Rod Heat',
    'Sticker | Bolt Energy',
    'Sticker | Hydro Geyser',
    'Sticker | Boom Epicenter',
    'Sticker | Boom Detonation',
    'Sticker | Boom Blast',
];
