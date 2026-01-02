import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "SearchThing",
		short_name: "SearchThing",
		description: "A fast search engine with powerful bang commands for quick access to your favorite sites",
		start_url: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#000000",
		icons: [
			{
				src: "/favicon/web-app-manifest-192x192.png",
				sizes: "192x192",
				type: "image/png",
			},
			{
				src: "/favicon/web-app-manifest-512x512.png",
				sizes: "512x512",
				type: "image/png",
			},
		],
		shortcuts: [
			{
				name: "View all bang commands",
				short_name: "Bangs",
				description: "Browse all available bang commands",
				url: "/bangs",
				icons: [
					{
						src: "/favicon/web-app-manifest-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
				],
			},
		],
	};
}
