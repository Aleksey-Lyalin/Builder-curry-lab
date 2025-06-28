import { Order, Message } from "@/types/user";

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    items: [
      {
        perfumeId: "1",
        quantity: 1,
        volume: "100ml",
        price: 5500,
      },
      {
        perfumeId: "2",
        quantity: 1,
        volume: "50ml",
        price: 8900,
      },
    ],
    status: "delivered",
    total: 14400,
    createdAt: new Date("2024-01-20"),
    deliveryAddress: "Москва, ул. Арбат, 123, кв. 45",
  },
  {
    id: "ORD-002",
    userId: "1",
    items: [
      {
        perfumeId: "3",
        quantity: 2,
        volume: "100ml",
        price: 7200,
      },
    ],
    status: "shipped",
    total: 14400,
    createdAt: new Date("2024-01-25"),
    deliveryAddress: "Москва, ул. Арбат, 123, кв. 45",
  },
  {
    id: "ORD-003",
    userId: "1",
    items: [
      {
        perfumeId: "4",
        quantity: 1,
        volume: "50ml",
        price: 12000,
      },
    ],
    status: "processing",
    total: 12000,
    createdAt: new Date("2024-01-28"),
    deliveryAddress: "Москва, ул. Арбат, 123, кв. 45",
  },
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    userId: "1",
    adminId: "2",
    content: "Здравствуйте! Хотел бы узнать о сроках доставки заказа ORD-003.",
    isFromAdmin: false,
    createdAt: new Date("2024-01-28T10:00:00"),
    isRead: true,
  },
  {
    id: "msg-2",
    userId: "1",
    adminId: "2",
    content:
      "Здравствуйте! Ваш заказ будет доставлен в течение 3-5 рабочих дней. Мы отправим уведомление с трек-номером.",
    isFromAdmin: true,
    createdAt: new Date("2024-01-28T10:30:00"),
    isRead: true,
  },
  {
    id: "msg-3",
    userId: "1",
    adminId: "2",
    content:
      "Спасибо за информацию! Еще вопрос - можно ли заказать подарочную упаковку?",
    isFromAdmin: false,
    createdAt: new Date("2024-01-28T11:00:00"),
    isRead: false,
  },
  {
    id: "msg-4",
    userId: "1",
    adminId: "2",
    content:
      "Конечно! Подарочная упаковка доступна при оформлении заказа или вы можете написать нам после оформления.",
    isFromAdmin: true,
    createdAt: new Date("2024-01-28T11:15:00"),
    isRead: false,
  },
];

export const getOrdersByUserId = (userId: string): Order[] => {
  return mockOrders.filter((order) => order.userId === userId);
};

export const getMessagesByUserId = (userId: string): Message[] => {
  return mockMessages.filter((message) => message.userId === userId);
};
