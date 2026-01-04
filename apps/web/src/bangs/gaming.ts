import type { Bang } from "./types";

export const gamingBangs: Bang[] = [
	{
		category: "Gaming",
		siteUrl: "store.steampowered.com",
		service: "Steam",
		bang: "ste",
		searchTemplate: "https://store.steampowered.com/search/?term=%s",
	},
	{
		category: "Gaming",
		siteUrl: "store.epicgames.com",
		service: "Epic Games",
		bang: "epic",
		searchTemplate: "https://store.epicgames.com/en-US/browse?q=%s",
	},
	{
		category: "Gaming",
		siteUrl: "instant-gaming.com",
		service: "Instant Gaming",
		bang: "ig",
		searchTemplate: "https://www.instant-gaming.com/en/search/?query=%s",
	},
];
