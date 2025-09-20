// components/peru-explorer-client.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import type { DepartmentFeature, PeruGeoJson, Region } from "@/lib/types";
import peruGeoJsonData from "@/lib/peru.json";
import { PeruMap } from "../ui/peru-map";
import { regions as allRegionsData } from "@/lib/data"; // Importamos todos los datos de regiones
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Shield } from "lucide-react";

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

const viewConfig = {
    crimes: { title: 'Top 5 Crímenes', unit: '', gradient: 'from-red-200 to-red-600' },
    heroes: { title: 'Top 5 Héroes', unit: '', gradient: 'from-green-200 to-green-600' },
    trust: { title: 'Top 5 Confianza', unit: '%', gradient: 'from-blue-200 to-blue-600' },
    gender: { title: 'Top 5 Violencia de Género', unit: '', gradient: 'from-purple-200 to-purple-600' },
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
      const dept = peruGeoJson.features.find(f => removeAccents(f.properties.NOMBDEP) === removeAccents(selectedRegion.name));
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
      const region = allRegionsData.find(r => removeAccents(r.name) === removeAccents(department.properties.NOMBDEP));
      onSelectRegion(region || null);
    } else {
      onSelectRegion(null);
    }
  };

  const { mapData, topRegions } = useMemo(() => {
    const maxCount = Math.max(...regions.map(r => r.count), 0);
    const regionDataMap = regions.reduce((acc, region) => {
        const normalizedName = removeAccents(region.name);
        acc[normalizedName] = { count: region.count, id: region.id };
        return acc;
    }, {} as Record<string, { count: number, id: string }>);

    const calculatedMapData = allRegionsData.reduce((acc, region) => {
      let color = '#E5E7EB'; // Gris por defecto para valores 0
      const normalizedRegionName = removeAccents(region.name);
      const data = regionDataMap[normalizedRegionName];
      const value = data ? data.count : 0;
      
      if (maxCount > 0 && value > 0) {
        const normalizedValue = value / maxCount;
        switch (viewType) {
          case 'crimes': color = `hsl(0, 80%, ${90 - normalizedValue * 40}%)`; break;
          case 'heroes': color = `hsl(120, 70%, ${90 - normalizedValue * 40}%)`; break;
          case 'trust': color = `hsl(210, 80%, ${90 - normalizedValue * 40}%)`; break;
          case 'gender': color = `hsl(280, 70%, ${90 - normalizedValue * 40}%)`; break;
        }
      }
      
      acc[region.id] = { color, value };
      return acc;
    }, {} as Record<string, { color: string, value: number }>);

    const sortedRegions = [...regions].sort((a, b) => b.count - a.count);
    const calculatedTopRegions = sortedRegions.slice(0, 5);

    return { mapData: calculatedMapData, topRegions: calculatedTopRegions };

  }, [regions, viewType]);

  const getColorForDepartment = (departmentId: string): string => {
    return mapData[departmentId]?.color || '#E5E7EB'; // Default to a light gray
  };
  
  const currentViewConfig = viewConfig[viewType];

  return (
    <div className="flex h-full w-full relative">
      <PeruMap
        geojson={peruGeoJson}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={handleSelectDepartment}
        colorizer={getColorForDepartment}
      />
      <Card className="absolute bottom-4 left-4 w-64 bg-card/80 backdrop-blur-sm comic-panel">
        <CardHeader className="p-3">
          <CardTitle className="text-md font-headline text-primary">{currentViewConfig.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0">
          <div className={`w-full h-2 rounded-full bg-gradient-to-r ${currentViewConfig.gradient} mb-2`}></div>
          <ul className="space-y-1 text-sm">
            {topRegions.map((region, index) => (
              <li key={region.id} className="flex justify-between items-center">
                <span className="font-semibold">{index + 1}. {region.name}</span>
                <span className="font-bold text-primary flex items-center gap-1">
                  {viewType === 'heroes' && <Shield className="h-4 w-4" />}
                  {region.count.toLocaleString()}{currentViewConfig.unit}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
