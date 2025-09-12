import { POSRepository } from "@/modules/pos/pos.repository";
import { MenuItem, Order } from "@/modules/pos/pos.types";

const repo = new POSRepository();

export class POSService {
  async getMenu(): Promise<MenuItem[]> {
    return repo.getMenu();
  }

  async createMenu(menuItems: MenuItem[]) {
    return repo.createMenuItems(menuItems);
  }

  async createOrder(order: Order) {
    return repo.createOrder(order);
  }
}

export const posService = new POSService();
