"use client";

import type { Region } from "@/lib/types";
import { useMemo } from "react";

interface RegionGridProps {
  regions: (Region & { count: number })[];
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
  viewType: 'crimes' | 'heroes' | 'trust' | 'gender';
}

const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

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
    return Math.max(...regions.map(r => r.count), 0);
  }, [regions]);

  const getCircleStyle = (count: number) => {
    if (maxCount === 0) return {};
    const percentage = (count / maxCount) * 100;
    const size = 20 + (percentage / 100) * 40; // min size 20px, max 60px
    return {
      width: `${size}px`,
      height: `${size}px`,
    };
  };

  const getCircleColor = () => {
    switch(viewType) {
      case 'crimes': return 'bg-red-500';
      case 'heroes': return 'bg-green-500';
      case 'trust': return 'bg-blue-500';
      case 'gender': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  }
  
  return (
    <div className="grid grid-cols-5 gap-4 w-full">
      {displayRegions.map((region) => (
        <div
          key={region.id}
          onClick={() => onSelectRegion(region.id === 'all' ? null : region)}
          className={`bg-card border-border rounded-lg flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors aspect-video comic-panel ${selectedRegion?.id === region.id ? 'bg-primary text-primary-foreground' : ''}`}
        >
          <span className="text-sm font-semibold">{region.name}</span>
           {region.id !== 'all' && region.count > 0 ? (
            <div 
              className={`rounded-full flex items-center justify-center text-white font-bold text-sm mt-2 ${getCircleColor()}`}
              style={getCircleStyle(region.count)}
            >
              {viewType === 'trust' ? `${region.count}%` : region.count.toLocaleString()}
            </div>
           ) : (
            region.id !== 'all' && viewType !== 'trust' && <span className="text-xl font-bold font-headline">{region.count.toLocaleString()}</span>
           )}

           {region.id === 'all' && (
             <span className="text-xl font-bold font-headline">
              {viewType === 'trust' ? `${(totalCount / regions.filter(r => r.count > 0).length).toFixed(1)}%` : region.count.toLocaleString()}
            </span>
           )}
        </div>
      ))}
    </div>
  );
}
