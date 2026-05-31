const img = (seed, w = 1200, h = 1500) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const PRODUCTS = [
  {
    id: "p1", slug: "atelier-wool-overcoat",
    name: "Atelier Wool Overcoat", brand: "Shoplix Studio",
    price: 489, compareAt: 590, category: "Outerwear", badge: "New",
    colors: ["Charcoal", "Camel", "Ink"], sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8, reviews: 214,
    description:
      "A tailored long-line overcoat cut from Italian double-faced wool. Drop shoulder, notch lapel, and a quiet drape that holds its line through every season.",
    details: ["88% wool, 12% cashmere", "Made in Portugal", "Horn buttons", "Dry clean only"],
    images: [
      img("1591047139829-d91aecb6caea"),
      img("1539109136881-3be0616acf4b"),
      img("1551488831-00ddcb6c6bd3"),
    ],
  },
  {
    id: "p2", slug: "runner-low-leather",
    name: "Runner Low — Bone Leather", brand: "Shoplix",
    price: 245, category: "Footwear", badge: "Bestseller",
    colors: ["Bone", "Black", "Sand"], sizes: ["38", "39", "40", "41", "42", "43", "44"],
    rating: 4.9, reviews: 1820,
    description:
      "A clean, low-profile runner with a tonal leather upper and a cushioned EVA midsole. Designed for daily wear with quiet detailing.",
    details: ["Full-grain leather upper", "EVA midsole", "Rubber outsole", "Made in Italy"],
    images: [
      img("1542291026-7eec264c27ff"),
      img("1600185365483-26d7a4cc7519"),
      img("1606107557195-0e29a4b5b4aa"),
    ],
  },
  {
    id: "p3", slug: "structured-tote-bag",
    name: "Structured Leather Tote", brand: "Shoplix Studio",
    price: 320, category: "Bags",
    colors: ["Espresso", "Black"], sizes: ["One Size"],
    rating: 4.7, reviews: 412,
    description: "An everyday tote with a structured silhouette, magnetic closure, and a soft suede lining.",
    details: ["Vegetable-tanned leather", "Suede lining", "Internal zip pocket", "Magnetic closure"],
    images: [
      img("1584917865442-de89df76afd3"),
      img("1548036328-c9fa89d128fa"),
      img("1591561954557-26941169b49e"),
    ],
  },
  {
    id: "p4", slug: "ribbed-cashmere-knit",
    name: "Ribbed Cashmere Crew", brand: "Shoplix",
    price: 220, compareAt: 280, category: "Knitwear", badge: "Limited",
    colors: ["Oat", "Slate", "Forest"], sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8, reviews: 312,
    description: "A heavyweight cashmere crew with a relaxed body, ribbed cuffs, and a soft hand.",
    details: ["100% Mongolian cashmere", "Garment washed", "Ribbed cuffs and hem"],
    images: [
      img("1620799140408-edc6dcb6d633"),
      img("1583743814966-8936f5b7be1a"),
      img("1434389677669-e08b4cac3105"),
    ],
  },
  {
    id: "p5", slug: "pleated-trouser",
    name: "Pleated Wool Trouser", brand: "Shoplix Studio",
    price: 245, category: "Outerwear",
    colors: ["Black", "Stone"], sizes: ["28", "30", "32", "34", "36"],
    rating: 4.6, reviews: 188,
    description: "A high-rise pleated trouser with a tapered leg and a clean break at the ankle.",
    details: ["Italian wool blend", "Hidden hook closure", "Dry clean"],
    images: [
      img("1593030761757-71fae45fa0e7"),
      img("1473966968600-fa801b869a1a"),
      img("1594938298603-c8148c4dae35"),
    ],
  },
  {
    id: "p7", slug: "weekender-canvas",
    name: "Weekender — Waxed Canvas", brand: "Shoplix",
    price: 195, category: "Bags",
    colors: ["Olive", "Black"], sizes: ["One Size"],
    rating: 4.7, reviews: 220,
    description: "A roomy weekender bag in waxed canvas with leather trim and a removable shoulder strap.",
    details: ["Waxed cotton canvas", "Full-grain leather trim", "Brass hardware"],
    images: [
      img("1553062407-98eeb64c6a62"),
      img("1547949003-9792a18a2601"),
      img("1581605405669-fcdf81165afa"),
    ],
  },
  {
    id: "p8", slug: "linen-overshirt",
    name: "Linen Overshirt", brand: "Shoplix Studio",
    price: 165, category: "Outerwear",
    colors: ["Sand", "Ink", "Olive"], sizes: ["S", "M", "L", "XL"],
    rating: 4.6, reviews: 164,
    description: "A relaxed linen overshirt with a clean placket and a single chest pocket.",
    details: ["100% Indian linen", "Mother-of-pearl buttons"],
    images: [
      img("1602810318383-e386cc2a3ccf"),
      img("1490114538077-0a7f8cb49891"),
      img("1516762689617-e1cffcef479d"),
    ],
  },
];

export const getProduct = (slug) => PRODUCTS.find((p) => p.slug === slug);
export const getRelated = (slug, n = 4) =>
  PRODUCTS.filter((p) => p.slug !== slug).slice(0, n);

export const CATEGORIES = [
  { name: "Outerwear", count: 24, image: img("1591047139829-d91aecb6caea", 800, 1000) },
  { name: "Footwear", count: 36, image: img("1542291026-7eec264c27ff", 800, 1000) },
  { name: "Knitwear", count: 18, image: img("1620799140408-edc6dcb6d633", 800, 1000) },
  { name: "Bags", count: 22, image: img("1584917865442-de89df76afd3", 800, 1000) },
];
