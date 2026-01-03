"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "@/components/animate-ui/icons/plus";
import { Trash2 } from "@/components/animate-ui/icons/trash-2";
import {
	getBangOverrides,
	resetOverride,
	type BangOverrides,
} from "@/lib/bang-overrides";
import bangs from "@/lib/bangs";
import { EditOverrideDialog } from "./edit-override-dialog";

export function BangOverridesSection() {
	const [overrides, setOverrides] = useState<BangOverrides>({});
	const [isAddingOverride, setIsAddingOverride] = useState(false);
	const [editingBang, setEditingBang] = useState<string | null>(null);

	useEffect(() => {
		setOverrides(getBangOverrides());
	}, []);

	const refreshOverrides = () => {
		setOverrides(getBangOverrides());
	};

	const openAddDialog = () => {
		setIsAddingOverride(true);
		setEditingBang(null);
	};

	const openEditDialog = (bangName: string) => {
		setEditingBang(bangName);
		setIsAddingOverride(false);
	};

	const closeDialog = () => {
		setIsAddingOverride(false);
		setEditingBang(null);
	};

	const handleDelete = (bangName: string) => {
		resetOverride(bangName);
		refreshOverrides();
	};

	const overrideList = Object.keys(overrides).map((bangName) => {
		const bang = bangs.find((b) => b.bang === bangName);
		return {
			bangName,
			bang,
			override: overrides[bangName],
		};
	});

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h2 className="text-2xl font-semibold">Bang Overrides</h2>
						<p className="text-sm text-muted-foreground">
							Customize bang commands with your own URLs
						</p>
					</div>
					<Button
						onClick={openAddDialog}
						className="bg-foreground text-background hover:bg-foreground/90"
						animateIcon
					>
						<Plus size={18} />
					</Button>
				</div>

				<div className="space-y-4">
					{overrideList.map(({ bangName, bang, override }) => (
						<div
							key={bangName}
							className="relative p-4 rounded-lg border bg-card"
						>
							<div className="flex justify-between items-start gap-4">
								<div className="flex-1 min-w-0">
									<div className="flex gap-2 items-center mb-2">
										<code className="px-2 py-0.5 text-sm font-mono font-semibold rounded bg-muted">
											!{bangName}
										</code>
										{bang && (
											<span className="font-medium">{bang.service}</span>
										)}
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
								<div className="flex gap-2 flex-shrink-0">
									<Button
										variant="outline"
										size="sm"
										onClick={() => openEditDialog(bangName)}
									>
										Edit
									</Button>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleDelete(bangName)}
										className="transition-colors text-muted-foreground hover:text-red-500"
										animateIcon
									>
										<Trash2 size={18} />
									</Button>
								</div>
							</div>
						</div>
					))}

					{overrideList.length === 0 && (
						<div className="py-12 text-center rounded-lg text-muted-foreground bg-muted/30">
							No overrides configured. Click the + button to add one!
						</div>
					)}
				</div>
			</div>

			<EditOverrideDialog
				open={isAddingOverride || editingBang !== null}
				onClose={closeDialog}
				isAdding={isAddingOverride}
				editingBang={editingBang}
				onSuccess={refreshOverrides}
			/>
		</>
	);
}
