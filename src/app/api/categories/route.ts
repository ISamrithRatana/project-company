// src/app/api/categories/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  try {
    const dirPath = path.join(process.cwd(), "src/storage/data");
    const files = await fs.readdir(dirPath);

    const tblFiles = files
      .filter(file => file.startsWith("tbl_"))
      .map((file, index) => ({
        id: index + 1,
        name: file.replace(/^tbl_/, "").replace(/\.[^/.]+$/, ""), // remove prefix and extension
      }));

    return NextResponse.json(tblFiles);
  } catch (err) {
    console.error("Error reading data files:", err);
    return NextResponse.json([], { status: 500 });
  }
}
