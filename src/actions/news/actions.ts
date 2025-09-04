"use server";

import fs from "fs/promises";
import path from "path";

interface News {
  id: number;
  name: string;
  price: string;
  unit: string;
  origin: string;
}

const newsFilePath = path.join(process.cwd(), "src/storage/data", "tbl_news.json");

// Read existing news
export async function readNews(): Promise<News[]> {
  try {
    const content = await fs.readFile(newsFilePath, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}
