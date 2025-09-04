// File: app/dashboard/page.tsx  (or components/Dashboard.tsx)
// "use client" required by your original file
"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* =======================
   Inline SVG Icon Helpers
   ======================= */
const Icon = ({ className, size = 24, children }: { className?: string; size?: number; children: React.ReactNode }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const DollarSignIcon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Icon>
);
const ShoppingCartIcon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16"/></Icon>
);
const BarChart3Icon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></Icon>
);
const PlusIcon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><path d="M5 12h14"/><path d="M12 5v14"/></Icon>
);
const XIcon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></Icon>
);
const Trash2Icon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></Icon>
);
const ArrowUpDownIcon = (props: { className?: string; size?: number }) => (
  <Icon {...props}><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></Icon>
);

/* =======================
   Types
   ======================= */
interface Item { id: number; name: string; price: number; }
interface OrderItem extends Item { count: number; }
interface Order { id: number; date: string; items: OrderItem[]; total: number; }
type LogEntry = { ts: string; msg: string };

/* =======================
   Mock Data
   ======================= */
const MENU_ITEMS: Item[] = [
  { id: 1, name: "Espresso", price: 2.5 },
  { id: 2, name: "Ice Latte", price: 3.5 },
  { id: 3, name: "Cappuccino", price: 3.0 },
  { id: 4, name: "Americano", price: 2.75 },
  { id: 5, name: "Mocha", price: 4.0 },
  { id: 6, name: "Matcha Latte", price: 4.25 },
  { id: 7, name: "Iced Tea", price: 2.25 },
  { id: 8, name: "Green Tea Frappe", price: 3.8 },
  { id: 9, name: "Croissant", price: 2.5 },
  { id: 10, name: "Muffin", price: 2.75 },
];

/* =======================
   Utilities
   ======================= */
const formatMoney = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const formatDate = (d: string) =>
  new Date(d).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

