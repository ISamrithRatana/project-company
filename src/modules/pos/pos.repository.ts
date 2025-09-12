import { prisma } from "@/lib/prisma";
import { MenuItem, Order } from "@/modules/pos/pos.types";

export class POSRepository {
  async getMenu(): Promise<MenuItem[]> {
    return prisma.menu.findMany();
  }

  async createMenuItems(menuItems: MenuItem[]) {
    const createdMenu = [];
    for (const item of menuItems) {
      const menuItem = await prisma.menu.upsert({
        where: { name: item.name },
        update: {},
        create: { name: item.name, price: item.price },
      });
      createdMenu.push(menuItem);
    }
    return createdMenu;
  }

  async createOrder(order: Order) {
    const newOrder = await prisma.order.create({
      data: {
        total: order.total,
        items: {
          create: order.items.map((item) => ({
            menuId: item.menuId,
            name: item.name,
            price: item.price,
            count: item.count,
          })),
        },
      },
      include: { items: true },
    });
    return newOrder;
  }
}
