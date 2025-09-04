"use client";
import React from "react";


export default function PerformancePanel({
  logs,
  metrics,
}: {
  logs: string[];
  metrics: { [key: string]: number };
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50 mt-8">
      <h2 className="text-slate-300 text-sm font-semibold mb-4">
        ⚡ Performance & Activity
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {Object.entries(metrics).map(([key, val]) => (
          <div key={key} className="text-sm text-slate-400">
            <span className="font-semibold text-slate-200">{key}:</span>{" "}
            {val.toFixed(2)} ms
          </div>
        ))}
      </div>
      <div className="max-h-40 overflow-y-auto text-xs text-slate-400 space-y-1">
        {logs.map((log, i) => (
          <div key={i}>• {log}</div>
        ))}
      </div>
    </div>
  );
}
