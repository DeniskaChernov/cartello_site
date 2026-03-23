import { Phone, MessageCircle, Send, Instagram, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl text-white mb-4">CARTELLO</h3>
            <p className="text-zinc-400 mb-4">
              Премиальный автодетейлинг в Ташкенте
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/cartello.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/998958350110"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://t.me/Cartellouz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-500 transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Услуги</h4>
            <ul className="space-y-2 text-zinc-400">
              <li className="hover:text-orange-500 transition-colors cursor-pointer">
                Антигравийная пленка
              </li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">
                Полировка кузова
              </li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">
                Химчистка салона
              </li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">
                Тонирование стёкол
              </li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">
                Керамическое покрытие
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Контакты</h4>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <a
                  href="tel:+998958350110"
                  className="hover:text-orange-500 transition-colors"
                >
                  95 835 01 10
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-orange-500" />
                <span>@Cartello.uz</span>
              </li>
              <li className="flex items-center gap-2">
                <Send className="w-4 h-4 text-orange-500" />
                <span>@Cartellouz</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-orange-500" />
                <span>@cartello.uz</span>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white mb-4">Информация</h4>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                <span>улица Баку 179 А, Ташкент</span>
              </li>
              <li>
                <div className="mb-1 text-white">График работы:</div>
                <div className="text-sm">Пн-Сб: 10:00 - 19:00</div>
                <div className="text-sm">Вс: выходной</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-zinc-800 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Cartello. Все права защищены.</p>
          <p className="mt-2">
            Премиальный автодетейлинг в Ташкенте с 2024 года
          </p>
        </div>
      </div>
    </footer>
  );
}
