export interface Perfume {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  gender: "мужской" | "женский" | "унисекс";
  description: string;
  rating: number;
  reviewCount: number;
  volumes: { size: string; price: number }[];
  characteristics: {
    topNotes: string[];
    heartNotes: string[];
    baseNotes: string[];
    productType: string;
    fragranceGroup: string;
    gender: string;
    concentration: string;
    longevity: string;
    sillage: string;
  };
  category: string;
}

export const perfumes: Perfume[] = [
  {
    id: "1",
    brand: "BANDERAS",
    name: "Blue Seduction for Men",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0cc1dd0e3f7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=500&fit=crop",
    ],
    gender: "мужской",
    description:
      "Элегантный и чувственный аромат для современного мужчины. Blue Seduction for Men - это гармоничное сочетание свежести и теплоты, которое подчеркивает мужественность и уверенность. Идеально подходит для повседневного использования и особых случаев.",
    rating: 4.3,
    reviewCount: 127,
    volumes: [
      { size: "50ml", price: 3500 },
      { size: "100ml", price: 5500 },
      { size: "150ml", price: 7200 },
    ],
    characteristics: {
      topNotes: ["Бергамот", "Лимон", "Кассис"],
      heartNotes: ["Герань", "Кардамон", "Мускатный орех"],
      baseNotes: ["Мускус", "Амбра", "Кедр"],
      productType: "Туалетная вода",
      fragranceGroup: "Древесно-ароматические",
      gender: "Мужской",
      concentration: "EDT (5-15%)",
      longevity: "6-8 часов",
      sillage: "Умеренный",
    },
    category: "мужские ароматы",
  },
  {
    id: "2",
    brand: "CHANEL",
    name: "Coco Mademoiselle",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&h=500&fit=crop",
    ],
    gender: "женский",
    description:
      "Дерзкий и элегантный аромат для независимой женщины. Coco Mademoiselle воплощает дух свободы и роскоши, создавая неповторимый образ современной леди. Этот аромат станет вашей визитной карточкой и подчеркнет вашу индивидуальность.",
    rating: 4.7,
    reviewCount: 234,
    volumes: [
      { size: "35ml", price: 6500 },
      { size: "50ml", price: 8900 },
      { size: "100ml", price: 12500 },
    ],
    characteristics: {
      topNotes: ["Апельсин", "Мандарин", "Бергамот"],
      heartNotes: ["Роза", "Жасмин", "Личи"],
      baseNotes: ["Пачули", "Ветивер", "Ваниль", "Белый мускус"],
      productType: "Парфюмерная вода",
      fragranceGroup: "Восточно-цветочные",
      gender: "Женский",
      concentration: "EDP (15-25%)",
      longevity: "8-10 часов",
      sillage: "Сильный",
    },
    category: "женские ароматы",
  },
  {
    id: "3",
    brand: "DIOR",
    name: "Sauvage",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0cc1dd0e3f7?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1594736797933-d0cc1dd0e3f7?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=500&fit=crop",
    ],
    gender: "мужской",
    description:
      "Дикий и необузданный аромат, вдохновленный бескрайними просторами. Sauvage - это воплощение мужской силы и свободы, аромат для тех, кто не боится быть собой. Свежий и энергичный, он идеально подходит для активного образа жизни.",
    rating: 4.5,
    reviewCount: 189,
    volumes: [
      { size: "60ml", price: 5800 },
      { size: "100ml", price: 7200 },
      { size: "200ml", price: 9500 },
    ],
    characteristics: {
      topNotes: ["Калабрийский бергамот", "Розовый перец"],
      heartNotes: ["Герань", "Лаванда", "Сычуаньский перец", "Элеми"],
      baseNotes: ["Амброксан", "Кедр", "Лабданум"],
      productType: "Туалетная вода",
      fragranceGroup: "Древесно-ароматические",
      gender: "Мужской",
      concentration: "EDT (5-15%)",
      longevity: "7-9 часов",
      sillage: "Очень сильный",
    },
    category: "мужские ароматы",
  },
  {
    id: "4",
    brand: "TOM FORD",
    name: "Black Orchid",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0cc1dd0e3f7?w=500&h=500&fit=crop",
    ],
    gender: "унисекс",
    description:
      "Загадочный и роскошный аромат с темным характером. Black Orchid - это воплощение изысканности и страсти, аромат для тех, кто ценит эксклюзивность. Сложный и многогранный, он раскрывается по-новому в течение дня.",
    rating: 4.6,
    reviewCount: 156,
    volumes: [
      { size: "30ml", price: 8500 },
      { size: "50ml", price: 12000 },
      { size: "100ml", price: 18500 },
    ],
    characteristics: {
      topNotes: [
        "Трюфель",
        "Гардения",
        "Черная смородина",
        "Иланг-иланг",
        "Бергамот",
      ],
      heartNotes: ["Орхидея", "Пряности", "Плод гардении", "Лотос"],
      baseNotes: [
        "Мексиканская ваниль",
        "Сандал",
        "Пачули",
        "Ладан",
        "Амбра",
        "Ветивер",
      ],
      productType: "Парфюмерная вода",
      fragranceGroup: "Восточно-цветочные",
      gender: "Унисекс",
      concentration: "EDP (15-25%)",
      longevity: "10-12 часов",
      sillage: "Очень сильный",
    },
    category: "унисекс",
  },
  {
    id: "5",
    brand: "VERSACE",
    name: "Dylan Blue",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0cc1dd0e3f7?w=500&h=500&fit=crop",
    ],
    gender: "мужской",
    description:
      "Современный средиземноморский аромат с морскими нотами. Dylan Blue воплощает дух итальянской роскоши и элегантности. Свежий и энергичный, он идеально подходит для уверенных в себе мужчин.",
    rating: 4.2,
    reviewCount: 98,
    volumes: [
      { size: "50ml", price: 3200 },
      { size: "100ml", price: 4500 },
      { size: "200ml", price: 6800 },
    ],
    characteristics: {
      topNotes: [
        "Калабрийский бергамот",
        "Грейпфрут",
        "Листья фигового дерева",
        "Водные аккорды",
      ],
      heartNotes: ["Фиалка", "Черный перец", "Листья папируса", "Пачули"],
      baseNotes: ["Мускус", "Ладан", "Шафран", "Минеральные аккорды"],
      productType: "Туалетная вода",
      fragranceGroup: "Ароматно-водные",
      gender: "Мужской",
      concentration: "EDT (5-15%)",
      longevity: "6-8 часов",
      sillage: "Умеренный",
    },
    category: "мужские ароматы",
  },
  {
    id: "6",
    brand: "LANCÔME",
    name: "La Vie Est Belle",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&h=500&fit=crop",
    ],
    gender: "женский",
    description:
      "Аромат счастья и радости жизни. La Vie Est Belle - это гимн женственности и оптимизма. Сладкий и цветочный, он подарит вам ощущение праздника каждый день.",
    rating: 4.4,
    reviewCount: 203,
    volumes: [
      { size: "30ml", price: 4200 },
      { size: "50ml", price: 6800 },
      { size: "75ml", price: 8900 },
    ],
    characteristics: {
      topNotes: ["Черная смородина", "Груша"],
      heartNotes: ["Ирис", "Жасмин", "Апельсиновый цвет"],
      baseNotes: ["Пралине", "Ваниль", "Пачули", "Тонка бобы"],
      productType: "Парфюмерная вода",
      fragranceGroup: "Цветочно-гурманские",
      gender: "Женский",
      concentration: "EDP (15-25%)",
      longevity: "8-10 часов",
      sillage: "Сильный",
    },
    category: "женские ароматы",
  },
  {
    id: "7",
    brand: "HUGO BOSS",
    name: "The Scent",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6c?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6c?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=500&h=500&fit=crop",
    ],
    gender: "мужской",
    description:
      "Соблазнительный и притягательный аромат. The Scent создан для мужчин, которые знают, чего хотят. Теплый и чувственный, он оставляет неизгладимое впечатление.",
    rating: 4.1,
    reviewCount: 89,
    volumes: [
      { size: "50ml", price: 3800 },
      { size: "100ml", price: 5200 },
      { size: "150ml", price: 7000 },
    ],
    characteristics: {
      topNotes: ["Имбирь", "Мандарин"],
      heartNotes: ["Африканская роза", "Листья лаванды"],
      baseNotes: ["Кожа", "Какао"],
      productType: "Туалетная вода",
      fragranceGroup: "Восточно-древесные",
      gender: "Мужской",
      concentration: "EDT (5-15%)",
      longevity: "6-7 часов",
      sillage: "Умеренный",
    },
    category: "мужские ароматы",
  },
  {
    id: "8",
    brand: "YVES SAINT LAURENT",
    name: "Black Opium",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&h=500&fit=crop",
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=500&h=500&fit=crop",
    ],
    gender: "женский",
    description:
      "Запретный и соблазнительный аромат для современных бунтарок. Black Opium - это коктейль из кофе, ванили и белых цветов, создающий неповторимый чувственный образ.",
    rating: 4.5,
    reviewCount: 176,
    volumes: [
      { size: "30ml", price: 5200 },
      { size: "50ml", price: 7800 },
      { size: "90ml", price: 11500 },
    ],
    characteristics: {
      topNotes: ["Розовый перец", "Апельсиновый цвет", "Груша"],
      heartNotes: ["Кофе", "Жасмин", "Миндаль", "Солодка"],
      baseNotes: ["Ваниль", "Пачули", "Кедр", "Кассис"],
      productType: "Парфюмерная вода",
      fragranceGroup: "Восточно-гурманские",
      gender: "Женский",
      concentration: "EDP (15-25%)",
      longevity: "8-12 часов",
      sillage: "Очень сильный",
    },
    category: "женские ароматы",
  },
];

export const brands = [
  "BANDERAS",
  "CHANEL",
  "DIOR",
  "TOM FORD",
  "VERSACE",
  "LANCÔME",
  "HUGO BOSS",
  "YVES SAINT LAURENT",
  "GUCCI",
  "PRADA",
  "ARMANI",
  "CALVIN KLEIN",
];
