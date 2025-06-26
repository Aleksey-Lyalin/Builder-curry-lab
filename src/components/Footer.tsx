import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sage-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-2 h-2 bg-sage-500 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg">LITTLE DAISY</h3>
                <p className="text-xs text-gray-400">PERFUME SHOP</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Лучшие ароматы со всего мира. Оригинальная парфюмерия с гарантией
              качества.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  О нас
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Каталог
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Доставка
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Возврат
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Гарантии
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Категории</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Мужские ароматы
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Женские ароматы
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Унисекс
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Нишевая парфюмер��я
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-sage-400 transition-colors"
                >
                  Новинки
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Контакты</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-400" />
                <span className="text-gray-300">+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-400" />
                <span className="text-gray-300">info@littledaisy.ru</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-400" />
                <span className="text-gray-300">Москва, ул. Арбат, 123</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Следите за нами</h5>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sage-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-sage-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Little Daisy Perfume Shop. Все права защищены.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-sage-400 text-sm transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-sage-400 text-sm transition-colors"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
