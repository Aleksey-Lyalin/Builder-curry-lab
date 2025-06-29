import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Shield,
  MapPin,
  User,
  Phone,
  Mail,
  Check,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";

const CheckoutPage = () => {
  const { items, totalAmount, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    comment: "",
  });

  // Redirect if cart is empty
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const deliveryPrice =
    deliveryMethod === "pickup" ? 0 : totalAmount >= 3000 ? 0 : 300;
  const finalTotal = totalAmount + deliveryPrice;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be payment processing logic
    alert("Заказ успешно оформлен! Спасибо за покупку!");
    clearCart();
    // In real app, redirect to success page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад в корзину
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Оформление заказа
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Forms */}
              <div className="lg:col-span-2 space-y-6">
                {/* Contact Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-sage-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Контактная информация
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Имя *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Введите имя"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Фамилия *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Введите фамилию"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+7 (999) 123-45-67"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="example@mail.ru"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-sage-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Способ доставки
                    </h2>
                  </div>

                  <RadioGroup
                    value={deliveryMethod}
                    onValueChange={setDeliveryMethod}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="delivery" id="delivery" />
                        <Label
                          htmlFor="delivery"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Доставка курьером</p>
                              <p className="text-sm text-gray-500">
                                1-2 дня по Москве, 3-7 дней по России
                              </p>
                            </div>
                            <span className="font-semibold text-sage-600">
                              {totalAmount >= 3000 ? "Бесплатно" : "300 ₽"}
                            </span>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label
                          htmlFor="pickup"
                          className="flex-1 cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Самовывоз</p>
                              <p className="text-sm text-gray-500">
                                м. Арбатская, ул. Арбат, 123
                              </p>
                            </div>
                            <span className="font-semibold text-green-600">
                              Бесплатно
                            </span>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {deliveryMethod === "delivery" && (
                    <div className="mt-6 space-y-4">
                      <h3 className="font-medium text-gray-900">
                        Адрес доставки
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label htmlFor="address">Адрес *</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) =>
                              handleInputChange("address", e.target.value)
                            }
                            placeholder="Улица, дом, квартира"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="city">Город *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="Москва"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Индекс</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) =>
                              handleInputChange("postalCode", e.target.value)
                            }
                            placeholder="123456"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-sage-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      Способ оплаты
                    </h2>
                  </div>

                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                  >
                    <div className="space-y-4">
                      {/* Card Payment */}
                      <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-5 h-5 text-blue-600" />
                              <div>
                                <p className="font-medium">Банковская карта</p>
                                <p className="text-sm text-gray-500">
                                  Visa, MasterCard, МИР
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                VISA
                              </div>
                              <div className="w-8 h-6 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                MC
                              </div>
                              <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                                МИР
                              </div>
                            </div>
                          </div>
                        </Label>
                      </div>

                      {/* SBP Payment */}
                      <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="sbp" id="sbp" />
                        <Label htmlFor="sbp" className="flex-1 cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Smartphone className="w-5 h-5 text-orange-600" />
                              <div>
                                <p className="font-medium">
                                  Система быстрых платежей (СБП)
                                </p>
                                <p className="text-sm text-gray-500">
                                  Оплата через мобильное приложение банка
                                </p>
                              </div>
                            </div>
                            <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-medium">
                              Комиссия 0%
                            </div>
                          </div>
                        </Label>
                      </div>

                      {/* Cash on Delivery (only for delivery) */}
                      {deliveryMethod === "delivery" && (
                        <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label
                            htmlFor="cash"
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xs">₽</span>
                              </div>
                              <div>
                                <p className="font-medium">
                                  Наличными при получении
                                </p>
                                <p className="text-sm text-gray-500">
                                  Оплата курьеру наличными
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </div>

                {/* Additional Information */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Комментарий к заказу
                  </h3>
                  <Textarea
                    value={formData.comment}
                    onChange={(e) =>
                      handleInputChange("comment", e.target.value)
                    }
                    placeholder="Особые пожелания к заказу..."
                    rows={3}
                  />
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Ваш заказ
                  </h3>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {item.brand} {item.name}
                          </p>
                          <p className="text-xs text-gray-500">{item.volume}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              ×{item.quantity}
                            </span>
                            <span className="text-sm font-medium">
                              {(item.price * item.quantity).toLocaleString(
                                "ru-RU",
                              )}{" "}
                              ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Товары</span>
                      <span>{totalAmount.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Доставка</span>
                      <span
                        className={deliveryPrice === 0 ? "text-green-600" : ""}
                      >
                        {deliveryPrice === 0
                          ? "Бесплатно"
                          : `${deliveryPrice} ₽`}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Итого</span>
                        <span>{finalTotal.toLocaleString("ru-RU")} ₽</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 text-lg font-semibold mb-4"
                  >
                    {paymentMethod === "sbp"
                      ? "Оплатить через СБП"
                      : paymentMethod === "cash"
                        ? "Оформить заказ"
                        : "Перейти к оплате"}
                  </Button>

                  {/* Security Info */}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>Безопасная оплата с защитой SSL</span>
                  </div>

                  {/* Benefits */}
                  <div className="mt-4 text-xs text-gray-500 space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Гарантия подлинности товара</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Возврат в течение 14 дней</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 text-green-500" />
                      <span>Быстрая доставка</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
