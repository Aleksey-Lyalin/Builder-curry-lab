import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import {
  Package,
  Heart,
  MessageCircle,
  Settings,
  User,
  Edit2,
  Camera,
  Save,
  X,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { getOrdersByUserId, getMessagesByUserId } from "@/data/orders";
import { perfumes } from "@/data/perfumes";
import ProductCard from "@/components/ProductCard";
import { User as UserType } from "@/types/user";

interface ProfileEditorProps {
  user: UserType;
}

const ProfileEditor = ({ user }: ProfileEditorProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar || "");
  const { updateUser } = useAuth();

  const handleSave = () => {
    updateUser({
      name: editedName,
      avatar: avatar,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setAvatar(user.avatar || "");
    setIsEditing(false);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Информация профиля</h2>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Edit2 className="w-4 h-4" />
            Редактировать
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {avatar ? (
                <img
                  src={avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-sage-200"
                />
              ) : (
                <div className="w-24 h-24 bg-sage-100 rounded-full flex items-center justify-center border-4 border-sage-200">
                  <User className="w-12 h-12 text-sage-600" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-sage-600 text-white p-2 rounded-full cursor-pointer hover:bg-sage-700 transition-colors">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-sm text-gray-500">
              Нажмите на камеру, чтобы изменить фото
            </p>
          </div>

          {/* Name Edit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя
            </label>
            <Input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="max-w-md"
              placeholder="Введите ваше имя"
            />
          </div>

          {/* Non-editable fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <p className="text-gray-500 text-sm">
              {user.phone} (изменение недоступно)
            </p>
          </div>

          {user.email && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">{user.email}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата регистрации
            </label>
            <p className="text-gray-900">
              {new Date(user.createdAt).toLocaleDateString("ru-RU")}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSave}
              className="bg-sage-600 hover:bg-sage-700 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Сохранить
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="w-4 h-4 mr-2" />
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Avatar Display */}
          <div className="flex items-center space-x-4">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-sage-200"
              />
            ) : (
              <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center border-4 border-sage-200">
                <User className="w-10 h-10 text-sage-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.name}
              </h3>
              <p className="text-gray-500">{user.phone}</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Имя
              </label>
              <p className="text-gray-900">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Телефон
              </label>
              <p className="text-gray-900">{user.phone}</p>
            </div>
            {user.email && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <p className="text-gray-900">{user.email}</p>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Дата регистрации
              </label>
              <p className="text-gray-900">
                {new Date(user.createdAt).toLocaleDateString("ru-RU")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AccountPage = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-sage-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const userOrders = getOrdersByUserId(user!.id);
  const userMessages = getMessagesByUserId(user!.id);
  const favoriteProducts = perfumes.filter((perfume) =>
    user!.favorites.includes(perfume.id),
  );

  const tabs = [
    { id: "profile", label: "Профиль", icon: User },
    { id: "orders", label: "Заказы", icon: Package },
    { id: "favorites", label: "Избранное", icon: Heart },
    { id: "messages", label: "Сообщения", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
            <p className="text-gray-600 mt-2">
              Управляйте своим профилем и заказами
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center gap-3 mb-6">
                  {user!.avatar ? (
                    <img
                      src={user!.avatar}
                      alt={user!.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-sage-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {user!.name}
                    </h3>
                    <p className="text-sm text-gray-500">{user!.phone}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <a
                        key={tab.id}
                        href={`/account?tab=${tab.id}`}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? "bg-sage-100 text-sage-700"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                        {tab.id === "favorites" &&
                          user!.favorites.length > 0 && (
                            <span className="ml-auto bg-sage-100 text-sage-700 text-xs px-2 py-0.5 rounded-full">
                              {user!.favorites.length}
                            </span>
                          )}
                        {tab.id === "messages" && user!.unreadMessages > 0 && (
                          <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                            {user!.unreadMessages}
                          </span>
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg shadow">
                {activeTab === "profile" && <ProfileEditor user={user!} />}

                {activeTab === "orders" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Мои заказы
                    </h2>
                    {userOrders.length > 0 ? (
                      <div className="space-y-4">
                        {userOrders.map((order) => (
                          <div
                            key={order.id}
                            className="border border-gray-200 rounded-lg p-4"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  Заказ {order.id}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.createdAt).toLocaleDateString(
                                    "ru-RU",
                                  )}
                                </p>
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  order.status === "delivered"
                                    ? "bg-green-100 text-green-700"
                                    : order.status === "shipped"
                                      ? "bg-blue-100 text-blue-700"
                                      : order.status === "processing"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {order.status === "delivered"
                                  ? "Доставлен"
                                  : order.status === "shipped"
                                    ? "Отправлен"
                                    : order.status === "processing"
                                      ? "Обрабатывается"
                                      : "В ожидании"}
                              </span>
                            </div>

                            <div className="flex gap-4 mb-4">
                              {order.items.map((item) => {
                                const perfume = perfumes.find(
                                  (p) => p.id === item.perfumeId,
                                );
                                return (
                                  <div
                                    key={item.perfumeId}
                                    className="flex items-center gap-3"
                                  >
                                    <img
                                      src={perfume?.image}
                                      alt={perfume?.name}
                                      className="w-12 h-12 object-cover rounded"
                                    />
                                    <div>
                                      <p className="text-sm font-medium">
                                        {perfume?.brand} {perfume?.name}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {item.volume} × {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-600">
                                Адрес доставки: {order.deliveryAddress}
                              </p>
                              <p className="text-lg font-bold text-gray-900">
                                {order.total.toLocaleString("ru-RU")} ₽
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          У вас пока нет заказов
                        </h3>
                        <p className="text-gray-500">
                          Начните покупки в нашем каталоге
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "favorites" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Избранное
                    </h2>
                    {favoriteProducts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteProducts.map((perfume) => (
                          <ProductCard key={perfume.id} perfume={perfume} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Нет избранных товаров
                        </h3>
                        <p className="text-gray-500">
                          Добавляйте товары в избранное для быстрого доступа
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "messages" && (
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Сообщения
                    </h2>
                    <div className="space-y-4">
                      {userMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`p-4 rounded-lg ${
                            message.isFromAdmin
                              ? "bg-gray-50 ml-8"
                              : "bg-sage-50 mr-8"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-sm font-medium">
                              {message.isFromAdmin ? "Администратор" : "Вы"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(message.createdAt).toLocaleString(
                                "ru-RU",
                              )}
                            </span>
                          </div>
                          <p className="text-gray-700">{message.content}</p>
                        </div>
                      ))}
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

export default AccountPage;
