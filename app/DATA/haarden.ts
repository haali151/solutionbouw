export type HaardCategory =
  | "inbouw"
  | "driezijdig"
  | "inzethaard"
  | "wandhaard"
  | "vrijstaand"
  | "waterdamp"
  | "bio-ethanol"
  | "hologram"
  | "overig";

export type HaardTechnology =
  | "electric"
  | "water-vapor"
  | "bio-ethanol"
  | "hologram"
  | "other";

export type ProductImage = {
  src: string;
  alt: string;
  isPrimary?: boolean;
};

export type Specification = {
  label: string;
  value: string;
  group?: string;
};

export type Dimension = {
  width?: number;
  height?: number;
  depth?: number;
  unit: "mm" | "cm";
};

export type Haard = {
  // Basis
  id: string;
  slug: string;
  sku?: string;

  name: string;
  brand: string;
  model?: string;

  category: HaardCategory;
  technology: HaardTechnology;

  // Prijs
  price: number;
  oldPrice?: number;
  currency: "EUR";

  // Afmetingen
  dimensions?: Dimension;

  availableWidths?: number[];

  // Media
  images: ProductImage[];
  videoUrl?: string;

  // Beschrijving
  shortDescription: string;
  description?: string;

  // Specificaties
  specifications: Specification[];

  // Functies
  features?: string[];

  flameColors?: string[];
  fuelBed?: string[];

  remoteControl?: boolean;
  appControl?: boolean;

  // Verwarming
  heating?: {
    available: boolean;
    minPowerW?: number;
    maxPowerW?: number;
    thermostat?: boolean;
  };

  // Installatie
  installation?: {
    type?: string;
    cinewallSuitable?: boolean;
    plugRequired?: boolean;
    notes?: string;
  };

  // Voorraad
  inStock: boolean;
  stockStatus?:
    | "in-stock"
    | "low-stock"
    | "out-of-stock"
    | "on-request";

  deliveryTime?: string;

  // Garantie
  warrantyYears?: number;

  // Labels
  featured?: boolean;
  newProduct?: boolean;
  bestseller?: boolean;

  // Filters
  colors?: string[];
  styles?: string[];
  roomTypes?: string[];

  // SEO
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };

  // Bron / synchronisatie
  source?: {
    supplier?: string;
    sourceUrl?: string;
    lastUpdated?: string;
  };
};

export const haarden: Haard[] = [];