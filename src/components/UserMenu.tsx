import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Settings,
  Package,
  Heart,
  MessageCircle,
  LogOut,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface UserMenuProps {
  onLoginClick: () => void;
}

const UserMenu = ({ onLoginClick }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  // Debug logging
  console.log("UserMenu Debug:", {
    isAuthenticated,
    user: user ? { id: user.id, name: user.name, role: user.role } : null,
    isOpen,
  });

  // Quick fix function to update role to admin
  const makeAdmin = () => {
    if (user) {
      const updatedUser = { ...user, role: "admin" as const };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload(); // Reload to apply changes
    }
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const toggleMenu = () => {
    if (!isAuthenticated) {
      onLoginClick();
    } else {
      setIsOpen(!isOpen);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-sage-600"
          onClick={toggleMenu}
          title={`Auth: ${isAuthenticated}, Role: ${user?.role || "none"}`}
        >
          <User className="w-5 h-5" style={{ fontSize: "24px" }} />
        </Button>
        {/* Temporary admin button */}
        {isAuthenticated && user?.role !== "admin" && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs bg-orange-100 hover:bg-orange-200"
            onClick={makeAdmin}
            title="Click to make admin"
          >
            Make Admin
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {isAuthenticated && user ? (
            <div>
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-sage-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-sage-600" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.phone}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  to="/account"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-4 h-4" />
                  Личный кабинет
                </Link>

                <Link
                  to="/account?tab=orders"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="w-4 h-4" />
                  Мои заказы
                </Link>

                <Link
                  to="/account?tab=favorites"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="w-4 h-4" />
                  Избранное
                  {user.favorites.length > 0 && (
                    <span className="ml-auto bg-sage-100 text-sage-700 text-xs px-2 py-0.5 rounded-full">
                      {user.favorites.length}
                    </span>
                  )}
                </Link>

                <Link
                  to="/account?tab=messages"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <MessageCircle className="w-4 h-4" />
                  Сообщения
                  {user.unreadMessages > 0 && (
                    <span className="ml-auto bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">
                      {user.unreadMessages}
                    </span>
                  )}
                </Link>

                {/* Admin Panel - Only show for admin users */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-3 px-4 py-2 text-orange-600 hover:bg-orange-50 transition-colors border-t border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    <Shield className="w-4 h-4" />
                    Панель администратора
                  </Link>
                )}
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <div className="mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Добро пожаловать!
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Войдите в аккаунт, чтобы делать покупки �� отслеживать заказы
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={onLoginClick}
                  className="w-full bg-sage-600 hover:bg-sage-700"
                >
                  Войти
                </Button>
                <Button
                  onClick={onLoginClick}
                  variant="outline"
                  className="w-full"
                >
                  Ре��истрация
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
