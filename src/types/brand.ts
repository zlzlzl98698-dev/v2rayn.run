export interface BrandPlan {
  name: string;
  billing: string;
  price: string;
  traffic: string;
  period: string;
  notes?: string;
}

export interface SpeedTestRecord {
  region: string;
  latency: string;
  download: string;
}

export interface StreamingStatus {
  chatgpt: 'supported' | 'partial' | 'unsupported' | 'untested';
  claude: 'supported' | 'partial' | 'unsupported' | 'untested';
  gemini: 'supported' | 'partial' | 'unsupported' | 'untested';
  netflix: 'supported' | 'partial' | 'unsupported' | 'untested';
  disney: 'supported' | 'partial' | 'unsupported' | 'untested';
  youtube: 'supported' | 'partial' | 'unsupported' | 'untested';
  hbo: 'supported' | 'partial' | 'unsupported' | 'untested';
  tiktok: 'supported' | 'partial' | 'unsupported' | 'untested';
  spotify: 'supported' | 'partial' | 'unsupported' | 'untested';
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  englishName?: string;
  aliases: string[];
  rank: number;
  featured: boolean;
  tagline: string;
  description: string;
  affUrl: string;
  couponCode?: string;
  couponDiscount?: string;
  startingPrice: string;
  billingCycle: string;
  trafficRange: string;
  lineType: string;
  protocols: string[];
  clients: string[];
  nodeRegions: string[];
  hasCustomClient: boolean;
  supportsThirdParty: boolean;
  streaming: StreamingStatus;
  speedTests: SpeedTestRecord[];
  speedTestDate?: string;
  plans: BrandPlan[];
  pros: string[];
  cons: string[];
  suitableFor: string[];
  unsuitableFor: string[];
  dataStatus: 'verified' | 'vendor' | 'needs_verification';
  verificationDate: string;
  updatedDate: string;
  source: string;
  tags: string[];
}
