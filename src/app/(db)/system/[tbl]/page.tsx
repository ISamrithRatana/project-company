import TableClient from "@/components/TableClient";
import { getTableData, DataItem } from "@/actions/tableActions";

export default async function TablePage(
  props: PageProps<'/system/[tbl]'>
) {
  const { params } = props;
  const { tbl } = await params;

  const data: DataItem[] = await getTableData(tbl);

  if (!data.length) return <p>No data found in table "{tbl}"</p>;

  return <TableClient table={tbl} data={data} />;
}
