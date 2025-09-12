"use client";
import React from "react";

export default function DashboardCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-slate-700/50">
      <div className="flex items-center space-x-4">
        <div className="bg-slate-700 p-3 rounded-full">
          <Icon className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-slate-400 text-sm">{title}</h2>
          <p className="text-2xl font-bold text-slate-100">{value}</p>
        </div>
      </div>
    </div>
  );
}
