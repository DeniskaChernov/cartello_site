import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    car: "",
    service: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Create Telegram message
    const telegramMessage = `
🚗 Новая заявка с сайта Cartello

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}
🚘 Автомобиль: ${formData.car}
🔧 Интересующая услуга: ${formData.service}
💬 Сообщение: ${formData.message}
    `.trim();

    console.log("Form submitted:", formData);
    console.log("Telegram message:", telegramMessage);

    toast.success("Заявка отправлена!", {
      description: "Мы свяжемся с вами в ближайшее время",
    });

    setFormData({
      name: "",
      phone: "",
      car: "",
      service: "",
      message: "",
    });

    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6"
          >
            <span className="text-orange-500 text-sm">Свяжитесь с нами</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl mb-6 text-white">
            Записаться на консультацию
          </h2>
          <motion.div
            className="h-1.5 w-32 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Оставьте заявку или свяжитесь с нами удобным способом
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 p-8 md:p-10 hover:border-orange-500/50 transition-all">
              <h3 className="text-3xl text-white mb-8">
                Получить консультацию
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-zinc-300 text-base mb-2 block">
                    Ваше имя *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 text-white h-14 text-lg focus:border-orange-500 transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-zinc-300 text-base mb-2 block">
                    Номер телефона *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="bg-zinc-800/50 border-zinc-700 text-white h-14 text-lg focus:border-orange-500 transition-colors"
                    placeholder="+998 XX XXX XX XX"
                  />
                </div>

                <div>
                  <Label htmlFor="car" className="text-zinc-300 text-base mb-2 block">
                    Марка и модель автомобиля
                  </Label>
                  <Input
                    id="car"
                    name="car"
                    value={formData.car}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700 text-white h-14 text-lg focus:border-orange-500 transition-colors"
                    placeholder="Например: Mercedes-Benz S-Class"
                  />
                </div>

                <div>
                  <Label htmlFor="service" className="text-zinc-300 text-base mb-2 block">
                    Интересующая услуга
                  </Label>
                  <Input
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700 text-white h-14 text-lg focus:border-orange-500 transition-colors"
                    placeholder="Например: Полировка кузова"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-zinc-300 text-base mb-2 block">
                    Сообщение
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-zinc-800/50 border-zinc-700 text-white text-lg min-h-[120px] focus:border-orange-500 transition-colors"
                    placeholder="Дополнительная информация..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-7 text-lg shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all"
                >
                  {isSubmitting ? "Отправка..." : "Отправить заявку"}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 p-8 hover:border-orange-500/50 transition-all">
              <h3 className="text-2xl text-white mb-8">Контактная информация</h3>
              <div className="space-y-6">
                <a
                  href="tel:+998958350110"
                  className="flex items-start gap-4 text-zinc-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Телефон</div>
                    <div className="text-white text-lg">95 835 01 10</div>
                  </div>
                </a>

                <a
                  href="https://wa.me/998958350110"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-zinc-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                    <MessageCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">WhatsApp</div>
                    <div className="text-white text-lg">@Cartello.uz</div>
                  </div>
                </a>

                <a
                  href="https://t.me/Cartellouz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-zinc-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                    <Send className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Telegram</div>
                    <div className="text-white text-lg">@Cartellouz</div>
                  </div>
                </a>

                <a
                  href="https://instagram.com/cartello.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 text-zinc-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0 group-hover:from-orange-500/30 group-hover:to-orange-600/30 transition-all">
                    <Instagram className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-1">Instagram</div>
                    <div className="text-white text-lg">@cartello.uz</div>
                  </div>
                </a>
              </div>
            </Card>

            {/* Address & Hours */}
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 p-8 hover:border-orange-500/50 transition-all">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-2">Адрес</div>
                    <div className="text-white text-lg mb-1">
                      улица Баку 179 А
                    </div>
                    <div className="text-sm text-zinc-400">
                      Ориентир: магазин Legion
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500 mb-2">
                      График работы
                    </div>
                    <div className="text-white text-lg">Пн-Сб: 10:00 - 19:00</div>
                    <div className="text-sm text-zinc-400">
                      Воскресенье: выходной
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Map placeholder */}
            <Card className="bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 p-4 hover:border-orange-500/50 transition-all overflow-hidden">
              <div className="aspect-video bg-zinc-800/50 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-orange-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-center relative z-10">
                  <MapPin className="w-16 h-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-white text-xl mb-2">Мы на карте</p>
                  <p className="text-zinc-400">
                    улица Баку 179 А, Ташкент
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}