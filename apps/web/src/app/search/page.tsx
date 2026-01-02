"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import bangs from "@/lib/bangs";
import type { Route } from "next";

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  useEffect(() => {
    if (!q) return;
    let searchUrl: string | undefined;

    const query = q;
    const bangMatch = query.match(/!(\S+)/i);
    const bangCandidate = bangMatch?.[1]?.toLowerCase();

    const shortcutMatches = query.match(/#(\S+)/g) || [];
    const shortcuts = shortcutMatches.map((match) =>
      match.slice(1).toLowerCase(),
    );

    const defaultEngine = localStorage.getItem("defaultEngine") || "g";

    const defaultBang =
      bangs.find((b) => b.bang === defaultEngine) ||
      bangs.find((b) => b.bang === "g") ||
      bangs[0];
    const selectedBang = bangCandidate
      ? bangs.find((b) => b.bang === bangCandidate) || defaultBang
      : defaultBang;

    let cleanQuery = query.replace(/!\S+\s*/i, "").trim();

    shortcuts.forEach((shortcut) => {
      const bangMatch = bangs.find((b) => b.bang === shortcut);
      if (bangMatch && bangMatch.searchTemplate) {
        const shortcutRegex = new RegExp(`#${shortcut}\\b`, "g");
        while (shortcutRegex.test(cleanQuery)) {    
          cleanQuery = cleanQuery
            .replace(shortcutRegex, bangMatch.searchTemplate)
            .replace(/\s+/g, " ")
            .trim();
        }
      }
    });

    if (cleanQuery === "") {
      searchUrl = "https://" + selectedBang.siteUrl;
    } else {
      searchUrl = selectedBang.searchTemplate.replace(
        "%s",
        encodeURIComponent(cleanQuery).replace(/%2F/g, "/"),
      );
    }

    if (searchUrl) {
      router.replace(searchUrl as Route);
    }
  }, [q, router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-900"></div>
  );
}

export default function Search() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen bg-background dark:bg-gray-900"></div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
