import { NextRequest, NextResponse, after } from "next/server";
import bangs from "../lib/bangs";

export const runtime = "edge";

const DEFAULT_COOKIE_NAME = "default_bang";

export async function GET(request: NextRequest) {
    const rawQuery = request.nextUrl.searchParams.get("q") ?? null;
    const searchBang = request.nextUrl.searchParams.get("default") ?? null;

    if (!rawQuery) {
        return NextResponse.json({ error: "Please provide a search query" }, { status: 402 });
    }

    after(async () => { });

    const q = rawQuery!.trim();
    const matcher = /^(?:!(\w+)(?:\s+(.*))?|(.*\S)?\s*!([A-Za-z0-9]+))$/i;
    const match = q.match(matcher);

    if (match) {
        const key = (match[1] ?? match[4] ?? "").toLowerCase();
        const rest = (match[2] ?? match[3] ?? "").trim();
        const found = bangs.find((b) => b.bang.toLowerCase() === key);
        if (found) {
            if (!rest) {
                const url = `https://${found.siteUrl}`;
                //return NextResponse.json({ query: q, bang: key, target: url });
                return NextResponse.redirect(url, {status: 302})
            }
            const url = found.searchTemplate.replace("%s", encodeURIComponent(rest));
            //return NextResponse.json({ query: q, bang: key, target: url });
            return NextResponse.redirect(url, {status: 302})
        }
    }


    let defaultBang = null;

    if (searchBang !== null) {
        defaultBang = searchBang.trim().toLowerCase();
    }

    if (defaultBang !== null) {
        const cookieDefault = request.cookies.get(DEFAULT_COOKIE_NAME)?.value ?? null;
        if (cookieDefault) {
            defaultBang = cookieDefault.toLowerCase();
        }
    }

    if (defaultBang) {
        let url = undefined
        const found = bangs.find((b) => b.bang.toLowerCase() === defaultBang);
        if (found) {
            url = found.searchTemplate.replace("%s", encodeURIComponent(q));
        } else {
            url = `https://www.google.com/search?q=${encodeURIComponent(q)}`
        }
        //return NextResponse.json({ query: q, bang: defaultBang, target: url,});
        return NextResponse.redirect(url, {status: 302})
    } else {
        const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`
        //return NextResponse.json({ query: q, bang: defaultBang, target: url });
        return NextResponse.redirect(url, {status: 302})
    }
}
