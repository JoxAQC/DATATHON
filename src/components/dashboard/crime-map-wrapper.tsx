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
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function CrimeMapWrapper({ regions, onSelectRegion, selectedRegion, viewType }: RegionGridProps) {
  
  const totalCount = regions.reduce((sum, r) => sum + r.count, 0);

  const allRegionsOption = useMemo(() => ({
    id: 'all',
    name: 'Ver todo',
    lat: 0,
    lng: 0,
    zoom: 0,
    crimeStats: '',
    crimeTrends: '',
    mostCommonCrimes: [],
    count: totalCount
  }), [totalCount]);

  const displayRegions = useMemo(() => [allRegionsOption, ...regions], [allRegionsOption, regions]);

  const maxCount = useMemo(() => {
    return Math.max(...regions.map(r => r.count), 0);
  }, [regions]);

  const getCircleStyle = (count: number) => {
    if (maxCount === 0 || count === 0) return {
      width: '0px',
      height: '0px',
      opacity: 0
    };
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
           {region.id !== 'all' ? (
            <div 
              className={`rounded-full flex items-center justify-center text-white font-bold text-sm mt-2 transition-all ${getCircleColor()}`}
              style={getCircleStyle(region.count)}
            >
              {viewType === 'trust' ? `${region.count}%` : region.count.toLocaleString()}
            </div>
           ) : null}

           {region.id === 'all' && (
             <span className="text-xl font-bold font-headline">
              {viewType === 'trust' ? `${regions.length > 0 ? (totalCount / regions.filter(r => r.count > 0).length).toFixed(1) : 0}%` : totalCount.toLocaleString()}
            </span>
           )}
        </div>
      ))}
    </div>
  );
}
