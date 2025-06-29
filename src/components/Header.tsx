import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import UserMenu from "./UserMenu";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { totalItems } = useCart();

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F42ef96d0429245c4b9208336c6d953e6%2F144af381c3ac43cbaed00a2ab2fb7ab7?format=webp&width=800"
              alt="Little Daisy Perfume Shop"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Поиск"
                className="pl-12 pr-6 py-3 w-full h-12 text-base border-gray-300 focus:border-sage-500 focus:ring-sage-500"
              />
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* User Menu */}
            <UserMenu onLoginClick={() => setIsAuthModalOpen(true)} />

            {/* Messages - Only show if authenticated */}
            {isAuthenticated && (
              <Link to="/account?tab=messages">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:text-sage-600 relative"
                >
                  <MessageCircle className="w-6 h-6" />
                  {user && user.unreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {user.unreadMessages > 9 ? "9+" : user.unreadMessages}
                    </span>
                  )}
                </Button>
              </Link>
            )}

            {/* Favorites */}
            <Link to={isAuthenticated ? "/account?tab=favorites" : "#"}>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-sage-600 relative"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    setIsAuthModalOpen(true);
                  }
                }}
              >
                <Heart className="w-6 h-6" />
                {isAuthenticated && user && user.favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-sage-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {user.favorites.length > 9 ? "9+" : user.favorites.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Shopping Cart */}
            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-sage-600 relative"
              >
                <ShoppingCart className="w-6 h-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Header;
