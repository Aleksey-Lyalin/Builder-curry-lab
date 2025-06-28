export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  favorites: string[]; // perfume IDs
  unreadMessages: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: Date;
  deliveryAddress: string;
}

export interface OrderItem {
  perfumeId: string;
  quantity: number;
  volume: string;
  price: number;
}

export interface Message {
  id: string;
  userId: string;
  adminId?: string;
  content: string;
  isFromAdmin: boolean;
  createdAt: Date;
  isRead: boolean;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
