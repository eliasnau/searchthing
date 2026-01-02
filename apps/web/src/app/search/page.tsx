"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import bangs from "@/lib/bangs";
import { getBangOverrides } from "@/lib/bang-overrides";
import { parseSearchQuery } from "@/lib/bang-parser";
import { resolveBang, buildSearchUrl } from "@/lib/bang-resolver";
import type { Route } from "next";

function SearchContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const q = searchParams.get("q");

	useEffect(() => {
		if (!q) return;

		const overrides = getBangOverrides();

		const parsed = parseSearchQuery(q);

		const selectedBang = resolveBang(parsed.bang, bangs, overrides);

		const searchUrl = buildSearchUrl(parsed.cleanQuery, selectedBang);

		if (searchUrl) {
			window.location.replace(searchUrl);
		}
	}, [q, router]);

	return (
		<div className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-900" />
	);
}

export default function Search() {
	return (
		<Suspense
			fallback={
				<div className="flex justify-center items-center min-h-screen bg-background" />
			}
		>
			<SearchContent />
		</Suspense>
	);
}
