"use server";

import { TableRepository } from "@/modules/table/table.repository";
import { TableService } from "@/modules/table/table.service";
import { DataItem } from "@/modules/table/table.types";

const tableService = new TableService(new TableRepository());

export async function getTableData(tbl: string): Promise<DataItem[]> {
  return tableService.getTableData(tbl);
}

export async function updateCell(tbl: string, row: number, colKey: string, value: string) {
  return tableService.updateCell(tbl, row, colKey, value);
}

export async function addRow(tbl: string, template: DataItem = {}) {
  return tableService.addRow(tbl, template);
}

export async function deleteRow(tbl: string, row: number) {
  return tableService.deleteRow(tbl, row);
}
