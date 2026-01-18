
import { Language } from './types';

export const translations = {
  [Language.KY]: {
    nav: { services: 'Кызматтар', locations: 'Даректер', contact: 'Байланыш', myOrders: 'Менин буйрутмаларым' },
    hero: { title: 'Академиялык иштериңизди басып чыгаруу жана жакшыртуу', subtitle: 'Басып чыгаруу, каталарды текшерүү жана шаблонго келтирүү үчүн тез жана оңой буйрутма берүү. Онлайн жана офлайн иштейбиз!', cta: 'Буйрутма берүү' },
    stats: {
      visitors: 'Келүүчүлөр',
      payments: 'Төлөмдөр',
      completed: 'Бүткөн иштер',
      pages: 'Басылган барактар'
    },
    process: {
      title: 'Кандай иштейт?',
      step1: { t: 'Жүктөө', d: 'Файлыңызды форматта же басып чыгаруу үчүн жүктөп бериңиз.' },
      step2: { t: 'Тандоо', d: 'AI анализинен кийин керектүү кызматтарды тандаңыз.' },
      step3: { t: 'Алуу', d: 'Даяр ишти офистен алыңыз же санарип жүктөп алыңыз.' }
    },
    faq: {
      title: 'Көп берилүүчү суроолор',
      q1: 'Даярдоо убактысы канча?',
      a1: 'Басып чыгаруу 15 мүнөт, ал эми эксперттик текшерүү 2-4 саатты алат.',
      q2: 'Төлөм кандай жүрөт?',
      a2: 'Офистен накталай же QR-код аркылуу төлөсөңүз болот.'
    },
    features: {
      title: 'Бардык академиялык муктаждыктар бир жерде',
      subtitle: 'Студенттердин ийгилиги үчүн атайын кызматтар.',
      print: { title: 'Жогорку сапаттагы басып чыгаруу', desc: 'ЧБ 5 сом, ЦВ 10 сом.' },
      check: { title: 'Грамматикалык текшерүү', desc: 'Ар бир барак үчүн болгону 2 сом.' },
      sync: { title: 'Шаблонго келтирүү', desc: 'Курстук жана дипломдук иштерди стандартка келтирүү.' }
    },
    order: {
      newOrder: 'Жаңы буйрутма',
      upload: 'Файлды жүктөө',
      drag: 'Жүктөө үчүн басыңыз же файлды бул жерге сүйрөңүз',
      detected: 'барак аныкталды',
      selectServices: 'Кызматтарды тандоо',
      printing: 'Басып чыгаруу',
      printBW: 'Ак-кара (5 сом/бет)',
      printColor: 'Түстүү (10 сом/бет)',
      titlePage: 'КТМУ титулдук барактары',
      titlePageStandard: 'Стандарттык (5/10 сом)',
      titlePageCustom: 'Толук (факультет/тема) (25/35 сом)',
      titlePageNone: 'Кереги жок',
      printingDesc: 'Физикалык көчүрмө',
      proofreading: 'Грамматиканы текшерүү (1 бет/2 сом)',
      proofreadingDesc: 'Грамматикалык анализ',
      formatting: 'Шаблонго келтирүү',
      formatCoursework: 'Курстук иш (200 сом)',
      formatThesis: 'Дипломдук иш (500 сом)',
      formatNone: 'Кереги жок',
      comments: 'Кошумча комментарийлер',
      commentPlace: 'Мисалы: Профессор X-тин талаптарын аткарыңыз...',
      how: 'Кантип алгыңыз келет?',
      digital: 'Санариптик формат',
      digitalDesc: 'PDF жүктөп алуу',
      digitalReady: 'Санариптик жыйынтык даяр!',
      downloadResult: 'Ишти жүктөп алуу',
      physical: 'Физикалык алып кетүү',
      physicalDesc: 'Офистен алуу',
      selectLoc: 'Даректи тандаңыз',
      summary: 'Буйрутманын жалпы суммасы',
      baseFee: 'Негизги төлөм',
      complete: 'Буйрутманы аяктоо',
      analyzing: 'AI анализ жүрүүдө...',
      success: 'Буйрутма кабыл алынды!',
      orderId: 'Буйрутма номери',
      expertMsg: 'AI сунушу',
      back: 'Артка',
      next: 'Кийинки',
      another: 'Дагы буйрутма берүү'
    },
    contact: {
      visit: 'Бизге келиңиз',
      desc: 'Биздин кампустагы офистен жардам ала аласыз.',
      phone: 'Телефон',
      email: 'Электрондук почта',
      payment: 'M-Bank жана Bak-AI QR'
    },
    locations: {
      manasG: 'КТУ "Манас" G-корпус',
      manasGAddr: 'Джал-30/43 Кампус КТУ "Манас" G-block',
      philharmony: 'Филармония (Западная сторона)',
      philharmonyAddr: 'Западная сторона филармонии. "Касса"',
      dzhamanbaeva: 'Джаманбаева 35',
      dzhamanbaevaAddr: 'Джаманбаева 35 "КОМОК"',
      hours: 'Иштөө убактысы'
    },
    footer: {
      desc: '2024-жылдан бери кесипкөй басып чыгаруу жана академиялык колдоо.',
      quick: 'Ыкчам шилтемелер',
      support: 'Колдоо'
    }
  },
  [Language.TR]: {
    nav: { services: 'Hizmetler', locations: 'Konumlar', contact: 'İletişim', myOrders: 'Siparişlerim' },
    hero: { title: 'Akademik çalışmalarınızı basın ve mükemmelleştirin', subtitle: 'Hızlı ve kolay sipariş!', cta: 'Sipariş Ver' },
    stats: {
      visitors: 'Ziyaretçiler',
      payments: 'Ödemeler',
      completed: 'Tamamlanan İşler',
      pages: 'Basılan Sayfalar'
    },
    process: {
      title: 'Nasıl Çalışır?',
      step1: { t: 'Yükle', d: 'Dosyanızı yükleyin.' },
      step2: { t: 'Seç', d: 'Hizmetleri seçin.' },
      step3: { t: 'Al', d: 'Dosyayı ofisten alın.' }
    },
    faq: {
      title: 'SSS',
      q1: 'Hazırlanma süresi?',
      a1: 'Baskı 15 dk, inceleme 2-4 saat.',
      q2: 'Ödeme?',
      a2: 'Nakit veya QR ile.'
    },
    features: {
      title: 'Tüm akademik ihtiyaçlar',
      subtitle: 'Öğrenci başarısı için.',
      print: { title: 'Kaliteli Baskı', desc: 'S/B 5 som, Renkli 10 som.' },
      check: { title: 'Gramer Kontrolü', desc: 'Sayfa başı sadece 2 som.' },
      sync: { title: 'Şablon Düzenleme', desc: 'Ödev ve tez düzenleme.' }
    },
    order: {
      newOrder: 'Yeni Sipariş',
      upload: 'Dosya Yükle',
      drag: 'Tıklayın veya sürükleyin',
      detected: 'sayfa algılandı',
      selectServices: 'Hizmet Seçin',
      printing: 'Baskı',
      printBW: 'Siyah-Beyaz (5 som/sf)',
      printColor: 'Renkli (10 som/sf)',
      titlePage: 'KTMÜ Kapak Sayfaları',
      titlePageStandard: 'Standart (5/10 som)',
      titlePageCustom: 'Detaylı (fakülte/konu) (25/35 som)',
      titlePageNone: 'Gerek yok',
      printingDesc: 'Fiziksel kopya',
      proofreading: 'Gramer Kontrolü (1 sf/2 som)',
      proofreadingDesc: 'Dilbilgisi incelemesi',
      formatting: 'Şablon Düzenleme',
      formatCoursework: 'Ödev/Dönem ödevi (200 som)',
      formatThesis: 'Tez/Diploma (500 som)',
      formatNone: 'Gerek yok',
      comments: 'Notlar',
      commentPlace: 'Örn: Profesör X\'in kuralları...',
      how: 'Teslimat şekli?',
      digital: 'Dijital',
      digitalDesc: 'PDF indir',
      digitalReady: 'Dijital sonuç hazır!',
      downloadResult: 'Çalışmayı İndir',
      physical: 'Ofisten Teslim',
      physicalDesc: 'Ofise gelin',
      selectLoc: 'Konum Seç',
      summary: 'Özet',
      baseFee: 'Temel Ücret',
      complete: 'Tamamla',
      analyzing: 'AI analiz ediyor...',
      success: 'Sipariş Verildi!',
      orderId: 'Sipariş No',
      expertMsg: 'AI Tavsiyesi',
      back: 'Geri',
      next: 'İleri',
      another: 'Yeni Sipariş'
    },
    contact: {
      visit: 'Bizi Ziyaret Edin',
      desc: 'Kampüsteki ofisimize gelin.',
      phone: 'Telefon',
      email: 'E-posta',
      payment: 'M-Bank ve Bak-AI QR'
    },
    locations: {
      manasG: 'KTMÜ "Manas" G-blok',
      manasGAddr: 'Cal-30/43 Kampüs KTMÜ "Manas" G-blok',
      philharmony: 'Filarmoni (Batı Yakası)',
      philharmonyAddr: 'Filarmoni Batı Tarafı. "Kasa"',
      dzhamanbaeva: 'Dzhamanbaeva 35',
      dzhamanbaevaAddr: 'Dzhamanbaeva 35 "KOMOK"',
      hours: 'Saatler'
    },
    footer: {
      desc: 'Öğrenci hayatını kolaylaştırıyoruz.',
      quick: 'Linkler',
      support: 'Destek'
    }
  },
  [Language.RU]: {
    nav: { services: 'Услуги', locations: 'Адреса', contact: 'Контакты', myOrders: 'Мои заказы' },
    hero: { title: 'Печатайте и совершенствуйте свои учебные работы', subtitle: 'Быстрый и простой заказ!', cta: 'Сделать заказ' },
    stats: {
      visitors: 'Посетителей',
      payments: 'Оплат',
      completed: 'Выполнено работ',
      pages: 'Напечатано страниц'
    },
    process: {
      title: 'Как это работает?',
      step1: { t: 'Загрузка', d: 'Загрузите файл.' },
      step2: { t: 'Выбор', d: 'Выберите нужные услуги.' },
      step3: { t: 'Получение', d: 'Заберите в офисе.' }
    },
    faq: {
      title: 'Частые вопросы',
      q1: 'Сколько времени это займет?',
      a1: 'Печать — 15 минут, проверка — 2-4 часа.',
      q2: 'Как оплатить?',
      a2: 'Наличными или через QR.'
    },
    features: {
      title: 'Все академияческие нужды',
      subtitle: 'Профессиональные услуги для студентов.',
      print: { title: 'Качественная печать', desc: 'ЧБ 5 сом, ЦВ 10 сом.' },
      check: { title: 'Проверка на ошибки', desc: 'Всего 2 сома за страницу.' },
      sync: { title: 'Подгонка под шаблон', desc: 'Курсовые и дипломные работы.' }
    },
    order: {
      newOrder: 'Новый заказ',
      upload: 'Загрузите файл',
      drag: 'Нажмите или перетащите файл',
      detected: 'стр. обнаружено',
      selectServices: 'Выберите услуги',
      printing: 'Печать',
      printBW: 'Ч/Б (5 сом/стр)',
      printColor: 'Цветная (10 сом/стр)',
      titlePage: 'Титульные листы КТМУ',
      titlePageStandard: 'Стандарт (5/10 сом)',
      titlePageCustom: 'С данными (фак-тет/тема) (25/35 сом)',
      titlePageNone: 'Не требуется',
      printingDesc: 'Физическая копия',
      proofreading: 'Проверка ошибок (1 стр/2 сома)',
      proofreadingDesc: 'Грамматический анализ',
      formatting: 'Подгонка под шаблон',
      formatCoursework: 'Курсовая работа (200 сом)',
      formatThesis: 'Дипломная работа (500 сом)',
      formatNone: 'Не требуется',
      comments: 'Комментарии',
      commentPlace: 'Напр: Сделайте по правилам преподавателя...',
      how: 'Способ получения',
      digital: 'Цифровой результат',
      digitalDesc: 'Скачать PDF',
      digitalReady: 'Цифровой результат готов!',
      downloadResult: 'Скачать готовую работу',
      physical: 'Печатная копия',
      physicalDesc: 'Забрать в офисе',
      selectLoc: 'Выберите адрес',
      summary: 'Итого',
      baseFee: 'Базовая стоимость',
      complete: 'Оформить заказ',
      analyzing: 'Анализ AI...',
      success: 'Заказ оформлен!',
      orderId: 'ID заказа',
      expertMsg: 'Совет от AI',
      back: 'Назад',
      next: 'Далее',
      another: 'Создать еще один заказ'
    },
    contact: {
      visit: 'Приходите к нам',
      desc: 'Наши офисы в удобных локациях.',
      phone: 'Телефон',
      email: 'Email',
      payment: 'QR M-Bank и Bak-AI'
    },
    locations: {
      manasG: 'КТУ "Манас" G-корпус',
      manasGAddr: 'Джал-30/43 Кампус КТУ "Манас" G-block',
      philharmony: 'Филармония (Западная сторона)',
      philharmonyAddr: 'Западная сторона филармонии. "Касса"',
      dzhamanbaeva: 'Джаманбаева 35',
      dzhamanbaevaAddr: 'ул. Джаманбаева 35 "КОМОК"',
      hours: 'Часы работы'
    },
    footer: {
      desc: 'Облегчаем жизнь студентов с 2024 года.',
      quick: 'Ссылки',
      support: 'Поддержка'
    }
  },
  [Language.EN]: {
    nav: { services: 'Services', locations: 'Locations', contact: 'Contact', myOrders: 'My Orders' },
    hero: { title: 'Print and perfect your academic works', subtitle: 'Fast and easy ordering!', cta: 'Make an Order' },
    stats: {
      visitors: 'Visitors',
      payments: 'Payments',
      completed: 'Works Completed',
      pages: 'Pages Printed'
    },
    process: {
      title: 'How it Works?',
      step1: { t: 'Upload', d: 'Upload your file.' },
      step2: { t: 'Select', d: 'Choose services.' },
      step3: { t: 'Receive', d: 'Pickup from office.' }
    },
    faq: {
      title: 'FAQ',
      q1: 'Turnaround time?',
      a1: 'Printing 15 mins, review 2-4 hours.',
      q2: 'How to pay?',
      a2: 'Cash or via QR.'
    },
    features: {
      title: 'Academic needs covered',
      subtitle: 'Tailored for success.',
      print: { title: 'High Quality', desc: 'BW 5 KGS, Color 10 KGS.' },
      check: { title: 'Grammar Check', desc: 'Just 2 KGS per page.' },
      sync: { title: 'Template Sync', desc: 'For Coursework and Thesis.' }
    },
    order: {
      newOrder: 'New Order',
      upload: 'Upload your file',
      drag: 'Click or drag to upload',
      detected: 'pages detected',
      selectServices: 'Select Services',
      printing: 'Printing',
      printBW: 'B&W (5 KGS/pg)',
      printColor: 'Color (10 KGS/pg)',
      titlePage: 'KTMU Title Pages',
      titlePageStandard: 'Standard (5/10 KGS)',
      titlePageCustom: 'Custom (faculty/topic) (25/35 KGS)',
      titlePageNone: 'Not required',
      printingDesc: 'Physical copy',
      proofreading: 'Grammar Check (1 pg/2 KGS)',
      proofreadingDesc: 'Grammar review',
      formatting: 'Template Adjustment',
      formatCoursework: 'Coursework (200 KGS)',
      formatThesis: 'Thesis/Diploma (500 KGS)',
      formatNone: 'Not required',
      comments: 'Comments',
      commentPlace: 'E.g. "APA 7th Edition style"',
      how: 'Delivery?',
      digital: 'Digital',
      digitalDesc: 'Download PDF',
      digitalReady: 'Digital result ready!',
      downloadResult: 'Download Finished Work',
      physical: 'Pickup',
      physicalDesc: 'At office',
      selectLoc: 'Select Location',
      summary: 'Summary',
      baseFee: 'Base Fee',
      complete: 'Complete Order',
      analyzing: 'Analyzing...',
      success: 'Order Placed!',
      orderId: 'Order ID',
      expertMsg: 'AI Suggestion',
      back: 'Back',
      next: 'Next',
      another: 'Order More'
    },
    contact: {
      visit: 'Come Visit Us',
      desc: 'Our offices are located on campus and downtown.',
      phone: 'Phone',
      email: 'Email',
      payment: 'M-Bank & Bak-AI QR'
    },
    locations: {
      manasG: 'KTMU "Manas" G-block',
      manasGAddr: 'Jal-30/43 Campus KTMU "Manas" G-block',
      philharmony: 'Philharmony (West side)',
      philharmonyAddr: 'Western side of the Philharmony. "Kassa"',
      dzhamanbaeva: 'Dzhamanbaeva 35',
      dzhamanbaevaAddr: 'Dzhamanbaeva 35 "KOMOK"',
      hours: 'Hours'
    },
    footer: {
      desc: 'Making student life easier.',
      quick: 'Links',
      support: 'Support'
    }
  }
};
