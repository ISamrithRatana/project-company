"use client";
import React from "react";
import { formatMoney } from "@/utils/helpers";

export default function SvgLineChart({
  data,
}: {
  data: { month: string; revenue: number; orders: number }[];
}) {
  const W = 800;
  const H = 300;
  const pad = { t: 20, r: 40, b: 40, l: 60 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const maxRevenue = Math.max(...data.map((d) => d.revenue), 0) * 1.1 || 1;

  const linePoints = data
    .map((d, i) => {
      const x = pad.l + (i / (data.length - 1)) * innerW;
      const y = pad.t + innerH - (d.revenue / maxRevenue) * innerH;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg h-[300px] border border-slate-700/50">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">
        Revenue Trend
      </h2>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
        {/* Axis */}
        <line
          x1={pad.l}
          y1={pad.t + innerH}
          x2={W - pad.r}
          y2={pad.t + innerH}
          stroke="rgba(255,255,255,0.2)"
        />
        <line
          x1={pad.l}
          y1={pad.t}
          x2={pad.l}
          y2={H - pad.b}
          stroke="rgba(255,255,255,0.2)"
        />

        {/* Revenue Line */}
        <polyline
          points={linePoints}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
        />

        {/* Dots */}
        {data.map((d, i) => {
          const x = pad.l + (i / (data.length - 1)) * innerW;
          const y = pad.t + innerH - (d.revenue / maxRevenue) * innerH;
          return (
            <circle key={i} cx={x} cy={y} r={4} fill="#3b82f6">
              <title>{`${d.month}: ${formatMoney(d.revenue)}`}</title>
            </circle>
          );
        })}
      </svg>
    </div>
  );
}
