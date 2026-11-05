export type ProductForm = "fresh" | "frozen";
export type ProductType = "fruit" | "vegetable";
export type BilingualText = { en: string; ar: string };
export type ProductSpecKey = "varieties" | "freezing" | "cuts" | "packing" | "storage" | "freshPacking" | "sizes";
export type ProductSpec = { key: ProductSpecKey; value: string };
export type ProductContent = {
  name: string;
  summary: string;
  season: string;
  farming: string;
  harvest: string;
  packing: string;
  shipping: string;
  variants: string[];
  specs: ProductSpec[];
};
export type Product = {
  slug: string;
  type: ProductType;
  forms: ProductForm[];
  seasonWindows: Array<{ start: { month: number; day: number }; end: { month: number; day: number } }>;
  images: string[];
  featured: boolean;
};

export const products: Product[] = [
  {
    "slug": "orange",
    "type": "fruit",
    "forms": [
      "fresh"
    ],
    "seasonWindows": [],
    "images": [
      "/images/products/orange.webp"
    ],
    "featured": true
  },
  {
    "slug": "lemon",
    "type": "fruit",
    "forms": [
      "fresh"
    ],
    "seasonWindows": [],
    "images": [
      "/images/products/lemon.webp"
    ],
    "featured": true
  },
  {
    "slug": "sweet-potato",
    "type": "vegetable",
    "forms": [
      "fresh"
    ],
    "seasonWindows": [],
    "images": [
      "/images/products/sweet-potato.webp"
    ],
    "featured": true
  },
  {
    "slug": "strawberry",
    "type": "fruit",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 11,
          "day": 15
        },
        "end": {
          "month": 5,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/strawberry.webp"
    ],
    "featured": true
  },
  {
    "slug": "fig",
    "type": "fruit",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 6,
          "day": 20
        },
        "end": {
          "month": 10,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/fig.webp"
    ],
    "featured": true
  },
  {
    "slug": "mango",
    "type": "fruit",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 6,
          "day": 20
        },
        "end": {
          "month": 11,
          "day": 30
        }
      }
    ],
    "images": [
      "/images/products/mango.webp"
    ],
    "featured": true
  },
  {
    "slug": "guava",
    "type": "fruit",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 7,
          "day": 20
        },
        "end": {
          "month": 12,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/guava.webp"
    ],
    "featured": true
  },
  {
    "slug": "pomegranate",
    "type": "fruit",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 7,
          "day": 20
        },
        "end": {
          "month": 11,
          "day": 30
        }
      }
    ],
    "images": [
      "/images/products/pomegranate.webp"
    ],
    "featured": true
  },
  {
    "slug": "apricot",
    "type": "fruit",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 4,
          "day": 15
        },
        "end": {
          "month": 6,
          "day": 15
        }
      }
    ],
    "images": [
      "/images/products/apricot.webp"
    ],
    "featured": false
  },
  {
    "slug": "cauliflower",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 10,
          "day": 20
        },
        "end": {
          "month": 3,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/cauliflower.webp"
    ],
    "featured": false
  },
  {
    "slug": "mixed-vegetables",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [],
    "images": [
      "/images/products/mixed-vegetables.webp"
    ],
    "featured": false
  },
  {
    "slug": "okra",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 5,
          "day": 15
        },
        "end": {
          "month": 10,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/okra.webp"
    ],
    "featured": false
  },
  {
    "slug": "carrot",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 12,
          "day": 1
        },
        "end": {
          "month": 5,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/carrot.webp"
    ],
    "featured": false
  },
  {
    "slug": "peas",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 11,
          "day": 1
        },
        "end": {
          "month": 3,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/peas.webp"
    ],
    "featured": false
  },
  {
    "slug": "green-beans",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [],
    "images": [
      "/images/products/green-beans.webp"
    ],
    "featured": true
  },
  {
    "slug": "molokhia",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 5,
          "day": 1
        },
        "end": {
          "month": 10,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/molokhia.webp"
    ],
    "featured": false
  },
  {
    "slug": "spinach",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 11,
          "day": 1
        },
        "end": {
          "month": 3,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/spinach.webp"
    ],
    "featured": false
  },
  {
    "slug": "sweet-corn",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 6,
          "day": 1
        },
        "end": {
          "month": 12,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/sweet-corn.webp"
    ],
    "featured": false
  },
  {
    "slug": "broccoli",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 11,
          "day": 20
        },
        "end": {
          "month": 4,
          "day": 30
        }
      }
    ],
    "images": [
      "/images/products/broccoli.webp"
    ],
    "featured": false
  },
  {
    "slug": "artichoke",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [
      {
        "start": {
          "month": 12,
          "day": 1
        },
        "end": {
          "month": 4,
          "day": 30
        }
      }
    ],
    "images": [
      "/images/products/artichoke.webp"
    ],
    "featured": false
  },
  {
    "slug": "french-fries",
    "type": "vegetable",
    "forms": [
      "frozen"
    ],
    "seasonWindows": [],
    "images": [
      "/images/products/french-fries.webp"
    ],
    "featured": false
  }
];

export const featuredProducts = products.filter((item) => item.featured);
export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
