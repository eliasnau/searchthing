import { NextRequest, NextResponse, after } from "next/server";
import bangs from "@/bangs";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
	return NextResponse.json(bangs);
}
