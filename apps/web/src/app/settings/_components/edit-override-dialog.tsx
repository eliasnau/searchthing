"use client";

import { useState, useEffect } from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import bangs from "@/lib/bangs";
import { setOverride, type BangOverride } from "@/lib/bang-overrides";
import { cn } from "@/lib/utils";

interface EditOverrideDialogProps {
	open: boolean;
	onClose: () => void;
	isAdding: boolean;
	editingBang: string | null;
	onSuccess: () => void;
}

export function EditOverrideDialog({
	open,
	onClose,
	isAdding,
	editingBang,
	onSuccess,
}: EditOverrideDialogProps) {
	const [selectedBang, setSelectedBang] = useState<string>("");
	const [comboboxOpen, setComboboxOpen] = useState(false);
	const [editForm, setEditForm] = useState({
		siteUrl: "",
		searchTemplate: "",
	});
	const [errors, setErrors] = useState<string[]>([]);

	useEffect(() => {
		if (open) {
			if (isAdding) {
				setSelectedBang("");
				setEditForm({ siteUrl: "", searchTemplate: "" });
			} else if (editingBang) {
				const bang = bangs.find((b) => b.bang === editingBang);
				if (bang) {
					setSelectedBang(editingBang);
					setEditForm({
						siteUrl: bang.siteUrl,
						searchTemplate: bang.searchTemplate,
					});
				}
			}
			setErrors([]);
		}
	}, [open, isAdding, editingBang]);

	const handleBangSelect = (bangName: string) => {
		setSelectedBang(bangName);
		setComboboxOpen(false);

		const bang = bangs.find((b) => b.bang === bangName);
		if (bang) {
			setEditForm({
				siteUrl: bang.siteUrl,
				searchTemplate: bang.searchTemplate,
			});
		}
	};

	const handleSave = () => {
		const bangToSave = isAdding ? selectedBang : editingBang;
		if (!bangToSave) {
			setErrors(["Please select a bang"]);
			return;
		}

		const override: BangOverride = {};
		if (editForm.siteUrl) override.siteUrl = editForm.siteUrl;
		if (editForm.searchTemplate)
			override.searchTemplate = editForm.searchTemplate;

		if (!override.siteUrl && !override.searchTemplate) {
			setErrors(["Please provide at least one field"]);
			return;
		}

		const result = setOverride(bangToSave, override);

		if (result.success) {
			onSuccess();
			onClose();
		} else {
			setErrors(result.errors || ["Failed to save override"]);
		}
	};

	const selectedBangObj = bangs.find((b) => b.bang === selectedBang);

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isAdding ? "Add Bang Override" : "Edit Bang Override"}
					</DialogTitle>
					<DialogDescription>
						Customize the URL and search template for a bang command
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					{isAdding && (
						<div>
							<Label>Select Bang</Label>
							<Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={comboboxOpen}
										className="justify-between w-full mt-1"
									>
										{selectedBangObj ? (
											<span>
												<code className="px-1.5 py-0.5 mr-2 text-xs font-mono rounded bg-muted">
													!{selectedBangObj.bang}
												</code>
												{selectedBangObj.service}
											</span>
										) : (
											"Select bang to override..."
										)}
										<ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="p-0 w-full">
									<Command>
										<CommandInput placeholder="Search bangs..." />
										<CommandList>
											<CommandEmpty>No bang found.</CommandEmpty>
											<CommandGroup>
												{bangs.map((bang) => (
													<CommandItem
														key={bang.bang}
														value={`${bang.service.toLowerCase()} ${bang.bang.toLowerCase()}`}
														onSelect={() => handleBangSelect(bang.bang)}
														className={cn(
															selectedBang === bang.bang && "bg-accent",
														)}
													>
														<code className="px-1.5 py-0.5 mr-2 text-xs font-mono rounded bg-muted">
															!{bang.bang}
														</code>
														<span className="flex-1">{bang.service}</span>
														<span className="text-xs text-muted-foreground">
															{bang.category}
														</span>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
						</div>
					)}

					{(selectedBang || editingBang) && (
						<>
							<div>
								<Label htmlFor="siteUrl">Site URL</Label>
								<Input
									id="siteUrl"
									value={editForm.siteUrl}
									onChange={(e) =>
										setEditForm({ ...editForm, siteUrl: e.target.value })
									}
									placeholder="github.com"
									className="mt-1"
								/>
								<p className="mt-1 text-xs text-muted-foreground">
									The display URL for this bang
								</p>
							</div>

							<div>
								<Label htmlFor="searchTemplate">Search Template</Label>
								<Input
									id="searchTemplate"
									value={editForm.searchTemplate}
									onChange={(e) =>
										setEditForm({
											...editForm,
											searchTemplate: e.target.value,
										})
									}
									placeholder="https://github.com/search?q=%s"
									className="mt-1"
								/>
								<p className="mt-1 text-xs text-muted-foreground">
									Use %s as a placeholder for the search query
								</p>
							</div>
						</>
					)}

					{errors.length > 0 && (
						<div className="p-3 text-sm rounded bg-destructive/10 text-destructive">
							{errors.map((error, i) => (
								<p key={i}>{error}</p>
							))}
						</div>
					)}

					<div className="flex gap-2 justify-end">
						<Button variant="ghost" onClick={onClose}>
							<X size={16} className="mr-1" />
							Cancel
						</Button>
						<Button
							onClick={handleSave}
							className="bg-foreground text-background hover:bg-foreground/90"
						>
							Save Override
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
