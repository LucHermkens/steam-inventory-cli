export enum SteamCurrency {
    USD = '1',
    GBP = '2',
    EUR = '3',
    CHF = '4',
    RUB = '5',
}

export interface SteamDescription {
    type: string; // e.g. "html"
    value: string; // e.g. "The 2018 Nuke Collection"
    color?: string; // e.g. "9da1a9"
    name: string; // e.g. "itemset_name"
}

export interface SteamAction {
    link: string; // e.g. "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20..."
    name: string; // e.g. "Inspect in Game..."
}

export interface SteamTag {
    category: string; // e.g. "Rarity"
    internal_name: string; // e.g. "Rarity_Common"
    localized_category_name: string; // e.g. "Quality"
    localized_tag_name: string; // e.g. "Base Grade"
    color?: string; // e.g. "b0c3d9"
}
