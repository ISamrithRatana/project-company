import { NextRequest, NextResponse } from "next/server";
import { posService } from "@/modules/pos/pos.service";

/** GET: fetch menu */
export async function GET() {
  try {
    const menu = await posService.getMenu();
    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/** POST: place a new order */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.items || !Array.isArray(body.items) || typeof body.total !== "number") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }

    const newOrder = await posService.createOrder({
      items: body.items,
      total: body.total,
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || "Failed to create order" }, { status: 500 });
  }
}
