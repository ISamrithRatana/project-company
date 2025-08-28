"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/dist/client/link";


export default function AdminPage() {
    const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function logout() {
    setLoading(true);
    await fetch("/api/admin-logout", { method: "POST" });
    setLoading(false);
    router.replace("/");
  }
  return (
     <div style={{ maxWidth: 720, margin: "96px auto", textAlign: "center" }}>
      <h1>Welcome to Admin Area</h1>
      <Link href="/dashboard" className="hover:text-green-700">Dashboard</Link>
      <p>Only accessible after entering the admin password.</p>
      <button
        onClick={logout}
        disabled={loading}
        style={{ marginTop: 16, padding: "8px 16px", borderRadius: 8, border: "1px solid #111827", background: "#111827", color: "white" }}
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}
