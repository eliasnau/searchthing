import type { Bang } from "./types";

export const shoppingBangs: Bang[] = [
	{
		category: "Shopping",
		siteUrl: "amazon.com",
		service: "Amazon",
		bang: "a",
		searchTemplate: "https://www.amazon.com/s?k=%s",
	},
	{
		category: "Shopping",
		siteUrl: "aliexpress.com",
		service: "AliExpress",
		bang: "ali",
		searchTemplate: "https://www.aliexpress.com/wholesale?SearchText=%s",
	},
];
