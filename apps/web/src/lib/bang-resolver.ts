import type { Bang } from "./bangs";
import { applyOverrideToBang, type BangOverrides } from "./bang-overrides";

export function getDefaultEngine(): string {
	if (typeof window === "undefined") return "g";

	try {
		return localStorage.getItem("defaultEngine") || "g";
	} catch {
		return "g";
	}
}

export function findBang(
	bangName: string,
	bangs: Bang[],
	overrides?: BangOverrides,
): Bang | null {
	const foundBang = bangs.find((b) => b.bang === bangName);
	if (!foundBang) return null;

	if (overrides && Object.keys(overrides).length > 0) {
		return applyOverrideToBang(foundBang, overrides);
	}

	return foundBang;
}

export function getDefaultBang(bangs: Bang[], overrides?: BangOverrides): Bang {
	const defaultEngine = getDefaultEngine();

	const preferredBang = bangs.find((b) => b.bang === defaultEngine);
	if (preferredBang) {
		return overrides && Object.keys(overrides).length > 0
			? applyOverrideToBang(preferredBang, overrides)
			: preferredBang;
	}

	const googleBang = bangs.find((b) => b.bang === "g");
	if (googleBang) {
		return overrides && Object.keys(overrides).length > 0
			? applyOverrideToBang(googleBang, overrides)
			: googleBang;
	}

	const fallbackBang = bangs[0];
	return overrides && Object.keys(overrides).length > 0
		? applyOverrideToBang(fallbackBang, overrides)
		: fallbackBang;
}

export function resolveBang(
	bangName: string | null,
	bangs: Bang[],
	overrides?: BangOverrides,
): Bang {
	if (!bangName) {
		return getDefaultBang(bangs, overrides);
	}

	const foundBang = findBang(bangName, bangs, overrides);
	return foundBang || getDefaultBang(bangs, overrides);
}

export function buildSearchUrl(cleanQuery: string, bang: Bang): string {
	if (cleanQuery === "") {
		return `https://${bang.siteUrl}`;
	}

	const processedQuery = bang.handler
		? bang.handler(cleanQuery)
		: encodeURIComponent(cleanQuery);

	return bang.searchTemplate.replace("%s", processedQuery);
}
