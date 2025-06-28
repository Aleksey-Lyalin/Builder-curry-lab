import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  MessageCircle,
  Upload,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { perfumes } from "@/data/perfumes";
import { mockOrders } from "@/data/orders";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: "products", label: "Товары", icon: Package },
    { id: "users", label: "Пользователи", icon: Users },
    { id: "orders", label: "Заказы", icon: ShoppingBag },
    { id: "messages", label: "Сообщения", icon: MessageCircle },
    { id: "reports", label: "Отчеты", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Панель администратора
            </h1>
            <p className="text-gray-600 mt-2">
              Управление магазином и контентом
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                          activeTab === tab.id
                            ? "bg-sage-100 text-sage-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow">
                {activeTab === "products" && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold text-gray-900">
                        Товары
                      </h2>
                      <button className="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        Загрузить CSV
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-2">Артикул</th>
                            <th className="text-left py-3 px-2">Бренд</th>
                            <th className="text-left py-3 px-2">Название</th>
                            <th className="text-left py-3 px-2">Пол</th>
                            <th className="text-left py-3 px-2">Объем</th>
                            <th className="text-left py-3 px-2">Тип</th>
                            <th className="text-left py-3 px-2">Цена</th>
                            <th className="text-left py-3 px-2">Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {perfumes.map((perfume) => (
                            <tr
                              key={perfume.id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-2">{perfume.id}</td>
                              <td className="py-3 px-2">{perfume.brand}</td>
                              <td className="py-3 px-2">{perfume.name}</td>
                              <td className="py-3 px-2">{perfume.gender}</td>
                              <td className="py-3 px-2">
                                {perfume.volumes[0]?.size}
                              </td>
                              <td className="py-3 px-2">
                                {perfume.characteristics.productType}
                              </td>
                              <td className="py-3 px-2">
                                {perfume.price.toLocaleString("ru-RU")} ₽
                              </td>
                              <td className="py-3 px-2">
                                <button className="text-sage-600 hover:text-sage-700 text-sm">
                                  Редактировать
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "users" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Пользователи
                    </h2>
                    <p className="text-gray-500">
                      Управление пользователями системы
                    </p>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Заказы
                    </h2>
                    <div className="space-y-4">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {order.id}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {order.createdAt.toLocaleDateString("ru-RU")}
                              </p>
                            </div>
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-lg font-bold text-gray-900 mt-2">
                            {order.total.toLocaleString("ru-RU")} ₽
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "messages" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Сообщения
                    </h2>
                    <p className="text-gray-500">Переписка с пользователями</p>
                  </div>
                )}

                {activeTab === "reports" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Отчеты и статистика
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-sage-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-sage-800">
                          Всего товаров
                        </h3>
                        <p className="text-3xl font-bold text-sage-600">
                          {perfumes.length}
                        </p>
                      </div>
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-blue-800">
                          Всего заказов
                        </h3>
                        <p className="text-3xl font-bold text-blue-600">
                          {mockOrders.length}
                        </p>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold text-green-800">
                          Выручка
                        </h3>
                        <p className="text-3xl font-bold text-green-600">
                          {mockOrders
                            .reduce((sum, order) => sum + order.total, 0)
                            .toLocaleString("ru-RU")}{" "}
                          ₽
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminPage;