const monthKey = (d: string) => {
  const dt = new Date(d);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}`;
};

const monthLabel = (key: string) => {
  const [y, m] = key.split("-");
  return new Date(parseInt(y), parseInt(m) - 1).toLocaleString(undefined, { month: "short", year: "numeric" });
};

const recalcOrderTotal = (items: OrderItem[]) =>
  items.reduce((sum, it) => sum + (Number(it.price) || 0) * (Number(it.count) || 0), 0);

/* =======================
   Data generation
   ======================= */
const generateRandomOrder = (date: Date): Omit<Order, "id"> => {
  const itemCount = Math.floor(Math.random() * 4) + 1;
  const items: OrderItem[] = [];
  const usedIds = new Set<number>();
  for (let i = 0; i < itemCount; i++) {
    let randomItem: Item;
    do {
      randomItem = MENU_ITEMS[Math.floor(Math.random() * MENU_ITEMS.length)];
    } while (usedIds.has(randomItem.id));
    usedIds.add(randomItem.id);
    items.push({ ...randomItem, count: Math.floor(Math.random() * 3) + 1 });
  }
  return { date: date.toISOString(), items, total: recalcOrderTotal(items) };
};

const generateInitialOrders = (): Order[] => {
  const orders: Order[] = [];
  // Use a deterministic 'now' to keep example reproducible; in production use new Date()
  const now = new Date("2025-09-03T00:23:00.000Z");
  for (let i = 0; i < 50; i++) {
    const pastDate = new Date(now);
    pastDate.setDate(now.getDate() - Math.floor(Math.random() * 90));
    pastDate.setHours(pastDate.getHours() - Math.floor(Math.random() * 24 * 7));
    const newOrderData = generateRandomOrder(pastDate);
    orders.push({ id: Date.now() + i, ...newOrderData });
  }
  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

/* =======================
   Analytics functions
   ======================= */
const computeMonthlyTotals = (orders: Order[]) => {
  const map = new Map<string, { total: number; count: number }>();
  for (const o of orders) {
    const k = monthKey(o.date);
    const cur = map.get(k) || { total: 0, count: 0 };
    map.set(k, { total: cur.total + o.total, count: cur.count + 1 });
  }
  return Array.from(map.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, value]) => ({ month: monthLabel(key), revenue: value.total, orders: value.count }));
};

const computeDataHealth = (orders: Order[]) => {
  const validationIssues: string[] = [];
  if (!orders || orders.length === 0) {
    validationIssues.push("No orders present.");
  } else {
    // Check for negative prices/totals or inconsistencies
    orders.forEach((o) => {
      if (o.total < 0) validationIssues.push(`Order ${o.id} has negative total.`);
      const calc = recalcOrderTotal(o.items);
      // Using small epsilon to avoid floating rounding issues
      if (Math.abs(calc - o.total) > 0.01) validationIssues.push(`Order ${o.id} total mismatch (calc: ${calc}, stored: ${o.total}).`);
      o.items.forEach((it) => {
        if (it.price < 0) validationIssues.push(`Order ${o.id} item ${it.id} has negative price.`);
        if (it.count <= 0) validationIssues.push(`Order ${o.id} item ${it.id} has non-positive count.`);
      });
    });
  }

  // summary metrics
  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const itemCounts = new Map<number, number>();
  const dailyRevenue = new Map<string, number>();

  for (const o of orders) {
    const day = new Date(o.date).toISOString().slice(0, 10);
    dailyRevenue.set(day, (dailyRevenue.get(day) || 0) + o.total);
    for (const it of o.items) {
      itemCounts.set(it.id, (itemCounts.get(it.id) || 0) + it.count);
    }
  }

  const uniqueItemsSold = Array.from(itemCounts.keys()).length;
  const mostPopularItemId = Array.from(itemCounts.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
  const mostPopularItem = MENU_ITEMS.find((m) => m.id === mostPopularItemId) ?? null;
  const highestRevenueDay = Array.from(dailyRevenue.entries()).sort((a, b) => b[1] - a[1])[0] ?? null;

  return {
    issues: validationIssues,
    totalRevenue,
    uniqueItemsSold,
    mostPopularItem,
    highestRevenueDay: highestRevenueDay ? { day: highestRevenueDay[0], revenue: highestRevenueDay[1] } : null,
  };
};

/* =======================
   Reusable UI Components
   ======================= */
const DashboardCard = React.memo(({ icon: IconComp, title, value }: { icon: React.ElementType; title: string; value: string }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50">
    <div className="flex items-center space-x-4">
      <div className="bg-slate-700 p-3 rounded-full">
        <IconComp className="text-blue-400" size={24} />
      </div>
      <div>
        <h2 className="text-slate-400 text-sm">{title}</h2>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </div>
    </div>
  </div>
));
DashboardCard.displayName = "DashboardCard";

/* --- Monthly Bar Chart --- */
const MonthlyRevenueChart = ({ data }: { data: { month: string; revenue: number; orders: number }[] }) => {
  const W = 800, H = 400;
  const pad = { t: 40, r: 60, b: 70, l: 70 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;
  const maxRevenue = Math.max(...data.map(d => d.revenue), 0) * 1.1 || 1;
  const maxOrders = Math.max(...data.map(d => d.orders), 0) * 1.1 || 1;
  const ticksRevenue = 5;
  const ticksOrders = 5;
  const tickValsRevenue = Array.from({ length: ticksRevenue }, (_, i) => Math.round(0 + ((maxRevenue) * i) / (ticksRevenue - 1)));
  const tickValsOrders = Array.from({ length: ticksOrders }, (_, i) => Math.round(0 + ((maxOrders) * i) / (ticksOrders - 1)));

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg h-[400px] border border-slate-700/50">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">Monthly Overview</h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        <rect x={W/2 - 100} y="5" width="12" height="12" fill="#3b82f6" rx="2" />
        <text x={W/2 - 85} y="15" className="text-xs fill-slate-400">Revenue</text>
        <rect x={W/2 + 20} y="5" width="12" height="12" fill="#818cf8" rx="2" />
        <text x={W/2 + 35} y="15" className="text-xs fill-slate-400">Orders</text>

        <g className="text-xs fill-slate-400">
          {tickValsRevenue.map((val, i) => {
            const y = pad.t + innerH - (val / maxRevenue) * innerH;
            return (
              <g key={`rev-tick-${i}`}>
                <line x1={pad.l} x2={W - pad.r} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3"/>
                <text x={pad.l - 8} y={y + 4} textAnchor="end" className="fill-slate-400">{`$${(val/1000).toFixed(0)}k`}</text>
              </g>
            );
          })}
          <text transform={`translate(20, ${H/2}) rotate(-90)`} textAnchor="middle" className="fill-slate-500 text-sm">Revenue</text>
        </g>

        <g className="text-xs fill-slate-400">
          {tickValsOrders.map((val, i) => {
            const y = pad.t + innerH - (val / maxOrders) * innerH;
            return <text key={`ord-tick-${i}`} x={W - pad.r + 10} y={y + 4}>{val}</text>;
          })}
          <text transform={`translate(${W - 20}, ${H/2}) rotate(-90)`} textAnchor="middle" className="fill-slate-500 text-sm">Orders</text>
        </g>

        {data.map((d, i) => {
          const bandWidth = innerW / Math.max(data.length, 1);
          const bandX = pad.l + i * bandWidth;
          const barWidth = Math.max(8, bandWidth / 3);
          const revHeight = (d.revenue / maxRevenue) * innerH;
          const ordHeight = (d.orders / maxOrders) * innerH;
          const revX = bandX + bandWidth / 6;
          const ordX = revX + barWidth;
          const revY = H - pad.b - revHeight;
          const ordY = H - pad.b - ordHeight;

          return (
            <g key={d.month}>
              <rect x={revX} y={revY} width={barWidth} height={revHeight} fill="#3b82f6" rx="2">
                <title>Revenue: {formatMoney(d.revenue)}</title>
              </rect>
              <rect x={ordX} y={ordY} width={barWidth} height={ordHeight} fill="#818cf8" rx="2">
                <title>Orders: {d.orders}</title>
              </rect>
              <text x={bandX + bandWidth / 2} y={H - pad.b + 20} textAnchor="middle" className="text-xs fill-slate-400">
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/* --- Orders Table --- */
const OrdersTable = ({ orders, onRowClick }: { orders: Order[]; onRowClick: (order: Order) => void }) => {
  const [sortKey, setSortKey] = useState<'date' | 'total'>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sortedOrders = useMemo(() => {
    const sorted = [...orders].sort((a, b) => {
      if (sortKey === 'date') return new Date(a.date).getTime() - new Date(b.date).getTime();
      return a.total - b.total;
    });
    return sortDir === 'desc' ? sorted.reverse() : sorted;
  }, [orders, sortKey, sortDir]);

  const handleSort = (key: 'date' | 'total') => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortableHeader = ({ tkey, label }: { tkey: 'date' | 'total'; label: string }) => (
    <th className="text-left py-3 px-2 cursor-pointer" onClick={() => handleSort(tkey)}>
      <div className="flex items-center space-x-1"><span>{label}</span>{sortKey === tkey && <ArrowUpDownIcon size={14} />}</div>
    </th>
  );

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">Recent Orders</h2>
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
                <td className="py-3 px-2 font-mono text-slate-500 text-xs">...{String(o.id).slice(-6)}</td>
                <td className="py-3 px-2">{formatDate(o.date)}</td>
                <td className="py-3 px-2 text-right font-semibold text-slate-200">{formatMoney(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* --- SVG Line Chart (vanilla SVG DOM creation) --- */
const SvgLineChart = ({ data: chartData }: { data: { month: string; revenue: number; orders: number }[] }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);

    if (!chartData || chartData.length === 0) return;

    const padding = 50;
    const width = 800;
    const height = 400;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;

    const data = chartData.map((d) => d.revenue);
    const labels = chartData.map((d) => d.month);
    const maxValue = Math.max(...data);
    const ySteps = 5;
    const yStepValue = Math.ceil(maxValue / ySteps / 100) * 100 || 100;
    const yMaxDisplayValue = yStepValue * ySteps;

    const create = (tag: string, attrs: Record<string, any>) => {
      const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
      for (const k in attrs) el.setAttribute(k, String(attrs[k]));
      return el;
    };

    for (let i = 0; i <= ySteps; i++) {
      const y = padding + (chartHeight / ySteps) * i;
      const value = yMaxDisplayValue - (yMaxDisplayValue / ySteps) * i;
      const line = create("line", { x1: padding, y1: y, x2: padding + chartWidth, y2: y, stroke: "rgb(51 65 85)", "stroke-dasharray": "3 3" });
      svg.appendChild(line);
      const text = create("text", { x: padding - 15, y, "dominant-baseline": "middle", "text-anchor": "end", fill: "rgb(148 163 184)", "font-size": "12px" });
      text.textContent = formatMoney(value);
      svg.appendChild(text);
    }

    labels.forEach((label, i) => {
      const x = padding + (chartWidth / (labels.length - 1)) * i;
      const text = create("text", { x, y: height - padding + 20, "text-anchor": "middle", fill: "rgb(148 163 184)", "font-size": "12px" });
      text.textContent = label;
      svg.appendChild(text);
    });

    const points = data.map((val, i) => ({
      x: padding + (chartWidth / (data.length - 1)) * i,
      y: height - padding - (val / yMaxDisplayValue) * chartHeight,
      val,
      label: labels[i],
    }));

    const getCurvePath = (pts: typeof points) => {
      if (pts.length < 2) return `M${pts[0].x},${pts[0].y}`;
      let d = `M${pts[0].x},${pts[0].y}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p1 = pts[i], p2 = pts[i + 1];
        const midX = (p1.x + p2.x) / 2;
        d += ` C${midX},${p1.y} ${midX},${p2.y} ${p2.x},${p2.y}`;
      }
      return d;
    };

    const linePathD = getCurvePath(points);
    const areaPathD = `M${padding},${height - padding} ${linePathD.slice(1)} L${width - padding},${height - padding} Z`;

    const defs = create("defs", {});
    const lg = create("linearGradient", { id: "chartGradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%" });
    const stop1 = create("stop", { offset: "0%", "stop-color": "rgba(59, 130, 246, 0.5)" });
    const stop2 = create("stop", { offset: "100%", "stop-color": "rgba(59, 130, 246, 0)" });
    lg.appendChild(stop1); lg.appendChild(stop2); defs.appendChild(lg); svg.appendChild(defs);

    const area = create("path", { d: areaPathD, fill: "url(#chartGradient)" });
    svg.appendChild(area);
    const line = create("path", { d: linePathD, stroke: "#3b82f6", "stroke-width": "3", fill: "none" });
    svg.appendChild(line);

    const pathLength = (line as SVGPathElement).getTotalLength();
    (line as SVGPathElement).style.strokeDasharray = `${pathLength} ${pathLength}`;
    (line as SVGPathElement).style.strokeDashoffset = `${pathLength}`;
    // trigger repaint then animate
    void (line as SVGPathElement).getBoundingClientRect();
    (line as SVGPathElement).style.transition = "stroke-dashoffset 1.5s ease-out";
    (line as SVGPathElement).style.strokeDashoffset = "0";

    points.forEach((p, i) => {
      const circle = create("circle", {
        cx: p.x, cy: p.y, r: 6, stroke: "#3b82f6", "stroke-width": 2, fill: "#0f172a", opacity: 0,
        style: `transition: opacity 0.5s ease-out ${0.05 * i}s; cursor: pointer;`
      });
      circle.addEventListener("mouseenter", () => setTooltip({ x: p.x, y: p.y, label: p.label, value: p.val }));
      circle.addEventListener("mouseleave", () => setTooltip(null));
      svg.appendChild(circle);
      setTimeout(() => (circle as SVGCircleElement).style.opacity = "1", 200 * i);
    });

  }, [chartData]);

  return (
    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">Revenue Trend (Line Chart)</h2>
      <div className="w-full h-[400px]">
        <svg ref={svgRef as any} width="800" height="400" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet" className="w-full h-full" />
        {tooltip && (
          <div
            className="absolute bg-slate-900/80 text-white px-3 py-1.5 rounded-lg text-xs whitespace-nowrap pointer-events-none z-10"
            style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -120%)" }}
          >
            <span className="font-bold">{tooltip.label}:</span> {formatMoney(tooltip.value)}
          </div>
        )}
      </div>
    </div>
  );
};

