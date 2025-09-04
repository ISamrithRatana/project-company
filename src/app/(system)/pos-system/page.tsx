"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface OrderItem extends MenuItem {
  count: number;
}

export default function POSPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [order, setOrder] = useState<OrderItem[]>([]);

  // Fetch menu from server
  useEffect(() => {
    const fetchMenu = async () => {
      const res = await fetch("/api/pos-cofe", { cache: "no-store" });
      const data: MenuItem[] = await res.json();
      setMenuItems(data);
    };
    fetchMenu();
  }, []);

  const orderItem = (menu: MenuItem) => {
    setOrder((prev) => {
      const existing = prev.find((o) => o.id === menu.id);
      if (existing) {
        return prev.map((o) =>
          o.id === menu.id ? { ...o, count: o.count + 1 } : o
        );
      }
      return [...prev, { ...menu, count: 1 }];
    });
  };

    const totalAmount = () =>
    order.reduce((total, item) => total + item.price * item.count, 0);

    const removeOrder = () => setOrder([]);

    const payment = async () => {
    if (order.length === 0) return alert("Your order is empty.");

    const total = totalAmount();
    const summary = order.map((o) => `${o.name} x ${o.count}`).join(", ");

    try {
        const res = await fetch("/api/pos-cofe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: order, total }),
        });
        const data = await res.json();

        if (data.success) {
        alert(`Order placed: ${summary}. Total: $${total.toFixed(2)}`);
        setOrder([]); // clear current order
        } else {
        alert(`Error: ${data.error}`);
        }
    } catch (err) {
        alert("Network error: " + (err as Error).message);
    }
    };


  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col items-center">
      <main className="flex w-full gap-1 h-[70vh] p-2 ">
        <div className="order-summary border rounded w-64 relative overflow-auto">
          <h2 className="text-center font-bold mb-2">Order</h2>
          <ul className="p-4">
            {order.map((item, index) => (
              <li key={item.id}>
                {index + 1}. {item.name} {item.count} x ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="absolute bottom-2 right-4 font-bold">
            Total: ${totalAmount().toFixed(2)}
          </p>
        </div>

        <section className="menu flex flex-wrap gap-2 border p-4 rounded flex-1 overflow-auto justify-center">
          {menuItems.map((menu) => (
            <button
              key={menu.id}
              onClick={() => orderItem(menu)}
              className="bg-amber-100 text-gray-800 rounded px-4 py-2 w-52 h-12 hover:bg-yellow-200 transition"
            >
              {menu.name} ${menu.price}
            </button>
          ))}
        </section>
      </main>

      <section className="flex gap-4 mt-4">
        <button
          onClick={removeOrder}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Remove item
        </button>
        <button
          onClick={payment}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          payment
        </button>
      </section>
    </div>
  );
}
