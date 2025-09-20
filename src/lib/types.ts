export type CrimeType = 'Aggravated Robbery' | 'Homicide' | 'Assault' | 'Extortion';

export const CRIME_TYPES: CrimeType[] = ['Aggravated Robbery', 'Homicide', 'Assault', 'Extortion'];

export interface CrimeDataPoint {
  id: string;
  lat: number;
  lng: number;
  type: CrimeType;
  date: string; // Year
  district: string;
  region: string;
  province: string;
  count: number;
}

export interface Region {
  id: string;
  name: string;
  lat: number;
  lng: number;
  zoom: number;
  crimeStats: string;
  crimeTrends: string;
  mostCommonCrimes: CrimeType[];
}

export interface GenderViolenceCase {
  año: number;
  mes: number;
  dpto_hecho: string;
  prov_hecho: string;
  dist_hecho: string;
  cantidad: number;
  disminucion: boolean;
}

export interface TrustData {
  name: 'Trust in Police';
  value: number;
  region?: string;
  year: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export interface CrimeLocationDetail {
  province: string;
  district: string;
  count: number;
}

export type DepartmentProperties = {
  NOMBDEP: string;
  COUNT: number;
  FIRST_IDDP: string;
  HECTARES: number;
  crimeIndex: number;
  policeCount: number;
};

export type DepartmentGeometry = {
  type: "Polygon";
  coordinates: number[][][];
} | {
  type: "MultiPolygon";
  coordinates: number[][][][];
};

export type DepartmentFeature = {
  type: "Feature";
  properties: DepartmentProperties;
  geometry: DepartmentGeometry;
  path?: string; // Add optional path property for pre-calculated SVG paths
};

export type PeruGeoJson = {
  type: "FeatureCollection";
  features: DepartmentFeature[];
};