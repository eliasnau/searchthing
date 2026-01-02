"use client";

import { useState, useEffect } from "react";
import { Chrome } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CopyButton } from "@/components/animate-ui/components/buttons/copy";
import { cn } from "@/lib/utils";

type BrowserType = "chrome" | "firefox" | "chromium";

export function AddToBrowser() {
	const [browser, setBrowser] = useState<BrowserType>("chrome");

	useEffect(() => {
		const userAgent = navigator.userAgent.toLowerCase();
		if (userAgent.includes("firefox")) {
			setBrowser("firefox");
		} else if (
			userAgent.includes("opr") ||
			userAgent.includes("opera") ||
			userAgent.includes("helium") ||
			userAgent.includes("brave") ||
			userAgent.includes("edg")
		) {
			setBrowser("chromium");
		} else if (userAgent.includes("chrome") || userAgent.includes("chromium")) {
			setBrowser("chrome");
		}
	}, []);

	const getBrowserIcon = () => {
		return <Chrome className="mr-2 w-3 h-3" />;
	};

	const getButtonText = () => {
		switch (browser) {
			case "firefox":
				return "Add to Firefox";
			case "chrome":
				return "Add to Chrome";
			case "chromium":
				return "Add to Browser";
			default:
				return "Add to Browser";
		}
	};

	const getStoreUrl = (type: BrowserType) => {
		switch (type) {
			case "firefox":
				return "https://addons.mozilla.org/en-US/firefox/";
			case "chrome":
			case "chromium":
				return "https://chromewebstore.google.com/detail/searchthing/oilahejhenoeljbicconidaicggjemej";
			default:
				return "https://chromewebstore.google.com/detail/searchthing/oilahejhenoeljbicconidaicggjemej";
		}
	};

	const getStoreName = (type: BrowserType) => {
		switch (type) {
			case "firefox":
				return "Install from Firefox Add-ons";
			case "chrome":
			case "chromium":
				return "Install from Chrome Web Store";
			default:
				return "Install Extension";
		}
	};

	return (
		<Dialog>
			<DialogTrigger
				className={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"text-xs cursor-pointer",
				)}
			>
				{getBrowserIcon()}
				{getButtonText()}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add SearchThing to your browser</DialogTitle>
					<DialogDescription>
						Choose your browser to see installation instructions.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="flex flex-col gap-2">
						<span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
							Select Browser
						</span>
						<Select
							value={browser}
							onValueChange={(value) => setBrowser(value as BrowserType)}
						>
							<SelectTrigger className="w-full">
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="firefox">Firefox</SelectItem>
								<SelectItem value="chrome">Chrome</SelectItem>
								<SelectItem value="chromium">
									Chromium (Helium, Brave, Opera, ...)
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button
						onClick={() => window.open(getStoreUrl(browser), "_blank")}
						className="w-full"
					>
						<Chrome className="mr-2 w-4 h-4" />
						{getStoreName(browser)}
					</Button>

					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-background px-2 text-muted-foreground">
								Or add manually
							</span>
						</div>
					</div>

					<div className="flex flex-col gap-3">
						<div className="space-y-1">
							<p className="text-sm font-medium">Custom Search Engine</p>
							<p className="text-xs text-muted-foreground">
								Add this URL to your browser&apos;s search engine settings:
							</p>
						</div>

						<div className="flex items-center gap-2 w-full">
							<code className="relative flex-1 rounded bg-muted px-3 py-2 font-mono text-sm font-semibold truncate">
								https://searchthing.xyz/search?q=%s
							</code>
							<CopyButton
								content="https://searchthing.xyz/search?q=%s"
								variant="outline"
								size="sm"
							/>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
