import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phone.trim()) {
      setError("Введите номер телефона");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("code");
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Введите код подтверждения");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(phone, code);
      if (success) {
        onClose();
        resetForm();
      } else {
        setError("Неверный код. Попробуйте еще раз.");
      }
    } catch (error) {
      setError("Произошла ошибка. Попробуйте еще раз.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setStep("phone");
    setPhone("");
    setCode("");
    setError("");
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {step === "phone" ? "Войти или зарегистрироваться" : "Введите код"}
          </h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Номер телефона
              </label>
              <Input
                type="tel"
                placeholder="+7 (999) 123-45-67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <Button
              type="submit"
              className="w-full bg-sage-600 hover:bg-sage-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Отправляем код...
                </>
              ) : (
                "Получить код"
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Мы отправим SMS с кодом подтверждения на указанный номер
            </p>
          </form>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Код подтверждения
              </label>
              <Input
                type="text"
                placeholder="1234"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-center text-2xl tracking-widest"
                maxLength={4}
              />
            </div>

            <p className="text-sm text-gray-600 text-center">
              Код отправлен на номер <strong>{phone}</strong>
            </p>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <div className="space-y-3">
              <Button
                type="submit"
                className="w-full bg-sage-600 hover:bg-sage-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Проверяем...
                  </>
                ) : (
                  "Войти"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setStep("phone")}
              >
                Изменить номер
              </Button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Для тестирования используйте код: <strong>1234</strong>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
