import { writable } from 'svelte/store';
import { ssbDataset } from './datasets';
import { getDefaultGame } from '@Utils/utils';
import { SMASH_SELECTED, GAMELIST_DATASET } from '../Utils/constants';

export const selectedGame = writable(getDefaultGame() || SMASH_SELECTED);
export const dataset = writable(GAMELIST_DATASET[getDefaultGame()] || ssbDataset);
export const playedCharacters = writable([]);
export const runIndex = writable(0);
export const currentRun = writable([]);
