// src/app/api/news/route.ts
import { NextRequest, NextResponse } from "next/server";
import { NewsRepository } from "@/modules/news/news.repository";
import { NewsService } from "@/modules/news/news.service";

const newsService = new NewsService(new NewsRepository());

export async function GET() {
  const data = await newsService.getAll();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let data;

    if (Array.isArray(body)) {
      data = await newsService.createMany(body);
    } else {
      data = await newsService.create(body);
    }

    return NextResponse.json(data);
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { message: "Unique constraint failed (id already exists)" },
        { status: 400 }
      );
    }
    console.error("POST /api/news error:", err);
    return NextResponse.json({ message: "Failed to create news" }, { status: 500 });
  }
}
