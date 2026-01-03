"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { RegionOverrideDialog } from "./region-override-dialog";
import { getBangOverrides } from "@/lib/bang-overrides";
import { multiRegionStores } from "@/lib/multi-region-stores";

export function RegionPreferencesSection() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [, setRefresh] = useState(0);

	const overrides = getBangOverrides();
	const multiRegionBangs = new Set(multiRegionStores.map((s) => s.bang));
	const regionOverrides = Object.entries(overrides).filter(([bang]) =>
		multiRegionBangs.has(bang),
	);

	const handleSuccess = () => {
		setRefresh((prev) => prev + 1);
	};

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-semibold">Region Preferences</h2>
						<p className="text-sm text-muted-foreground">
							Apply regional overrides for multi-region services
						</p>
					</div>
					<Button
						onClick={() => setDialogOpen(true)}
						className="bg-foreground text-background hover:bg-foreground/90"
					>
						<Globe size={18} className="mr-2" />
						Set Region
					</Button>
				</div>

				{regionOverrides.length > 0 && (
					<div className="space-y-3">
						{regionOverrides.map(([bang, override]) => {
							const store = multiRegionStores.find((s) => s.bang === bang);
							if (!store) return null;

							return (
								<div key={bang} className="p-4 rounded-lg border bg-card">
									<div className="flex items-center gap-2 mb-2">
										<code className="px-2 py-0.5 text-sm font-mono font-semibold rounded bg-muted">
											!{bang}
										</code>
										<span className="font-medium">{store.service}</span>
									</div>
									<div className="space-y-1 text-sm text-muted-foreground">
										{override.siteUrl && (
											<p className="truncate">
												<span className="font-medium">Site:</span>{" "}
												{override.siteUrl}
											</p>
										)}
										{override.searchTemplate && (
											<p className="truncate">
												<span className="font-medium">Template:</span>{" "}
												{override.searchTemplate}
											</p>
										)}
									</div>
								</div>
							);
						})}
					</div>
				)}

				{regionOverrides.length === 0 && (
					<div className="py-12 text-center rounded-lg text-muted-foreground bg-muted/30">
						No region overrides configured. Click "Set Region" to get started!
					</div>
				)}
			</div>

			<RegionOverrideDialog
				open={dialogOpen}
				onClose={() => setDialogOpen(false)}
				onSuccess={handleSuccess}
			/>
		</>
	);
}
