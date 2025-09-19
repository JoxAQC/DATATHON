import type { Region, CrimeDataPoint, GenderViolenceData, TrustData, CrimeType } from './types';
import crimeJson from './total_crimes.json';

// Type assertion to handle the structure of the JSON file
const crimesByYear: Record<string, { total_crimes_by_location: any[], crimes_by_type_and_location: any[] }> = crimeJson;

export const regions: Region[] = [
  { id: 'amazonas', name: 'AMAZONAS', lat: -6.22, lng: -77.87, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'ancash', name: 'ÁNCASH', lat: -9.53, lng: -77.53, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'apurimac', name: 'APURÍMAC', lat: -14.0, lng: -72.88, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'arequipa', name: 'AREQUIPA', lat: -16.4090, lng: -71.5375, zoom: 12, crimeStats: 'Arequipa reported 45,000 crimes last year, making it the second most affected region.', crimeTrends: 'There is a growing concern about extortion, which has risen by 30%. Assaults remain stable.', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'ayacucho', name: 'AYACUCHO', lat: -13.16, lng: -74.22, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'cajamarca', name: 'CAJAMARCA', lat: -7.16, lng: -78.51, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'callao', name: 'CALLAO', lat: -12.05, lng: -77.12, zoom: 12, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Aggravated Robbery'] },
  { id: 'cusco', name: 'CUSCO', lat: -13.5320, lng: -71.9675, zoom: 12, crimeStats: 'Cusco had 25,000 reported crimes, with a significant portion related to tourist-targeted theft.', crimeTrends: 'While overall crime is lower, there is a seasonal spike in robbery during the high tourist season.', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'huancavelica', name: 'HUANCAVELICA', lat: -12.78, lng: -74.97, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'huanuco', name: 'HUÁNUCO', lat: -9.93, lng: -76.24, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Homicide'] },
  { id: 'ica', name: 'ICA', lat: -14.07, lng: -75.73, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Extortion'] },
  { id: 'junin', name: 'JUNÍN', lat: -11.5, lng: -75.0, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'la-libertad', name: 'LA LIBERTAD', lat: -8.11, lng: -79.03, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'lambayeque', name: 'LAMBAYEQUE', lat: -6.7, lng: -79.9, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'lima', name: 'LIMA', lat: -12.0464, lng: -77.0428, zoom: 10, crimeStats: 'Lima has the highest number of reported crimes, with 150,000 incidents last year.', crimeTrends: 'Robbery has increased by 15% in the last quarter, while homicides have seen a slight decrease.', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'loreto', name: 'LORETO', lat: -3.75, lng: -73.25, zoom: 7, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Assault'] },
  { id: 'madre-de-dios', name: 'MADRE DE DIOS', lat: -12.6, lng: -69.18, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'moquegua', name: 'MOQUEGUA', lat: -17.2, lng: -70.93, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'pasco', name: 'PASCO', lat: -10.67, lng: -76.26, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'piura', name: 'PIURA', lat: -5.1945, lng: -80.6328, zoom: 11, crimeStats: 'Piura faces challenges with organized crime, reporting 35,000 incidents last year.', crimeTrends: 'Homicide rates are a major concern, linked to gang activities in the region.', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'puno', name: 'PUNO', lat: -15.84, lng: -70.02, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'san-martin', name: 'SAN MARTÍN', lat: -6.48, lng: -76.37, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'tacna', name: 'TACNA', lat: -18.01, lng: -70.25, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'tumbes', name: 'TUMBES', lat: -3.57, lng: -80.45, zoom: 10, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'ucayali', name: 'UCAYALI', lat: -8.38, lng: -74.55, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
].sort((a, b) => a.name.localeCompare(b.name));


export const crimeData: CrimeDataPoint[] = [];

export const genderViolenceData: GenderViolenceData[] = [
  { year: 2019, cases: 166 },
  { year: 2020, cases: 138 },
  { year: 2021, cases: 146 },
  { year: 2022, cases: 130 },
  { year: 2023, cases: 155 },
];

export const trustData: TrustData[] = [
  { name: 'Perception of Insecurity', value: 82 },
  { name: 'Trust in Police', value: 35 },
];

export const crimeTypeDetails: Record<CrimeType, { icon: React.ComponentType<{ className?: string }>, description: string }> = {
    'Aggravated Robbery': {
        icon: (props) => null, 
        description: 'Theft using force or threat of violence.'
    },
    'Homicide': {
        icon: (props) => null, 
        description: 'The unlawful killing of one person by another.'
    },
    'Assault': {
        icon: (props) => null, 
        description: 'A physical attack or threat of attack.'
    },
    'Extortion': {
        icon: (props) => null, 
        description: 'Obtaining something, especially money, through force or threats.'
    }
};

const processedCrimeData: CrimeDataPoint[] = [];
Object.values(crimesByYear).forEach(yearData => {
  yearData.crimes_by_type_and_location.forEach(crime => {
    // A simple mapping from spanish to english terms
    let type: CrimeType | undefined = undefined;
    const description = crime.des_articulo.toLowerCase();
    if (description.includes('robo agravado')) type = 'Aggravated Robbery';
    else if (description.includes('homicidio')) type = 'Homicide';
    else if (description.includes('lesiones') || description.includes('agresiones')) type = 'Assault';
    else if (description.includes('extorsión')) type = 'Extortion';

    if (type) {
        processedCrimeData.push({
            id: `${crime.ubigeo_pjfs}-${crime.year}-${crime.des_articulo}`,
            lat: 0, // No lat/lon in this dataset
            lng: 0,
            type: type,
            date: crime.year.toString(),
            district: crime.dist_pjfs,
            region: crime.dpto_pjfs,
            province: crime.prov_pjfs,
            count: crime.cantidad
        });
    }
  });
});

export const crimeDataByYear = crimesByYear;
export const allCrimeData = processedCrimeData;
