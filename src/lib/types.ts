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

export interface GenderViolenceData {
  year: number;
  cases: number;
}

export interface TrustData {
  name: 'Perception of Insecurity' | 'Trust in Police';
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
