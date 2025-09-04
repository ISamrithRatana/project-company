"use client";
import React from "react";
import { formatMoney } from "@/utils/helpers";

export default function MonthlyRevenueChart({
  data,
}: {
  data: { month: string; revenue: number; orders: number }[];
}) {
  const W = 800;
  const H = 400;
  const pad = { t: 40, r: 50, b: 60, l: 60 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 0) * 1.1 || 1;
  const maxOrders = Math.max(...data.map((d) => d.orders), 0) * 1.1 || 1;

  const ticksRevenue = 5;
  const tickValsRevenue = Array.from({ length: ticksRevenue }, (_, i) =>
    Math.round((maxRevenue * i) / (ticksRevenue - 1))
  );

  const ticksOrders = 5;
  const tickValsOrders = Array.from({ length: ticksOrders }, (_, i) =>
    Math.round((maxOrders * i) / (ticksOrders - 1))
  );

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg h-[400px] border border-slate-700/50">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">
        Monthly Overview
      </h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        {/* Legends */}
        <rect x={W / 2 - 100} y="5" width="12" height="12" fill="#3b82f6" rx="2" />
        <text x={W / 2 - 85} y="15" className="text-xs fill-slate-400">
          Revenue
        </text>
        <rect x={W / 2 + 20} y="5" width="12" height="12" fill="#818cf8" rx="2" />
        <text x={W / 2 + 35} y="15" className="text-xs fill-slate-400">
          Orders
        </text>

        {/* Revenue Axis */}
        <g className="text-xs fill-slate-400">
          {tickValsRevenue.map((val, i) => {
            const y = pad.t + innerH - (val / maxRevenue) * innerH;
            return (
              <g key={`rev-${i}`}>
                <line
                  x1={pad.l}
                  x2={W - pad.r}
                  y1={y}
                  y2={y}
                  stroke="rgba(255,255,255,0.1)"
                  strokeDasharray="3 3"
                />
                <text x={pad.l - 8} y={y + 4} textAnchor="end">
                  {`$${(val / 1000).toFixed(0)}k`}
                </text>
              </g>
            );
          })}
          <text
            transform={`translate(15, ${H / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-slate-500 text-sm"
          >
            Revenue
          </text>
        </g>

        {/* Orders Axis */}
        <g className="text-xs fill-slate-400">
          {tickValsOrders.map((val, i) => {
            const y = pad.t + innerH - (val / maxOrders) * innerH;
            return (
              <text key={`ord-${i}`} x={W - pad.r + 8} y={y + 4}>
                {val}
              </text>
            );
          })}
          <text
            transform={`translate(${W - 15}, ${H / 2}) rotate(-90)`}
            textAnchor="middle"
            className="fill-slate-500 text-sm"
          >
            Orders
          </text>
        </g>

        {/* Bars */}
        {data.map((d, i) => {
          const bandWidth = innerW / data.length;
          const bandX = pad.l + i * bandWidth;

          const barWidth = bandWidth / 3;

          const revHeight = (d.revenue / maxRevenue) * innerH;
          const ordHeight = (d.orders / maxOrders) * innerH;

          const revX = bandX + bandWidth / 6;
          const ordX = revX + barWidth;

          const revY = H - pad.b - revHeight;
          const ordY = H - pad.b - ordHeight;

          return (
            <g key={d.month}>
              <rect
                x={revX}
                y={revY}
                width={barWidth}
                height={revHeight}
                fill="#3b82f6"
                rx="2"
              >
                <title>Revenue: {formatMoney(d.revenue)}</title>
              </rect>
              <rect
                x={ordX}
                y={ordY}
                width={barWidth}
                height={ordHeight}
                fill="#818cf8"
                rx="2"
              >
                <title>Orders: {d.orders}</title>
              </rect>
              <text
                x={bandX + bandWidth / 2}
                y={H - pad.b + 20}
                textAnchor="middle"
                className="text-xs fill-slate-400"
              >
                {d.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
