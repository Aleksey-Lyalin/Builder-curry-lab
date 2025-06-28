import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { User, AuthState } from "@/types/user";

interface AuthContextType extends AuthState {
  login: (phone: string, code: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addToFavorites: (perfumeId: string) => void;
  removeFromFavorites: (perfumeId: string) => void;
  markMessagesAsRead: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: "1",
    name: "Алексей Лялин",
    phone: "+7 (999) 123-45-67",
    email: "alexey@example.com",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "admin",
    createdAt: new Date("2024-01-15"),
    favorites: ["1", "3", "5"],
    unreadMessages: 2,
  },
  {
    id: "2",
    name: "Администратор",
    phone: "+7 (999) 000-00-00",
    email: "admin@littledaisy.ru",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    role: "admin",
    createdAt: new Date("2024-01-01"),
    favorites: [],
    unreadMessages: 0,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        // Convert createdAt string back to Date object
        if (user.createdAt && typeof user.createdAt === "string") {
          user.createdAt = new Date(user.createdAt);
        }
        setAuthState({
          user,
          isLoading: false,
          isAuthenticated: true,
        });
      } catch (error) {
        localStorage.removeItem("user");
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    } else {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (phone: string, code: string): Promise<boolean> => {
    // Mock login logic - in real app, this would call an API
    if (code === "1234") {
      const user = mockUsers.find((u) => u.phone === phone) || {
        id: Date.now().toString(),
        name: "Новый пользователь",
        phone,
        role: "user" as const,
        createdAt: new Date(),
        favorites: [],
        unreadMessages: 0,
      };

      localStorage.setItem("user", JSON.stringify(user));
      setAuthState({
        user,
        isLoading: false,
        isAuthenticated: true,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setAuthState((prev) => ({ ...prev, user: updatedUser }));
    }
  };

  const addToFavorites = (perfumeId: string) => {
    if (authState.user && !authState.user.favorites.includes(perfumeId)) {
      const updatedFavorites = [...authState.user.favorites, perfumeId];
      updateUser({ favorites: updatedFavorites });
    }
  };

  const removeFromFavorites = (perfumeId: string) => {
    if (authState.user) {
      const updatedFavorites = authState.user.favorites.filter(
        (id) => id !== perfumeId,
      );
      updateUser({ favorites: updatedFavorites });
    }
  };

  const markMessagesAsRead = useCallback(() => {
    updateUser({ unreadMessages: 0 });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        updateUser,
        addToFavorites,
        removeFromFavorites,
        markMessagesAsRead,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
