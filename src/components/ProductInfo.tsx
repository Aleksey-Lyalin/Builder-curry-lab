import { useState } from "react";
import { Heart, Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Perfume } from "@/data/perfumes";

interface ProductInfoProps {
  perfume: Perfume;
}

const ProductInfo = ({ perfume }: ProductInfoProps) => {
  const [selectedVolume, setSelectedVolume] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedVolumeData = perfume.volumes[selectedVolume];

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="space-y-6">
      {/* Brand & Name */}
      <div>
        <p className="text-lg font-bold text-gray-900 uppercase tracking-wide">
          {perfume.brand}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mt-1">
          {perfume.name}
        </h1>
        <p className="text-gray-600 mt-1">
          {perfume.characteristics.productType}
        </p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.round(perfume.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-gray-600">
          {perfume.rating} ({perfume.reviewCount} отзывов)
        </span>
      </div>

      {/* Price */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="text-3xl font-bold text-gray-900">
          {selectedVolumeData.price.toLocaleString("ru-RU")} ₽
        </div>
        <p className="text-sm text-gray-600 mt-1">
          за {selectedVolumeData.size}
        </p>
      </div>

      {/* Volume Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Объем:</h3>
        <div className="grid grid-cols-3 gap-3">
          {perfume.volumes.map((volume, index) => (
            <button
              key={index}
              onClick={() => setSelectedVolume(index)}
              className={`p-3 border-2 rounded-lg text-center transition-all ${
                selectedVolume === index
                  ? "border-sage-500 bg-sage-50 text-sage-700"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="font-semibold">{volume.size}</div>
              <div className="text-sm text-gray-600">
                {volume.price.toLocaleString("ru-RU")} ₽
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">Количество:</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-xl font-semibold min-w-[3rem] text-center">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= 99}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-sage-600 hover:bg-sage-700 text-white py-3 text-lg font-semibold"
            size="lg"
          >
            Добавить в корзину
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="p-3 h-auto"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={`w-6 h-6 ${
                isFavorite ? "text-red-500 fill-current" : "text-gray-400"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Total Price */}
      <div className="bg-sage-50 p-4 rounded-lg border border-sage-200">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">Итого:</span>
          <span className="text-2xl font-bold text-sage-700">
            {(selectedVolumeData.price * quantity).toLocaleString("ru-RU")} ₽
          </span>
        </div>
        {quantity > 1 && (
          <p className="text-sm text-gray-600 mt-1">
            {selectedVolumeData.price.toLocaleString("ru-RU")} ₽ × {quantity}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
