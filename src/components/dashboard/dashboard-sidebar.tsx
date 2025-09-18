"use client";

import { useState, useMemo } from 'react';
import type { Region, CrimeType } from '@/lib/types';
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

interface DashboardSidebarProps {
  selectedRegion: Region | null;
  onSelectRegion: (region: Region | null) => void;
  selectedCrimeType: CrimeType | 'All';
  onSelectCrimeType: (crimeType: CrimeType | 'All') => void;
  mostCommonCrimes: CrimeType[];
  onExport: () => void;
  allRegions: Region[];
}

const iconMap: Record<CrimeType, React.ComponentType<any>> = {
  'Aggravated Robbery': RobberyIcon,
  'Homicide': HomicideIcon,
  'Assault': AssaultIcon,
  'Extortion': ExtortionIcon,
};

export default function DashboardSidebar({
  selectedRegion,
  onSelectRegion,
  selectedCrimeType,
  onSelectCrimeType,
  mostCommonCrimes,
  onExport,
  allRegions,
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


  return (
    <aside className="w-[350px] flex-shrink-0 border-r bg-card p-4 flex flex-col shadow-lg z-10">
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

      {selectedRegion ? (
        <div className="mt-6 flex-1 flex flex-col min-h-0">
          <div className="flex justify-between items-center">
             <h2 className="font-headline text-2xl text-primary">{selectedRegion.name}</h2>
             <Button variant="ghost" size="icon" onClick={() => onSelectRegion(null)} className="h-8 w-8">
                 <X className="h-4 w-4" />
             </Button>
          </div>
          <RegionSummary region={selectedRegion} />
        </div>
      ) : (
        <div className="mt-6 flex-1 flex flex-col min-h-0">
           <h2 className="font-headline text-2xl text-primary">Global View</h2>
           <p className="text-muted-foreground text-sm mb-4">Click a region on the map for details or filter by crime type below.</p>
           <div className="space-y-2">
            <h3 className="font-headline text-xl text-primary/80">All Regions</h3>
            {allRegions.map(region => (
              <Button key={region.id} variant="ghost" className="w-full justify-start" onClick={() => onSelectRegion(region)}>
                {region.name}
              </Button>
            ))}
           </div>
        </div>
      )}


      <div className="mt-auto pt-4 border-t">
        <h3 className="font-headline text-xl text-primary/80 mb-2">
          {selectedRegion ? 'Common Crimes' : 'Filter by Crime'}
        </h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {mostCommonCrimes.map((crime) => {
            const Icon = iconMap[crime];
            const isActive = selectedCrimeType === crime;
            return (
              <Button
                key={crime}
                variant={isActive ? 'default' : 'outline'}
                className="h-auto flex flex-col items-center p-2 gap-1 text-center"
                onClick={() => onSelectCrimeType(isActive ? 'All' : crime)}
              >
                {Icon && <Icon className="w-8 h-8" />}
                <span className="text-xs font-semibold">{crime}</span>
              </Button>
            );
          })}
        </div>
        <Button onClick={onExport} className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Export Current Data
        </Button>
      </div>
    </aside>
  );
}
