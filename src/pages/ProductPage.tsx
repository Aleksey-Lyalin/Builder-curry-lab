import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductDescription from "@/components/ProductDescription";
import { perfumes } from "@/data/perfumes";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const perfume = perfumes.find((p) => p.id === id);

  if (!perfume) {
    return <Navigate to="/404" replace />;
  }

  const breadcrumbItems = [
    { label: "Каталог", href: "/" },
    { label: perfume.category, href: `/?category=${perfume.category}` },
    { label: perfume.name },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Product Content */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Gallery */}
            <div>
              <ProductGallery
                images={perfume.images}
                productName={perfume.name}
              />
            </div>

            {/* Right Column - Product Info */}
            <div>
              <ProductInfo perfume={perfume} />
            </div>
          </div>

          {/* Product Description & Characteristics */}
          <div className="border-t border-gray-200 pt-12">
            <ProductDescription perfume={perfume} />
          </div>

          {/* Related Products Section */}
          <div className="border-t border-gray-200 pt-12 mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Похожие товары
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {perfumes
                .filter(
                  (p) => p.id !== perfume.id && p.gender === perfume.gender,
                )
                .slice(0, 4)
                .map((relatedPerfume) => (
                  <div
                    key={relatedPerfume.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-gray-50 p-4">
                      <img
                        src={relatedPerfume.image}
                        alt={relatedPerfume.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-gray-900 uppercase">
                        {relatedPerfume.brand}
                      </p>
                      <h3 className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {relatedPerfume.name}
                      </h3>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        от {relatedPerfume.price.toLocaleString("ru-RU")} ₽
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
