import fs from "fs/promises";
import path from "path";
import { DataItem } from "@/modules/table/table.types";

export class TableRepository {
  private async getFilePath(tbl: string): Promise<string> {
    return path.join(process.cwd(), "src/storage/data", `tbl_${tbl}.json`);
  }

  async readFile(tbl: string): Promise<DataItem[]> {
    try {
      const text = await fs.readFile(await this.getFilePath(tbl), "utf-8");
      return JSON.parse(text);
    } catch (err) {
      console.error(`Failed to read table ${tbl}:`, err);
      return [];
    }
  }

  async writeFile(tbl: string, rows: DataItem[]): Promise<void> {
    await fs.writeFile(
      await this.getFilePath(tbl),
      JSON.stringify(rows, null, 2),
      "utf-8"
    );
  }
}
