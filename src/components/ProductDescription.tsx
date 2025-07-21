import { Perfume } from "@/data/perfumes";

interface ProductDescriptionProps {
  perfume: Perfume;
}

const ProductDescription = ({ perfume }: ProductDescriptionProps) => {
  return (
    <div className="space-y-8">
      {/* Description */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {perfume.description}
        </p>
      </div>

      {/* Characteristics */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Характеристики
        </h2>

        {/* Fragrance Notes - Elegant Timeline Design */}
        <div className="relative mb-8">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {/* Top Notes */}
          <div className="relative flex items-start mb-8">
            <div className="flex-shrink-0 relative z-10">
              <div className="w-12 h-12 bg-green-500 flex items-center justify-center text-white font-bold text-lg">
                1
              </div>
            </div>
            <div className="ml-8 flex-grow bg-gray-50 p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Верхние ноты
                </h3>
                <div className="text-xs text-gray-600 bg-white px-3 py-1 border font-medium">
                  ПЕРВЫЕ 15 МИНУТ
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Первое впечатление от аромата, самые летучие компоненты
              </p>
              <div className="flex flex-wrap gap-2">
                {perfume.characteristics.topNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-white border border-green-200 text-green-800 px-3 py-1 text-sm hover:bg-green-50 transition-colors"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Heart Notes */}
          <div className="relative flex items-start mb-8">
            <div className="flex-shrink-0 relative z-10">
              <div className="w-12 h-12 bg-rose-500 flex items-center justify-center text-white font-bold text-lg">
                2
              </div>
            </div>
            <div className="ml-8 flex-grow bg-gray-50 p-6 border-l-4 border-rose-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Ноты сердца
                </h3>
                <div className="text-xs text-gray-600 bg-white px-3 py-1 border font-medium">
                  15-30 МИНУТ
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Основа аромата, его характер и индивидуальность
              </p>
              <div className="flex flex-wrap gap-2">
                {perfume.characteristics.heartNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-white border border-rose-200 text-rose-800 px-3 py-1 text-sm hover:bg-rose-50 transition-colors"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Base Notes */}
          <div className="relative flex items-start">
            <div className="flex-shrink-0 relative z-10">
              <div className="w-12 h-12 bg-amber-600 flex items-center justify-center text-white font-bold text-lg">
                3
              </div>
            </div>
            <div className="ml-8 flex-grow bg-gray-50 p-6 border-l-4 border-amber-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Базовые ноты
                </h3>
                <div className="text-xs text-gray-600 bg-white px-3 py-1 border font-medium">
                  2-8 ЧАСОВ
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Завершающий аккорд, создающий стойкость и глубину аромата
              </p>
              <div className="flex flex-wrap gap-2">
                {perfume.characteristics.baseNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-white border border-amber-200 text-amber-800 px-3 py-1 text-sm hover:bg-amber-50 transition-colors"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Тип продукта:</span>
                <span className="text-gray-900">
                  {perfume.characteristics.productType}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">
                  Группа ароматов:
                </span>
                <span className="text-gray-900">
                  {perfume.characteristics.fragranceGroup}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Пол:</span>
                <span className="text-gray-900">
                  {perfume.characteristics.gender}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Концентрация:</span>
                <span className="text-gray-900">
                  {perfume.characteristics.concentration}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Стойкость:</span>
                <span className="text-gray-900">
                  {perfume.characteristics.longevity}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Шлейф:</span>
                <span className="text-gray-900">
                  {perfume.characteristics.sillage}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium text-gray-600">Рейтинг:</span>
                <span className="text-gray-900">
                  {perfume.rating}/5 ({perfume.reviewCount} отзывов)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
