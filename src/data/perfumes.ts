export interface Perfume {
  id: string;
  brand: string;
  name: string;
  price: number;
  image: string;
  gender: "мужской" | "женский" | "унисекс";
  description?: string;
}

export const perfumes: Perfume[] = [
  {
    id: "1",
    brand: "BANDERAS",
    name: "Blue Seduction for Men",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300&h=300&fit=crop",
    gender: "мужской",
    description: "Туалетная вода",
  },
  {
    id: "2",
    brand: "CHANEL",
    name: "Coco Mademoiselle",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    gender: "женский",
    description: "Парфюмерная вода",
  },
  {
    id: "3",
    brand: "DIOR",
    name: "Sauvage",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1594736797933-d0cc1dd0e3f7?w=300&h=300&fit=crop",
    gender: "мужской",
    description: "Туалетная вода",
  },
  {
    id: "4",
    brand: "TOM FORD",
    name: "Black Orchid",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?w=300&h=300&fit=crop",
    gender: "унисекс",
    description: "Парфюмерная вода",
  },
  {
    id: "5",
    brand: "VERSACE",
    name: "Dylan Blue",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300&h=300&fit=crop",
    gender: "мужской",
    description: "Туалетная вода",
  },
  {
    id: "6",
    brand: "LANCÔME",
    name: "La Vie Est Belle",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300&h=300&fit=crop",
    gender: "женский",
    description: "Парфюмерная вода",
  },
  {
    id: "7",
    brand: "HUGO BOSS",
    name: "The Scent",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1595425970377-c9703cf48b6c?w=300&h=300&fit=crop",
    gender: "мужской",
    description: "Туалетная вода",
  },
  {
    id: "8",
    brand: "YVES SAINT LAURENT",
    name: "Black Opium",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&h=300&fit=crop",
    gender: "женский",
    description: "Парфюмерная вода",
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
