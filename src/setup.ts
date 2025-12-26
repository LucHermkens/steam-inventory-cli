// Disable debug logging when not enabled in .env
if (import.meta.env.DEBUG !== 'true') console.debug = () => {};
