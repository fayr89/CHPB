import type { SiteContent } from './types';

const LOGO_URL =
  'https://storage.readdy-site.link/project_files/dac7b5c1-5ea6-4978-906f-e0865bae6c6e/6e0b8e92-7eaf-472d-8825-64f314f1931c_Gemini_Generated_Image_nbmue2nbmue2nbmu.png';

// Initial content — mirrors the original hard-coded copy/images. The admin panel
// overrides these values; anything left unedited falls back to here.
export const defaultContent: SiteContent = {
  seo: {
    title:
      'Черным по белому — Порошковая покраска металла в Новосибирске | Качественная полимерная окраска',
    description:
      'Профессиональная порошковая покраска металла в Новосибирске. Современное оборудование, более 10000 выполненных заказов. Гарантия до 5 лет. Бесплатная консультация и расчёт стоимости.',
    keywords:
      'порошковая покраска металла, полимерная окраска, покраска металлоконструкций, покраска дисков, порошковое покрытие, Новосибирск',
    ogTitle: 'Черным по белому — Порошковая покраска металла в Новосибирске',
    ogDescription:
      'Профессиональная порошковая покраска металла. Качество, проверенное временем. Более 10 000 заказов с 2015 года.',
    ogImage:
      'https://readdy.ai/api/search-image?query=Warm%20industrial%20workshop%20interior%20with%20powder%20coated%20metal%20parts%20in%20various%20stages%2C%20large%20spray%20booth%20in%20background%2C%20professional%20workshop%20environment%20with%20warm%20amber%20lighting%2C%20organized%20industrial%20space%2C%20atmospheric%20photography%20with%20depth%20and%20texture%2C%20rich%20warm%20metallic%20tones&width=1200&height=630&seq=cta-bg-01&orientation=landscape',
  },
  brand: {
    logo: LOGO_URL,
    name: 'Черным по белому',
  },
  nav: {
    services: 'Услуги',
    gallery: 'Галерея',
    pricing: 'Прайс',
    reviews: 'Отзывы',
    contacts: 'Контакты',
    request: 'Заявка',
  },
  hero: {
    titleLine1: 'ПОРОШКОВАЯ',
    titleLine2: 'ПОКРАСКА',
    titleLine3: 'МЕТАЛЛА',
    subtitleLeft:
      'Профессиональная порошковая окраска металлических изделий любой сложности. Современное оборудование, богатая палитра цветов и текстур.',
    subtitleRight:
      'Работаем с 2015 года. Более 10 000 выполненных заказов. Гарантия качества на все виды покрытий до 5 лет.',
    videoUrl:
      'https://storage.readdy-site.link/project_files/dac7b5c1-5ea6-4978-906f-e0865bae6c6e/67aff0a6-b12e-45e7-aee9-295a6bb92ff4_IMG_7984_trimmed.mp4',
  },
  about: {
    title: 'ПОРОШКОВАЯ ПОКРАСКА — ЭТО НАДЁЖНОСТЬ И ДОЛГОВЕЧНОСТЬ',
    categories: ['Металлоконструкции', 'Автодиски', 'Декор'],
    serviceTag: 'Порошок',
    serviceTitle: 'Черным по белому — качество, проверенное временем',
    serviceDesc:
      'Мы используем только сертифицированные порошковые материалы ведущих производителей. Наша покрасочная камера позволяет обрабатывать изделия размером до 6 метров. Каждый этап контролируется специалистом с опытом более 10 лет.',
    boothImage:
      'https://readdy.ai/api/search-image?query=Professional%20powder%20coating%20spray%20booth%20in%20a%20modern%20industrial%20workshop%2C%20metal%20parts%20being%20sprayed%20with%20black%20powder%20by%20a%20worker%20in%20protective%20gear%2C%20bright%20industrial%20lighting%2C%20clean%20organized%20workspace%2C%20professional%20photography%20with%20shallow%20depth%20of%20field&width=1000&height=500&seq=about-booth-01&orientation=landscape',
    services: [
      {
        id: 'metal',
        tag: 'Металл',
        image:
          'https://readdy.ai/api/search-image?query=Industrial%20powder%20coating%20process%20on%20metal%20parts%20in%20a%20professional%20workshop%2C%20black%20metal%20frames%20hanging%20on%20conveyor%20system%2C%20clean%20industrial%20environment%20with%20bright%20lighting%2C%20professional%20photography%20with%20shallow%20depth%20of%20field%2C%20warm%20industrial%20tones%20and%20metallic%20textures&width=1200&height=800&seq=service-metal-01&orientation=landscape',
      },
      {
        id: 'powder',
        tag: 'Порошок',
        image:
          'https://readdy.ai/api/search-image?query=Close%20up%20view%20of%20colored%20powder%20coating%20material%20in%20various%20vibrant%20shades%20displayed%20on%20a%20workshop%20table%2C%20textured%20powder%20samples%20in%20black%20white%20and%20grey%20tones%2C%20industrial%20color%20palette%20swatches%2C%20professional%20product%20photography%20with%20soft%20lighting%20on%20neutral%20background&width=1200&height=800&seq=service-powder-02&orientation=landscape',
      },
      {
        id: 'polymer',
        tag: 'Полимер',
        image:
          'https://readdy.ai/api/search-image?query=Finished%20powder%20coated%20metal%20parts%20with%20smooth%20glossy%20polymer%20finish%20displayed%20on%20a%20minimal%20workshop%20shelf%2C%20perfectly%20coated%20metal%20brackets%20and%20automotive%20parts%2C%20professional%20studio%20lighting%20highlighting%20the%20smooth%20texture%2C%20clean%20industrial%20aesthetic%20with%20neutral%20background&width=1200&height=800&seq=service-polymer-03&orientation=landscape',
      },
    ],
  },
  features: {
    label: 'Почему выбирают нас',
    title: 'ПРЕИМУЩЕСТВА РАБОТЫ С НАМИ',
    items: [
      {
        id: 'warranty',
        icon: 'ri-shield-check-line',
        title: 'Гарантия 5 лет',
        description:
          'Мы уверены в качестве нашего покрытия и предоставляем расширенную гарантию на все виды работ. Покрытие сохраняет цвет и защитные свойства даже в агрессивных средах.',
      },
      {
        id: 'colors',
        icon: 'ri-palette-line',
        title: '500+ цветов и текстур',
        description:
          'Богатая палитра RAL: глянцевые, матовые, шагрень, муар, антик. Подберём точный оттенок под ваш проект. Возможна колеровка по образцу заказчика.',
      },
      {
        id: 'equipment',
        icon: 'ri-tools-line',
        title: 'Современное оборудование',
        description:
          'Автоматическая линия подготовки и покраски. Камера полимеризации с точным поддержанием температуры. Обрабатываем изделия длиной до 6 метров.',
      },
      {
        id: 'speed',
        icon: 'ri-time-line',
        title: 'Сроки от 1 дня',
        description:
          'Стандартный заказ выполняем за 1-3 рабочих дня. Срочные заказы — в день обращения. Работаем без выходных для вашего удобства.',
      },
      {
        id: 'eco',
        icon: 'ri-leaf-line',
        title: 'Экологичная технология',
        description:
          'Порошковая покраска не содержит растворителей и летучих органических соединений. Безопасно для окружающей среды и здоровья. Соответствует стандарту ISO 14001.',
      },
      {
        id: 'certified',
        icon: 'ri-award-line',
        title: 'Сертифицированные материалы',
        description:
          'Работаем с порошковыми красками ведущих мировых брендов: AkzoNobel, Tiger, Pulver. Каждая партия имеет паспорт качества и сертификат соответствия.',
      },
    ],
  },
  gallery: {
    title: 'НАШИ РАБОТЫ',
    items: [
      {
        id: 'wheels',
        title: 'Автомобильные диски R18',
        category: 'Авто',
        price: 'от 4 500 ₽',
        image:
          'https://readdy.ai/api/search-image?query=Four%20powder%20coated%20black%20matte%20automotive%20alloy%20wheels%20R18%20displayed%20on%20a%20minimal%20white%20studio%20background%2C%20perfectly%20finished%20with%20smooth%20dark%20coating%2C%20professional%20product%20photography%20with%20even%20lighting%2C%20clean%20industrial%20aesthetic&width=800&height=800&seq=gallery-wheels-01&orientation=squarish',
      },
      {
        id: 'gate',
        title: 'Металлические ворота',
        category: 'Конструкции',
        price: 'от 15 000 ₽',
        image:
          'https://readdy.ai/api/search-image?query=Elegant%20black%20powder%20coated%20metal%20gate%20with%20ornate%20design%20standing%20in%20a%20bright%20workshop%20setting%2C%20smooth%20matte%20finish%20on%20wrought%20iron%20style%20metalwork%2C%20professional%20photography%20with%20clean%20industrial%20background%20and%20natural%20lighting&width=800&height=800&seq=gallery-gate-02&orientation=squarish',
      },
      {
        id: 'moto',
        title: 'Рама мотоцикла',
        category: 'Мото',
        price: 'от 12 000 ₽',
        image:
          'https://readdy.ai/api/search-image?query=Custom%20powder%20coated%20motorcycle%20frame%20in%20satin%20black%20finish%20displayed%20on%20a%20minimal%20studio%20stand%2C%20smooth%20even%20coating%20on%20tubular%20steel%20structure%2C%20professional%20product%20photography%20with%20soft%20diffused%20lighting%20on%20neutral%20background&width=800&height=800&seq=gallery-moto-03&orientation=squarish',
      },
      {
        id: 'fence',
        title: 'Садовые ограждения',
        category: 'Декор',
        price: 'от 3 500 ₽/секция',
        image:
          'https://readdy.ai/api/search-image?query=Set%20of%20powder%20coated%20dark%20grey%20metal%20garden%20fence%20panels%20with%20decorative%20pattern%20displayed%20against%20a%20clean%20white%20studio%20wall%2C%20smooth%20durable%20finish%2C%20professional%20product%20photography%20with%20bright%20even%20lighting%20and%20minimal%20composition&width=800&height=800&seq=gallery-fence-04&orientation=squarish',
      },
    ],
  },
  pricing: {
    title: 'ПРАЙС-ЛИСТ',
    items: [
      { id: 'p1', name: 'Автомобильные диски (R13-R15)', price: 'от 3 500 ₽/шт', note: 'Пескоструйная очистка включена' },
      { id: 'p2', name: 'Автомобильные диски (R16-R18)', price: 'от 4 500 ₽/шт', note: 'Пескоструйная очистка включена' },
      { id: 'p3', name: 'Автомобильные диски (R19-R22)', price: 'от 5 500 ₽/шт', note: 'Пескоструйная очистка включена' },
      { id: 'p4', name: 'Рама велосипеда', price: 'от 6 000 ₽', note: 'Подготовка поверхности включена' },
      { id: 'p5', name: 'Рама мотоцикла', price: 'от 12 000 ₽', note: 'Полный цикл подготовки' },
      { id: 'p6', name: 'Металлоконструкции', price: 'от 800 ₽/м²', note: 'Цена зависит от сложности' },
      { id: 'p7', name: 'Кованые изделия', price: 'от 1 200 ₽/м²', note: 'Включая подготовку поверхности' },
      { id: 'p8', name: 'Листовой металл', price: 'от 600 ₽/м²', note: 'Односторонняя покраска' },
    ],
  },
  reviews: {
    label: 'Отзывы',
    title: 'ЧТО ГОВОРЯТ НАШИ КЛИЕНТЫ',
    image1:
      'https://readdy.ai/api/search-image?query=High%20quality%20powder%20coated%20black%20metal%20parts%20and%20automotive%20components%20displayed%20on%20a%20workshop%20table%2C%20professional%20industrial%20photography%20with%20dramatic%20lighting%2C%20dark%20moody%20atmosphere%20with%20metallic%20highlights%2C%20textured%20surfaces%20and%20perfect%20finish&width=800&height=600&seq=review-bg-01&orientation=landscape',
    image2:
      'https://readdy.ai/api/search-image?query=Industrial%20powder%20coating%20workshop%20with%20freshly%20coated%20metal%20structures%20in%20matte%20black%20finish%2C%20professional%20workshop%20environment%20with%20organized%20tools%20and%20equipment%2C%20warm%20industrial%20lighting%2C%20clean%20modern%20factory%20setting%2C%20atmospheric%20photography&width=1000&height=600&seq=review-bg-02&orientation=landscape',
    items: [
      {
        id: 'r1',
        name: 'Алексей М.',
        role: 'Автовладелец',
        text: 'Покрасил диски на своём BMW — результат превзошёл ожидания. Цвет идеально совпал с заводским, покрытие ровное, без подтёков. Прошло уже два года, диски выглядят как новые. Настоятельно рекомендую!',
        avatar:
          'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20man%20in%20his%20thirties%20with%20short%20dark%20hair%20and%20confident%20smile%2C%20wearing%20a%20casual%20grey%20jacket%2C%20studio%20portrait%20with%20soft%20lighting%20on%20neutral%20background%2C%20headshot%20photography%20style&width=200&height=200&seq=review-avatar-01&orientation=squarish',
      },
      {
        id: 'r2',
        name: 'Сергей К.',
        role: 'Директор строительной компании',
        text: 'Заказывали покраску металлоконструкций для торгового павильона. Объём был приличный — около 200 м². Выполнили всё в оговоренные сроки, качество на высоте. Отдельное спасибо за помощь в подборе цвета.',
        avatar:
          'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20middle%20aged%20man%20with%20grey%20temples%20and%20warm%20expression%2C%20wearing%20a%20white%20shirt%2C%20corporate%20portrait%20style%20with%20soft%20studio%20lighting%20on%20clean%20background&width=200&height=200&seq=review-avatar-02&orientation=squarish',
      },
      {
        id: 'r3',
        name: 'Марина Д.',
        role: 'Дизайнер интерьеров',
        text: 'Искала компанию для покраски декоративных элементов интерьера. Понравился индивидуальный подход и внимательность к деталям. Палитра огромная, подобрали идеальный оттенок под проект. Буду работать с вами постоянно.',
        avatar:
          'https://readdy.ai/api/search-image?query=Professional%20portrait%20of%20a%20woman%20in%20her%20thirties%20with%20shoulder%20length%20brown%20hair%20and%20friendly%20smile%2C%20wearing%20a%20black%20blazer%2C%20studio%20headshot%20with%20soft%20natural%20lighting%20on%20neutral%20background&width=200&height=200&seq=review-avatar-03&orientation=squarish',
      },
      {
        id: 'r4',
        name: 'Дмитрий В.',
        role: 'Владелец автосервиса',
        text: 'Сотрудничаем уже больше трёх лет. За это время ни одного нарекания по качеству. Клиенты довольны, диски после покраски выглядят эффектно. Партнёр, на которого можно положиться на все сто процентов.',
        avatar:
          'https://readdy.ai/api/search-image?query=Professional%20headshot%20portrait%20of%20a%20man%20in%20his%20forties%20with%20short%20beard%20and%20confident%20look%2C%20wearing%20a%20dark%20polo%20shirt%2C%20studio%20portrait%20with%20dramatic%20but%20soft%20lighting%20on%20dark%20background&width=200&height=200&seq=review-avatar-04&orientation=squarish',
      },
      {
        id: 'r5',
        name: 'Ольга и Павел С.',
        role: 'Частные клиенты',
        text: 'Привезли старые советские кованые ворота от бабушкиного дома — думали, только на свалку. А ребята их преобразили до неузнаваемости! Очистили, выровняли где нужно, покрасили в матовый графит. Ворота стали украшением участка. Спасибо огромное!',
        avatar:
          'https://readdy.ai/api/search-image?query=Professional%20couple%20portrait%20of%20a%20man%20and%20woman%20in%20their%20thirties%20smiling%20warmly%2C%20casual%20style%20clothing%2C%20studio%20photography%20with%20soft%20even%20lighting%20on%20light%20neutral%20background&width=200&height=200&seq=review-avatar-05&orientation=squarish',
      },
    ],
  },
  cta: {
    title: 'ГОТОВЫ НАЧАТЬ ПРОЕКТ?',
    subtitle: 'Оставьте заявку и получите бесплатную консультацию и расчёт стоимости в течение 1 часа',
    button: 'Оставить заявку',
    bgImage:
      'https://readdy.ai/api/search-image?query=Warm%20industrial%20workshop%20interior%20with%20powder%20coated%20metal%20parts%20in%20various%20stages%2C%20large%20spray%20booth%20in%20background%2C%20professional%20workshop%20environment%20with%20warm%20amber%20lighting%2C%20organized%20industrial%20space%2C%20atmospheric%20photography%20with%20depth%20and%20texture%2C%20rich%20warm%20metallic%20tones&width=1800&height=1000&seq=cta-bg-01&orientation=landscape',
    serviceOptions: [
      { id: 'discs', value: 'discs', label: 'Покраска дисков' },
      { id: 'structures', value: 'structures', label: 'Металлоконструкции' },
      { id: 'forged', value: 'forged', label: 'Кованые изделия' },
      { id: 'auto', value: 'auto', label: 'Автодетали' },
      { id: 'other', value: 'other', label: 'Другое' },
    ],
  },
  form: {
    name: 'Ваше имя',
    phone: 'Телефон',
    email: 'Email',
    service: 'Тип услуги',
    description: 'Опишите задачу',
    success: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.',
    error: 'Произошла ошибка. Пожалуйста, попробуйте снова.',
  },
  footer: {
    address: 'г. Новосибирск, ул. Промышленная, д. 15',
    phone: '+7 (495) 123-45-67',
    email: 'info@chernyim-po-belomu.ru',
    newsletterTitle: 'РАССЫЛКА',
    newsletterPlaceholder: 'Ваш email',
    newsletterHint: 'Подписываясь, вы соглашаетесь с политикой конфиденциальности',
    menuTitle: 'МЕНЮ',
    socialTitle: 'СОЦСЕТИ',
    copyright: '© 2026 Черным по белому. Все права защищены.',
    bigText: 'ЧЕРНЫМПОБЕЛОМУ',
    socials: [
      { id: 's1', label: 'Telegram', icon: 'ri-telegram-line', url: '#' },
      { id: 's2', label: 'WhatsApp', icon: 'ri-whatsapp-line', url: '#' },
      { id: 's3', label: 'Instagram', icon: 'ri-instagram-line', url: '#' },
    ],
  },
  legal: {
    companyName: '',
    inn: '',
    kpp: '',
    ogrn: '',
    legalAddress: '',
    extra: '',
  },
};
