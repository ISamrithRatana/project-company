import { DataItem } from "@/modules/table/table.types";
import { TableRepository } from "@/modules/table/table.repository";

export class TableService {
  private repo: TableRepository;

  constructor(repo: TableRepository) {
    this.repo = repo;
  }

  async getTableData(tbl: string): Promise<DataItem[]> {
    return this.repo.readFile(tbl);
  }

  async updateCell(tbl: string, row: number, colKey: string, value: string) {
    const rows = await this.repo.readFile(tbl);
    if (!rows[row]) throw new Error(`Row ${row} not found`);
    rows[row][colKey] = value;
    await this.repo.writeFile(tbl, rows);
  }

  async addRow(tbl: string, template: DataItem = {}) {
    const rows = await this.repo.readFile(tbl);
    rows.push(template);
    await this.repo.writeFile(tbl, rows);
  }

  async deleteRow(tbl: string, row: number) {
    const rows = await this.repo.readFile(tbl);
    if (row >= 0 && row < rows.length) {
      rows.splice(row, 1);
      await this.repo.writeFile(tbl, rows);
    }
  }
}
