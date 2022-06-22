import { ssbDataset, uniteDataset } from "../Services/datasets";

export const UNITE = "Pokemon Unite";
export const SMASH = "Super Smash Bros.";
export const UNITE_SELECTED = "unite";
export const SMASH_SELECTED = "smash";

export const GAMELIST_DATASET = {
    [UNITE_SELECTED]: uniteDataset,
    [SMASH_SELECTED]: ssbDataset,
}

export const GAMELIST_TITLES = {
    [UNITE_SELECTED]: UNITE,
    [SMASH_SELECTED]: SMASH,
}