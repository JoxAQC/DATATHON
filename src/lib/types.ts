export type CrimeType = 'Aggravated Robbery' | 'Homicide' | 'Assault' | 'Extortion' | 'HURTO' | 'LESIONES' | 'ROBO' | 'AMENAZAS' | 'HURTO AGRAVADO' | 'ROBO AGRAVADO' | 'VIOLENCIA FAMILIAR' | 'CONDUCCIÓN EN EBRIEDAD' | 'ESTAFA' | 'VIOLENCIA CONTRA LA MUJER';

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
  id: string; // Corresponds to FIRST_IDDP in GeoJSON
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
  id: string; // Add id to match region data
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
  path?: string; 
};

export type PeruGeoJson = {
  type: "FeatureCollection";
  features: DepartmentFeature[];
};

export interface CrimeTypeByRegion {
    dpto_pjfs: string;
    des_articulo: string;
    cantidad: number;
}
