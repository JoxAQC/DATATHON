// components/peru-explorer-client.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import type { DepartmentFeature, PeruGeoJson, Region } from "@/lib/types";
import peruGeoJsonData from "@/lib/peru.json";
import { PeruMap } from "../ui/peru-map";
import { regions as allRegionsData } from "@/lib/data"; // Importamos todos los datos de regiones

const peruGeoJson = peruGeoJsonData as PeruGeoJson;

// Helper to normalize names
const removeAccents = (str: string) => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
};

interface PeruExplorerClientProps {
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
  viewType?: 'crimes' | 'heroes' | 'trust' | 'gender';
  regions: (Region & { count: number })[];
}

export default function PeruExplorerClient({
  onSelectRegion,
  selectedRegion,
  viewType = 'crimes',
  regions,
}: PeruExplorerClientProps) {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFeature | null>(null);

  useEffect(() => {
    if (selectedRegion) {
      const dept = peruGeoJson.features.find(f => f.properties.FIRST_IDDP === selectedRegion.id);
      if(dept) {
        setSelectedDepartment(dept);
      }
    } else {
      setSelectedDepartment(null);
    }
  }, [selectedRegion]);

  const handleSelectDepartment = (department: DepartmentFeature | null) => {
    setSelectedDepartment(department);
    if (department) {
      const region = allRegionsData.find(r => r.id === department.properties.FIRST_IDDP);
      onSelectRegion(region || null);
    } else {
      onSelectRegion(null);
    }
  };

  const mapData = useMemo(() => {
    const maxCount = Math.max(...regions.map(r => r.count), 0);
    const regionDataMap = regions.reduce((acc, region) => {
        const normalizedName = removeAccents(region.name);
        acc[normalizedName] = { count: region.count, id: region.id };
        return acc;
    }, {} as Record<string, { count: number, id: string }>);

    return allRegionsData.reduce((acc, region) => {
      let color = '#D1D5DB';
      const normalizedRegionName = removeAccents(region.name);
      const data = regionDataMap[normalizedRegionName];
      const value = data ? data.count : 0;
      
      if (maxCount > 0) {
        const normalizedValue = value / maxCount;
        switch (viewType) {
          case 'crimes': color = `hsl(0 80% ${90 - normalizedValue * 40}%)`; break;
          case 'heroes': color = `hsl(120 70% ${90 - normalizedValue * 40}%)`; break;
          case 'trust': color = `hsl(210 80% ${90 - normalizedValue * 40}%)`; break;
          case 'gender': color = `hsl(280 70% ${90 - normalizedValue * 40}%)`; break;
        }
      }
      
      acc[region.id] = { color, value };
      return acc;
    }, {} as Record<string, { color: string, value: number }>);
  }, [regions, viewType]);

  const getColorForDepartment = (departmentId: string): string => {
    return mapData[departmentId]?.color || '#E5E7EB'; // Default to a light gray
  };

  return (
    <div className="flex h-full w-full">
      <PeruMap
        geojson={peruGeoJson}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={handleSelectDepartment}
        colorizer={getColorForDepartment}
      />
    </div>
  );
}