/* --- Base Modal, Add / View Modals --- */
const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (ev: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(ev.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const BaseModal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(modalRef, onClose);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg border border-slate-700">
        {children}
      </div>
    </div>
  );
};

const AddOrderModal = ({ isOpen, onClose, onAddOrder }: { isOpen: boolean; onClose: () => void; onAddOrder: (order: Omit<Order, 'id'>) => void }) => {
  const [items, setItems] = useState<OrderItem[]>([]);
  useEffect(() => { if (!isOpen) setItems([]); }, [isOpen]);

  const handleAddItem = () => {
    const firstAvailable = MENU_ITEMS.find((mi) => !items.some((it) => it.id === mi.id));
    if (firstAvailable) setItems((s) => [...s, { ...firstAvailable, count: 1 }]);
  };
  const handleItemChange = (index: number, id: number) => {
    setItems((prev) => {
      const clone = [...prev];
      const newItem = MENU_ITEMS.find((m) => m.id === id)!;
      clone[index] = { ...newItem, count: clone[index].count || 1 };
      return clone;
    });
  };
  const handleCountChange = (index: number, count: number) => {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, count } : it)));
  };
  const handleRemove = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
  const total = useMemo(() => recalcOrderTotal(items), [items]);
  const handleSubmit = () => {
    const newOrder = { date: new Date().toISOString(), items: items.filter(i => i.count > 0), total };
    onAddOrder(newOrder);
    setItems([]);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-100">Add New Order</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700 transition-colors"><XIcon size={20} className="text-slate-400" /></button>
        </div>
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 bg-slate-700/50 p-3 rounded-lg">
              <select value={item.id} onChange={(e) => handleItemChange(idx, Number(e.target.value))}
                className="bg-slate-600 border border-slate-500 rounded-md p-2 text-sm w-full focus:ring-2 focus:ring-blue-500 focus:outline-none">
                {MENU_ITEMS.map(mi => (
                  <option key={mi.id} value={mi.id} disabled={items.some(i => i.id === mi.id && i.id !== item.id)}>{mi.name}</option>
                ))}
              </select>
              <input type="number" min={1} value={item.count} onChange={(e) => handleCountChange(idx, parseInt(e.target.value, 10) || 1)}
                className="bg-slate-600 border border-slate-500 rounded-md p-2 w-20 text-center text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              <p className="w-24 text-right">{formatMoney(item.price * item.count)}</p>
              <button onClick={() => handleRemove(idx)} className="p-2 rounded-md hover:bg-red-500/20 text-red-400 hover:text-red-300"><Trash2Icon size={16} /></button>
            </div>
          ))}
          <button onClick={handleAddItem} disabled={items.length >= MENU_ITEMS.length}
            className="w-full text-sm py-2 px-4 rounded-lg bg-slate-700 hover:bg-slate-600/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Add Item</button>
        </div>
        <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
          <span className="font-bold text-lg">Total: {formatMoney(total)}</span>
          <button onClick={handleSubmit} disabled={items.length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Create Order</button>
        </div>
      </div>
    </BaseModal>
  );
};

