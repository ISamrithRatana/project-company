import fs from "fs/promises";
import TableClient from "@/components/TableClient";
import { getFilePath } from "@/actions/tableActions";

interface DataItem {
  [key: string]: string;
}

export default async function TablePage({ params }: { params: Promise<{ tbl: string }> }) {
  const { tbl } = await params;
  const filePath = await getFilePath(tbl);

  let data: DataItem[] = [];
  try {
    const fileContent = await fs.readFile(filePath, "utf-8");
    data = JSON.parse(fileContent); // JSON array of objects
  } catch {
    return <p>Table "{tbl}" not found</p>;
  }

  if (!data.length) return <p>No data found in table "{tbl}"</p>;

  return <TableClient table={tbl} data={data} />;
}
