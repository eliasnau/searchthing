import type { Bang } from "./types";

export const imagesBangs: Bang[] = [
	{
		category: "Images",
		siteUrl: "unsplash.com",
		service: "Unsplash",
		bang: "un",
		searchTemplate: "https://unsplash.com/s/photos/%s",
	},
	{
		category: "Images",
		siteUrl: "pixabay.com",
		service: "Pixabay",
		bang: "pxb",
		searchTemplate: "https://pixabay.com/images/search/%s/",
	},
	{
		category: "Images",
		siteUrl: "images.google.com",
		service: "Google Images",
		bang: "gi",
		searchTemplate: "https://www.google.com/search?tbm=isch&q=%s",
	},
];
