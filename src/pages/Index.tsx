import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Filters, { FilterState } from "@/components/Filters";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { perfumes } from "@/data/perfumes";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    priceMin: "",
    priceMax: "",
    brands: [],
    name: "",
  });

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((perfume) => {
      // Gender filter
      if (
        filters.gender.length > 0 &&
        !filters.gender.includes(perfume.gender)
      ) {
        return false;
      }

      // Price filter
      if (filters.priceMin && perfume.price < parseInt(filters.priceMin)) {
        return false;
      }
      if (filters.priceMax && perfume.price > parseInt(filters.priceMax)) {
        return false;
      }

      // Brand filter
      if (
        filters.brands.length > 0 &&
        !filters.brands.includes(perfume.brand)
      ) {
        return false;
      }

      // Name filter
      if (
        filters.name &&
        !perfume.name.toLowerCase().includes(filters.name.toLowerCase())
      ) {
        return false;
      }

      return true;
    });
  }, [filters, perfumes]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar Filters */}
        <div className="hidden lg:block">
          <Filters onFilterChange={setFilters} />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Results Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Каталог парфюмерии
              </h2>
              <p className="text-gray-600">
                Найдено {filteredPerfumes.length} товаров
              </p>
            </div>

            {/* Mobile Filters Toggle */}
            <div className="lg:hidden mb-6">
              <button className="w-full bg-sage-100 text-sage-800 py-3 px-4 rounded-lg font-medium hover:bg-sage-200 transition-colors">
                Фильтры и сортировка
              </button>
            </div>

            {/* Products Grid */}
            {filteredPerfumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPerfumes.map((perfume) => (
                  <ProductCard key={perfume.id} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Товары не найдены
                </h3>
                <p className="text-gray-500">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            )}

            {/* Load More Button */}
            {filteredPerfumes.length > 0 && (
              <div className="text-center mt-12">
                <button
                  className="text-white px-8 py-3 font-medium transition-colors"
                  style={{
                    backgroundColor: "rgba(34, 34, 34, 1)",
                    borderRadius: "0",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#4B6FA5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(34, 34, 34, 1)")
                  }
                >
                  Показать еще
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
