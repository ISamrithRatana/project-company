import TableClient from "@/app/(db)/system/[tbl]/table-client";
import { getTableData } from "@/modules/table/table.actions";
import { DataItem } from "@/modules/table/table.types";


export default async function TablePage(
  props: PageProps<'/system/[tbl]'>
) {
  const { params } = props;
  const { tbl } = await params;

  const data: DataItem[] = await getTableData(tbl);

  if (!data.length) return (<p className="p-4">No data found in table {tbl}</p>);

  return (
      <TableClient table={tbl} data={data} />
  );
}
