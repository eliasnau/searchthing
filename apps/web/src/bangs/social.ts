import type { Bang } from "./types";

export const socialBangs: Bang[] = [
	{
		category: "Social",
		siteUrl: "twitter.com",
		service: "X (Twitter)",
		bang: "x",
		searchTemplate: "https://twitter.com/search?q=%s",
	},
	{
		category: "Social",
		siteUrl: "facebook.com",
		service: "Facebook",
		bang: "fb",
		searchTemplate: "https://www.facebook.com/search/top?q=%s",
	},
	{
		category: "Social",
		siteUrl: "instagram.com",
		service: "Instagram",
		bang: "insta",
		searchTemplate: "https://www.instagram.com/explore/tags/%s/",
	},
	{
		category: "Social",
		siteUrl: "reddit.com",
		service: "Reddit",
		bang: "r",
		searchTemplate: "https://www.reddit.com/search/?q=%s",
	},
];
