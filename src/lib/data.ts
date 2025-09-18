import type { Region, CrimeDataPoint, GenderViolenceData, TrustData, CrimeType } from './types';

export const regions: Region[] = [
  { id: 'amazonas', name: 'Amazonas', lat: -6.22, lng: -77.87, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'ancash', name: 'Áncash', lat: -9.53, lng: -77.53, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'apurimac', name: 'Apurímac', lat: -14.0, lng: -72.88, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'arequipa', name: 'Arequipa', lat: -16.4090, lng: -71.5375, zoom: 12, crimeStats: 'Arequipa reported 45,000 crimes last year, making it the second most affected region.', crimeTrends: 'There is a growing concern about extortion, which has risen by 30%. Assaults remain stable.', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'ayacucho', name: 'Ayacucho', lat: -13.16, lng: -74.22, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'cajamarca', name: 'Cajamarca', lat: -7.16, lng: -78.51, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'callao', name: 'Callao', lat: -12.05, lng: -77.12, zoom: 12, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Aggravated Robbery'] },
  { id: 'cusco', name: 'Cusco', lat: -13.5320, lng: -71.9675, zoom: 12, crimeStats: 'Cusco had 25,000 reported crimes, with a significant portion related to tourist-targeted theft.', crimeTrends: 'While overall crime is lower, there is a seasonal spike in robbery during the high tourist season.', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'huancavelica', name: 'Huancavelica', lat: -12.78, lng: -74.97, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'huanuco', name: 'Huánuco', lat: -9.93, lng: -76.24, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Homicide'] },
  { id: 'ica', name: 'Ica', lat: -14.07, lng: -75.73, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Extortion'] },
  { id: 'junin', name: 'Junín', lat: -11.5, lng: -75.0, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'la-libertad', name: 'La Libertad', lat: -8.11, lng: -79.03, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'lambayeque', name: 'Lambayeque', lat: -6.7, lng: -79.9, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'lima', name: 'Lima', lat: -12.0464, lng: -77.0428, zoom: 10, crimeStats: 'Lima has the highest number of reported crimes, with 150,000 incidents last year.', crimeTrends: 'Robbery has increased by 15% in the last quarter, while homicides have seen a slight decrease.', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'loreto', name: 'Loreto', lat: -3.75, lng: -73.25, zoom: 7, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Assault'] },
  { id: 'madre-de-dios', name: 'Madre de Dios', lat: -12.6, lng: -69.18, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'moquegua', name: 'Moquegua', lat: -17.2, lng: -70.93, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'pasco', name: 'Pasco', lat: -10.67, lng: -76.26, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Assault', 'Extortion'] },
  { id: 'piura', name: 'Piura', lat: -5.1945, lng: -80.6328, zoom: 11, crimeStats: 'Piura faces challenges with organized crime, reporting 35,000 incidents last year.', crimeTrends: 'Homicide rates are a major concern, linked to gang activities in the region.', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'puno', name: 'Puno', lat: -15.84, lng: -70.02, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'san-martin', name: 'San Martín', lat: -6.48, lng: -76.37, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'tacna', name: 'Tacna', lat: -18.01, lng: -70.25, zoom: 9, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Aggravated Robbery', 'Assault'] },
  { id: 'tumbes', name: 'Tumbes', lat: -3.57, lng: -80.45, zoom: 10, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
  { id: 'ucayali', name: 'Ucayali', lat: -8.38, lng: -74.55, zoom: 8, crimeStats: '', crimeTrends: '', mostCommonCrimes: ['Homicide', 'Extortion'] },
];


export const crimeData: CrimeDataPoint[] = [
  // Lima Data
  { id: 'c1', lat: -12.05, lng: -77.04, type: 'Aggravated Robbery', date: '2023-10-15', district: 'Cercado de Lima', region: 'Lima' },
  { id: 'c2', lat: -12.12, lng: -77.03, type: 'Assault', date: '2023-10-14', district: 'Miraflores', region: 'Lima' },
  { id: 'c3', lat: -12.09, lng: -77.07, type: 'Homicide', date: '2023-10-12', district: 'San Isidro', region: 'Lima' },
  { id: 'c4', lat: -12.04, lng: -77.02, type: 'Aggravated Robbery', date: '2023-10-11', district: 'La Victoria', region: 'Lima' },
  { id: 'c5', lat: -12.1, lng: -76.98, type: 'Extortion', date: '2023-10-10', district: 'Surco', region: 'Lima' },

  // Arequipa Data
  { id: 'c6', lat: -16.40, lng: -71.53, type: 'Assault', date: '2023-10-15', district: 'Arequipa District', region: 'Arequipa' },
  { id: 'c7', lat: -16.41, lng: -71.54, type: 'Extortion', date: '2023-10-14', district: 'Yanahuara', region: 'Arequipa' },
  { id: 'c8', lat: -16.39, lng: -71.52, type: 'Aggravated Robbery', date: '2023-10-13', district: 'Cayma', region: 'Arequipa' },

  // Cusco Data
  { id: 'c9', lat: -13.52, lng: -71.97, type: 'Aggravated Robbery', date: '2023-10-15', district: 'Cusco District', region: 'Cusco' },
  { id: 'c10', lat: -13.51, lng: -71.98, type: 'Assault', date: '2023-10-14', district: 'Wanchaq', region: 'Cusco' },
  
  // Piura Data
  { id: 'c11', lat: -5.18, lng: -80.64, type: 'Homicide', date: '2023-10-15', district: 'Piura District', region: 'Piura' },
  { id: 'c12', lat: -5.20, lng: -80.62, type: 'Extortion', date: '2023-10-14', district: 'Castilla', region: 'Piura' },
];

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
        icon: (props) => null, // Placeholder, will be replaced by dynamic import
        description: 'Theft using force or threat of violence.'
    },
    'Homicide': {
        icon: (props) => null, // Placeholder
        description: 'The unlawful killing of one person by another.'
    },
    'Assault': {
        icon: (props) => null, // Placeholder
        description: 'A physical attack or threat of attack.'
    },
    'Extortion': {
        icon: (props) => null, // Placeholder
        description: 'Obtaining something, especially money, through force or threats.'
    }
}
