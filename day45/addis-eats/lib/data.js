import fs from "fs";
import path from "path";

const STORE_PATH = path.join(process.cwd(), ".addis-store.json");

const INITIAL_DISHES = [
  {
    id: "1",
    name: "Special Kitfo",
    description: "Finely minced lean beef seasoned with mitmita and niter kibbeh, served with ayib and gomen.",
    price: 650,
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Doro Wat",
    description: "Slow-simmered spicy chicken stew in rich berbere sauce with a hard-boiled egg and fresh injera.",
    price: 580,
    category: "Stews",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Beyaynetu Platter",
    description: "Colorful vegan combination of misir wat, kik alicha, shiro, cabbage, and beet salad on injera.",
    price: 420,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Shekla Tibs",
    description: "Sizzling cubed prime beef sauteed with rosemary, garlic, onions, and fresh green chili peppers.",
    price: 620,
    category: "Grilled",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Tegabino Shiro",
    description: "Savory spiced chickpea flour stew served bubbling hot in a traditional clay pot with injera.",
    price: 350,
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    name: "Awaze Tibs",
    description: "Tender beef strips glazed in fiery awaze paste, tomatoes, and red onions.",
    price: 590,
    category: "Grilled",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&auto=format&fit=crop&q=80",
  },
];

export const USERS = [
  {
    id: "usr_31",
    name: "Almaz",
    phone: "0911000001",
    password: "password123",
    role: "customer",
  },
  {
    id: "usr_32",
    name: "Dawit",
    phone: "0911000002",
    password: "password123",
    role: "customer",
  },
  {
    id: "usr_10",
    name: "Staff Member",
    phone: "0911999999",
    password: "staffpassword",
    role: "staff",
  },
];

function readStore() {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, "utf-8"));
    }
  } catch {
    // Fallback if read fails
  }
  const initialStore = {
    dishes: INITIAL_DISHES,
    orders: [
      {
        id: "ord_1001",
        userId: "usr_31",
        customerName: "Almaz",
        items: [{ id: "1", name: "Special Kitfo", price: 650, quantity: 1 }],
        total: 650,
        status: "Preparing",
        createdAt: new Date().toISOString(),
      },
      {
        id: "ord_1002",
        userId: "usr_32",
        customerName: "Dawit",
        items: [{ id: "2", name: "Doro Wat", price: 580, quantity: 1 }],
        total: 580,
        status: "Received",
        createdAt: new Date().toISOString(),
      },
    ],
  };
  writeStore(initialStore);
  return initialStore;
}

function writeStore(data) {
  try {
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Ignore write errors in read-only environments
  }
}

export async function getDishes() {
  // Uses external API_URL with revalidate: 300 if pointing to an external backend
  if (
    process.env.API_URL &&
    !process.env.API_URL.includes("localhost:3000")
  ) {
    const response = await fetch(`${process.env.API_URL}/dishes`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch dishes");
    }
    return response.json();
  }

  return readStore().dishes;
}

export async function getDish(id) {
  if (
    process.env.API_URL &&
    !process.env.API_URL.includes("localhost:3000")
  ) {
    const response = await fetch(`${process.env.API_URL}/dishes/${id}`, {
      next: { revalidate: 300 },
    });
    if (!response.ok) return null;
    return response.json();
  }

  const dishes = readStore().dishes;
  return dishes.find((d) => d.id === String(id)) || null;
}

export async function queryDishes({ q = "", page = 1, limit = 3 } = {}) {
  const allDishes = await getDishes();
  const normalizedQuery = q.trim().toLowerCase();

  const filtered = normalizedQuery
    ? allDishes.filter(
        (d) =>
          d.name.toLowerCase().includes(normalizedQuery) ||
          d.description.toLowerCase().includes(normalizedQuery) ||
          d.category.toLowerCase().includes(normalizedQuery)
      )
    : allDishes;

  const pageNum = Math.max(1, Number(page) || 1);
  const start = (pageNum - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return {
    dishes: paginated,
    total: filtered.length,
    page: pageNum,
    totalPages: Math.max(1, Math.ceil(filtered.length / limit)),
  };
}

export function authenticateUser(phone, password) {
  return (
    USERS.find((u) => u.phone === phone && u.password === password) || null
  );
}

export async function getOrdersFor(userId) {
  const store = readStore();
  return store.orders.filter((order) => order.userId === userId);
}

export async function getAllOrders() {
  const store = readStore();
  return store.orders;
}

export async function getOrder(orderId) {
  const store = readStore();
  return store.orders.find((order) => order.id === orderId) || null;
}

export async function createOrder({ userId, customerName, items }) {
  const store = readStore();
  const total = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity || 1),
    0
  );
  const newOrder = {
    id: `ord_${Date.now().toString().slice(-5)}`,
    userId,
    customerName,
    items,
    total,
    status: "Received",
    createdAt: new Date().toISOString(),
  };
  store.orders.unshift(newOrder);
  writeStore(store);
  return newOrder;
}

export async function markCancelled(orderId) {
  const store = readStore();
  const order = store.orders.find((o) => o.id === orderId);
  if (order) {
    order.status = "Cancelled";
    writeStore(store);
  }
  return order;
}

export async function updateOrderStatusInStore(orderId, status) {
  const store = readStore();
  const order = store.orders.find((o) => o.id === orderId);
  if (order) {
    order.status = status;
    writeStore(store);
  }
  return order;
}