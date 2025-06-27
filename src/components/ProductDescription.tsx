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

        {/* Fragrance Notes */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-b from-sage-50 to-white p-6 rounded-lg border border-sage-200">
            <h3 className="font-semibold text-lg text-sage-800 mb-3">
              Верхние ноты
            </h3>
            <div className="space-y-2">
              {perfume.characteristics.topNotes.map((note, index) => (
                <span
                  key={index}
                  className="inline-block bg-sage-100 text-sage-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-b from-orange-50 to-white p-6 rounded-lg border border-orange-200">
            <h3 className="font-semibold text-lg text-orange-800 mb-3">
              Ноты сердца
            </h3>
            <div className="space-y-2">
              {perfume.characteristics.heartNotes.map((note, index) => (
                <span
                  key={index}
                  className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-lg border border-amber-200">
            <h3 className="font-semibold text-lg text-amber-800 mb-3">
              Базовые ноты
            </h3>
            <div className="space-y-2">
              {perfume.characteristics.baseNotes.map((note, index) => (
                <span
                  key={index}
                  className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                >
                  {note}
                </span>
              ))}
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
