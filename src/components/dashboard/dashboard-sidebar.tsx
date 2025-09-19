"use client";

import { useState, useMemo } from 'react';
import type { Region, CrimeType, CrimeDataPoint, CrimeLocationDetail, TrustData, GenderViolenceCase } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download, Search, X } from 'lucide-react';
import RegionSummary from './region-summary';
import RobberyIcon from '../icons/robbery-icon';
import HomicideIcon from '../icons/homicide-icon';
import AssaultIcon from '../icons/assault-icon';
import ExtortionIcon from '../icons/extortion-icon';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { getCrimeTypeFromQuery } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { CRIME_TYPES } from '@/lib/types';
import { ScrollArea } from '../ui/scroll-area';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '../ui/chart';
import TrustLevelChart from './trust-level-chart';
import GenderViolenceChart from './gender-violence-chart';

interface DashboardSidebarProps {
  activeTab: string;
  selectedRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
  selectedCrimeType: CrimeType | 'All';
  onSelectCrimeType: (crimeType: CrimeType | 'All') => void;
  mostCommonCrimes: CrimeType[];
  onExport: () => void;
  allRegions: Region[];
  crimeDataByYear: Record<string, { total_crimes_by_location: any[], crimes_by_type_and_location: any[] }>;
  allCrimeData: CrimeDataPoint[];
  trustData: TrustData[];
  genderViolenceData: GenderViolenceCase[];
}

const iconMap: Record<CrimeType, React.ComponentType<any>> = {
  'Aggravated Robbery': RobberyIcon,
  'Homicide': HomicideIcon,
  'Assault': AssaultIcon,
  'Extortion': ExtortionIcon,
};

// Helper function to remove accents
const removeAccents = (str: string) => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

