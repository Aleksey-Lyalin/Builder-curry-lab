import { Instagram, Facebook, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: "#333333" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F42ef96d0429245c4b9208336c6d953e6%2Fc08c7f3fb5d54e98bf0dcbb9e41a5c38?format=webp&width=800"
                alt="Little Daisy Perfume Shop"
                className="object-contain"
                style={{
                  width: "148px",
                  height: "57px",
                  filter:
                    "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)",
                }}
              />
            </div>
            <p className="text-gray-300 text-sm">
              Лучшие ароматы со всего мира. Оригинальная парфюмерия с гара��тией
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
