import { Search, User, ShoppingCart, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-sage-500 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-3 h-3 bg-sage-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-800 leading-tight">
              LITTLE DAISY
            </h1>
            <span className="text-xs text-gray-500 leading-tight">
              PERFUME SHOP
            </span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Поиск"
              className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-sage-500 focus:ring-sage-500"
            />
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-sage-600"
          >
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-sage-600"
          >
            <Heart className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-sage-600"
          >
            <ShoppingCart className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