const ViewOrderModal = ({ isOpen, onClose, order }: { isOpen: boolean; onClose: () => void; order: Order | null }) => (
  <BaseModal isOpen={isOpen} onClose={onClose}>
    {order && (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-700">
          <div>
            <h2 className="text-xl font-bold text-slate-100">Order Details</h2>
            <p className="text-xs text-slate-500 font-mono">ID: {order.id}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-700 transition-colors"><XIcon size={20} className="text-slate-400" /></button>
        </div>
        <div className="space-y-2 mb-4">
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-slate-700/30">
              <div className="flex items-center">
                <span className="font-semibold text-slate-300 mr-2 bg-slate-600/50 rounded-md px-2 py-1 text-xs">{item.count}x</span>
                <span>{item.name}</span>
              </div>
              <span className="font-mono text-slate-400">{formatMoney(item.price * item.count)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center">
          <span className="font-bold text-lg text-slate-300">Total</span>
          <span className="font-bold text-xl text-blue-400">{formatMoney(order.total)}</span>
        </div>
        <p className="text-xs text-slate-500 text-center mt-4">{formatDate(order.date)}</p>
      </div>
    )}
  </BaseModal>
);

/* =======================
   Performance & Activity Panels
   ======================= */
const PerformancePanel = ({ logs, metrics, renderCount }: { logs: LogEntry[]; metrics: Record<string, number>; renderCount: number }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50 mt-8">
    <h2 className="text-slate-300 text-sm font-semibold mb-4">⚡ Performance & Activity</h2>
    <div className="grid grid-cols-2 gap-4 mb-4 text-xs text-slate-400">
      {Object.entries(metrics).map(([k, v]) => (
        <div key={k}><span className="font-semibold text-slate-200">{k}:</span> {v.toFixed(2)} ms</div>
      ))}
      <div><span className="font-semibold text-slate-200">Render Count:</span> {renderCount}</div>
      <div><span className="font-semibold text-slate-200">Log Count:</span> {logs.length}</div>
    </div>
    <div className="max-h-40 overflow-y-auto text-xs text-slate-400 space-y-1">
      {logs.slice(0, 50).map((l, i) => (<div key={i}>• <span className="text-slate-500 font-mono mr-2">{l.ts}</span> {l.msg}</div>))}
    </div>
  </div>
);

const DataHealthPanel = ({ health }: { health: ReturnType<typeof computeDataHealth> }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50 mt-6">
    <h2 className="text-slate-300 text-sm font-semibold mb-3">🩺 Data Health</h2>
    <div className="grid grid-cols-2 gap-4 text-sm text-slate-300 mb-3">
      <div><span className="text-slate-400">Total Revenue:</span> <div className="font-bold">{formatMoney(health.totalRevenue)}</div></div>
      <div><span className="text-slate-400">Unique Items Sold:</span> <div className="font-bold">{health.uniqueItemsSold}</div></div>
      <div><span className="text-slate-400">Most Popular:</span> <div className="font-bold">{health.mostPopularItem ? health.mostPopularItem.name : "—"}</div></div>
      <div><span className="text-slate-400">Top Day:</span> <div className="font-bold">{health.highestRevenueDay ? `${health.highestRevenueDay.day} (${formatMoney(health.highestRevenueDay.revenue)})` : "—"}</div></div>
    </div>
    <div className="text-xs text-red-300">
      {health.issues.length === 0 ? <div className="text-slate-400">No validation issues found.</div> : (
        <div>
          <div className="font-semibold text-slate-200 mb-2">Issues:</div>
          <ul className="list-disc pl-5 text-xs">
            {health.issues.slice(0, 5).map((it, i) => <li key={i}>{it}</li>)}
          </ul>
        </div>
      )}
    </div>
  </div>
);

/* =======================
   Main App
   ======================= */
export default function App() {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;

  const [orders, setOrders] = useState<Order[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<Record<string, number>>({});

  useEffect(() => {
    const t0 = performance.now();
    const init = generateInitialOrders();
    const t1 = performance.now();
    setOrders(init);
    setMetrics((m) => ({ ...m, "Init Orders": t1 - t0 }));
    setLogs((l) => [{ ts: new Date().toISOString(), msg: `Generated ${init.length} initial orders` }, ...l]);
  }, []);

  const monthlyTotals = useMemo(() => {
    const t0 = performance.now();
    const res = computeMonthlyTotals(orders);
    const t1 = performance.now();
    setMetrics((m) => ({ ...m, "Monthly Totals": t1 - t0 }));
    return res;
  }, [orders]);

  const totalRevenue = useMemo(() => orders.reduce((s, o) => s + o.total, 0), [orders]);
  const avgOrderValue = useMemo(() => (orders.length ? totalRevenue / orders.length : 0), [orders, totalRevenue]);

  const health = useMemo(() => computeDataHealth(orders), [orders]);

  const pushLog = useCallback((msg: string) => {
    setLogs((l) => [{ ts: new Date().toISOString(), msg }, ...l].slice(0, 200));
  }, []);

  const handleAddOrder = useCallback((newOrderData: Omit<Order, "id">) => {
    const t0 = performance.now();
    const newOrder: Order = { id: Date.now(), ...newOrderData };
    setOrders((prev) => [newOrder, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    const t1 = performance.now();
    setMetrics((m) => ({ ...m, "Add Order Time": (m["Add Order Time"] || 0) * 0.6 + (t1 - t0) * 0.4 })); // moving average
    pushLog(`➕ Added order ${newOrder.id} (${formatMoney(newOrder.total)})`);
  }, [pushLog]);

  const handleViewOrder = useCallback((order: Order) => {
    setSelectedOrder(order);
    pushLog(`👁️ Viewed order ${order.id}`);
  }, [pushLog]);

  useEffect(() => {
    // small metric to monitor orders array size changes
    setMetrics((m) => ({ ...m, "Orders Count": orders.length }));
  }, [orders]);

  return (
    <div className="bg-slate-900 text-slate-300 min-h-screen font-sans">
      <div className="p-4 sm:p-6 lg:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">📊 Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button onClick={() => { setIsAddOpen(true); pushLog("🆕 Opened Add Order modal"); }}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-blue-600/20">
              <PlusIcon size={18} /><span>New Order</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard icon={ShoppingCartIcon} title="Total Orders" value={String(orders.length)} />
          <DashboardCard icon={DollarSignIcon} title="Total Revenue" value={formatMoney(totalRevenue)} />
          <DashboardCard icon={BarChart3Icon} title="Avg. Order Value" value={formatMoney(avgOrderValue)} />
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <PerformancePanel logs={logs} metrics={metrics} renderCount={renderCountRef.current} />
          </div>
          <div>
            <DataHealthPanel health={health} />
          </div>
        </div>
      </div>

      <AddOrderModal isOpen={isAddOpen} onClose={() => { setIsAddOpen(false); pushLog("Closed Add Order modal"); }} onAddOrder={handleAddOrder} />
      <ViewOrderModal isOpen={!!selectedOrder} onClose={() => { setSelectedOrder(null); pushLog("Closed View Order modal"); }} order={selectedOrder} />
    </div>
  );
}
