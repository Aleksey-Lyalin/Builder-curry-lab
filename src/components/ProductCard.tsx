import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Perfume } from "@/data/perfumes";

interface ProductCardProps {
  perfume: Perfume;
}

const ProductCard = ({ perfume }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-200">
      <Link to={`/product/${perfume.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 p-6">
          <img
            src={perfume.image}
            alt={`${perfume.brand} ${perfume.name}`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors z-10"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
              {perfume.brand}
            </p>
            <h3 className="text-sm text-gray-700 line-clamp-2">
              {perfume.name}
            </h3>
            <p className="text-xs text-gray-500">
              {perfume.characteristics.productType}
            </p>
          </div>

          <div className="pt-2 space-y-3">
            <p className="text-lg font-bold text-gray-900">
              от {perfume.price.toLocaleString("ru-RU")} ₽
            </p>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button - Outside Link */}
      <div className="px-4 pb-4">
        <Button
          className="w-full bg-sage-600 hover:bg-sage-700 text-white py-2.5 text-sm font-medium"
          onClick={(e) => e.preventDefault()}
        >
          В корзину
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
