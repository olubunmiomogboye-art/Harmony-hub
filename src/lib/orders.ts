import fs from "fs";
import path from "path";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  color?: string;
  variant?: string;
}

export interface OrderCustomer {
  fullName: string;
  phone: string;
  email?: string;
  fulfillmentMethod: "delivery" | "collection";
  deliveryAddress?: string;
  cityArea: string;
  deliveryInstructions?: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderReference: string;
  items: OrderItem[];
  customer: OrderCustomer;
  subtotal: number;
  deliveryFee: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
}

const ORDERS_PATH = path.join(process.cwd(), "src/data/orders.json");

export function readLocalOrders(): Order[] {
  try {
    if (!fs.existsSync(ORDERS_PATH)) {
      return [];
    }
    const data = fs.readFileSync(ORDERS_PATH, "utf-8");
    return JSON.parse(data) as Order[];
  } catch (err) {
    console.error("Error reading orders:", err);
    return [];
  }
}

export function writeLocalOrders(orders: Order[]): boolean {
  try {
    fs.writeFileSync(ORDERS_PATH, JSON.stringify(orders, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("Error writing orders:", err);
    return false;
  }
}

export function saveOrder(orderData: Omit<Order, "id" | "status" | "createdAt">): Order {
  const orders = readLocalOrders();
  const newOrder: Order = {
    id: `ord_${Date.now()}`,
    ...orderData,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  orders.unshift(newOrder); // newest first
  writeLocalOrders(orders);
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: Order["status"]): Order | null {
  const orders = readLocalOrders();
  const order = orders.find((o) => o.id === orderId || o.orderReference === orderId);
  if (!order) return null;

  order.status = status;
  writeLocalOrders(orders);
  return order;
}

export function getOrderStats() {
  const orders = readLocalOrders();
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.subtotal || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const completedOrders = orders.filter((o) => o.status === "completed").length;

  return {
    totalOrders,
    totalRevenue,
    pendingOrders,
    completedOrders,
  };
}
