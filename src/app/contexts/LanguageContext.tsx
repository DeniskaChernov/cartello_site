import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ru' | 'uz';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context with undefined as initial value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback for isolated component previews outside LanguageProvider
    const t = (key: string): string => {
      const keys = key.split('.');
      let value: any = translations['ru'];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    };
    return { language: 'ru' as Language, setLanguage: () => {}, t };
  }
  return context;
}

const translations = {
  ru: {
    header: {
      services: 'Услуги',
      gallery: 'Галерея',
      contact: 'Контакты',
      phone: '95 835 01 10'
    },
    hero: {
      title: 'Ваш надёжный детейлинг-центр',
      bookNow: 'Записаться сейчас',
      phone: '95 835 01 10',
      clients: 'Клиентов',
      services: 'Услуг',
      guarantee: 'Гарантия'
    },
    services: {
      title: 'Наши услуги',
      subtitle: 'Полный спектр качественных детейлинг-услуг',
      priceFrom: 'от',
      priceOnRequest: 'Цена по запросу',
      more: 'Подробнее',
      badge: 'Хит',
      badgeOnRequest: 'По запросу',
      
      // Featured Services
      polishing: 'Полировка кузова',
      polishingDesc: 'Восстанавливаем насыщенность цвета и зеркальный глянец, избавляя кузов от дефектов, которые портят внешний вид автомобиля.',
      polishingPrice: 'от 1.500.000 сум',
      
      ppf: 'Антигравийная пленка',
      ppfDesc: 'Оклейка полиуретановой пленкой создает прочный защитный слой, который бережет лак от сколов, песка и агрессивной среды.',
      ppfPrice: 'от 2.400.000 сум',
      
      tinting: 'Тонирование стекол',
      tintingDesc: 'Профессиональное тонирование стекол повышает комфорт в салоне, защищает от солнца и придает автомобилю более выразительный вид.',
      tintingPrice: 'от 780.000 сум',
      
      // Other Services
      ceramicCoating: 'Покрытие кузова керамическим составом',
      ceramicCoatingDesc: 'Керамика усиливает глубину цвета, добавляет зеркальный блеск и защищает поверхность от влаги, грязи и реагентов.',
      ceramicCoatingPrice: 'от 1.750.000 сум',
      
      detailingWash: 'Детейлинг мойка',
      detailingWashDesc: 'Детейлинг мойка — это тщательная и безопасная очистка кузова и салона с вниманием к каждой детали.',
      detailingWashPrice: '480.000 сум',
      
      interiorCleaning: 'Химчистка салона',
      interiorCleaningDesc: 'Профессиональная химчистка салона удаляет загрязнения и неприятные запахи, без риска для интерьерных материалов, возвращая интерьеру свежесть и аккуратный вид.',
      interiorCleaningPrice: 'от 1.200.000 сум',
      
      soundproofing: 'Шумоизоляция',
      soundproofingDesc: 'Профессиональная шумоизоляция уменьшает вибрации и посторонние звуки, улучшает акустический комфорт, создавая приятную атмосферу в автомобиле.',
      soundproofingPrice: 'от 3.900.000 сум',
      
      pdrService: 'Ремонт вмятин (PDR)',
      pdrServiceDesc: 'Выпрямление вмятины без покраски. Сохраняем заводское лакокрасочное покрытие и первоначальный вид автомобиля.',
      pdrServicePrice: 'от 190.000 сум',
      
      interiorCeramic: 'Керамическое покрытие для интерьера',
      interiorCeramicDesc: 'Керамика интерьера создает невидимый защитный слой, уменьшая воздействие грязи и ультрафиолета.',
      interiorCeramicPrice: 'от 590.000 сум',
      
      engineWash: 'Детейлинг мойка подкапотного пространства',
      engineWashDesc: 'Бережная очистка подкапотного пространства. Устранение загрязнения без риска для электроники и узлов автомобиля.',
      engineWashPrice: 'от 990.000 сум',
      
      wheelArchWash: 'Детейлинг мойка колесных арок',
      wheelArchWashDesc: 'Детейлинг мойка колесных арок позволяет полностью удалить грязь из труднодоступных зон и поддерживать чистоту автомобиля.',
      wheelArchWashPrice: 'от 990.000 сум',
      
      undercarriageWash: 'Детейлинг мойка днища автомобиля',
      undercarriageWashDesc: 'Бережная очистка днища удаляет грязь и налет из труднодоступных зон, сохраняя аккуратное состояние автомобиля и продлевает срок службы элементов автомобиля.',
      undercarriageWashPrice: 'от 1.490.000 сум',
      
      autoElectric: 'Услуги автоэлектрика',
      autoElectricDesc: 'Диагностика и ремонт электронных систем автомобиля, обеспечение их стабильной и безопасной работы.',
      
      evRepair: 'Ремонт электромобилей',
      evRepairDesc: 'Обслуживание электромобилей с учетом их технических особенностей, устранение неисправностей и восстановление корректной работы систем.',
      
      audioInstall: 'Установка акустики',
      audioInstallDesc: 'Профессиональная установка аудиосистем позволяет раскрыть качество звучания и сделать каждую поездку приятнее.',
      
      bodywork: 'Кузовные покрасочные работы',
      bodyworkDesc: 'Профессиональные кузовные и покрасочные работы любой сложности: от восстановления повреждений до косметического ремонта.',
      
      windshieldProtection: 'Защита лобового стекла',
      windshieldProtectionDesc: 'Специальная пленка защищает лобовое стекло от сколов, появления трещин, мелких ударов и помогает избежать дорогостоящей замены.',
      
      plasticProtection: 'Защита пластика салона (ламинация)',
      plasticProtectionDesc: 'Прозрачное ламинирование сохраняет внешний вид пластика и защищает его от повседневных повреждений.',
      
      atelierService: 'Услуги ателье',
      atelierServiceDesc: 'Услуги ателье позволяют обновить и персонализировать интерьер автомобиля с учетом ваших предпочтений и стиля.',
      
      ppfBody: 'Оклейка кузова (PPF)',
      ppfBodyDesc: 'Защитная полиуретановая плёнка для кузова автомобиля',
      
      ppfHeadlights: 'Оклейка фар (PPF)',
      ppfHeadlightsDesc: 'Защита оптики от сколов и помутнения',
      
      ppfMirrors: 'Оклейка зеркал (PPF)',
      ppfMirrorsDesc: 'Защита боковых зеркал от царапин',
      
      ceramicBody: 'Керамическая защита кузова',
      ceramicBodyDesc: 'Долговременная защита лакокрасочного покрытия',
      
      ceramicInterior: 'Керамическое покрытие интерьера',
      ceramicInteriorDesc: 'Защита салона от загрязнений и износа',
      
      ceramicGlass: 'Керамическая защита стекол',
      ceramicGlassDesc: 'Водоотталкивающее покрытие для стекол',
      
      polishingBody: 'Полировка кузова',
      polishingBodyDesc: 'Восстановление блеска лакокрасочного покрытия',
      
      polishingHeadlights: 'Полировка фар',
      polishingHeadlightsDesc: 'Восстановление прозрачности оптики',
      
      detailingWashExterior: 'Детейлинг мойка кузова',
      detailingWashExteriorDesc: 'Тщательная профессиональная мойка автомобиля',
      
      detailingWashEngine: 'Детейлинг мойка подкапотного пространства',
      detailingWashEngineDesc: 'Профессиональная очистка моторного отсека',
      
      detailingWashWheelArches: 'Детейлинг мойка колесных арок',
      detailingWashWheelArchesDesc: 'Тщательная очистка колесных арок',
      
      detailingWashBottom: 'Детейлинг мойка днища автомобиля',
      detailingWashBottomDesc: 'Профессиональная мойка днища',
      
      dryCleaningInterior: 'Химчистка салона',
      dryCleaningInteriorDesc: 'Глубокая очистка салона автомобиля',
      
      dryCleaningCeiling: 'Химчистка потолка',
      dryCleaningCeilingDesc: 'Профессиональная очистка потолка салона',
      
      tintingService: 'Тонировка стекол',
      tintingServiceDesc: 'Профессиональная тонировка автомобильных стекол',
      
      tintingHeadlights: 'Тонировка фар',
      tintingHeadlightsDesc: 'Стильная тонировка оптики',
      
      tintingTaillights: 'Тонировка задних фонарей',
      tintingTaillightsDesc: 'Тонировка задних световых элементов',
      
      antiChipTreatment: 'Антигравийная обработка',
      antiChipTreatmentDesc: 'Защита от сколов и повреждений',
      
      salonOzonation: 'Озонирование салона',
      salonOzonationDesc: 'Удаление неприятных запахов и дезинфекция',
      
      autoElectrician: 'Автоэлектрик',
      autoElectricianDesc: 'Диагностика и ремонт электрооборудования',
      
      pdr: 'Удаление вмятин без покраски (PDR)',
      pdrDesc: 'Беспокрасочное восстановление кузова',
      
      leatherRepair: 'Ремонт кожи салона',
      leatherRepairDesc: 'Восстановление кожаных элементов интерьера',
      
      atelierServices: 'Услуги ателье',
      atelierServicesDesc: 'Индивидуальный пошив и перетяжка салона'
    },
    additionalServices: {
      title: 'Дополнительные услуги',
      subtitle: 'Полный спектр профессионального ухода за вашим автомобилем',
      time: 'Время',
      price: 'Цена',
      getConsultation: 'Получить консультацию',
      
      ceramicBodyTitle: 'Керамическое покрытие кузова',
      ceramicBodyDesc: 'Защитный слой, который делает поверхность более прочной, блестящей и устойчивой к внешним воздействиям.',
      ceramicBodyDetail1: 'Защита от царапин и химии',
      ceramicBodyDetail2: 'Устойчивость к ультрафиолету',
      ceramicBodyDetail3: 'Долговременная защита',
      ceramicBodyDetail4: 'Эстетический блеск',
      ceramicBodyTime: 'от 5 часов',
      
      autoElectricianTitle: 'Услуги автоэлектрика',
      autoElectricianDesc: 'Широкий спектр услуг профессионального автоэлектрика.',
      autoElectricianDetail1: 'Диагностика электрооборудования',
      autoElectricianDetail2: 'Ремонт и замена проводки',
      autoElectricianDetail3: 'Установка сигнализаций и камер',
      autoElectricianDetail4: 'Работа с мультимедиа системами',
      autoElectricianTime: 'индивидуально',
      
      detailingWashEngineTitle: 'Детейлинг мойка подкапотного пространства',
      detailingWashEngineDesc: 'Профессиональная очистка моторного отсека с использованием специальных средств.',
      detailingWashEngineDetail1: 'Защита от коррозии',
      detailingWashEngineDetail2: 'Стабильная работа электроники',
      detailingWashEngineDetail3: 'Удобство обслуживания',
      detailingWashEngineDetail4: 'Предотвращение запахов',
      detailingWashEngineTime: '7-12 часов',
      
      detailingWashArchesTitle: 'Детейлинг мойка арок',
      detailingWashArchesDesc: 'Профессиональная очистка внутренних поверхностей колёсных арок.',
      detailingWashArchesDetail1: 'Удаление грязи и реагентов',
      detailingWashArchesDetail2: 'Защита от коррозии',
      detailingWashArchesDetail3: 'Предотвращение ржавчины',
      detailingWashArchesDetail4: 'Сохранение лакокрасочного покрытия',
      detailingWashArchesTime: '8-12 часов',
      
      detailingWashBottomTitle: 'Детейлинг мойка днища',
      detailingWashBottomDesc: 'Профессиональная очистка нижней части кузова для защиты от коррозии.',
      detailingWashBottomDetail1: 'Удаление соли и реагентов',
      detailingWashBottomDetail2: 'Защита от коррозии',
      detailingWashBottomDetail3: 'Продление срока службы',
      detailingWashBottomDetail4: 'Осмотр технического состояния',
      detailingWashBottomTime: '8-12 часов'
    },
    benefits: {
      title: 'Почему выбирают нас',
      subtitle: 'Наши преимущества и гарантии качества',
      
      professionalEquipment: 'Профессиональное оборудование',
      professionalEquipmentDesc: 'Используем современное оборудование и технологии премиум-класса',
      
      experiencedMasters: 'Опытные мастера',
      experiencedMastersDesc: 'Команда сертифицированных специалистов с многолетним опытом',
      
      qualityMaterials: 'Качественные материалы',
      qualityMaterialsDesc: 'Работаем только с проверенными брендами и оригинальными материалами',
      
      guarantee: 'Гарантия качества',
      guaranteeDesc: 'Предоставляем гарантию на все виды выполненных работ',

      individualApproach: 'Индивидуальный подход',
      individualApproachDesc: 'Разрабатываем персональное решение для каждого автомобиля',

      satisfiedClients: 'Довольные клиенты',
      satisfiedClientsDesc: 'Более 500 постоянных клиентов доверяют нам свои автомобили'
    },
    gallery: {
      title: 'Наши работы',
      subtitle: 'Примеры выполненных проектов'
    },
    mediaGallery: {
      header: 'Посмотрите, как мы работаем и какой результат получается',
      before: 'До',
      after: 'После',
      moreWorks: 'Больше работ в нашем Instagram',
      views: 'просмотров'
    },
    videoSection: {
      title: 'Результаты,',
      titleHighlight: 'которые говорят сами за себя',
      subtitle: 'Посмотрите реальные работы наших мастеров',
      views: 'просмотров',
      
      reel1Title: 'Процесс полировки',
      reel2Title: 'PPF защита зон риска',
      reel3Title: 'Детейлинг интерьера',
      reel4Title: 'Керамика 9H',
      reel5Title: 'Финишная обработка'
    },
    contact: {
      title: 'Свяжитесь с нами',
      subtitle: 'Записаться на услугу или задать вопрос',
      name: 'Ваше имя',
      phone: 'Номер телефона',
      service: 'Выберите услугу',
      selectService: 'Выберите услугу',
      send: 'Отправить заявку',
      sending: 'Отправка...',
      
      formTitle: 'Записаться на детейлинг',
      formSubtitle: 'Оставьте заявку и получите консультацию в течение 5 минут',
      nameLabel: 'Ваше имя *',
      namePlaceholder: 'Например: Азиз',
      phoneLabel: 'Номер телефона *',
      phonePlaceholder: '+998 90 123 45 67',
      serviceLabel: 'Интересующая услуга',
      
      serviceOption1: 'Оклейка кузова PPF',
      serviceOption2: 'Керамическая защита',
      serviceOption3: 'Детейлинг полировка',
      serviceOption4: 'Химчистка салона',
      serviceOption5: 'Тонировка стекол',
      serviceOption6: 'Другое',
      
      contactTitle: 'Связаться с нами',
      telegram: 'Telegram',
      instagram: 'Instagram',
      phoneTitle: 'Телефон',
      infoText: 'Выберите удобный способ связи. Мы отвечаем в течение 5 минут и гарантируем конфиденциальность ваших данных в соответствии с Законом РУз «О персональных данных» (№ ЗРУ-547 о 02.07.2019 г.)',
      
      addressTitle: 'Адрес и время работы',
      address: 'Адрес',
      addressValue: 'г. Ташкент, ул. Баку 179А',
      addressLandmark: 'Ориентир: магазин Legion',
      schedule: 'График работы',
      scheduleValue: 'Пн-Сб: 10:00 - 19:00',
      scheduleValue2: 'Воскресенье - выходной',
      
      successTitle: 'Заявка отправлена!',
      successMessage: 'Мы свяжемся с вами в течение 5 минут',
      successMessageShort: 'Мы свяжемся с вами в ближайшее время',
      errorTitle: 'Ошибка',
      errorMessage: 'Не удалось отправить заявку. Попробуйте позже',
      errorMessageAlt: 'Попробуйте позвонить или написать в Telegram',
      consentRequired: 'Требуется согласие',
      consentMessage: 'Пожалуйста, подтвердите согласие на обработку персональных данных',
      
      privacyText: 'Нажимая кнопку, вы соглашаетесь с',
      privacyLink: 'политикой конфиденциальности',
      privacyConsent: 'Я даю согласие Cartello Detailing Centre на обработку моих персональных данных (имя, номер телефона) в целях обработки заявки и связи со мной в соответствии с',
      privacyPolicy: 'Политикой конфиденциальности',
      privacyLaw: 'и Законом РУз «О персональных данных» (№ ЗРУ-547 от 02.07.2019 г.)'
    },
    footer: {
      description: 'Ваш надёжный детейлинг-центр.',
      founded: 'Основан в 2023 году',
      servicesTitle: 'Услуги',
      
      service1: 'Оклейка кузова (PPF)',
      service2: 'Керамическая защита',
      service3: 'Полировка кузова',
      service4: 'Химчистка салона',
      service5: 'Тонировка стекол',
      service6: 'Автоэлектрик',
      
      contactTitle: 'Контакты',
      address: 'улица Баку 179 А, Ташкент',
      scheduleTitle: 'Режим работы',
      scheduleDays: 'Понедельник - Суббота',
      scheduleTime: '10:00 - 19:00',
      scheduleSunday: 'Воскресенье - выходной',
      rights: '© 2026 Cartello. Все права защищены',
      cookiePolicy: 'Политика cookies',
      privacyPolicy: 'Политика конфиденциальности'
    },
    floatingCTA: {
      book: 'Записаться',
      onService: 'на услугу'
    },
    backToTop: {
      title: 'Наверх'
    },
    cookieBanner: {
      message: 'Мы используем cookies для улучшения вашего опыта. Продолжая использовать сайт, вы соглашаетесь с нашей',
      policy: 'политикой cookies',
      accept: 'Принять',
      decline: 'Отклонить'
    },
    cookiePolicy: {
      title: 'Политика использования cookies',
      content: `Этот веб-сайт использует cookies для улучшения пользовательского опыта...`
    },
    privacyPolicy: {
      title: 'Политика конфиденциальности',
      content: `Защита ваших личных данных является нашим приоритетом...`
    },
    bookingModal: {
      title: 'Оставить заявку',
      subtitle: 'Заполните форму и мы свяжемся с вами',
      name: 'Ваше имя *',
      phone: 'Телефон *',
      email: 'Email',
      comment: 'Комментарий',
      send: 'Отправить заявку',
      cancel: 'Отмена',
      sending: 'Отправка...',
      call: 'Позвонить',
      telegram: 'Telegram',
      privacyText: 'Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности'
    }
  },
  uz: {
    header: {
      services: 'Xizmatlar',
      gallery: 'Galereya',
      contact: 'Aloqa',
      phone: '95 835 01 10'
    },
    hero: {
      title: 'Ishonchli deteyling markazingiz',
      bookNow: 'Hozir yozilish',
      phone: '95 835 01 10',
      clients: 'Mijozlar',
      services: 'Xizmatlar',
      guarantee: 'Kafolat'
    },
    services: {
      title: 'Bizning xizmatlarimiz',
      subtitle: 'Sifatli deteyling xizmatlarining to\'liq spektri',
      priceFrom: 'dan',
      priceOnRequest: 'Narx so\'rov bo\'yicha',
      more: 'Batafsil',
      badge: 'Hit',
      badgeOnRequest: 'So\'rov bo\'yicha',
      
      // Featured Services
      polishing: 'Kuzovni jilolash',
      polishingDesc: 'Rangni qayta tiklash va zerkal muhito\'qni ta\'minlash, kuzovni avtomobilning tashqi ko\'rinishini buzadigan xatolardan qochish.',
      polishingPrice: '1.500.000 so\'mdan',
      
      ppf: 'Antigraviy plastinka',
      ppfDesc: 'Yoldagi har bir qaychi haqida o\'ylamaymiz. Kuzov himoya qilinadi, hech qanday qo\'lga kelsa ham.',
      ppfPrice: '2.400.000 so\'mdan',
      
      tinting: 'Oynalarni tonlash',
      tintingDesc: 'Salonda suz, tashqarida ko\'rinmaydi. Materiallar tekshirilgan ishlab chiqaruvchilardan.',
      tintingPrice: '780.000 so\'mdan',
      
      // Other Services
      ceramicCoating: 'Kuzovni keramik qoplama',
      ceramicCoatingDesc: 'Keramiqa kuzovni yorqinlikni oshiradi, zerkal muhito\'qni qo\'yadi va suv, kirlar va reagentlardan himoya qiladi.',
      ceramicCoatingPrice: '1.750.000 so\'mdan',
      
      detailingWash: 'Deteyling yuvish',
      detailingWashDesc: 'Qo\'llar bilan, yuqori sifatli kimyoviy vositalar bilan yuvamiz. Qo\'yiqchalar va oynalardagi qizilishlardan himoya.',
      detailingWashPrice: '480.000 so\'m',
      
      interiorCleaning: 'Salonni kimyoviy tozalash',
      interiorCleaningDesc: 'Tirnashlarni, hidlarni, ichki kirlarni olib tashlaymiz. Yotib turib, tushunib olasiz — tozalangan.',
      interiorCleaningPrice: '1.200.000 so\'mdan',
      
      soundproofing: 'Shum o\'zroqlanishini bartaraf etish',
      soundproofingDesc: 'Yurayotganingizda yorg\'on olmaymiz. Yoldagi shum kamayadi, uzun yo\'nalishlarda ko\'nikmaliroq.',
      soundproofingPrice: '3.900.000 so\'mdan',
      
      pdrService: 'Botiqlarni yo\'qotish (PDR)',
      pdrServiceDesc: 'Botiqlarni qoraq olmay olamiz. Qoraq qo\'yishsiz — sotish narxidan kamayish yo\'q.',
      pdrServicePrice: '190.000 so\'mdan',
      
      interiorCeramic: 'Intererni keramik qoplama',
      interiorCeramicDesc: 'Plastik, teri va salon elementlarini keramik qoplama bilan himoya qilamiz. Olib tashlash oson, uzun muddatli ishlatish mumkin.',
      interiorCeramicPrice: '590.000 so\'mdan',
      
      engineWash: 'Dvigatel bo\'shlig\'ini deteyling yuvish',
      engineWashDesc: 'Dvigatel bo\'limini delikat yuvish va tozalash. Hamma narsa to\'g\'ri va elektronikaga xavfsiz.',
      engineWashPrice: '990.000 so\'mdan',
      
      wheelArchWash: 'G\'ildirak arkalarini deteyling yuvish',
      wheelArchWashDesc: 'G\'ildirak arkalarini kirlardan, reagentlardan va bitumdan tozalash. Korroziyadan himoya.',
      wheelArchWashPrice: '990.000 so\'mdan',
      
      undercarriageWash: 'Avtomobil tubini deteyling yuvish',
      undercarriageWashDesc: 'Tubni tozalash va anti-korroziya ishlari. Avtomobilning xizmat muddatini uzaytirish.',
      undercarriageWashPrice: '1.490.000 so\'mdan',
      
      autoElectric: 'Avtoelektrik xizmatlari',
      autoElectricDesc: 'Avtoelektrik xizmatlari bo\'yicha professional diagnostika va ta\'mirlash. Har qanday vazifalarni hal etamiz.',
      
      evRepair: 'Elektromobillarni ta\'mirlash',
      evRepairDesc: 'Elektromobillarni diagnostika va ta\'mirlash. Batareyalardan, inverterlardan, to\'ldiruvdan ishlashamiz.',
      
      audioInstall: 'Audio tizimini o\'rnatish',
      audioInstallDesc: 'Audio tizimlarini tanlash va o\'rnatish. Avtomobilingizda yuqori sifatli ovoz.',
      
      bodywork: 'Kuzovni qoraq qo\'yish ishlari',
      bodyworkDesc: 'Bumperlar va g\'ildirak disklarini restavratsiya va qoraq qo\'yish. Asl holatini qaytarish.',
      
      windshieldProtection: 'Loboviy oyna himoya',
      windshieldProtectionDesc: 'Maxsus plyonka loboviy oynani yorilish, yoriqlar paydo bo\'lishi va mayda zarbalardan himoya qiladi, qimmat almashtirish zarurligini oldini oladi.',
      
      plasticProtection: 'Salon plastiklarini himoya (laminatsiya)',
      plasticProtectionDesc: 'Shaffof laminatsiya plastik tashqi ko\'rinishini saqlab qoladi va uni kundalik shikastlanishlardan himoya qiladi.',
      
      atelierService: 'Atele xizmatlari',
      atelierServiceDesc: 'Услуги ателье позволяют обновить и персонализировать интерьер автомобиля с учетом ваших предпочтений и стиля.',
      
      ppfBody: 'Kuzovni yopishtirish (PPF)',
      ppfBodyDesc: 'Avtomobil kuzovi uchun himoya poliuretan plyonkasi',
      
      ppfHeadlights: 'Faralarni yopishtirish (PPF)',
      ppfHeadlightsDesc: 'Optikani chizilish va xiralashuvdan himoya qilish',
      
      ppfMirrors: 'Oynalarni yopishtirish (PPF)',
      ppfMirrorsDesc: 'Yon oynalarni tirnalishdan himoya qilish',
      
      ceramicBody: 'Kuzovni keramik himoya',
      ceramicBodyDesc: 'Bo\'yoq qoplamasining uzoq muddatli himoyasi',
      
      ceramicInterior: 'Intererni keramik qoplama',
      ceramicInteriorDesc: 'Salonni ifloslanish va eskirishdan himoya qilish',
      
      ceramicGlass: 'Oynalarni keramik himoya',
      ceramicGlassDesc: 'Oynalar uchun suv qaytaruvchi qoplama',
      
      polishingBody: 'Kuzovni jilolash',
      polishingBodyDesc: 'Bo\'yoq qoplamasining yorqinligini tiklash',
      
      polishingHeadlights: 'Faralarni jilolash',
      polishingHeadlightsDesc: 'Optika shaffofligini tiklash',
      
      detailingWashExterior: 'Kuzovni deteyling yuvish',
      detailingWashExteriorDesc: 'Avtomobilni professional ehtiyotkorlik bilan yuvish',
      
      detailingWashEngine: 'Dvigatel bo\'shlig\'ini deteyling yuvish',
      detailingWashEngineDesc: 'Dvigatel bo\'limini professional tozalash',
      
      detailingWashWheelArches: 'G\'ildirak arkalarini deteyling yuvish',
      detailingWashWheelArchesDesc: 'G\'ildirak arkalarini ehtiyotkorlik bilan tozalash',
      
      detailingWashBottom: 'Avtomobil tubini deteyling yuvish',
      detailingWashBottomDesc: 'Tubni professional yuvish',
      
      dryCleaningInterior: 'Salonni kimyoviy tozalash',
      dryCleaningInteriorDesc: 'Avtomobil salonini chuqur tozalash',
      
      dryCleaningCeiling: 'Shiftni kimyoviy tozalash',
      dryCleaningCeilingDesc: 'Salon shiftini professional tozalash',
      
      tintingService: 'Oynalarni tonlash',
      tintingServiceDesc: 'Avtomobil oynalarini professional tonlash',
      
      tintingHeadlights: 'Faralarni tonlash',
      tintingHeadlightsDesc: 'Optikaning zamonaviy tonlash',
      
      tintingTaillights: 'Orqa chiroqlarni tonlash',
      tintingTaillightsDesc: 'Orqa yorug\'lik elementlarini tonlash',
      
      antiChipTreatment: 'Antigraviy ishlov berish',
      antiChipTreatmentDesc: 'Chizilish va shikastlanishdan himoya',
      
      salonOzonation: 'Salonni ozonlash',
      salonOzonationDesc: 'Yoqimsiz hidlarni bartaraf etish va dezinfeksiya',
      
      autoElectrician: 'Avtoelektrik',
      autoElectricianDesc: 'Elektr jihozlarini diagnostika va ta\'mirlash',
      
      pdr: 'Bo\'yashsiz botiqlarni yo\'qotish (PDR)',
      pdrDesc: 'Bo\'yashsiz kuzovni tiklash',
      
      leatherRepair: 'Salon terisini ta\'mirlash',
      leatherRepairDesc: 'Teri interer elementlarini tiklash',
      
      atelierServices: 'Atele xizmatlari',
      atelierServicesDesc: 'Individual tikish va salonni qayta tortish'
    },
    additionalServices: {
      title: 'Qo\'shimcha xizmatlar',
      subtitle: 'Avtomobilingiz uchun professional parvarish xizmatlarining to\'liq assortimenti',
      time: 'Vaqt',
      price: 'Narx',
      getConsultation: 'Maslahat olish',
      
      ceramicBodyTitle: 'Kuzovni keramik qoplama',
      ceramicBodyDesc: 'Sirtni yanada mustahkam, yorqin va tashqi ta\'sirlarga chidamli qiladigan himoya qatlami.',
      ceramicBodyDetail1: 'Tirnash va kimyoviy moddalardan himoya',
      ceramicBodyDetail2: 'Ultrabinafsha nurlariga chidamlilik',
      ceramicBodyDetail3: 'Uzoq muddatli himoya',
      ceramicBodyDetail4: 'Estetik yorqinlik',
      ceramicBodyTime: '5 soatdan',
      
      autoElectricianTitle: 'Avtoelektrik xizmatlari',
      autoElectricianDesc: 'Professional avtoelektrik xizmatlarining keng assortimenti.',
      autoElectricianDetail1: 'Elektr jihozlarini diagnostika qilish',
      autoElectricianDetail2: 'Simlarni ta\'mirlash va almashtirish',
      autoElectricianDetail3: 'Signalizatsiya va kameralar o\'rnatish',
      autoElectricianDetail4: 'Multimedia tizimlari bilan ishlash',
      autoElectricianTime: 'individual',
      
      detailingWashEngineTitle: 'Dvigatel bo\'shlig\'ini deteyling yuvish',
      detailingWashEngineDesc: 'Maxsus vositalar yordamida dvigatel bo\'limini professional tozalash.',
      detailingWashEngineDetail1: 'Korroziyadan himoya',
      detailingWashEngineDetail2: 'Elektronikaning barqaror ishlashi',
      detailingWashEngineDetail3: 'Xizmat ko\'rsatish qulayligi',
      detailingWashEngineDetail4: 'Hidlarning oldini olish',
      detailingWashEngineTime: '7-12 soat',
      
      detailingWashArchesTitle: 'Arklarni deteyling yuvish',
      detailingWashArchesDesc: 'G\'ildirak arkalari ichki sirtlarini professional tozalash.',
      detailingWashArchesDetail1: 'Kirlar va reagentlarni olib tashlash',
      detailingWashArchesDetail2: 'Korroziyadan himoya',
      detailingWashArchesDetail3: 'Zanglashning oldini olish',
      detailingWashArchesDetail4: 'Bo\'yoq qoplamasini saqlash',
      detailingWashArchesTime: '8-12 soat',
      
      detailingWashBottomTitle: 'Tubni deteyling yuvish',
      detailingWashBottomDesc: 'Korroziyadan himoya qilish uchun kuzovning pastki qismini professional tozalash.',
      detailingWashBottomDetail1: 'Tuz va reagentlarni olib tashlash',
      detailingWashBottomDetail2: 'Korroziyadan himoya',
      detailingWashBottomDetail3: 'Xizmat muddatini uzaytirish',
      detailingWashBottomDetail4: 'Texnik holatni ko\'zdan kechirish',
      detailingWashBottomTime: '8-12 soat'
    },
    benefits: {
      title: 'Nima uchun bizni tanlashadi',
      subtitle: 'Bizning afzalliklarimiz va sifat kafolatlari',
      
      professionalEquipment: 'Professional uskunalar',
      professionalEquipmentDesc: 'Zamonaviy uskunalar va premium-sinf texnologiyalardan foydalanamiz',
      
      experiencedMasters: 'Tajribali ustalar',
      experiencedMastersDesc: 'Ko\'p yillik tajribaga ega sertifikatlangan mutaxassislar jamoasi',
      
      qualityMaterials: 'Sifatli materiallar',
      qualityMaterialsDesc: 'Faqat tekshirilgan brendlar va asl materiallar bilan ishlaymiz',
      
      guarantee: 'Sifat kafolati',
      guaranteeDesc: 'Barcha bajarilgan ishlar uchun kafolat beramiz',

      individualApproach: 'Individual yondashuv',
      individualApproachDesc: 'Har bir avtomobil uchun shaxsiy yechim ishlab chiqamiz',

      satisfiedClients: 'Mamnun mijozlar',
      satisfiedClientsDesc: '500 dan ortiq doimiy mijozlar avtomobillarini bizga ishonib topshirishadi'
    },
    gallery: {
      title: 'Bizning ishlarimiz',
      subtitle: 'Bajarilgan loyihalar namunalari'
    },
    mediaGallery: {
      header: 'Ko\'rib chiqing, qanday ishlaymiz va qanday natija olamiz',
      before: 'Oldidan',
      after: 'Keyin',
      moreWorks: 'Instagramimizda ko\'proq ishlar',
      views: 'ko\'rganlar'
    },
    videoSection: {
      title: 'Natijalar,',
      titleHighlight: 'o\'zlari gapiradi',
      subtitle: 'Ustalarimizning haqiqiy ishlarini ko\'ring',
      views: 'ko\'rganlar',
      
      reel1Title: 'Jilolash jarayoni',
      reel2Title: 'PPF xavf zonalarini himoya qilish',
      reel3Title: 'Interer deteylingi',
      reel4Title: 'Keramika 9H',
      reel5Title: 'Yakuniy ishlov berish'
    },
    contact: {
      title: 'Biz bilan bog\'laning',
      subtitle: 'Xizmatga yozilish yoki savol berish',
      name: 'Ismingiz',
      phone: 'Telefon raqami',
      service: 'Xizmatni tanlang',
      selectService: 'Xizmatni tanlang',
      send: 'Arizani yuborish',
      sending: 'Yuborilmoqda...',
      
      formTitle: 'Deteylingga yozilish',
      formSubtitle: 'Ariza qoldiring va 5 daqiqa ichida maslahat oling',
      nameLabel: 'Ismingiz *',
      namePlaceholder: 'Masalan: Aziz',
      phoneLabel: 'Telefon raqami *',
      phonePlaceholder: '+998 90 123 45 67',
      serviceLabel: 'Qiziqtirgan xizmat',
      
      serviceOption1: 'Kuzovni PPF yopishtirish',
      serviceOption2: 'Keramik himoya',
      serviceOption3: 'Deteyling jilolash',
      serviceOption4: 'Salonni kimyoviy tozalash',
      serviceOption5: 'Oynalarni tonlash',
      serviceOption6: 'Boshqa',
      
      contactTitle: 'Biz bilan bog\'laning',
      telegram: 'Telegram',
      instagram: 'Instagram',
      phoneTitle: 'Telefon',
      infoText: 'Qulay aloqa usulini tanlang. Biz 5 daqiqa ichida javob beramiz va O\'zR "Shaxsiy ma\'lumotlar to\'g\'risida"gi Qonuniga (№ ЗРУ-547 02.07.2019 yil) muvofiq ma\'lumotlaringizning maxfiyligini kafolatlaymiz',
      
      addressTitle: 'Manzil va ish vaqti',
      address: 'Manzil',
      addressValue: 'Toshkent sh., Boku ko\'chasi 179A',
      addressLandmark: 'Mo\'ljal: Legion do\'koni',
      schedule: 'Ish tartibi',
      scheduleValue: 'Du-Sha: 10:00 - 19:00',
      scheduleValue2: 'Yakshanba - dam olish',
      
      successTitle: 'Ariza yuborildi!',
      successMessage: 'Biz 5 daqiqa ichida siz bilan bog\'lanamiz',
      successMessageShort: 'Biz tez orada siz bilan bog\'lanamiz',
      errorTitle: 'Xato',
      errorMessage: 'Arizani yuborib bo\'lmadi. Keyinroq urinib ko\'ring',
      errorMessageAlt: 'Qo\'ng\'iroq qiling yoki Telegramda yozing',
      consentRequired: 'Rozillik talab qilinadi',
      consentMessage: 'Iltimos, shaxsiy ma\'lumotlarni qayta ishlashga roziligingizni tasdiqlang',
      
      privacyText: 'Tugmani bosish orqali siz rozilik bildirasiz',
      privacyLink: 'maxfiylik siyosati',
      privacyConsent: 'Men Cartello Detailing Centre\'ga shaxsiy ma\'lumotlarimni (ism, telefon raqami) arizani qayta ishlash va men bilan bog\'lanish maqsadida',
      privacyPolicy: 'Maxfiylik siyosati',
      privacyLaw: 'va O\'zR "Shaxsiy ma\'lumotlar to\'g\'risida"gi Qonuni (№ ЗРУ-547 02.07.2019 yil) bo\'yicha qayta ishlashga roziman'
    },
    footer: {
      description: 'Ishonchli deteyling markazingiz.',
      founded: '2023 yilda tashkil etilgan',
      servicesTitle: 'Xizmatlar',
      
      service1: 'Kuzovni yopishtirish (PPF)',
      service2: 'Keramik himoya',
      service3: 'Kuzovni jilolash',
      service4: 'Salonni kimyoviy tozalash',
      service5: 'Oynalarni tonlash',
      service6: 'Avtoelektrik',
      
      contactTitle: 'Aloqa',
      address: 'Boku ko\'chasi 179 A, Toshkent',
      scheduleTitle: 'Ish tartibi',
      scheduleDays: 'Dushanba - Shanba',
      scheduleTime: '10:00 - 19:00',
      scheduleSunday: 'Yakshanba - dam olish',
      rights: '© 2026 Cartello. Barcha huquqlar himoyalangan',
      cookiePolicy: 'Cookie siyosati',
      privacyPolicy: 'Maxfiylik siyosati'
    },
    floatingCTA: {
      book: 'Yozilish',
      onService: 'xizmatga'
    },
    backToTop: {
      title: 'Yuqoriga'
    },
    cookieBanner: {
      message: 'Biz tajribangizni yaxshilash uchun cookie-lardan foydalanamiz. Saytdan foydalanishni davom ettirib, siz bizning',
      policy: 'cookie siyosati',
      accept: 'Qabul qilish',
      decline: 'Rad etish'
    },
    cookiePolicy: {
      title: 'Cookie-lardan foydalanish siyosati',
      content: `Ushbu veb-sayt foydalanuvchi tajribasini yaxshilash uchun cookie-lardan foydalanadi...`
    },
    privacyPolicy: {
      title: 'Maxfiylik siyосати',
      content: `Sizning shaxsiy ma\'lumotlaringizni himoya qilish bizning ustuvor vazifamizdir...`
    },
    bookingModal: {
      title: 'Ariza qoldirish',
      subtitle: 'Formani to\'ldiring va biz siz bilan bog\'lanamiz',
      name: 'Ismingiz *',
      phone: 'Telefon *',
      email: 'Email',
      comment: 'Izoh',
      send: 'Arizani yuborish',
      cancel: 'Bekor qilish',
      sending: 'Yuborilmoqda...',
      call: 'Qo\'ng\'iroq qilish',
      telegram: 'Telegram',
      privacyText: 'Tugmani bosish orqali siz maxfiylik siyosati bilan rozilik bildirasiz'
    }
  }
};