"use client";

import React, { useState } from "react";
import { useDialog } from "@/components/DialogProvider/DialogSystemProvider";
import { updateCell, addRow, deleteRow, DataItem } from "@/actions/tableActions";

interface TableClientProps {
  table: string;
  data: DataItem[];
}

export default function TableClient({ table, data }: TableClientProps) {
  const [rows, setRows] = useState<DataItem[]>(data);
  const { showDialog, hideDialog } = useDialog();

  const handleEditCell = (rowIdx: number, key: string) => {
    const value = rows[rowIdx][key];
    showDialog(
      <div>
        <h2 className="text-lg font-bold mb-2">Edit Cell</h2>
        <input
          value={value}
          onChange={(e) => {
            const updated = [...rows];
            updated[rowIdx][key] = e.target.value;
            setRows(updated);
          }}
          className="border p-2 w-full rounded mb-2"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              await updateCell(table, rowIdx, key, rows[rowIdx][key]);
              hideDialog();
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
          <button onClick={hideDialog} className="bg-gray-300 px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleAddRow = async () => {
    await addRow(table, {});
    const newData = await importTableData();
    setRows(newData);
  };

  const handleDeleteRow = async (row: number) => {
    await deleteRow(table, row);
    const newData = await importTableData();
    setRows(newData);
  };

  // Fetch latest data after add/delete
  const importTableData = async () => {
    const mod = await import("@/actions/tableActions");
    return mod.getTableData(table);
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md border border-gray-300">
      <button
        onClick={handleAddRow}
        className="bg-blue-500 text-white px-4 py-2 rounded m-2"
      >
        Add Row
      </button>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100 sticky top-0 z-10">
          <tr>
            {Object.keys(rows[0] || {}).map((key) => (
              <th key={key} className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                {key}
              </th>
            ))}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {rows.map((row, i) => (
            <tr key={i} className={`hover:bg-gray-50 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
              {Object.keys(row).map((key) => (
                <td key={key} className="px-4 py-2 cursor-pointer" onClick={() => handleEditCell(i, key)}>
                  {row[key]}
                </td>
              ))}
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteRow(i)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
