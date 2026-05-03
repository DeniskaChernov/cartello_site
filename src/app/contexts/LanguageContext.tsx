import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  useEffect(() => {
    document.documentElement.lang = language === 'uz' ? 'uz' : 'ru';
  }, [language]);

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
      phone: '95 835 01 10',
      logoAria: 'Cartello — на главную',
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
      /** Две части заголовка — градиент только на второй (корректно для любого языка) */
      headingLead: 'Наши',
      headingAccent: 'услуги',
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
      ppfDesc: 'Оклейка полиуретановой пленкой создает прочный защитный слой, который бережет лакокрасочное покрытие от сколов, песка и агрессивной среды.',
      ppfPrice: 'от 2.400.000 сум',
      
      tinting: 'Тонирование стекол',
      tintingDesc: 'Профессиональное тонирование стекол повышает комфорт в салоне, защищает от ультрафиолетовых лучей и придает автомобилю более выразительный вид.',
      tintingPrice: 'от 780.000 сум',
      
      // Other Services
      ceramicCoating: 'Покрытие кузова керамическим составом',
      ceramicCoatingDesc: 'Керамика усиливает глубину цвета, добавляет зеркальный блеск, гидрофобный эффект и защищает от ультрафиолетовых лучей, грязи и реагентов.',
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
      pdrServiceDesc: 'Выпрямление вмятин без покраски. Сохраняем заводское лакокрасочное покрытие и первоначальный вид автомобиля.',
      pdrServicePrice: 'от 190.000 сум',
      
      interiorCeramic: 'Керамическое покрытие для интерьера',
      interiorCeramicDesc: 'Керамика интерьера создает невидимый защитный слой, уменьшая воздействие грязи и ультрафиолета.',
      interiorCeramicPrice: 'от 590.000 сум',
      
      engineWash: 'Детейлинг мойка подкапотного пространства',
      engineWashDesc: 'Бережная очистка подкапотного пространства. Устранение загрязнения без риска для электроники и узлов автомобиля.',
      engineWashPrice: 'от 990.000 сум',
      
      wheelArchWash: 'Детейлинг мойка колесных арок и подвески',
      wheelArchWashDesc: 'Детейлинг мойка колесных арок и подвески позволяет полностью удалить грязь из труднодоступных зон и поддерживать чистоту узлов подвески.',
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
      windshieldProtectionDesc: 'Специальная пленка защищает лобовое стекло от сколов и появления трещин и помогает избежать дорогостоящей замены.',
      
      plasticProtection: 'Защита интерьерных деталей',
      plasticProtectionDesc: 'Прозрачное покрытие сохраняет внешний вид пластика и декоративных элементов салона и защищает их от повседневных повреждений.',
      
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
      professionalEquipmentDesc: 'Используем современное оборудование и материалы премиум-класса',
      
      experiencedMasters: 'Опытные мастера',
      experiencedMastersDesc: 'Команда профессиональных специалистов с многолетним опытом',
      
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
      views: 'просмотров',
      watchReel: 'Смотреть рилс',
      reel1Title: 'Cartello Detailing Centre',
      reel1Subtitle: 'Студия и стандарты сервиса',
      reel1Tag: 'О студии',
      reel2Title: 'G63 на СПА-процедурах',
      reel2Subtitle: 'Cartello — нам доверяют',
      reel2Tag: 'Детейлинг',
      reel3Title: 'Mercedes GLE 450',
      reel3Subtitle: 'Качество и доверие',
      reel3Tag: 'Полировка',
      reel4Title: 'BMW i5 — комплекс услуг',
      reel4Subtitle: 'С душой к каждому автомобилю',
      reel4Tag: 'Комплекс',
      reel5Title: 'Антигравийная защита',
      reel5Subtitle: 'Своевременная защита кузова',
      reel5Tag: 'Антигравий',
      gallery1Title: 'Mercedes-Benz S-Class',
      gallery1Service: 'Полировка + керамика',
      gallery2Title: 'BMW X5',
      gallery2Service: 'Оклейка PPF',
      gallery3Title: 'Audi A8',
      gallery3Service: 'Химчистка салона',
      gallery4Title: 'Porsche Cayenne',
      gallery4Service: 'Тонировка стёкол',
      gallery5Title: 'Range Rover',
      gallery5Service: 'Полная защита',
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
      facadePhotoAlt: 'Фасад Cartello Detailing Centre в Ташкенте',
      
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
      onService: 'на услугу',
      bookFull: 'Записаться на услугу',
    },
    backToTop: {
      title: 'Наверх'
    },
    cookieBanner: {
      message: 'Мы используем cookies для улучшения вашего опыта. Продолжая использовать сайт, вы соглашаетесь с нашей',
      policy: 'политикой cookies',
      accept: 'Принять',
      decline: 'Отклонить',
      stickyTitle: 'Файлы cookie',
      stickyDescription:
        'Мы используем cookie для улучшения работы сайта, анализа посещаемости и персонализации контента.',
      stickyMore: 'Подробнее',
    },
    cookiePolicy: {
      title: 'Политика использования файлов cookies',
      brand: 'CARTELLO GROUP',
      intro: 'Настоящая Политика использования файлов cookies объясняет, какие cookies используются на сайте Cartello Group, для каких целей и каким образом пользователь может управлять их использованием.',
      s1Title: '1. Что такое cookies',
      s1Body: 'Cookies — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении сайта. Они позволяют сайту корректно работать, запоминать настройки пользователя и улучшать качество сервиса.',
      s2Title: '2. Какие cookies мы используем',
      s2Body: 'На сайте Cartello Group могут использоваться следующие виды cookies:',
      s2_1Title: '2.1. Обязательные cookies',
      s2_1Body: 'Необходимы для корректной работы сайта и его функций. Без них сайт может работать некорректно.',
      s2_2Title: '2.2. Аналитические cookies',
      s2_2Body: 'Используются для сбора обезличенной статистики о посещении сайта (страницы, время пребывания, источники перехода). Это помогает улучшать структуру и контент сайта.',
      s2_3Title: '2.3. Функциональные cookies',
      s2_3Body: 'Позволяют запоминать выборы пользователя (язык, настройки, предпочтения) для более удобного использования сайта.',
      s2_4Title: '2.4. Маркетинговые cookies',
      s2_4Body: 'Могут использоваться для показа релевантной рекламы и оценки эффективности рекламных кампаний (в том числе через сторонние сервисы).',
      s3Title: '3. Использование сторонних сервисов',
      s3Body: 'На сайте могут применяться сторонние инструменты аналитики и рекламы, которые также используют cookies в соответствии со своими политиками конфиденциальности.',
      s4Title: '4. Управление cookies',
      s4Lead: 'Пользователь может:',
      s4_1: 'изменить настройки cookies в браузере;',
      s4_2: 'удалить ранее сохранённые cookies;',
      s4_3: 'полностью отключить использование cookies.',
      s4Note: '⚠️ Обратите внимание, что отключение cookies может повлиять на корректность работы сайта.',
      s5Title: '5. Согласие пользователя',
      s5Body: 'Продолжая использовать сайт Cartello Group, пользователь подтверждает согласие на использование файлов cookies в соответствии с настоящей Политикой.',
      s6Title: '6. Изменения политики cookies',
      s6Body: 'Компания вправе вносить изменения в настоящую Политику без предварительного уведомления. Актуальная версия всегда доступна на сайте.',
      s7Title: '7. Контактная информация',
      s7Lead: 'По вопросам, связанным с использованием cookies, пользователь может обратиться:',
      phoneLabel: 'Телефон',
      instagramLabel: 'Instagram',
      addressLabel: 'Адрес',
      address: 'г. Ташкент, ул. Баку 179А',
      close: 'Понятно'
    },
    privacyPolicy: {
      title: 'Политика конфиденциальности',
      brand: 'CARTELLO GROUP',
      intro: 'Настоящая Политика конфиденциальности определяет порядок сбора, хранения, обработки и защиты персональных данных пользователей, которые предоставляются при использовании сайта, социальных сетей и сервисов компании Cartello Group (далее — Компания).',
      s1Title: '1. Общие положения',
      s1_1: 'Компания уважает право пользователей на неприкосновенность личной информации и обеспечивает защиту персональных данных в соответствии с законодательством Республики Узбекистан.',
      s1_2: 'Используя сайт, социальные сети или иные сервисы Компании, пользователь выражает согласие с условиями настоящей Политики конфиденциальности.',
      s1_3: 'В случае несогласия с условиями Политики пользователь должен прекратить использование сервисов Компании.',
      s2Title: '2. Персональные данные, которые мы собираем',
      s2Lead: 'Компания может собирать следующие данные:',
      s2_1: 'имя и фамилия;',
      s2_2: 'номер телефона;',
      s2_3: 'данные мессенджеров и социальных сетей (Instagram, Telegram, WhatsApp и др.);',
      s2_4: 'информация об автомобиле (марка, модель, год выпуска) при обращении за услугами;',
      s2_5: 'иные данные, добровольно предоставленные пользователем через формы, сообщения или звонки.',
      s3Title: '3. Цели обработки персональных данных',
      s3Lead: 'Персональные данные используются исключительно для:',
      s3_1: 'обработки заявок и обращений;',
      s3_2: 'связи с пользователем и предоставления консультаций;',
      s3_3: 'оказания услуг автодетейлинга;',
      s3_4: 'улучшения качества сервиса;',
      s3_5: 'информирования об акциях, услугах и специальных предложениях (при согласии пользователя).',
      s4Title: '4. Правовые основания обработки',
      s4Lead: 'Обработка персональных данных осуществляется на основании:',
      s4_1: 'добровольного согласия пользователя;',
      s4_2: 'необходимости исполнения обязательств перед пользователем;',
      s4_3: 'требований законодательства Республики Узбекистан.',
      s5Title: '5. Условия хранения и защиты данных',
      s5_1: 'Компания принимает все разумные технические и организационные меры для защиты персональных данных от утраты, неправомерного доступа, изменения или раскрытия.',
      s5_2: 'Доступ к персональным данным имеют только уполномоченные сотрудники Компании.',
      s5_3: 'Персональные данные хранятся не дольше, чем это необходимо для целей их обработки.',
      s6Title: '6. Передача персональных данных третьим лицам',
      s6_1Lead: 'Компания не передает персональные данные третьим лицам, за исключением случаев:',
      s6_1_1: 'когда это необходимо для оказания услуг пользователю;',
      s6_1_2: 'по требованию уполномоченных государственных органов в рамках законодательства;',
      s6_1_3: 'при наличии согласия пользователя.',
      s6_2: 'Компания не осуществляет продажу или обмен персональных данных.',
      s7Title: '7. Использование файлов cookie и аналитики',
      s7_1: 'Сайт может использовать файлы cookie и инструменты аналитики для улучшения работы сервиса и пользовательского опыта.',
      s7_2: 'Пользователь может изменить настройки cookie в своем браузере.',
      s8Title: '8. Права пользователя',
      s8Lead: 'Пользователь имеет право:',
      s8_1: 'получать информацию о своих персональных данных;',
      s8_2: 'требовать их уточнения, обновления или удаления;',
      s8_3: 'отозвать согласие на обработку персональных данных, направив запрос Компании.',
      s9Title: '9. Изменения политики конфиденциальности',
      s9Body: 'Компания вправе вносить изменения в настоящую Политику без предварительного уведомления. Актуальная версия всегда доступна на сайте Компании.',
      s10Title: '10. Контактная информация',
      s10Lead: 'По вопросам, связанным с обработкой персональных данных, пользователь может обратиться к Компании:',
      phoneLabel: 'Телефон',
      instagramLabel: 'Instagram',
      addressLabel: 'Адрес',
      address: 'г. Ташкент, ул. Баку 179А',
      close: 'Понятно'
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
      phone: '95 835 01 10',
      logoAria: 'Cartello — bosh sahifaga',
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
      headingLead: 'Bizning',
      headingAccent: 'xizmatlarimiz',
      subtitle: 'Sifatli deteyling xizmatlarining to\'liq spektri',
      priceFrom: 'dan',
      priceOnRequest: 'Narx so\'rov bo\'yicha',
      more: 'Batafsil',
      badge: 'Hit',
      badgeOnRequest: 'So\'rov bo\'yicha',
      
      // Featured Services
      polishing: 'Kuzovni jilolash',
      polishingDesc: 'Rangning to‘yinishini va ko‘zgu dayoq porloqni tiklaymiz, avtomobil tashqi ko‘rinishini buzadigan nuqsonlardan xalos qilamiz.',
      polishingPrice: '1.500.000 so\'mdan',
      
      ppf: 'Antigraviy plyonka',
      ppfDesc:
        'Poliuretan plyonka bilan qoplash mustahkam himoya qatlami yaratadi: lak-bo‘yoq qoplamasini chipish, qum va agressiv muhitdan saqlaydi.',
      ppfPrice: '2.400.000 so\'mdan',
      
      tinting: 'Oynalarni tonlash',
      tintingDesc:
        'Professional oyna tonlash salondagi qulaylikni oshiradi, ultrabinafsha nurlardan himoya qiladi va avtomobilga ifodaliroq ko‘rinish beradi.',
      tintingPrice: '780.000 so\'mdan',
      
      // Other Services
      ceramicCoating: 'Kuzovni keramik qoplama',
      ceramicCoatingDesc: 'Keramika rang chuqurligini oshiradi, kuzovga ko\'zguday porloqlik va gidrofob ta\'sir beradi, ultrabinafsha nurlar, kir va reagentlardan himoya qiladi.',
      ceramicCoatingPrice: '1.750.000 so\'mdan',
      
      detailingWash: 'Deteyling yuvish',
      detailingWashDesc: 'Deteyling yuvish — kuzov va saloni har bir detaliga e’tibor bilan ehtiyotkor va xavfsiz tozalash.',
      detailingWashPrice: '480.000 so\'m',
      
      interiorCleaning: 'Salonni kimyoviy tozalash',
      interiorCleaningDesc: 'Professional salon kimyoviy tozalashi ifloslanish va yoqimsiz hidlarni, interyer materiallariga xavf tug‘dirmasdan bartaraf etadi; salonga yangilik va tartibli ko‘rinish qaytariladi.',
      interiorCleaningPrice: '1.200.000 so\'mdan',
      
      soundproofing: 'Shovqin izolyatsiyasi',
      soundproofingDesc: 'Professional shovqin izolyatsiyasi tebranish va ortiqcha ovozlarni kamaytiradi, akustik qulaylikni oshiradi va salonda yoqimli muhit yaratadi.',
      soundproofingPrice: '3.900.000 so\'mdan',
      
      pdrService: 'Botiqlarni yo\'qotish (PDR)',
      pdrServiceDesc: 'Botiqlarni bo\'yamasdan to\'g\'rilash. Zavod lak-bo\'yoq qoplamasini va avtomobilning dastlabki ko\'rinishini saqlab qolamiz.',
      pdrServicePrice: '190.000 so\'mdan',
      
      interiorCeramic: 'Interyer uchun keramik qoplama',
      interiorCeramicDesc: 'Interyer keramikasi ko‘rinmas himoya qatlami hosil qiladi, ifloslanish va ultrabinafsha taʼsiridan saqlaydi.',
      interiorCeramicPrice: '590.000 so\'mdan',
      
      engineWash: 'Motor bo‘shlig‘ini deteyling yuvish',
      engineWashDesc: 'Motor bo‘shlig‘ini ehtiyotkorlik bilan tozalash. Elektronika va uzelarga xavf tug‘dirmasdan ifloslanishni bartaraf etish.',
      engineWashPrice: '990.000 so\'mdan',
      
      wheelArchWash: 'G\'ildirak arkalari va osma deteyling yuvish',
      wheelArchWashDesc: 'G\'ildirak arkalari va osma deteyling yuvishi qiyin yetib boriladigan joylardagi kirlarni to\'liq tozalash va osma tugunlarini toza saqlash imkonini beradi.',
      wheelArchWashPrice: '990.000 so\'mdan',
      
      undercarriageWash: 'Avtomobil tubini deteyling yuvish',
      undercarriageWashDesc:
        'Tubning ehtiyotkor tozalashi qiyin joylardan iflos va cho‘kmalarni olib tashlaydi, avtomobilning tartibli holatini saqlaydi va elementlarining xizmat muddatini uzaytirishga yordam beradi.',
      undercarriageWashPrice: '1.490.000 so\'mdan',
      
      autoElectric: 'Avtoelektrik xizmatlari',
      autoElectricDesc: 'Avtomobil elektron tizimlarini diagnostika va ta‘mirlash; barqaror va xavfsiz ishlashini ta’minlash.',
      
      evRepair: 'Elektromobillarni ta\'mirlash',
      evRepairDesc: 'Elektromobillarga texnik xususiyatlarini inobatga olgan holda xizmat: nosozliklarni bartaraf etish va tizimlarning to‘g‘ri ishlashini tiklash.',
      
      audioInstall: 'Akustikani o‘rnatish',
      audioInstallDesc: 'Professional audio tizimlarini o‘rnatish ovoz sifatini ochadi va har bir sayohatni yoqimliroq qiladi.',
      
      bodywork: 'Kuzov va bo‘yoq ishlari',
      bodyworkDesc: 'Har qanday murakkablikdagi professional kuzov va bo‘yoq ishlari: shikastlanishlarni tiklashdan kosmetik ta‘mirlashgacha.',
      
      windshieldProtection: 'Loboviy oyna himoya',
      windshieldProtectionDesc:
        'Maxsus plyonka loboviy oynani chipish va yoriqlardan himoya qiladi, qimmatbaho almashtirish ehtiyojining oldini oladi.',
      
      plasticProtection: 'Interyer detallarini himoya qilish',
      plasticProtectionDesc: 'Shaffof qoplama plastik va salonning dekorative elementlarining tashqi ko\'rinishini saqlab qoladi va ularni kundalik shikastlanishlardan himoya qiladi.',
      
      atelierService: 'Atelye xizmatlari',
      atelierServiceDesc: 'Atelye xizmatlari saloni afzalliklaringiz va uslubingizni hisobga olgan holda yangilash va shaxsiylashtirish imkonini beradi.',
      
      ppfBody: 'Kuzovni yopishtirish (PPF)',
      ppfBodyDesc: 'Avtomobil kuzovi uchun himoya poliuretan plyonkasi',
      
      ppfHeadlights: 'Faralarni yopishtirish (PPF)',
      ppfHeadlightsDesc: 'Optikani chizilish va xiralashuvdan himoya qilish',
      
      ppfMirrors: 'Oynalarni yopishtirish (PPF)',
      ppfMirrorsDesc: 'Yon oynalarni tirnalishdan himoya qilish',
      
      ceramicBody: 'Kuzovni keramik himoya',
      ceramicBodyDesc: 'Bo\'yoq qoplamasining uzoq muddatli himoyasi',
      
      ceramicInterior: 'Interyer uchun keramik qoplama',
      ceramicInteriorDesc: 'Salonni ifloslanish va eskirishdan himoya qilish',
      
      ceramicGlass: 'Oynalarni keramik himoya',
      ceramicGlassDesc: 'Oynalar uchun suv qaytaruvchi qoplama',
      
      polishingBody: 'Kuzovni jilolash',
      polishingBodyDesc: 'Bo\'yoq qoplamasining yorqinligini tiklash',
      
      polishingHeadlights: 'Faralarni jilolash',
      polishingHeadlightsDesc: 'Optika shaffofligini tiklash',
      
      detailingWashExterior: 'Kuzovni deteyling yuvish',
      detailingWashExteriorDesc: 'Avtomobilni professional ehtiyotkorlik bilan yuvish',
      
      detailingWashEngine: 'Motor bo‘shlig‘ini deteyling yuvish',
      detailingWashEngineDesc: 'Motor bo‘limini professional tozalash',
      
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
      leatherRepairDesc: 'Interyerdagi teri elementlarini tiklash',
      
      atelierServices: 'Atelye xizmatlari',
      atelierServicesDesc: 'Individual tikish va salonni qayta bezash'
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
      autoElectricianTime: 'individual tarzda',
      
      detailingWashEngineTitle: 'Motor bo‘shlig‘ini deteyling yuvish',
      detailingWashEngineDesc: 'Maxsus vositalar yordamida motor bo‘limini professional tozalash.',
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
      title: 'Nima uchun bizni tanlaydilar?',
      subtitle: 'Bizning afzalliklarimiz va sifat kafolatlari',
      
      professionalEquipment: 'Professional uskunalar',
      professionalEquipmentDesc: 'Zamonaviy uskunalar va premium-sinf materiallardan foydalanamiz',
      
      experiencedMasters: 'Tajribali ustalar',
      experiencedMastersDesc: 'Ko\'p yillik tajribaga ega professional mutaxassislar jamoasi',
      
      qualityMaterials: 'Sifatli materiallar',
      qualityMaterialsDesc: 'Faqat tekshirilgan brendlar va asl materiallar bilan ishlaymiz',
      
      guarantee: 'Sifat kafolati',
      guaranteeDesc: 'Barcha bajarilgan ishlar uchun kafolat beramiz',

      individualApproach: 'Individual yondashuv',
      individualApproachDesc: 'Har bir avtomobil uchun shaxsiy yechim ishlab chiqamiz',

      satisfiedClients: 'Mamnun mijozlar',
      satisfiedClientsDesc:
        '500 dan ortiq doimiy mijoz avtomobillarini ishonch bilan bizga topshiradi',
    },
    gallery: {
      title: 'Bizning ishlarimiz',
      subtitle: 'Bajarilgan loyihalar namunalari'
    },
    mediaGallery: {
      header: 'Qanday ishlayotganimiz va qanday natija berayotganimizni ko‘ring',
      before: 'Oldin',
      after: 'Keyin',
      moreWorks: 'Instagramimizda yanada ko‘p ishlar',
      views: 'ko‘rish',
      watchReel: 'Rilsni koʻrish',
      reel1Title: 'Cartello Detailing Centre',
      reel1Subtitle: 'Studiya va xizmat standartlari',
      reel1Tag: 'Studiya',
      reel2Title: 'G63 SPA jarayonlarida',
      reel2Subtitle: 'Cartello — mijozlar bizga ishonadi',
      reel3Title: 'Mercedes GLE 450',
      reel3Subtitle: 'Sifat va ishonch',
      reel3Tag: 'Jilolash',
      reel4Title: 'BMW i5 — kompleks xizmatlar',
      reel4Subtitle: 'Har avtomobilga mehr bilan',
      reel4Tag: 'Kompleks',
      reel5Title: 'Antigraviy himoya',
      reel5Subtitle: 'O‘z vaqtida kuzov himoyasi',
      reel5Tag: 'Antigraviy',
      gallery1Title: 'Mercedes-Benz S-Class',
      gallery1Service: 'Jilolash + keramika',
      gallery2Title: 'BMW X5',
      gallery2Service: 'PPF yopishtirish',
      gallery3Title: 'Audi A8',
      gallery3Service: 'Salonni kimyoviy tozalash',
      gallery4Title: 'Porsche Cayenne',
      gallery4Service: 'Oynalarni tonlash',
      gallery5Title: 'Range Rover',
      gallery5Service: 'To‘liq himoya',
    },
    videoSection: {
      title: 'Natijalar',
      titleHighlight: 'gapirishga hojat qoldirmaydi',
      subtitle: 'Ustalarimizning haqiqiy ishlarini tomosha qiling',
      views: 'martaba ko‘rilgan',
      
      reel1Title: 'Jilolash jarayoni',
      reel2Title: 'PPF: xavf zonalarini himoya qilish',
      reel3Title: 'Interyer deteylingi',
      reel4Title: 'Keramika 9H',
      reel5Title: 'Yakuniy ishlov'
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
      infoText:
        'Qulay aloqa usulini tanlang. Biz 5 daqiqa ichida javob beramiz va shaxsiy maʼlumotlaringizni Oʻzbekiston Respublikasi «Shaxsiy maʼlumotlar toʻgʻrisida»gi Qonuniga (№ ЗРУ-547, 02.07.2019) muvofiq maxfiy saqlashni kafolatlaymiz.',
      
      addressTitle: 'Manzil va ish vaqti',
      address: 'Manzil',
      addressValue: 'Toshkent sh., Boku ko\'chasi 179A',
      addressLandmark: 'Mo\'ljal: Legion do\'koni',
      schedule: 'Ish tartibi',
      scheduleValue: 'Du-Sha: 10:00 - 19:00',
      scheduleValue2: 'Yakshanba - dam olish',
      facadePhotoAlt: 'Toshkentdagi Cartello Detailing Centre fasadi',
      
      successTitle: 'Ariza yuborildi!',
      successMessage: 'Biz 5 daqiqa ichida siz bilan bog\'lanamiz',
      successMessageShort: 'Biz tez orada siz bilan bog\'lanamiz',
      errorTitle: 'Xato',
      errorMessage: 'Arizani yuborib bo\'lmadi. Keyinroq urinib ko\'ring',
      errorMessageAlt: 'Qo\'ng\'iroq qiling yoki Telegramda yozing',
      consentRequired: 'Rozilik talab qilinadi',
      consentMessage: 'Iltimos, shaxsiy maʼlumotlarni qayta ishlashga roziligingizni tasdiqlang',
      
      privacyText: 'Tugmani bosish orqali siz rozilik bildirasiz',
      privacyLink: 'maxfiylik siyosati',
      privacyConsent:
        'Men Cartello Detailing Centreʼga arizamni qayta ishlash va men bilan bogʻlanish maqsadida shaxsiy maʼlumotlarimni (ism, telefon raqami) quyidagilar boʻyicha qayta ishlashga rozilik beraman:',
      privacyPolicy: 'Maxfiylik siyosati',
      privacyLaw:
        'va Oʻzbekiston Respublikasining «Shaxsiy maʼlumotlar toʻgʻrisida»gi Qonuni (№ ЗРУ-547, 02.07.2019) boʻyicha.',
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
      onService: 'xizmatga',
      bookFull: 'Xizmatga yozilish',
    },
    backToTop: {
      title: 'Yuqoriga'
    },
    cookieBanner: {
      message:
        'Tajribangizni yaxshilash uchun cookie’dan foydalanamiz. Saytdan foydalanishni davom ettirsangiz, bizning',
      policy: 'cookie siyosatimiz',
      accept: 'Qabul qilish',
      decline: 'Rad etish',
      stickyTitle: 'Cookie-fayllar',
      stickyDescription:
        'Sayt ishlashini yaxshilash, tashriflar tahlili va kontentni shaxsiylashtirish uchun cookie’dan foydalanamiz.',
      stickyMore: 'Batafsil',
    },
    cookiePolicy: {
      title: 'Cookie fayllaridan foydalanish siyosati',
      brand: 'CARTELLO GROUP',
      intro: 'Ushbu Cookie fayllaridan foydalanish siyosati Cartello Group saytida qanday cookie\'lar ishlatilishini, ular qanday maqsadlarda qo\'llanilishini va foydalanuvchi ulardan foydalanishni qanday boshqarishi mumkinligini tushuntiradi.',
      s1Title: '1. Cookie nima',
      s1Body: 'Cookie\'lar — bu saytga tashrif buyurganda foydalanuvchining qurilmasida saqlanadigan kichik matnli fayllar. Ular sayt to\'g\'ri ishlashi, foydalanuvchi sozlamalarini eslab qolishi va xizmat sifatini yaxshilashga yordam beradi.',
      s2Title: '2. Biz qanday cookie\'lardan foydalanamiz',
      s2Body: 'Cartello Group saytida quyidagi turdagi cookie\'lar qo\'llanilishi mumkin:',
      s2_1Title: '2.1. Majburiy cookie\'lar',
      s2_1Body: 'Sayt va uning funksiyalarining to\'g\'ri ishlashi uchun zarur. Ularsiz sayt noto\'g\'ri ishlashi mumkin.',
      s2_2Title: '2.2. Tahliliy cookie\'lar',
      s2_2Body: 'Saytga tashrif haqida shaxsiylashtirilmagan statistikani yig\'ish uchun ishlatiladi (sahifalar, qolish vaqti, o\'tish manbalari). Bu sayt tuzilishi va tarkibini yaxshilashga yordam beradi.',
      s2_3Title: '2.3. Funksional cookie\'lar',
      s2_3Body: 'Saytdan qulayroq foydalanish uchun foydalanuvchining tanlovlarini (til, sozlamalar, afzalliklar) eslab qolishga imkon beradi.',
      s2_4Title: '2.4. Marketing cookie\'lari',
      s2_4Body: 'Tegishli reklamani ko\'rsatish va reklama kampaniyalari samaradorligini baholash uchun (shu jumladan uchinchi tomon xizmatlari orqali) ishlatilishi mumkin.',
      s3Title: '3. Uchinchi tomon xizmatlaridan foydalanish',
      s3Body: 'Saytda o\'z maxfiylik siyosatlariga muvofiq cookie\'lardan foydalanadigan uchinchi tomon tahlil va reklama vositalari qo\'llanilishi mumkin.',
      s4Title: '4. Cookie\'larni boshqarish',
      s4Lead: 'Foydalanuvchi:',
      s4_1: 'brauzerdagi cookie sozlamalarini o\'zgartirishi;',
      s4_2: 'avval saqlangan cookie\'larni o\'chirishi;',
      s4_3: 'cookie\'lardan foydalanishni butunlay o\'chirib qo\'yishi mumkin.',
      s4Note: '⚠️ E\'tibor bering, cookie\'larni o\'chirib qo\'yish saytning to\'g\'ri ishlashiga ta\'sir qilishi mumkin.',
      s5Title: '5. Foydalanuvchi roziligi',
      s5Body: 'Cartello Group saytidan foydalanishni davom ettirib, foydalanuvchi mazkur Siyosatga muvofiq cookie fayllaridan foydalanishga rozilik bildiradi.',
      s6Title: '6. Cookie siyosatidagi o\'zgartirishlar',
      s6Body: 'Kompaniya mazkur Siyosatga oldindan ogohlantirmasdan o\'zgartirishlar kiritish huquqiga ega. Joriy versiya har doim saytda mavjud.',
      s7Title: '7. Aloqa ma\'lumotlari',
      s7Lead: 'Cookie\'lardan foydalanish bo\'yicha savollar bo\'yicha foydalanuvchi quyidagi tarzda murojaat qilishi mumkin:',
      phoneLabel: 'Telefon',
      instagramLabel: 'Instagram',
      addressLabel: 'Manzil',
      address: 'Toshkent shahri, Boku ko\'chasi 179A',
      close: 'Tushundim'
    },
    privacyPolicy: {
      title: 'Maxfiylik siyosati',
      brand: 'CARTELLO GROUP',
      intro: 'Mazkur Maxfiylik siyosati Cartello Group kompaniyasi (keyingi o\'rinlarda — Kompaniya) saytidan, ijtimoiy tarmoqlardan va xizmatlaridan foydalanishda taqdim etiladigan foydalanuvchilarning shaxsiy ma\'lumotlarini yig\'ish, saqlash, qayta ishlash va himoya qilish tartibini belgilaydi.',
      s1Title: '1. Umumiy qoidalar',
      s1_1:
        'Kompaniya foydalanuvchilarning shaxsiy hayoti va shaxsiy maʼlumotlari maxfiqligi huquqini hurmat qiladi va ularning himoyasini Oʻzbekiston Respublikasi qonunchiligiga muvofiq taʼminlaydi.',
      s1_2: 'Saytdan, ijtimoiy tarmoqlardan yoki Kompaniyaning boshqa xizmatlaridan foydalangan holda foydalanuvchi mazkur Maxfiylik siyosati shartlariga rozilik bildiradi.',
      s1_3: 'Siyosat shartlariga rozi bo\'lmagan taqdirda foydalanuvchi Kompaniya xizmatlaridan foydalanishni to\'xtatishi shart.',
      s2Title: '2. Biz to\'playdigan shaxsiy ma\'lumotlar',
      s2Lead: 'Kompaniya quyidagi ma\'lumotlarni to\'plashi mumkin:',
      s2_1: 'ism va familiya;',
      s2_2: 'telefon raqami;',
      s2_3: 'messenjerlar va ijtimoiy tarmoqlar ma\'lumotlari (Instagram, Telegram, WhatsApp va boshq.);',
      s2_4: 'xizmatlarga murojaat qilishda avtomobil haqidagi ma\'lumot (markasi, modeli, ishlab chiqarilgan yili);',
      s2_5: 'foydalanuvchi tomonidan formalar, xabarlar yoki qo\'ng\'iroqlar orqali ixtiyoriy ravishda taqdim etilgan boshqa ma\'lumotlar.',
      s3Title: '3. Shaxsiy ma\'lumotlarni qayta ishlash maqsadlari',
      s3Lead: 'Shaxsiy ma\'lumotlar faqat quyidagi maqsadlarda foydalaniladi:',
      s3_1: 'arizalar va murojaatlarni qayta ishlash;',
      s3_2: 'foydalanuvchi bilan bog\'lanish va konsultatsiya berish;',
      s3_3: 'avtodeteyling xizmatlarini ko\'rsatish;',
      s3_4: 'xizmat sifatini yaxshilash;',
      s3_5: 'aksiyalar, xizmatlar va maxsus takliflar haqida xabar berish (foydalanuvchi roziligi bilan).',
      s4Title: '4. Qayta ishlashning huquqiy asoslari',
      s4Lead: 'Shaxsiy ma\'lumotlarni qayta ishlash quyidagilar asosida amalga oshiriladi:',
      s4_1: 'foydalanuvchining ixtiyoriy roziligi;',
      s4_2: 'foydalanuvchi oldidagi majburiyatlarni bajarish zarurati;',
      s4_3: 'Oʻzbekiston Respublikasi qonunchiligining talablari.',
      s5Title: '5. Ma\'lumotlarni saqlash va himoya qilish shartlari',
      s5_1: 'Kompaniya shaxsiy ma\'lumotlarni yo\'qotishdan, ruxsatsiz kirishdan, o\'zgartirishdan yoki oshkor qilishdan himoya qilish uchun barcha asosli texnik va tashkiliy choralarni ko\'radi.',
      s5_2: 'Shaxsiy ma\'lumotlarga faqat Kompaniyaning vakolatli xodimlari kirish huquqiga ega.',
      s5_3: 'Shaxsiy ma\'lumotlar ularni qayta ishlash maqsadlari uchun zarur bo\'lgan muddatdan ortiq saqlanmaydi.',
      s6Title: '6. Shaxsiy ma\'lumotlarni uchinchi shaxslarga uzatish',
      s6_1Lead: 'Kompaniya quyidagi hollardan tashqari shaxsiy ma\'lumotlarni uchinchi shaxslarga uzatmaydi:',
      s6_1_1: 'foydalanuvchiga xizmat ko\'rsatish uchun zarur bo\'lganda;',
      s6_1_2: 'qonunchilik doirasida vakolatli davlat organlari talabiga muvofiq;',
      s6_1_3: 'foydalanuvchining roziligi mavjud bo\'lganda.',
      s6_2: 'Kompaniya shaxsiy ma\'lumotlarni sotish yoki almashtirish bilan shug\'ullanmaydi.',
      s7Title: '7. Cookie fayllari va tahlilidan foydalanish',
      s7_1: 'Sayt xizmat va foydalanuvchi tajribasini yaxshilash uchun cookie fayllari va tahlil vositalaridan foydalanishi mumkin.',
      s7_2: 'Foydalanuvchi o\'z brauzerida cookie sozlamalarini o\'zgartirishi mumkin.',
      s8Title: '8. Foydalanuvchining huquqlari',
      s8Lead: 'Foydalanuvchi quyidagi huquqlarga ega:',
      s8_1: 'o\'zining shaxsiy ma\'lumotlari haqida ma\'lumot olish;',
      s8_2: 'ularni aniqlashtirish, yangilash yoki o\'chirishni talab qilish;',
      s8_3: 'Kompaniyaga so\'rov yuborib, shaxsiy ma\'lumotlarni qayta ishlashga rozilikni qaytarib olish.',
      s9Title: '9. Maxfiylik siyosatidagi o\'zgartirishlar',
      s9Body: 'Kompaniya mazkur Siyosatga oldindan ogohlantirmasdan o\'zgartirishlar kiritish huquqiga ega. Joriy versiya har doim Kompaniya saytida mavjud.',
      s10Title: '10. Aloqa ma\'lumotlari',
      s10Lead: 'Shaxsiy ma\'lumotlarni qayta ishlash bo\'yicha savollar bilan foydalanuvchi Kompaniyaga murojaat qilishi mumkin:',
      phoneLabel: 'Telefon',
      instagramLabel: 'Instagram',
      addressLabel: 'Manzil',
      address: 'Toshkent shahri, Boku ko\'chasi 179A',
      close: 'Tushundim'
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
      privacyText:
        'Tugmani bosish orqali siz maxfiylik siyosatiga rozilik bildirasiz',
    }
  }
};