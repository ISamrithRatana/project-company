"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

interface SidebarProps {
  activeTbl?: string;
  refreshInterval?: number; // allow custom refresh interval
}

export default function Sidebar({ activeTbl = "", refreshInterval = 5000 }: SidebarProps) {
  const [rows, setRows] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState(activeTbl);
  const [error, setError] = useState<string | null>(null);

  // Sync activeTbl prop with local state
  useEffect(() => {
    setActiveTab(activeTbl);
  }, [activeTbl]);

  const fetchData = async (signal?: AbortSignal) => {
    try {
      const res = await fetch("/api/categories", { cache: "no-store", signal });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data: Category[] = await res.json();
      setRows(data);
      setError(null);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Fetch error:", err);
        setError("Failed to load categories");
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);

    const interval = setInterval(() => fetchData(controller.signal), refreshInterval);

    return () => {
      controller.abort();
      clearInterval(interval);
    };
  }, [refreshInterval]);

  return (
    <aside className="bg-gray-200 p-4 sticky top-4 rounded-lg w-full border shadow-sm">
      <h2 className="text-lg font-bold mb-4">Databases</h2>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <ul className="space-y-1">
        {rows.map((row) => (
          <li key={row.id}>
            <Link
              href={`/system/${row.name}`}
              onClick={() => setActiveTab(row.name)}
              aria-current={activeTab === row.name ? "page" : undefined}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeTab === row.name
                  ? "bg-blue-100 text-blue-800 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {/* Replace 📂 with an icon if using lucide-react */}
              <span role="img" aria-label="folder">📂</span>
              {row.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
