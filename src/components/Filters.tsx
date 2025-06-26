import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { brands } from "@/data/perfumes";

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  gender: string[];
  priceMin: string;
  priceMax: string;
  brands: string[];
  name: string;
}

const Filters = ({ onFilterChange }: FiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    gender: [],
    priceMin: "",
    priceMax: "",
    brands: [],
    name: "",
  });

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleGenderChange = (gender: string, checked: boolean) => {
    const newGender = checked
      ? [...filters.gender, gender]
      : filters.gender.filter((g) => g !== gender);
    updateFilters({ gender: newGender });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...filters.brands, brand]
      : filters.brands.filter((b) => b !== brand);
    updateFilters({ brands: newBrands });
  };

  return (
    <div className="w-80 bg-gray-50 p-6 space-y-6 min-h-screen">
      {/* Gender Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Пол</h3>
        <div className="space-y-3">
          {["Мужской", "Женский", "Унисекс"].map((gender) => (
            <div key={gender} className="flex items-center space-x-3">
              <Checkbox
                id={gender}
                checked={filters.gender.includes(gender.toLowerCase())}
                onCheckedChange={(checked) =>
                  handleGenderChange(gender.toLowerCase(), checked as boolean)
                }
              />
              <label
                htmlFor={gender}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Стоимость</h3>
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">от</label>
            <Input
              type="number"
              placeholder="Мин."
              value={filters.priceMin}
              onChange={(e) => updateFilters({ priceMin: e.target.value })}
              className="text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">до</label>
            <Input
              type="number"
              placeholder="Макс."
              value={filters.priceMax}
              onChange={(e) => updateFilters({ priceMax: e.target.value })}
              className="text-sm"
            />
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Бренд</h3>
        <div className="mb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" placeholder="Бренд" className="pl-10 text-sm" />
          </div>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {brands.slice(0, 6).map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox
                id={brand}
                checked={filters.brands.includes(brand)}
                onCheckedChange={(checked) =>
                  handleBrandChange(brand, checked as boolean)
                }
              />
              <label
                htmlFor={brand}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Name Filter */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Наименование</h3>
        <div className="mb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Наименование"
              value={filters.name}
              onChange={(e) => updateFilters({ name: e.target.value })}
              className="pl-10 text-sm"
            />
          </div>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {brands.slice(0, 6).map((brand) => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox id={`name-${brand}`} />
              <label
                htmlFor={`name-${brand}`}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
