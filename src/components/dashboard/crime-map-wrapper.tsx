"use client";

import type { Region } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

interface RegionGridProps {
  regions: Region[];
  onSelectRegion: (region: Region | null) => void;
}

export default function CrimeMapWrapper({ regions, onSelectRegion }: RegionGridProps) {
  // Add a "Ver todo" option
  const allRegionsOption: Region = {
    id: 'all',
    name: 'Ver todo',
    lat: 0,
    lng: 0,
    zoom: 0,
    crimeStats: '',
    crimeTrends: '',
    mostCommonCrimes: []
  };

  const displayRegions = [allRegionsOption, ...regions];
  
  // Adjust grid to accomodate 25 items. Using 5 columns.
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {displayRegions.map((region) => (
        <div
          key={region.id}
          onClick={() => onSelectRegion(region.id === 'all' ? null : region)}
          className="bg-card border border-border rounded-lg flex items-center justify-center text-center p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors aspect-video"
        >
          <span className="text-sm font-semibold">{region.name}</span>
        </div>
      ))}
    </div>
  );
}
