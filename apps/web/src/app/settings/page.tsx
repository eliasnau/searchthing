"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "@/components/animate-ui/icons/arrow-left";
import { Download, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DefaultEngineSection } from "./_components/default-engine-section";
import { BangOverridesSection } from "./_components/bang-overrides-section";
import {
	exportSettings,
	importSettings,
	downloadSettingsFile,
	uploadSettingsFile,
} from "@/lib/settings-export";
import { toast } from "sonner";

export default function SettingsPage() {
	const handleExport = () => {
		const settings = exportSettings();
		downloadSettingsFile(settings);
		toast.success("Settings exported successfully");
	};

	const handleImport = () => {
		uploadSettingsFile((data) => {
			try {
				importSettings(data);
				toast.success("Settings imported successfully");
				window.location.reload();
			} catch (error) {
				toast.error(
					error instanceof Error
						? error.message
						: "Failed to import settings. Invalid file format.",
				);
			}
		});
	};

	return (
		<div className="flex flex-col min-h-screen bg-background">
			<header className="flex-none p-4 w-full">
				<div className="flex justify-between items-center mx-auto w-full max-w-5xl">
					<Link
						href="/"
						className="flex gap-2 items-center p-2 transition-colors text-muted-foreground hover:text-foreground"
					>
						<ArrowLeft size={18} />
						<span>Back</span>
					</Link>
					<div className="flex gap-2">
						<Button variant="outline" size="sm" onClick={handleImport}>
							<Upload size={16} className="mr-2" />
							Import
						</Button>
						<Button variant="outline" size="sm" onClick={handleExport}>
							<Download size={16} className="mr-2" />
							Export
						</Button>
					</div>
				</div>
			</header>

			<main className="container relative flex-1 px-4 py-12 mx-auto max-w-5xl">
				<div className="mb-12 space-y-4 text-center">
					<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 sm:text-6xl">
						Settings
					</h1>
					<p className="mx-auto max-w-2xl text-muted-foreground">
						Customize your search experience
					</p>
				</div>

				<div className="mx-auto space-y-12 max-w-2xl">
					<DefaultEngineSection />

					<Separator />

					<BangOverridesSection />
				</div>
			</main>
		</div>
	);
}
