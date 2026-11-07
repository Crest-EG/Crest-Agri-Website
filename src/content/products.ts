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
  technicalSheetUrl?: string;
  featured: boolean;
};

const technicalSheetUrls: Record<string, string> = {
  apricot: "https://drive.google.com/file/d/13xl1rV5Zb4yiy5IaJBjSrAR0lYMITXgL/view?usp=drive_link",
  artichoke: "https://drive.google.com/file/d/1VfUx35JkYweVwycXPL2_kztjeVaI80Aq/view?usp=drive_link",
  broccoli: "https://drive.google.com/file/d/1SoG7F57BCyug0-dVftJcoV58CRitFyJO/view?usp=drive_link",
  carrot: "https://drive.google.com/file/d/1agDxmcRZnxUQSQMsDkTZMLq1bI4Jpv2F/view?usp=drive_link",
  cauliflower: "https://drive.google.com/file/d/1niPiEC_ZhWijZfnTV_83L6RUYmdKDd8r/view?usp=drive_link",
  "sweet-corn": "https://drive.google.com/file/d/147NiwCkPV2NrLEyoTygjv48xkFPKrV8L/view?usp=drive_link",
  fig: "https://drive.google.com/file/d/1ALjWpPlZhHXkiavU2eFI9vyyxVUK5yUp/view?usp=drive_link",
  "green-beans": "https://drive.google.com/file/d/1CjV7csEj9KuaM15jZk5dwpyOA3CaOeve/view?usp=drive_link",
  guava: "https://drive.google.com/file/d/1KHoo5pbn2zBqteemk5y8NVo0dOJvH2-Y/view?usp=drive_link",
  mango: "https://drive.google.com/file/d/1J0UP-aVhiJs4mYcTN1PT_rxpIZ-OR9Gg/view?usp=drive_link",
  "mixed-vegetables": "https://drive.google.com/file/d/1bQokIRu3oddEHyxkb4xKRcbrsdJ9fMzH/view?usp=drive_link",
  molokhia: "https://drive.google.com/file/d/12-V-42K8X06RtFuD82tex5pDqGKKMpMy/view?usp=drive_link",
  okra: "https://drive.google.com/file/d/1xqCAmcNB_W8mAOMolMqc9GfN75cu2qs0/view?usp=drive_link",
  "french-fries": "https://drive.google.com/file/d/1CxHTK10QBCl-7OzcWc3JfMme9Xbhpf7g/view?usp=drive_link",
  peas: "https://drive.google.com/file/d/1X4azHfv31j2ZsGuaG_yCS8gPJXStgWz0/view?usp=drive_link",
  pomegranate: "https://drive.google.com/file/d/1G0h2lH4ie21B3XcT3jN_ZuA5cgqFz-j4/view?usp=drive_link",
  spinach: "https://drive.google.com/file/d/1qhAPOhM-eiGwkY4WNrto8ZV42u4SuTJm/view?usp=drive_link",
  strawberry: "https://drive.google.com/file/d/1A0KaEYgcGjfz6RL_fncEvuBoG-OIT2YY/view?usp=drive_link",
  lemon: "https://drive.google.com/file/d/15a-wzSO4wJd-pis_qwGUjWOAwIxoCyFq/view?usp=drive_link",
  orange: "https://drive.google.com/file/d/1QmOJwsx6Z6oalMcpknRYyoZaRgNjk8kD/view?usp=drive_link",
};

const productSeeds: Omit<Product, "technicalSheetUrl">[] = [
  {
    "slug": "orange",
    "type": "fruit",
    "forms": [
      "fresh"
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
    "seasonWindows": [
      {
        "start": {
          "month": 10,
          "day": 1
        },
        "end": {
          "month": 5,
          "day": 31
        }
      }
    ],
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
    "seasonWindows": [
      {
        "start": {
          "month": 8,
          "day": 1
        },
        "end": {
          "month": 1,
          "day": 31
        }
      }
    ],
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
    "seasonWindows": [
      {
        "start": {
          "month": 1,
          "day": 1
        },
        "end": {
          "month": 12,
          "day": 31
        }
      }
    ],
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
    "seasonWindows": [
      {
        "start": {
          "month": 3,
          "day": 1
        },
        "end": {
          "month": 5,
          "day": 31
        }
      },
      {
        "start": {
          "month": 11,
          "day": 1
        },
        "end": {
          "month": 1,
          "day": 31
        }
      }
    ],
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
    "seasonWindows": [
      {
        "start": {
          "month": 8,
          "day": 15
        },
        "end": {
          "month": 11,
          "day": 30
        }
      },
      {
        "start": {
          "month": 9,
          "day": 1
        },
        "end": {
          "month": 1,
          "day": 31
        }
      }
    ],
    "images": [
      "/images/products/french-fries.webp"
    ],
    "featured": false
  }
];

export const products: Product[] = productSeeds.map((product) => ({
  ...product,
  technicalSheetUrl: technicalSheetUrls[product.slug],
}));

export const featuredProducts = products.filter((item) => item.featured);
export const getProductBySlug = (slug: string) => products.find((item) => item.slug === slug);
