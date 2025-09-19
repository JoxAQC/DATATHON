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
