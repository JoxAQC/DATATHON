"use client";

import type { Region } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

interface RegionGridProps {
  regions: (Region & { count: number })[];
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
  viewType: 'crimes' | 'heroes';
}

export default function CrimeMapWrapper({ regions, onSelectRegion, selectedRegion, viewType }: RegionGridProps) {
  
  const totalCount = regions.reduce((sum, r) => sum + r.count, 0);

  const allRegionsOption = {
    id: 'all',
    name: 'Ver todo',
    lat: 0,
    lng: 0,
    zoom: 0,
    crimeStats: '',
    crimeTrends: '',
    mostCommonCrimes: [],
    count: totalCount
  };

  const displayRegions = [allRegionsOption, ...regions];

  const maxCount = useMemo(() => {
    if (viewType === 'heroes') {
      return Math.max(...regions.map(r => r.count), 0);
    }
    return 0; // Not used for crimes view
  }, [regions, viewType]);

  const getHeroCircleStyle = (count: number) => {
    if (viewType !== 'heroes' || maxCount === 0) return {};
    const percentage = (count / maxCount) * 100;
    const size = 20 + (percentage / 100) * 40; // min size 20px, max 60px
    return {
      width: `${size}px`,
      height: `${size}px`,
    };
  };
  
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {displayRegions.map((region) => (
        <div
          key={region.id}
          onClick={() => onSelectRegion(region.id === 'all' ? null : region)}
          className={`bg-card border-border rounded-lg flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors aspect-video comic-panel ${selectedRegion?.id === region.id ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <span className="text-sm font-semibold">{region.name}</span>
          {viewType === 'heroes' ? (
            <div 
              className="bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm mt-2"
              style={getHeroCircleStyle(region.count)}
            >
              {region.count.toLocaleString()}
            </div>
          ) : (
            <span className="text-xl font-bold font-headline">{region.count.toLocaleString()}</span>
          )}
        </div>
      ))}
    </div>
  );
}
