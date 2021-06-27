import { Writable, writable } from 'svelte/store'
import type Level from './common/Game/Level';

export const level: Writable<null|Level>  = writable(null);