import { NextRequest, NextResponse, after } from "next/server";
import bangs from "@/lib/bangs";

export async function GET(request: NextRequest) {
    return NextResponse.json(bangs)
}
