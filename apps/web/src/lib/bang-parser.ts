export type ParsedQuery = {
	originalQuery: string;
	bang: string | null;
	cleanQuery: string;
};

/**
 * Parse a search query to extract bang and clean query
 */
export function parseSearchQuery(query: string): ParsedQuery {
	const bangMatch = query.match(/!(\S+)/i);
	const bang = bangMatch?.[1]?.toLowerCase() || null;
	const cleanQuery = query.replace(/!\S+\s*/i, "").trim();

	return {
		originalQuery: query,
		bang,
		cleanQuery,
	};
}
