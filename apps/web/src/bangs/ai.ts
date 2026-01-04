import type { Bang } from "./types";

export const aiBangs: Bang[] = [
	{
		category: "AI",
		siteUrl: "www.t3.chat",
		service: "T3 Chat",
		bang: "t3",
		searchTemplate: "https://www.t3.chat/new?q=%s",
	},
	{
		category: "AI",
		siteUrl: "chat.openai.com",
		service: "ChatGPT",
		bang: "gpt",
		searchTemplate: "https://chat.openai.com/?q=%s",
	},
	{
		category: "AI",
		siteUrl: "claude.ai",
		service: "Claude",
		bang: "cla",
		searchTemplate: "https://claude.ai/new?q=%s",
	},
	{
		category: "AI",
		siteUrl: "perplexity.ai",
		service: "Perplexity",
		bang: "per",
		searchTemplate: "https://www.perplexity.ai/search?q=%s",
	},
	{
		category: "AI",
		siteUrl: "huggingface.co",
		service: "Hugging Face",
		bang: "hf",
		searchTemplate: "https://huggingface.co/spaces?query=%s",
	},
];
