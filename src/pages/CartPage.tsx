import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import QuantitySelector from "@/components/QuantitySelector";

const CartPage = () => {
  const {
    items,
    totalItems,
    totalAmount,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />

        <main className="flex-1 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ваша корзина пуста
              </h2>
              <p className="text-gray-600 mb-8">
                Добавьте товары из каталога, чтобы сделать заказ
              </p>
              <Link to="/">
                <Button className="bg-sage-600 hover:bg-sage-700">
                  Перейти в каталог
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link to="/">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад к покупкам
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Корзина</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                {/* Cart Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Товары в корзине ({totalItems})
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Очистить корзину
                    </Button>
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={`${item.brand} ${item.name}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                                {item.brand}
                              </h3>
                              <p className="text-gray-700 mt-1">{item.name}</p>
                              <p className="text-gray-500 text-sm mt-1">
                                Объем: {item.volume}
                              </p>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.perfumeId)}
                              className="text-gray-400 hover:text-red-500 ml-4"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          {/* Quantity and Price */}
                          <div className="flex items-center justify-between mt-4">
                            <QuantitySelector
                              quantity={item.quantity}
                              onIncrease={() =>
                                updateQuantity(
                                  item.perfumeId,
                                  item.quantity + 1,
                                )
                              }
                              onDecrease={() =>
                                updateQuantity(
                                  item.perfumeId,
                                  item.quantity - 1,
                                )
                              }
                              size="sm"
                            />

                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">
                                {(item.price * item.quantity).toLocaleString(
                                  "ru-RU",
                                )}{" "}
                                ₽
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-gray-500">
                                  {item.price.toLocaleString("ru-RU")} ₽ за шт.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ваш заказ
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Товары ({totalItems})</span>
                    <span>{totalAmount.toLocaleString("ru-RU")} ₽</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Итого</span>
                      <span>{totalAmount.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 text-lg font-semibold mb-4">
                  Оформить заказ
                </Button>

                <div className="text-xs text-gray-500 space-y-2">
                  <p>✓ Бесплатная доставка от 3000 ₽</p>
                  <p>✓ Возврат в течение 14 дней</p>
                  <p>✓ Гарантия подлинности</p>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-sage-50 rounded-lg p-4 mt-4">
                <h4 className="font-semibold text-sage-800 mb-2">
                  Информация о доставке
                </h4>
                <div className="text-sm text-sage-700 space-y-1">
                  <p>• По Москве: 1-2 дня</p>
                  <p>• По России: 3-7 дней</p>
                  <p>• Самовывоз: сегодня</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
