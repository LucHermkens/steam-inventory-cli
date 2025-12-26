import { file, hash, sleep } from 'bun';
import { mkdir, readdir, stat } from 'node:fs/promises';

// Ensure the 'cache' directory exists, or create it
try {
    await stat('cache');
} catch {
    await mkdir('cache');
}

// Clean up old cache files (older than 1 hour)
const cacheFiles = await readdir('cache');
for (const path of cacheFiles) {
    const data: CacheResponse = await file(`cache/${path}`).json();
    if (data.timestamp < Date.now() - 60 * 60 * 1000) {
        console.debug(`Deleting old cache file: ${path}`);
        // TODO: uncomment when script is complete
        await file(`cache/${path}`).delete();
    }
}

let lastFetch = 0;
let fetchCount = 0;
export async function cachedFetch(
    url: string,
    options: RequestInit = {},
    disableCache = false,
): Promise<Response> {
    const cacheKey = hash(url + JSON.stringify(options), 123);
    const cache = file(`cache/${cacheKey}.json`);

    if ((await cache.exists()) && !disableCache) {
        console.debug(`Cache hit for ${url}`);
        const response: CacheResponse = await cache.json();

        return new Response(response.body, {
            status: response.status,
            headers: response.headers,
        });
    }

    // Prevent rate limiting
    if (fetchCount >= 15) {
        console.debug('Cooldown: Waiting 2 minutes to prevent rate limiting...');
        await sleep(120_000);
        fetchCount = 0;
    } else if (Date.now() - lastFetch < 1000) {
        await sleep(1000);
    }

    console.debug(`Cache miss for ${url}`);
    const response = await fetch(url, options);
    lastFetch = Date.now();
    fetchCount += 1;

    const text = await response.text();
    const headers = Object.fromEntries(response.headers.entries());

    if (response.ok) {
        await cache.write(
            JSON.stringify(
                {
                    url,
                    timestamp: lastFetch,
                    status: response.status,
                    body: text,
                    headers,
                },
                null,
                4,
            ),
        );
    }

    return new Response(text, { status: response.status, headers });
}

interface CacheResponse {
    url: string;
    timestamp: number;
    status: number;
    body: string;
    headers: Record<string, string>;
}
