"use client";

import React, { useState } from "react";
import { useDialog } from "@/components/dialog-provider/DialogSystemProvider";
import { DataItem } from "@/modules/table/table.types";
import {
  updateCell,
  addRow,
  deleteRow,
  getTableData
} from "@/modules/table/table.actions";

interface TableClientProps {
  table: string;
  data: DataItem[];
}

export default function TableClient({ table, data }: TableClientProps) {
  const [rows, setRows] = useState<DataItem[]>(data);
  const [loading, setLoading] = useState(false);
  const { showDialog, hideDialog } = useDialog();

  /** Refresh table data from backend */
  const importTableData = async () => {
    try {
      setLoading(true);
      const freshData = await getTableData(table);
      setRows(freshData);
    } finally {
      setLoading(false);
    }
  };

  /** Add Row */
  const handleAddRow = () => {
    const keys = Object.keys(rows[0] || {});

    const AddRowDialog = () => {
      const [newRow, setNewRow] = React.useState<Record<string, string>>(
        keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
      );
      const [saving, setSaving] = React.useState(false);

      const handleSave = async () => {
        try {
          setSaving(true);
          await addRow(table, newRow);
          await importTableData();
          hideDialog();
        } catch (err) {
          console.error("Error adding row:", err);
        } finally {
          setSaving(false);
        }
      };

      return (
        <div className="p-4 max-w-md">
          <h2 className="text-lg font-bold mb-4">Add New Row</h2>

          {keys.map((key) => (
            <div key={key} className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {key}
              </label>
              <input
                value={newRow[key]}
                onChange={(e) =>
                  setNewRow((prev) => ({ ...prev, [key]: e.target.value }))
                }
                className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={hideDialog}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    };

    showDialog(<AddRowDialog />);
  };

  /** Edit Cell */
  const handleEditCell = (rowIdx: number, key: string) => {
    const EditCellDialog = () => {
      const [value, setValue] = React.useState(rows[rowIdx][key]);
      const [saving, setSaving] = React.useState(false);

      const handleSave = async () => {
        try {
          setSaving(true);
          await updateCell(table, rowIdx, key, value);
          setRows((prev) => {
            const updated = [...prev];
            updated[rowIdx][key] = value;
            return updated;
          });
          hideDialog();
        } catch (err) {
          console.error("Error updating cell:", err);
        } finally {
          setSaving(false);
        }
      };

      return (
        <div className="p-4 max-w-md">
          <h2 className="text-lg font-bold mb-4">Edit Cell</h2>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none mb-3"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-4 py-2 rounded transition"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={hideDialog}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
            >
              Cancel
            </button>
          </div>
        </div>
      );
    };

    showDialog(<EditCellDialog />);
  };

  /** Delete Row */
  const handleDeleteRow = async (row: number) => {
    if (!confirm("Are you sure you want to delete this row?")) return;
    try {
      setLoading(true);
      await deleteRow(table, row);
      await importTableData();
    } catch (err) {
      console.error("Error deleting row:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-auto rounded-lg shadow-md border border-gray-300">
      <div className="flex justify-between items-center p-2 bg-gray-50 border-b">
        <h3 className="text-lg font-semibold">Table: {table}</h3>
        <button
          onClick={handleAddRow}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          Add Row
        </button>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              {Object.keys(rows[0] || {}).map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {key}
                </th>
              ))}
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, i) => (
              <tr
                key={i}
                className={`hover:bg-gray-50 ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                {Object.keys(row).map((key) => (
                  <td
                    key={key}
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => handleEditCell(i, key)}
                  >
                    {row[key]}
                  </td>
                ))}
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeleteRow(i)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
