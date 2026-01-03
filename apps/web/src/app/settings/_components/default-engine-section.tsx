"use client";

import { useEffect, useState } from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import bangs from "@/lib/bangs";
import {
	getDefaultEngine,
	setDefaultEngine as saveDefaultEngine,
} from "@/lib/bang-overrides";
import { cn } from "@/lib/utils";

export function DefaultEngineSection() {
	const [open, setOpen] = useState(false);
	const [defaultEngine, setDefaultEngineState] = useState<string>("g");

	useEffect(() => {
		const savedEngine = getDefaultEngine();
		const bangExists = bangs.find((b) => b.bang === savedEngine);

		if (!bangExists) {
			saveDefaultEngine("g");
			setDefaultEngineState("g");
		} else {
			setDefaultEngineState(savedEngine);
		}
	});

	const handleChange = (value: string) => {
		saveDefaultEngine(value);
		setDefaultEngineState(value);
		setOpen(false);
	};

	const defaultEngineObj = bangs.find((b) => b.bang === defaultEngine);

	return (
		<div className="space-y-6">
			<h2 className="text-2xl font-semibold">Search Preferences</h2>
			<div className="flex justify-between items-center p-4 rounded-lg border">
				<div className="space-y-0.5">
					<Label>Default Search Engine</Label>
					<p className="text-sm text-muted-foreground">
						Choose your preferred search engine
					</p>
				</div>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger render={<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="justify-between w-[280px]"
					/>}>

						{defaultEngineObj ? (
							<span className="flex items-center">
								<code className="px-1.5 py-0.5 mr-2 text-xs font-mono rounded bg-muted">
									!{defaultEngineObj.bang}
								</code>
								{defaultEngineObj.service}
							</span>
						) : (
							"Select engine..."
						)}
						<ChevronsUpDown className="ml-2 w-4 h-4 opacity-50 shrink-0" />
					</PopoverTrigger>
					<PopoverContent className="p-0 w-[280px]">
						<Command>
							<CommandInput placeholder="Search engine..." />
							<CommandList>
								<CommandEmpty>No engine found.</CommandEmpty>
								<CommandGroup>
									{bangs.map((bang) => (
										<CommandItem
											key={bang.bang}
											value={`${bang.service.toLowerCase()} ${bang.bang.toLowerCase()}`}
											onSelect={() => handleChange(bang.bang)}
											className={cn(defaultEngine === bang.bang && "bg-accent")}
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
		</div>
	);
}
