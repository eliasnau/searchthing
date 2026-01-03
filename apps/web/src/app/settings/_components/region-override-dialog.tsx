"use client";

import { useState, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
	DialogFooter,
} from "@/components/ui/dialog";
import { countries, type CountryCode } from "@/lib/countries";
import { multiRegionStores } from "@/lib/multi-region-stores";
import { setOverride } from "@/lib/bang-overrides";
import { cn } from "@/lib/utils";

interface RegionOverrideDialogProps {
	open: boolean;
	onClose: () => void;
	onSuccess: () => void;
}

export function RegionOverrideDialog({
	open,
	onClose,
	onSuccess,
}: RegionOverrideDialogProps) {
	const [selectedCountry, setSelectedCountry] = useState<CountryCode | null>(
		null,
	);
	const [comboboxOpen, setComboboxOpen] = useState(false);
	const [enabledStores, setEnabledStores] = useState<Record<string, boolean>>(
		{},
	);

	const countryCodes = Object.keys(countries) as CountryCode[];
	const selectedCountryData = selectedCountry
		? countries[selectedCountry]
		: null;
	const availableStores = selectedCountry
		? multiRegionStores.filter((store) => store.regions[selectedCountry])
		: [];
	const enabledCount = Object.values(enabledStores).filter(Boolean).length;

	useEffect(() => {
		if (open) {
			setSelectedCountry(null);
			setComboboxOpen(false);
			setEnabledStores({});
		}
	}, [open]);

	useEffect(() => {
		if (selectedCountry) {
			const initialEnabled: Record<string, boolean> = {};
			for (const store of availableStores) {
				initialEnabled[store.bang] = true;
			}
			setEnabledStores(initialEnabled);
		}
	}, [selectedCountry, availableStores]);

	const handleCountrySelect = (countryCode: CountryCode) => {
		setSelectedCountry(countryCode);
		setComboboxOpen(false);
	};

	const handleToggleStore = (bangCode: string) => {
		setEnabledStores((prev) => ({
			...prev,
			[bangCode]: !prev[bangCode],
		}));
	};

	const handleApply = () => {
		if (!selectedCountry) return;

		for (const store of availableStores) {
			if (enabledStores[store.bang]) {
				const regionConfig = store.regions[selectedCountry];
				if (regionConfig) {
					setOverride(store.bang, {
						siteUrl: regionConfig.siteUrl,
						searchTemplate: regionConfig.searchTemplate,
					});
				}
			}
		}

		onSuccess();
		onClose();
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Set Region Overrides</DialogTitle>
					<DialogDescription>
						Select a country to apply regional bang overrides
					</DialogDescription>
				</DialogHeader>

				<div className="space-y-4">
					<div>
						<Label className="mb-2 block">Country</Label>
						<Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
							<PopoverTrigger render={<Button
								variant="outline"
								role="combobox"
								aria-expanded={comboboxOpen}
								className="justify-between w-full"
							/>}>
								{selectedCountryData ? (
									<span className="flex items-center gap-2">
										<span
											className="flex items-center justify-center w-6 h-6"
											dangerouslySetInnerHTML={{
												__html: selectedCountryData.icon,
											}}
										/>
										{selectedCountryData.name}
									</span>
								) : (
									"Select country..."
								)}
								<ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
							</PopoverTrigger>
							<PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]">
								<Command>
									<CommandInput placeholder="Search country..." />
									<CommandList>
										<CommandEmpty>No country found.</CommandEmpty>
										<CommandGroup>
											{countryCodes.map((code) => {
												const country = countries[code];
												return (
													<CommandItem
														key={code}
														value={country.name.toLowerCase()}
														onSelect={() => handleCountrySelect(code)}
														className={cn(
															selectedCountry === code && "bg-accent",
														)}
													>
														<span
															className="flex items-center justify-center w-6 h-6 mr-2 flex-shrink-0"
															dangerouslySetInnerHTML={{ __html: country.icon }}
														/>
														<span>{country.name}</span>
													</CommandItem>
												);
											})}
										</CommandGroup>
									</CommandList>
								</Command>
							</PopoverContent>
						</Popover>
					</div>

					{selectedCountry && availableStores.length > 0 && (
						<div className="space-y-3">
							<div className="flex justify-between items-center">
								<Label>Select Services</Label>
								<span className="text-sm text-muted-foreground">
									{enabledCount} selected
								</span>
							</div>

							<div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
								{availableStores.map((store) => (
									<div
										key={store.bang}
										className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
									>
										<Switch
											checked={enabledStores[store.bang] ?? false}
											onCheckedChange={() => handleToggleStore(store.bang)}
										/>
										<div className="flex items-center gap-2">
											<code className="px-2 py-0.5 text-sm font-mono font-semibold rounded bg-muted">
												!{store.bang}
											</code>
											<span className="font-medium">{store.service}</span>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					{selectedCountry && availableStores.length === 0 && (
						<div className="py-8 text-center text-sm text-muted-foreground">
							No services available for this country
						</div>
					)}
				</div>

				<DialogFooter>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button
						onClick={handleApply}
						disabled={!selectedCountry || enabledCount === 0}
						className="bg-foreground text-background hover:bg-foreground/90"
					>
						Apply {enabledCount > 0 && `(${enabledCount})`}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
