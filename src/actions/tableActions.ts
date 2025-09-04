"use server";

import fs from "fs/promises";
import path from "path";

export interface DataItem {
  [key: string]: string;
}

export async function getFilePath(tbl: string): Promise<string> {
  return path.join(process.cwd(), "src/storage/data", `tbl_${tbl}.json`);
}

async function readFile(tbl: string): Promise<DataItem[]> {
  try {
    const text = await fs.readFile(await getFilePath(tbl), "utf-8");
    return JSON.parse(text);
  } catch (err) {
    console.error(`Failed to read table ${tbl}:`, err);
    return [];
  }
}

async function writeFile(tbl: string, rows: DataItem[]): Promise<void> {
  await fs.writeFile(await getFilePath(tbl), JSON.stringify(rows, null, 2), "utf-8");
}

export async function updateCell(tbl: string, row: number, colKey: string, value: string) {
  const rows = await readFile(tbl);
  if (!rows[row]) throw new Error(`Row ${row} not found`);
  rows[row][colKey] = value;
  await writeFile(tbl, rows);
}

export async function addRow(tbl: string, template: DataItem = {}) {
  const rows = await readFile(tbl);
  rows.push(template);
  await writeFile(tbl, rows);
}

export async function deleteRow(tbl: string, row: number) {
  const rows = await readFile(tbl);
  if (row >= 0 && row < rows.length) {
    rows.splice(row, 1);
    await writeFile(tbl, rows);
  }
}

export async function getTableData(tbl: string): Promise<DataItem[]> {
  return readFile(tbl);
}
