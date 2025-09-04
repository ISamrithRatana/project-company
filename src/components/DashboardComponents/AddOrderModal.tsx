"use client";
import React, { useState } from "react";
import { Order } from "@/types/index";

export default function AddOrderModal({
  isOpen,
  onClose,
  onAddOrder,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddOrder: (order: Omit<Order, "id">) => void;
}) {
  const [date, setDate] = useState("");
  const [total, setTotal] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOrder({ date, total });
    setDate("");
    setTotal(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-slate-100">
          Add New Order
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 text-sm mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full rounded-lg bg-slate-700 text-slate-200 px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-slate-400 text-sm mb-1">Total</label>
            <input
              type="number"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              required
              className="w-full rounded-lg bg-slate-700 text-slate-200 px-3 py-2"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-600 hover:bg-slate-500 text-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
