export type BodyStyle = 'SUV' | 'Sedán' | 'Hatchback' | 'Pick-Up' | 'Van' | 'Deportivo' | 'Eléctrico/Híbrido';

export type Condition = '0km' | 'Seminuevo' | 'Usado';

export type Transmission = 'Automática' | 'Manual' | 'Dual-Clutch' | 'CVT';

export type FuelType = 'Gasolina' | 'Híbrido' | 'Eléctrico' | 'Diésel';

export interface InspectionChecklist {
  motor: boolean;
  transmision: boolean;
  suspension: boolean;
  frenos: boolean;
  electrico: boolean;
  esteticaExterior: boolean;
  esteticaInterior: boolean;
  documentacionRegla: boolean;
  sinAdeudos: boolean;
  llantasBuenas: boolean;
}

export interface SellerInfo {
  id: string;
  name: string;
  type: 'Agencia Oficial' | 'Verificado Autoplaza' | 'Particular Directo';
  rating: number;
  salesCount: number;
  location: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  responseTime: string;
  isOfficialStore?: boolean;
  verifiedBadge?: boolean;
  joinedYear: number;
  avatarUrl?: string;
}

export interface TechnicalSpecs {
  engine: string;
  displacement: string;
  horsepower: number;
  torque: string;
  fuelEconomy: string; // e.g. "16.5 km/l"
  drivetrain: string; // e.g. "Delantera (FWD)"
  doors: number;
  passengers: number;
  airbags: number;
  vin: string;
  colorExterior: string;
  colorInterior: string;
}

export interface Vehicle {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  version: string;
  price: number; // in MXN
  currency: 'MXN';
  mileage: number; // in km
  condition: Condition;
  bodyStyle: BodyStyle;
  transmission: Transmission;
  fuelType: FuelType;
  color: string;
  doors: number;
  images: string[];
  location: {
    city: string;
    state: string;
    fullAddress: string;
  };
  seller: SellerInfo;
  isVerified: boolean;
  isDirectDeal: boolean; // Trato directo
  isFeatured: boolean;
  highlights: string[];
  techSpecs: TechnicalSpecs;
  inspection: InspectionChecklist;
  inspectionDate?: string;
  description: string;
  monthlyEstimate: number; // estimated monthly payment
  createdAt: string;
  viewsCount: number;
}

export interface FilterState {
  searchQuery: string;
  category: BodyStyle | 'Todos';
  condition: Condition | 'Todas';
  onlyOfficialStore: boolean;
  onlyVerified: boolean;
  onlyDirectDeal: boolean;
  minPrice: number | null;
  maxPrice: number | null;
  minYear: number | null;
  maxYear: number | null;
  minMileage: number | null;
  maxMileage: number | null;
  brands: string[];
  locations: string[];
  transmissions: Transmission[];
  fuels: FuelType[];
  sortBy: 'relevance' | 'price_asc' | 'price_desc' | 'year_desc' | 'km_asc' | 'newest';
}

export interface FinancingQuote {
  vehicleId: string;
  vehiclePrice: number;
  downPaymentPercent: number; // e.g., 20%
  downPaymentAmount: number;
  loanAmount: number;
  termMonths: number; // 12, 24, 36, 48, 60
  annualInterestRate: number; // e.g., 12.9%
  monthlyPayment: number;
  totalInterest: number;
}

export interface PresentationSettings {
  showClientBar: boolean;
  themeMode: 'mercado_libre_yellow' | 'autoplaza_dark_luxury' | 'autoplaza_clean_white';
  clientName: string;
  customBrandColor: string;
  currencySymbol: string;
  showFinancingBadge: boolean;
}
