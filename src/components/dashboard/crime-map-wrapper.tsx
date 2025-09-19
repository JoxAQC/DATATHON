"use client";

import type { Region } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface RegionGridProps {
  regions: (Region & { count: number })[];
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
}

export default function CrimeMapWrapper({ regions, onSelectRegion, selectedRegion }: RegionGridProps) {
  const allRegionsOption = {
    id: 'all',
    name: 'Ver todo',
    lat: 0,
    lng: 0,
    zoom: 0,
    crimeStats: '',
    crimeTrends: '',
    mostCommonCrimes: [],
    count: regions.reduce((sum, r) => sum + r.count, 0)
  };

  const displayRegions = [allRegionsOption, ...regions];
  
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {displayRegions.map((region) => (
        <div
          key={region.id}
          onClick={() => onSelectRegion(region.id === 'all' ? null : region)}
          className={`bg-card border-border rounded-lg flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors aspect-video comic-panel ${selectedRegion?.id === region.id ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <span className="text-sm font-semibold">{region.name}</span>
          <span className="text-xl font-bold font-headline">{region.count.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
