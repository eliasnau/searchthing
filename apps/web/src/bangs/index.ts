import { aiBangs } from "./ai";
import { devBangs } from "./dev";
import { gamingBangs } from "./gaming";
import { imagesBangs } from "./images";
import { musicBangs } from "./music";
import { printingBangs } from "./printing";
import { searchBangs } from "./search";
import { shoppingBangs } from "./shopping";
import { socialBangs } from "./social";
import { streamingBangs } from "./streaming";
import type { Bang } from "./types";

const bangs: Bang[] = [
	...searchBangs,
	...aiBangs,
	...devBangs,
	...streamingBangs,
	...socialBangs,
	...gamingBangs,
	...shoppingBangs,
	...imagesBangs,
	...musicBangs,
	...printingBangs,
];

export default bangs;
export type { Bang } from "./types";
