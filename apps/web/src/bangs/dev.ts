import type { Bang } from "./types";

export const devBangs: Bang[] = [
	{
		category: "Dev",
		siteUrl: "github.com",
		service: "GitHub",
		bang: "gh",
		searchTemplate: "https://github.com/search?q=%s",
	},
	{
		category: "Dev",
		siteUrl: "github.com/new",
		service: "GitHub Repo",
		bang: "ghr",
		searchTemplate: "https://github.com/%s",
		handler: (cleanQuery) =>
			encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
	},
	{
		category: "Dev",
		siteUrl: "stackoverflow.com",
		service: "Stack Overflow",
		bang: "so",
		searchTemplate: "https://stackoverflow.com/search?q=%s",
	},
	{
		category: "Dev",
		siteUrl: "npmjs.com",
		service: "npm",
		bang: "npm",
		searchTemplate: "https://www.npmjs.com/search?q=%s",
	},
];
