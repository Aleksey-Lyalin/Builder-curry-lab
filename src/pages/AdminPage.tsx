import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  MessageCircle,
  Upload,
  Plus,
  Edit2,
  Save,
  X,
  Camera,
  Check,
  Settings,
  Palette,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { perfumes } from "@/data/perfumes";
import { mockOrders } from "@/data/orders";

interface ProductTableRow {
  id: string;
  article: string;
  brand: string;
  name: string;
  fullName: string;
  gender: string;
  volume: string;
  type: string;
  productType: string;
  price: number;
  letualPrice: number;
  rendewooPrice: number;
  image: string;
}

const ProductsTable = () => {
  const [products, setProducts] = useState<ProductTableRow[]>(
    perfumes.map((p) => ({
      id: p.id,
      article: `ART-${p.id}`,
      brand: p.brand,
      name: p.name,
      fullName: `${p.brand} ${p.name}`,
      gender: p.gender,
      volume: p.volumes[0]?.size || "50ml",
      type: p.characteristics.fragranceGroup,
      productType: p.characteristics.productType,
      price: p.price,
      letualPrice: Math.round(p.price * 1.1),
      rendewooPrice: Math.round(p.price * 1.15),
      image: p.image,
    })),
  );

  const [editingCell, setEditingCell] = useState<{
    row: number;
    field: keyof ProductTableRow;
  } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<ProductTableRow>>({});

  const startEdit = (
    rowIndex: number,
    field: keyof ProductTableRow,
    currentValue: string | number,
  ) => {
    setEditingCell({ row: rowIndex, field });
    setEditValue(currentValue.toString());
  };

  const saveEdit = () => {
    if (editingCell) {
      const newProducts = [...products];
      const { row, field } = editingCell;

      if (
        field === "price" ||
        field === "letualPrice" ||
        field === "rendewooPrice"
      ) {
        newProducts[row][field] = parseFloat(editValue) || 0;
      } else {
        (newProducts[row] as any)[field] = editValue;
      }

      setProducts(newProducts);
      setEditingCell(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditValue("");
  };

  const addNewProduct = () => {
    const newId = Date.now().toString();
    const product: ProductTableRow = {
      id: newId,
      article: newProduct.article || `ART-${newId}`,
      brand: newProduct.brand || "",
      name: newProduct.name || "",
      fullName: newProduct.fullName || "",
      gender: newProduct.gender || "унисекс",
      volume: newProduct.volume || "50ml",
      type: newProduct.type || "цветочные",
      productType: newProduct.productType || "туалетная вода",
      price: newProduct.price || 0,
      letualPrice: newProduct.letualPrice || 0,
      rendewooPrice: newProduct.rendewooPrice || 0,
      image: newProduct.image || "",
    };

    setProducts([...products, product]);
    setIsAddingNew(false);
    setNewProduct({});
  };

  const handleImageUpload = (rowIndex: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const newProducts = [...products];
      newProducts[rowIndex].image = e.target?.result as string;
      setProducts(newProducts);
    };
    reader.readAsDataURL(file);
  };

  const EditableCell = ({
    value,
    rowIndex,
    field,
    type = "text",
  }: {
    value: string | number;
    rowIndex: number;
    field: keyof ProductTableRow;
    type?: string;
  }) => {
    const isEditing =
      editingCell?.row === rowIndex && editingCell?.field === field;

    return (
      <div className="group relative">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 text-sm"
              type={type}
              onKeyPress={(e) => {
                if (e.key === "Enter") saveEdit();
                if (e.key === "Escape") cancelEdit();
              }}
              autoFocus
            />
            <Button size="sm" onClick={saveEdit} className="h-8 w-8 p-0">
              <Check className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={cancelEdit}
              className="h-8 w-8 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="truncate">{value}</span>
            <Button
              size="sm"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
              onClick={() => startEdit(rowIndex, field, value)}
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>
    );
  };

  const ImageCell = ({ src, rowIndex }: { src: string; rowIndex: number }) => (
    <div className="flex items-center gap-2">
      <img
        src={src}
        alt="Product"
        className="w-10 h-10 object-cover rounded border"
      />
      <label className="cursor-pointer p-1 hover:bg-gray-100 rounded">
        <Camera className="w-4 h-4" />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(rowIndex, file);
          }}
        />
      </label>
    </div>
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Товары</h2>
        <div className="flex gap-3">
          <Button
            onClick={() => setIsAddingNew(true)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Добавить товар
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Загрузить CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-3 font-semibold">Изображение</th>
              <th className="text-left py-3 px-3 font-semibold">Артикул</th>
              <th className="text-left py-3 px-3 font-semibold">Бренд</th>
              <th className="text-left py-3 px-3 font-semibold">Название</th>
              <th className="text-left py-3 px-3 font-semibold">
                Полное название
              </th>
              <th className="text-left py-3 px-3 font-semibold">Пол</th>
              <th className="text-left py-3 px-3 font-semibold">��бъем</th>
              <th className="text-left py-3 px-3 font-semibold">Тип</th>
              <th className="text-left py-3 px-3 font-semibold">
                Тип продукта
              </th>
              <th className="text-left py-3 px-3 font-semibold">Цена</th>
              <th className="text-left py-3 px-3 font-semibold">Letual цена</th>
              <th className="text-left py-3 px-3 font-semibold">
                Rendewoo цена
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-3">
                  <ImageCell src={product.image} rowIndex={index} />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.article}
                    rowIndex={index}
                    field="article"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.brand}
                    rowIndex={index}
                    field="brand"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.name}
                    rowIndex={index}
                    field="name"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.fullName}
                    rowIndex={index}
                    field="fullName"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.gender}
                    rowIndex={index}
                    field="gender"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.volume}
                    rowIndex={index}
                    field="volume"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.type}
                    rowIndex={index}
                    field="type"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={product.productType}
                    rowIndex={index}
                    field="productType"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={`${product.price} ₽`}
                    rowIndex={index}
                    field="price"
                    type="number"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={`${product.letualPrice} ₽`}
                    rowIndex={index}
                    field="letualPrice"
                    type="number"
                  />
                </td>
                <td className="py-3 px-3">
                  <EditableCell
                    value={`${product.rendewooPrice} ₽`}
                    rowIndex={index}
                    field="rendewooPrice"
                    type="number"
                  />
                </td>
              </tr>
            ))}

            {/* Add New Product Row */}
            {isAddingNew && (
              <tr className="border-b border-gray-100 bg-green-50">
                <td className="py-3 px-3">
                  <label className="cursor-pointer p-2 border-2 border-dashed border-green-300 rounded flex items-center justify-center">
                    <Camera className="w-6 h-6 text-green-600" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (e) => {
                            setNewProduct((prev) => ({
                              ...prev,
                              image: e.target?.result as string,
                            }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Артикул"
                    value={newProduct.article || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        article: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Бренд"
                    value={newProduct.brand || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        brand: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Название"
                    value={newProduct.name || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Полное название"
                    value={newProduct.fullName || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Select
                    onValueChange={(value) =>
                      setNewProduct((prev) => ({ ...prev, gender: value }))
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Пол" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="мужской">Мужской</SelectItem>
                      <SelectItem value="женский">Женский</SelectItem>
                      <SelectItem value="унисекс">Унисекс</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Объем"
                    value={newProduct.volume || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        volume: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Тип"
                    value={newProduct.type || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        type: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    placeholder="Тип продук��а"
                    value={newProduct.productType || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        productType: e.target.value,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    type="number"
                    placeholder="Цена"
                    value={newProduct.price || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        price: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <Input
                    type="number"
                    placeholder="Letual цена"
                    value={newProduct.letualPrice || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        letualPrice: parseFloat(e.target.value) || 0,
                      }))
                    }
                    className="h-8"
                  />
                </td>
                <td className="py-3 px-3">
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Rendewoo цена"
                      value={newProduct.rendewooPrice || ""}
                      onChange={(e) =>
                        setNewProduct((prev) => ({
                          ...prev,
                          rendewooPrice: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="h-8"
                    />
                    <Button size="sm" onClick={addNewProduct} className="h-8">
                      <Save className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsAddingNew(false);
                        setNewProduct({});
                      }}
                      className="h-8"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};


              {presetColors.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handlePresetSelect(preset)}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">
                    {preset.name}
                  <input
                    type="color"
                    value={rgbToHex(customColors.primaryText)}
                    onChange={(e) =>
                      handleColorChange("primaryText", hexToRgb(e.target.value))
                    }
                    className="w-6 h-6 rounded border"
                    style={{ backgroundColor: colors.primary }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
    { id: "products", label: "Тов��ры", icon: Package },
    { id: "users", label: "Пол��зов��тели", icon: Users },
    { id: "orders", label: "Заказы", icon: ShoppingBag },
    { id: "messages", label: "С��общения", icon: MessageCircle },
    { id: "reports", label: "Отчеты", icon: BarChart3 },
    { id: "interface", label: "Настройки интерфейса", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              ��анель администратора
            </h1>
            <p className="text-gray-600 mt-2">
              Управление м��газином и контентом
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
                {activeTab === "products" && <ProductsTable />}

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
                                {new Date(order.createdAt).toLocaleDateString(
                                  "ru-RU",
                                )}
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
                      От��еты и статистика
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

                {activeTab === "interface" && (
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Palette className="w-6 h-6 text-sage-600" />
                      <h2 className="text-xl font-bold text-gray-900">Настройки интерфейса</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Цвета кнопок</h3>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              HEX код цвета (например: 8E929B)
                            </label>
                            <div className="flex gap-2">
                              <span className="text-gray-500">#</span>
                              <input
                                type="text"
                                placeholder="8E929B"
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                onChange={(e) => {
                                  const hex = e.target.value.replace('#', '');
                                  if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
                                    const r = parseInt(hex.slice(0, 2), 16);
                                    const g = parseInt(hex.slice(2, 4), 16);
                                    const b = parseInt(hex.slice(4, 6), 16);
                                    const root = document.documentElement;
                                    root.style.setProperty('--primary-button-bg', `rgb(${r}, ${g}, ${b})`);
                                  }
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Палитра цветов
                            </label>
                            <div className="grid grid-cols-8 gap-2">
                              {["#5C6F5C", "#8E929B", "#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"].map((color, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    const r = parseInt(color.slice(1, 3), 16);
                                    const g = parseInt(color.slice(3, 5), 16);
                                    const b = parseInt(color.slice(5, 7), 16);
                                    const root = document.documentElement;
                                    root.style.setProperty('--primary-button-bg', `rgb(${r}, ${g}, ${b})`);
                                  }}
                                  className="w-8 h-8 rounded border-2 border-gray-200 hover:border-gray-400"
                                  style={{ backgroundColor: color }}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Предварительный просмотр</h3>
                        <div className="space-y-4">
                          <button className="px-6 py-3 rounded-lg font-medium bg-sage-600 text-white">
                            Пример кнопки
                          </button>
                          <div className="text-sm text-gray-600">
                            <p>• Введите HEX код без # (например: 8E929B)</p>
                            <p>• Или выберите цвет из палитры</p>
                            <p>• Изменения применяются сразу</p>
                          </div>
                        </div>
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