"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function Sidebar() {
  const [rows, setRows] = useState<Category[]>([]);

  const fetchData = async () => {
    const res = await fetch("/api/categories", { cache: "no-store" });
    const data: Category[] = await res.json();
    setRows(data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 1000); // auto-refresh every 1s
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="bg-gray-200 p-6 rounded-lg w-64 border">
      <h2 className="text-lg font-bold mb-2">Databases</h2>
      <ul>
        {rows.map((row) => (
          <li key={row.id}>
            <Link href={`/system/${row.name}`} className="hover:text-blue-500">
              📂 {row.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
