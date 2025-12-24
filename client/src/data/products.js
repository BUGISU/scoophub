// client/src/data/products.js
/*
id: 제품 고유 식별자 (DB primary key)
brand: 브랜드명
name: 제품명
flavor 맛 또는 제품 타입
nutrition: 영양 정보 객체
  calories: 칼로리
  proteinG: 단백질 (그램)
  fatG: 지방 (그램)
  carbsG: 탄수화물 (그램)
  fiberG: 섬유질 (그램)
  sugarG: 당류 (그램)
  sodiumMg: 나트륨 (밀리그램)
  calciumPct: 칼슘 (%)
  ironPct: 철분 (%)
imageUrl: 제품 이미지 URL
description: 제품 설명
*/

export const products = [
  {
    id: 1,
    brand: "Acme",
    name: "Acme Anvil",
    flavor: "Heavy Duty",
    nutrition: {
      calories: 500,
      proteinG: 21,
      fatG: 30,
      carbsG: 40,
      fiberG: 5,
      sugarG: 10,
      sodiumMg: 200,
      calciumPct: 15,
      ironPct: 10,
    },
    imageUrl: "https://example.com/images/acme-anvil.jpg",
    description: "A heavy-duty anvil perfect for all your cartoon needs.",
  },
  {
    id: 2,
    brand: "Globex",
    name: "Globex Rocket",
    flavor: "Speedy",
    nutrition: {
      calories: 300,
      proteinG: 10,
      fatG: 5,
      carbsG: 60,
      fiberG: 3,
      sugarG: 20,
      sodiumMg: 150,
      calciumPct: 8,
      ironPct: 5,
    },
    imageUrl: "https://example.com/images/globex-rocket.jpg",
    description: "A high-speed rocket for your adventurous needs.",
  },
  {
    id: 3,
    brand: "Initech",
    name: "Initech Stapler",
    flavor: "Office Essential",
    nutrition: {
      calories: 100,
      proteinG: 2,
      fatG: 1,
      carbsG: 20,
      fiberG: 1,
      sugarG: 5,
      sodiumMg: 50,
      calciumPct: 2,
      ironPct: 1,
    },
    imageUrl: "https://example.com/images/initech-stapler.jpg",
    description: "A reliable stapler for all your office needs.",
  },
];