function RegionDetails({ region, crimeDataByYear, trustData, genderViolenceData, onSelectRegion, activeTab }: { 
  region: Region, 
  crimeDataByYear: DashboardSidebarProps['crimeDataByYear'], 
  trustData: TrustData[],
  genderViolenceData: GenderViolenceCase[],
  onSelectRegion: (region: Region | null) => void,
  activeTab: string
}) {
  const historicalData = useMemo(() => {
    const normalizedRegionName = removeAccents(region.name).toUpperCase();
    return Object.keys(crimeDataByYear).map(year => {
      const yearData = crimeDataByYear[year].total_crimes_by_location;
      const regionDataForYear = yearData.filter(d => removeAccents(d.dpto_pjfs).toUpperCase() === normalizedRegionName);
      const totalCrimes = regionDataForYear.reduce((acc, current) => acc + current.cantidad, 0);
      return {
        year: year,
        crimes: totalCrimes,
      };
    }).sort((a,b) => a.year.localeCompare(b.year));
  }, [region, crimeDataByYear]);

  const locationDetails: CrimeLocationDetail[] = useMemo(() => {
    const normalizedRegionName = removeAccents(region.name).toUpperCase();
    const latestYear = Object.keys(crimeDataByYear).sort((a, b) => b.localeCompare(a))[0]!;
    
    if (!crimeDataByYear[latestYear]) return [];
    
    const latestYearCrimes = crimeDataByYear[latestYear].crimes_by_type_and_location;

    const details = latestYearCrimes
      .filter(crime => removeAccents(crime.dpto_pjfs).toUpperCase() === normalizedRegionName)
      .reduce((acc, crime) => {
        const key = `${crime.prov_pjfs}-${crime.dist_pjfs}`;
        if (!acc[key]) {
          acc[key] = { province: crime.prov_pjfs, district: crime.dist_pjfs, count: 0 };
        }
        acc[key].count += crime.cantidad;
        return acc;
      }, {} as Record<string, CrimeLocationDetail>);
      
    return Object.values(details).sort((a,b) => b.count - a.count);
  }, [region, crimeDataByYear]);

  const regionWithStats: Region = {
    ...region,
    crimeStats: `Historical data available from ${historicalData[0]?.year} to ${historicalData[historicalData.length-1]?.year}.`,
    crimeTrends: `In ${historicalData[historicalData.length-1]?.year}, there were ${historicalData[historicalData.length-1]?.crimes.toLocaleString()} crimes.`
  }

  const regionalTrustData = useMemo(() => {
    const normalizedRegionName = removeAccents(region.name).toUpperCase();
    
    const latestYearData = trustData.filter(d => d.name === 'Trust in Police').sort((a, b) => b.year - a.year);
    const latestYear = latestYearData.length > 0 ? latestYearData[0].year : new Date().getFullYear();

    const trustInPoliceData = trustData.find(d => 
        removeAccents(d.region || "").toUpperCase() === normalizedRegionName && 
        d.name === 'Trust in Police' &&
        d.year === latestYear
    );
    
    return trustInPoliceData ? [trustInPoliceData] : [];
  }, [region, trustData]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex justify-between items-center">
        <h2 className="font-headline text-2xl text-primary">{region.name}</h2>
        <Button variant="ghost" size="icon" onClick={() => onSelectRegion(null)} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 pr-3 mt-2">
        <div className="space-y-4">
          
          {activeTab === 'map' && (
            <>
              <div>
                <h3 className="font-headline text-lg text-primary/90">Historical Crime Trend</h3>
                <Card className="h-48 w-full p-2 comic-panel">
                  <ChartContainer config={{crimes: {label: 'Crimes', color: 'hsl(var(--primary))'}}}>
                    <ResponsiveContainer>
                      <LineChart data={historicalData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={8} fontSize={12}/>
                        <YAxis tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="crimes" stroke="var(--color-crimes)" strokeWidth={2} dot={true} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </Card>
              </div>

              <div>
                <h3 className="font-headline text-lg text-primary/90">AI Summary</h3>
                <RegionSummary region={regionWithStats} />
              </div>

              <div>
                 <h3 className="font-headline text-lg text-primary/90">Crime by Location (Latest Year)</h3>
                 <Card className="max-h-60 overflow-y-auto comic-panel">
                    <CardContent className="p-2">
                        {locationDetails.length > 0 ? (
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-left font-semibold">
                                        <th className="p-2">Province</th>
                                        <th className="p-2">District</th>
                                        <th className="p-2 text-right">Crimes</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {locationDetails.map((loc, i) => (
                                        <tr key={i} className="border-t border-border">
                                            <td className="p-2">{loc.province}</td>
                                            <td className="p-2">{loc.district}</td>
                                            <td className="p-2 text-right font-bold">{loc.count.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-muted-foreground p-4 text-center">No detailed data available for this region.</p>
                        )}
                    </CardContent>
                 </Card>
              </div>
            </>
          )}

          {activeTab === 'gender-violence' && (
            <GenderViolenceChart 
                region={region} 
                allData={genderViolenceData}
            />
          )}

          <div>
            <h3 className="font-headline text-lg text-primary/90">Public Trust</h3>
            <TrustLevelChart data={regionalTrustData} />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default function DashboardSidebar({
  activeTab,
  selectedRegion,
  onSelectRegion,
  selectedCrimeType,
  onSelectCrimeType,
  mostCommonCrimes,
  onExport,
  allRegions,
  crimeDataByYear,
  allCrimeData,
  trustData,
  genderViolenceData,
}: DashboardSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const result = await getCrimeTypeFromQuery(searchQuery);
    setIsSearching(false);

    if (result.success && result.crimeType) {
        const foundCrimeType = CRIME_TYPES.find(ct => result.crimeType.toLowerCase().includes(ct.toLowerCase()));
        if (foundCrimeType) {
            onSelectCrimeType(foundCrimeType);
            toast({ title: "Filter Applied", description: `Showing results for ${foundCrimeType}.` });
        } else {
            toast({ variant: "destructive", title: "Filter Not Found", description: `Could not find a matching crime type for "${result.crimeType}".` });
        }
    } else {
      toast({ variant: "destructive", title: "Search Error", description: result.error });
    }
  };
  
  const nationalTrustData = useMemo(() => {
    const latestYearData = trustData.filter(d => d.name === 'Trust in Police').sort((a, b) => b.year - a.year);
    const latestYear = latestYearData.length > 0 ? latestYearData[0].year : new Date().getFullYear();
    const trustInPoliceData = trustData.find(d => d.region === 'NACIONAL' && d.name === 'Trust in Police' && d.year === latestYear);
    
    const data: TrustData[] = [];
    if(trustInPoliceData) data.push(trustInPoliceData);

    return data;
  }, [trustData]);


  return (
    <aside className="w-[350px] flex-shrink-0 border-l bg-card p-4 flex flex-col shadow-lg z-10 comic-panel">
      <header>
        <h1 className="font-headline text-4xl text-primary">¿CÓMO VAMOS?</h1>
        <p className="text-muted-foreground -mt-2">Crime Comic Dashboard</p>
      </header>

      <div className="mt-6">
        <form onSubmit={handleSearch} className="relative">
          <Input
            placeholder="Filter by crime type e.g. 'theft'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button size="icon" variant="ghost" type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isSearching}>
            <Search className={cn("h-4 w-4", isSearching && "animate-spin")} />
          </Button>
        </form>
      </div>

      <div className="mt-6 flex-1 flex flex-col min-h-0">
        {selectedRegion ? (
          <RegionDetails 
            region={selectedRegion} 
            crimeDataByYear={crimeDataByYear} 
            onSelectRegion={onSelectRegion} 
            trustData={trustData}
            genderViolenceData={genderViolenceData}
            activeTab={activeTab}
          />
        ) : (
          <div className="flex-1 flex flex-col justify-center text-center space-y-4">
            <div>
              <h2 className="font-headline text-2xl text-primary">Global View</h2>
              <p className="text-muted-foreground text-sm max-w-xs mx-auto">Click a region on the map for details or use the filters below to explore data across Peru.</p>
            </div>
             <div>
                <h3 className="font-headline text-lg text-primary/90">National Public Trust</h3>
                <TrustLevelChart data={nationalTrustData} />
             </div>
          </div>
        )}
      </div>


      <div className="mt-auto pt-4 border-t">
        <h3 className="font-headline text-xl text-primary/80 mb-2">
          {selectedRegion ? 'Common Crimes' : 'Filter by Crime'}
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {(activeTab === 'map' ? mostCommonCrimes : []).map((crime) => {
            const Icon = iconMap[crime];
            const isActive = selectedCrimeType === crime;
            return (
              <Button
                key={crime}
                variant={isActive ? 'default' : 'outline'}
                className="h-auto flex flex-col items-center p-2 gap-1 text-center comic-panel"
                onClick={() => onSelectCrimeType(isActive ? 'All' : crime)}
              >
                {Icon && <Icon className="w-8 h-8" />}
                <span className="text-xs font-semibold">{crime}</span>
              </Button>
            );
          })}
        </div>
        <Button onClick={onExport} className="w-full comic-panel">
          <Download className="mr-2 h-4 w-4" />
          Export Current Data
        </Button>
      </div>
    </aside>
  );
}
