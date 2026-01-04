import type { Bang } from "./types";

export const streamingBangs: Bang[] = [
	{
		category: "Streaming",
		siteUrl: "youtube.com",
		service: "YouTube",
		bang: "yt",
		searchTemplate: "https://www.youtube.com/results?search_query=%s",
	},
	{
		category: "Streaming",
		siteUrl: "netflix.com",
		service: "Netflix",
		bang: "nf",
		searchTemplate: "https://www.netflix.com/search?q=%s",
	},
	{
		category: "Streaming",
		siteUrl: "amazon.com",
		service: "Prime Video",
		bang: "pv",
		searchTemplate: "https://www.amazon.com/s?k=%s&i=instant-video",
	},
	{
		category: "Streaming",
		siteUrl: "www.twitch.tv",
		service: "Twitch",
		bang: "tw",
		searchTemplate: "https://www.twitch.tv/search?term=%s",
	},
	{
		category: "Streaming",
		siteUrl: "www.imdb.com",
		service: "IMDB",
		bang: "imdb",
		searchTemplate: "https://www.imdb.com/find?q=%s",
	},
];
