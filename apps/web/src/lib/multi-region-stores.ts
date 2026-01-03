import type { CountryCode } from "./countries";

export type RegionConfig = {
	siteUrl: string;
	searchTemplate: string;
};

export type MultiRegionStore = {
	bang: string;
	service: string;
	regions: Partial<Record<CountryCode, RegionConfig>>;
};

export const multiRegionStores: MultiRegionStore[] = [
	{
		bang: "a",
		service: "Amazon",
		regions: {
			us: {
				siteUrl: "amazon.com",
				searchTemplate: "https://amazon.com/s?k=%s",
			},
			de: {
				siteUrl: "amazon.de",
				searchTemplate: "https://amazon.de/s?k=%s",
			},
		},
	},
	{
		bang: "pv",
		service: "Prime Video",
		regions: {
			us: {
				siteUrl: "amazon.com",
				searchTemplate: "https://amazon.com/s?k=%s&i=instant-video",
			},
			de: {
				siteUrl: "amazon.de",
				searchTemplate: "https://amazon.de/s?k=%s&i=instant-video",
			},
		},
	}
];
