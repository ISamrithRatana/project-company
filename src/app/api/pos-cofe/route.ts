import { NextResponse,NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET() {
  const filePath = path.join(process.cwd(), "src/storage/data", "tbl_menu.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const menu = JSON.parse(fileContents);
  return NextResponse.json(menu);
}


export async function POST(req: NextRequest) {
  const ordersFile = path.join(process.cwd(), "src/storage/data", "tbl_order.json");
  try {
    const body = await req.json();
    if (!body.items || !Array.isArray(body.items) || typeof body.total !== "number") {
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
    }

    // Ensure folder exists
    await fs.mkdir(path.dirname(ordersFile), { recursive: true });

    let orders = [];
    try {
      const fileData = await fs.readFile(ordersFile, "utf-8");
      orders = fileData ? JSON.parse(fileData) : [];
    } catch {
      orders = [];
    }

    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: body.items,
      total: body.total,
    };

    orders.push(newOrder);
    await fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), "utf-8");

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}