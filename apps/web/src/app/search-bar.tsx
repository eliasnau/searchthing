"use client";

import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [q, setQ] = useState("");

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    window.location.href = `/search?q=${encoded}`;
  };

  return (
    <form onSubmit={submit} role="search" className="w-full max-w-2xl">
      <div className="relative">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search or use !bangs (e.g. !w cats)"
          type="search"
          className="peer ps-12 pe-16 h-14 rounded-full bg-input text-lg placeholder:text-muted-foreground"
          aria-label="Search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
          <Search size={22} className="text-muted-foreground" />
        </div>

        <button
          type="submit"
          aria-label="Submit search"
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-12 items-center justify-center rounded-r-full transition-colors outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}