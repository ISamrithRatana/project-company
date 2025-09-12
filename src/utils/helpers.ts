import { Order } from "@/types/index";

export function generateInitialOrders(): Order[] {
  const orders: Order[] = [];
  for (let i = 0; i < 20; i++) {
    orders.push({
      id: Date.now() + i,
      date: new Date(
        2024,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      ).toISOString(),
      total: Math.floor(Math.random() * 500) + 50,
    });
  }
  return orders;
}

export function computeMonthlyTotals(orders: Order[]) {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i, 1).toLocaleString("default", { month: "short" }),
    revenue: 0,
    orders: 0,
  }));

  orders.forEach((o) => {
    const m = new Date(o.date).getMonth();
    months[m].revenue += o.total;
    months[m].orders += 1;
  });

  return months;
}

export function formatMoney(value: number) {
  return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}
