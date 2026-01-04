export type Bang = {
	category: string;
	siteUrl: string;
	service: string;
	bang: string;
	searchTemplate: string;
	handler?: (cleanQuery: string) => string;
};
