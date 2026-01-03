import { getBangOverrides, type BangOverrides } from "./bang-overrides";

export type SettingsExport = {
	version: number;
	exportDate: string;
	defaultEngine: string;
	bangOverrides: BangOverrides;
};

export function exportSettings(): SettingsExport {
	const overrides = getBangOverrides();
	const defaultEngine = localStorage.getItem("defaultEngine") || "g";

	return {
		version: 1,
		exportDate: new Date().toISOString(),
		defaultEngine,
		bangOverrides: overrides,
	};
}

export function importSettings(data: unknown): void {
	if (typeof data !== "object" || data === null) {
		throw new Error("Invalid settings data");
	}

	const settings = data as Partial<SettingsExport>;

	if (settings.version !== 1) {
		throw new Error("Unsupported settings version");
	}

	if (settings.defaultEngine && typeof settings.defaultEngine === "string") {
		localStorage.setItem("defaultEngine", settings.defaultEngine);
	}

	if (settings.bangOverrides && typeof settings.bangOverrides === "object") {
		localStorage.setItem(
			"bang_overrides",
			JSON.stringify(settings.bangOverrides),
		);
	}
}

export function downloadSettingsFile(settings: SettingsExport): void {
	const blob = new Blob([JSON.stringify(settings, null, 2)], {
		type: "application/json",
	});
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `searchthing-settings-${new Date().toISOString().split("T")[0]}.json`;
	a.click();
	URL.revokeObjectURL(url);
}

export function uploadSettingsFile(
	callback: (settings: SettingsExport) => void,
): void {
	const input = document.createElement("input");
	input.type = "file";
	input.accept = "application/json";
	input.onchange = (e) => {
		const file = (e.target as HTMLInputElement).files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			const data = JSON.parse(event.target?.result as string);
			callback(data);
		};
		reader.readAsText(file);
	};
	input.click();
}
