"use client";
import React from "react";
import { Order } from "@/types/index";
import { formatDate, formatMoney } from "@/utils/helpers";

export default function ViewOrderModal({
  isOpen,
  onClose,
  order,
}: {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-xl p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 text-slate-100">
          Order Details
        </h2>
        <div className="space-y-2 text-slate-300">
          <p>
            <span className="font-semibold">ID:</span> {order.id}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {formatDate(order.date)}
          </p>
          <p>
            <span className="font-semibold">Total:</span>{" "}
            {formatMoney(order.total)}
          </p>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
