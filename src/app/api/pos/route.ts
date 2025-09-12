import { NextRequest, NextResponse } from "next/server";
import { POSService } from "@/modules/pos/pos.service";
import { Order } from "@/modules/pos/pos.types";
// import {prisma} from "@/lib/prisma"

const posService = new POSService()

/** GET: Fetch menu */
export async function GET() {
  try {
    const menu = await posService.getMenu();
    return NextResponse.json(menu);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to fetch menu" },
      { status: 500 }
    );
  }
}


/** POST: Place a new order */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.items || !Array.isArray(body.items) || typeof body.total !== "number") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const order: Order = {
      items: body.items,
      total: body.total,
    };

    const newOrder = await posService.createOrder(order);

    return NextResponse.json({ success: true, order: newOrder });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create order" },
      { status: 500 }
    );
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const defaultMenu = await req.json(); // ✅ parse JSON from request body
//     const createdMenu = []; // ✅ initialize array

//     for (const item of defaultMenu) {
//       const menuItem = await prisma.menu.upsert({
//         where: { name: item.name },
//         update: {},
//         create: item,
//       });
//       createdMenu.push(menuItem);
//     }

//     return NextResponse.json({ success: true, menu: createdMenu });
//   } catch (err: any) {
//     return NextResponse.json(
//       { success: false, error: err.message || "Failed to create menu" },
//       { status: 500 }
//     );
//   }
// }