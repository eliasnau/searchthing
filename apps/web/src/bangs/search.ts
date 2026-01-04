import type { Bang } from "./types";

export const searchBangs: Bang[] = [
	{
		category: "Search",
		siteUrl: "www.google.com",
		service: "Google",
		bang: "g",
		searchTemplate: "https://www.google.com/search?q=%s",
	},
	{
		category: "Search",
		siteUrl: "www.duckduckgo.com",
		service: "DuckDuckGo",
		bang: "dd",
		searchTemplate: "https://duckduckgo.com/?q=%s",
	},
	{
		category: "Search",
		siteUrl: "www.bing.com",
		service: "Bing",
		bang: "b",
		searchTemplate: "https://www.bing.com/search?q=%s",
	},
	{
		category: "Search",
		siteUrl: "www.startpage.com",
		service: "Startpage",
		bang: "sp",
		searchTemplate: "https://www.startpage.com/do/search?q=%s",
	},
	{
		category: "Search",
		siteUrl: "www.ecosia.org",
		service: "Ecosia",
		bang: "eco",
		searchTemplate: "https://www.ecosia.org/search?q=%s",
	},
	{
		category: "Search",
		siteUrl: "kagi.com",
		service: "Kagi",
		bang: "kg",
		searchTemplate: "https://kagi.com/search?q=%s",
	},
	{
		category: "Search",
		siteUrl: "search.brave.com",
		service: "Brave Search",
		bang: "br",
		searchTemplate: "https://search.brave.com/search?q=%s",
	},
	{
		category: "Search",
		siteUrl: "search.surfshark.com",
		service: "Surfshark Search",
		bang: "sf",
		searchTemplate: "https://search.surfshark.com/results?query=%s",
	},
	{
		category: "Search",
		siteUrl: "www.qwant.com",
		service: "Qwant",
		bang: "qw",
		searchTemplate: "https://www.qwant.com/?q=%s",
	},
];
