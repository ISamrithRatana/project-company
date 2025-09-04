"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  PlusIcon,
  ShoppingCartIcon,
  DollarSignIcon,
  BarChart3Icon,
} from "lucide-react";

import DashboardCard from "@/components/DashboardComponents/DashboardCard";
import OrdersTable from "@/components/DashboardComponents/OrdersTable";
import MonthlyRevenueChart from "@/components/DashboardComponents/MonthlyRevenueChart";
import SvgLineChart from "@/components/DashboardComponents/SvgLineChart";
import AddOrderModal from "@/components/DashboardComponents/AddOrderModal";
import ViewOrderModal from "@/components/DashboardComponents/ViewOrderModal";
import PerformancePanel from "@/components/DashboardComponents/PerformancePanel";

import {
  generateInitialOrders,
  computeMonthlyTotals,
  formatMoney,
} from "@/utils/helpers";
import { Order } from "@/types/index";

export default function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const t0 = performance.now();
    const initOrders = generateInitialOrders();
    const t1 = performance.now();
    setOrders(initOrders);
    setMetrics((m) => ({ ...m, "Init Orders": t1 - t0 }));
    setLogs((l) => ["Generated initial orders", ...l]);
  }, []);

  const monthlyTotals = useMemo(() => {
    const t0 = performance.now();
    const result = computeMonthlyTotals(orders);
    const t1 = performance.now();
    setMetrics((m) => ({ ...m, "Monthly Totals": t1 - t0 }));
    return result;
  }, [orders]);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, o) => sum + o.total, 0),
    [orders]
  );
  const avgOrderValue = useMemo(
    () => (orders.length ? totalRevenue / orders.length : 0),
    [orders, totalRevenue]
  );

  const handleAddOrder = useCallback(
    (newOrderData: Omit<Order, "id">) => {
      const newOrder = { id: Date.now(), ...newOrderData };
      const updatedOrders = [newOrder, ...orders];
      setOrders(
        updatedOrders.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
      setLogs((l) => ["➕ Added new order #" + newOrder.id, ...l]);
    },
    [orders]
  );

  const handleViewOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
    setLogs((l) => ["👁️ Viewed order #" + order.id, ...l]);
  }, []);

  const handleCloseViewModal = useCallback(() => setSelectedOrder(null), []);

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen font-sans">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">📊 Dashboard</h1>
          <button
            onClick={() => {
              setAddModalOpen(true);
              setLogs((l) => ["🆕 Opened Add Order Modal", ...l]);
            }}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
          >
            <PlusIcon size={18} />
            <span>New Order</span>
          </button>
        </header>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            icon={ShoppingCartIcon}
            title="Total Orders"
            value={String(orders.length)}
          />
          <DashboardCard
            icon={DollarSignIcon}
            title="Total Revenue"
            value={formatMoney(totalRevenue)}
          />
          <DashboardCard
            icon={BarChart3Icon}
            title="Avg. Order Value"
            value={formatMoney(avgOrderValue)}
          />
        </div>

        {/* Charts + Table */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <MonthlyRevenueChart data={monthlyTotals} />
          </div>
          <div className="xl:col-span-1">
            <OrdersTable orders={orders} onRowClick={handleViewOrder} />
          </div>
          <div className="xl:col-span-3 mt-6">
            <SvgLineChart data={monthlyTotals} />
          </div>
        </div>

        {/* Performance & Activity */}
        <PerformancePanel logs={logs} metrics={metrics} />
      </div>

      {/* Modals */}
      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddOrder={handleAddOrder}
      />
      <ViewOrderModal
        isOpen={!!selectedOrder}
        onClose={handleCloseViewModal}
        order={selectedOrder}
      />
    </div>
  );
}
