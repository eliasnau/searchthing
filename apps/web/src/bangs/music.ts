import type { Bang } from "./types";

export const musicBangs: Bang[] = [
	{
		category: "Music",
		siteUrl: "spotify.com",
		service: "Spotify",
		bang: "spotify",
		searchTemplate: "https://open.spotify.com/search/%s",
	},
	{
		category: "Music",
		siteUrl: "soundcloud.com",
		service: "SoundCloud",
		bang: "sc",
		searchTemplate: "https://soundcloud.com/search?q=%s",
	},
	{
		category: "Music",
		siteUrl: "music.apple.com",
		service: "Apple Music",
		bang: "apl",
		searchTemplate: "https://music.apple.com/us/search?term=%s",
	},
	{
		category: "Music",
		siteUrl: "music.amazon.com",
		service: "Amazon Music",
		bang: "am",
		searchTemplate: "https://music.amazon.com/search/%s",
	},
];
