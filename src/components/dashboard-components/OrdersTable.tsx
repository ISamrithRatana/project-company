"use client";
import React, { useState, useMemo } from "react";
import { Order } from "@/types/index";
import { formatDate, formatMoney } from "@/utils/helpers";

export default function OrdersTable({
  orders,
  onRowClick,
}: {
  orders: Order[];
  onRowClick: (order: Order) => void;
}) {
  const [sortKey, setSortKey] = useState<"date" | "total">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sortedOrders = useMemo(() => {
    const sorted = [...orders].sort((a, b) => {
      if (sortKey === "date") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.total - b.total;
    });
    return sortDir === "desc" ? sorted.reverse() : sorted;
  }, [orders, sortKey, sortDir]);

  const handleSort = (key: "date" | "total") => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const SortableHeader = ({
    tkey,
    label,
  }: {
    tkey: "date" | "total";
    label: string;
  }) => (
    <th
      className="text-left py-3 px-2 cursor-pointer"
      onClick={() => handleSort(tkey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
      </div>
    </th>
  );

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">
        Recent Orders
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="text-left py-3 px-2">ID</th>
              <SortableHeader tkey="date" label="Date" />
              <SortableHeader tkey="total" label="Total" />
            </tr>
          </thead>
          <tbody>
            {sortedOrders.slice(0, 10).map((o) => (
              <tr
                key={o.id}
                className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer transition-colors duration-200"
                onClick={() => onRowClick(o)}
              >
                <td className="py-3 px-2 font-mono text-slate-500 text-xs">
                  ...{String(o.id).slice(-6)}
                </td>
                <td className="py-3 px-2">{formatDate(o.date)}</td>
                <td className="py-3 px-2 text-right font-semibold text-slate-200">
                  {formatMoney(o.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
