import type { Bang } from "./bangs";

export type BangOverride = {
	siteUrl?: string;
	searchTemplate?: string;
};

export type BangOverrides = {
	[bangName: string]: BangOverride;
};

const STORAGE_KEY = "bang_overrides";

/**
 * Get all bang overrides from localStorage
 */
export function getBangOverrides(): BangOverrides {
	if (typeof window === "undefined") return {};

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) return {};

		const parsed = JSON.parse(stored);

		// Validate structure
		if (typeof parsed !== "object" || parsed === null) {
			return {};
		}

		return parsed;
	} catch {
		// Invalid JSON or localStorage unavailable
		return {};
	}
}

/**
 * Save bang overrides to localStorage
 */
export function setBangOverrides(overrides: BangOverrides): boolean {
	if (typeof window === "undefined") return false;

	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
		return true;
	} catch {
		// localStorage full or unavailable
		return false;
	}
}

/**
 * Validate an override object
 */
export function validateOverride(override: BangOverride): {
	valid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	// Validate searchTemplate is a valid URL format
	if (override.searchTemplate) {
		try {
			// Replace %s with a test value to validate URL structure
			const testUrl = override.searchTemplate.includes("%s")
				? override.searchTemplate.replace("%s", "test")
				: override.searchTemplate;
			new URL(testUrl);
		} catch {
			errors.push("searchTemplate must be a valid URL format");
		}
	}

	// Validate siteUrl is a valid domain format
	if (override.siteUrl) {
		const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_.:/]*[a-zA-Z0-9]$/;
		if (!domainRegex.test(override.siteUrl)) {
			errors.push("siteUrl must be a valid domain");
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	};
}

/**
 * Set override for a specific bang with validation
 */
export function setOverride(
	bangName: string,
	override: BangOverride,
): { success: boolean; errors?: string[] } {
	const validation = validateOverride(override);

	if (!validation.valid) {
		return { success: false, errors: validation.errors };
	}

	const overrides = getBangOverrides();
	overrides[bangName] = override;
	const success = setBangOverrides(overrides);

	return { success };
}

/**
 * Remove override for a specific bang
 */
export function resetOverride(bangName: string): boolean {
	const overrides = getBangOverrides();
	delete overrides[bangName];
	return setBangOverrides(overrides);
}

/**
 * Check if a bang has an override
 */
export function hasOverride(bangName: string): boolean {
	const overrides = getBangOverrides();
	return bangName in overrides;
}

/**
 * Apply overrides to a single bang
 */
export function applyOverrideToBang(
	bang: Bang,
	overrides: BangOverrides,
): Bang {
	const override = overrides[bang.bang];

	if (!override) {
		return bang; // No override, return original
	}

	// Apply override while preserving other properties (like handler)
	return {
		...bang,
		...(override.siteUrl && { siteUrl: override.siteUrl }),
		...(override.searchTemplate && { searchTemplate: override.searchTemplate }),
	};
}

/**
 * Apply overrides to the default bangs array
 */
export function applyOverrides(defaultBangs: Bang[]): Bang[] {
	const overrides = getBangOverrides();
	return defaultBangs.map((bang) => applyOverrideToBang(bang, overrides));
}
