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

        {/* Fragrance Notes - Alternative Timeline Design */}
        <div className="bg-white border-2 border-gray-200 mb-8">
          {/* Top Notes */}
          <div className="relative border-b-2 border-gray-200">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500"></div>
            <div className="pl-8 pr-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-green-500 mr-3"></div>
                <h3 className="font-bold text-xl text-gray-900 uppercase tracking-wide">
                  Верхние ноты
                </h3>
                <div className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 font-medium">
                  0-15 МИН
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {perfume.characteristics.topNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-gray-900 text-white px-4 py-2 text-sm font-medium border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-colors"
                    style={{ borderRadius: '0' }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Heart Notes */}
          <div className="relative border-b-2 border-gray-200">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500"></div>
            <div className="pl-8 pr-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-orange-500 mr-3"></div>
                <h3 className="font-bold text-xl text-gray-900 uppercase tracking-wide">
                  Ноты сердца
                </h3>
                <div className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 font-medium">
                  15-30 МИН
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {perfume.characteristics.heartNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-gray-900 text-white px-4 py-2 text-sm font-medium border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-colors"
                    style={{ borderRadius: '0' }}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Base Notes */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-600"></div>
            <div className="pl-8 pr-6 py-6">
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-amber-600 mr-3"></div>
                <h3 className="font-bold text-xl text-gray-900 uppercase tracking-wide">
                  Базовые ноты
                </h3>
                <div className="ml-auto text-xs text-gray-500 bg-gray-100 px-2 py-1 font-medium">
                  2-8 ЧАСОВ
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {perfume.characteristics.baseNotes.map((note, index) => (
                  <span
                    key={index}
                    className="bg-gray-900 text-white px-4 py-2 text-sm font-medium border-2 border-gray-900 hover:bg-white hover:text-gray-900 transition-colors"
                    style={{ borderRadius: '0' }}
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
