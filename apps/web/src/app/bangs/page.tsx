"use client";

import bangs from "@/lib/bangs";
import Link from "next/link";
import { ArrowLeft, Search, Plus, Github } from "lucide-react";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

function baseUrlFromTemplate(template: string) {
    const m = template.match(/^https?:\/\/([^/]+)/i);
    return m ? `https://${m[1]}` : template;
}

export default function BangsPage() {
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = useMemo(() => Array.from(new Set(bangs.map((b) => b.category))), []);

    const qRaw = search.trim();
    const isBangSearch = qRaw.startsWith("!");
    const q = isBangSearch ? qRaw.slice(1).toLowerCase() : qRaw.toLowerCase();

    const filtered = useMemo(() => {
        return bangs.filter((b) => {
            const matchesSearch = q === ""
                ? true
                : isBangSearch
                    ? b.bang.toLowerCase().includes(q)
                    : b.service.toLowerCase().includes(q);
            const matchesCategory = !selectedCategory || b.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [q, isBangSearch, selectedCategory]);

    return (
        <div className="flex relative flex-col min-h-screen bg-background">
            <header className="flex-none p-4 w-full">
                <div className="flex justify-between items-center mx-auto w-full max-w-5xl">
                    <Link
                        href="/"
                        className="flex gap-2 items-center p-2 transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft size={18} />
                        <span>Back</span>
                    </Link>
                    <div className="flex gap-3 items-center">
                        <a
                            href="https://github.com/eliasnau/searchthing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-1 items-center transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <Github size={18} />
                            <span className="text-xs">GitHub</span>
                        </a>
                        <ModeToggle />
                    </div>
                </div>
            </header>

            <main className="container relative flex-1 px-4 py-12 mx-auto max-w-5xl">
                <div className="mb-8 space-y-6 text-center">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 sm:text-5xl">
                        Bang Commands
                    </h1>
                    <p className="mx-auto max-w-2xl text-muted-foreground">
                        Use <code className="bg-muted px-1 py-0.5 rounded text-xs">!</code> followed by a command to search directly on your favorite sites.
                    </p>
                </div>

                <div className="mt-4 rounded-md border px-4 py-3 bg-muted/50">
                    <p className="text-sm">
                        Want the raw data? Fetch the bang list as JSON from{" "}
                        <a
                            href="https://searchthing.xyz/api/bangs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                        >
                            https://searchthing.xyz/api/bangs
                        </a>
                        .
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                        Example: <code className="bg-muted px-1 py-0.5 rounded">curl -s https://searchthing.xyz/api/bangs | jq</code>
                    </p>
                </div>

                <div className="space-y-6 mt-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                            type="text"
                            placeholder="Search by service name or bang (use ! for bang search)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`px-4 py-2 rounded-full text-sm transition-colors ${!selectedCategory ? "text-white bg-purple-500" : "bg-muted hover:bg-muted/80"}`}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm transition-colors ${selectedCategory === category ? "bg-purple-500 text-white" : "bg-muted hover:bg-muted/80"}`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((b) => {
                            const bangToken = b.bang.startsWith("!") ? b.bang : `!${b.bang}`;
                            const base = baseUrlFromTemplate(b.searchTemplate);
                            return (
                                <article
                                    key={b.bang + b.service}
                                    className="group relative overflow-hidden p-6 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div className="px-3 py-1 rounded-md bg-purple-600 text-white font-medium">{bangToken}</div>
                                                <h3 className="text-lg font-semibold">{b.service}</h3>
                                            </div>
                                            <p className="mt-2 text-sm text-muted-foreground">{b.category}</p>
                                            <p className="mt-3 text-sm break-all text-muted-foreground">{base}</p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <Dialog>
                    <DialogTrigger render={<Button
                        className="flex fixed right-6 bottom-6 z-10"
                    />}>
                        <Plus /> Add your own
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                                Contribute a Bang
                            </DialogTitle>
                            <DialogDescription className="text-base">
                                Help improve this list by submitting a pull request or using the web form.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="py-4 space-y-6">
                            <div className="p-4 space-y-3 rounded-lg border transition-colors hover:bg-accent/50">
                                <h3 className="flex gap-2 items-center font-semibold">
                                    <Github size={18} />
                                    Create a Pull Request
                                </h3>
                                <p className="text-sm text-muted-foreground">Faster processing: submit a PR with the new bang.</p>
                                <Link href="https://github.com/eliasnau/searchthing" target="_blank">
                                    <Button
                                    variant="outline"
                                    className="w-full bg-gradient-to-r transition-all duration-200 from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20"
                                    >
                                        Open GitHub Repository
                                    </Button>
                                </Link>
                            </div>

                            <div className="p-4 space-y-3 rounded-lg border">
                                <h3 className="font-semibold">Submit Online</h3>
                                <p className="text-sm text-muted-foreground">
                                    Use the online form to suggest a bang
                                </p>
                                <Link href={"/submit-bang"}>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Open Submission Form
                                    </Button>
                                </Link>
                            </div>
                        </div>

                    </DialogContent>
                </Dialog>
            </main>
        </div>
    );
}