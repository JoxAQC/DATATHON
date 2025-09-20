// components/peru-explorer-client.tsx

"use client";

import { useState, useEffect, useMemo } from "react";
import type { DepartmentFeature, PeruGeoJson, Region } from "@/lib/types";
import peruGeoJsonData from "@/lib/peru.json";
import { PeruMap } from "../ui/peru-map";
import { regions as allRegionsData } from "@/lib/data"; // Importamos todos los datos de regiones
import { cn } from "@/lib/utils";

const peruGeoJson = peruGeoJsonData as PeruGeoJson;

interface PeruExplorerClientProps {
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
  // Puedes pasar el viewType aquí si quieres colorear el mapa
  viewType?: 'crimes' | 'heroes' | 'trust' | 'gender';
  // Y los datos para esa vista si son diferentes
  regions?: (Region & { count: number })[];
}

export default function PeruExplorerClient({
  onSelectRegion,
  selectedRegion,
  viewType = 'crimes',
  regions = allRegionsData.map(r => ({ ...r, count: 0 })), // Usa un array por defecto
}: PeruExplorerClientProps) {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFeature | null>(null);

  // Sincroniza el estado del mapa con la prop `selectedRegion`
  useEffect(() => {
    if (selectedRegion) {
      const dept = peruGeoJson.features.find(f => f.properties.id === selectedRegion.id);
      setSelectedDepartment(dept as DepartmentFeature);
    } else {
      setSelectedDepartment(null);
    }
  }, [selectedRegion]);

  // Lógica para manejar el clic en el mapa y notificar al componente padre
  const handleSelectDepartment = (department: DepartmentFeature | null) => {
    setSelectedDepartment(department);
    if (department) {
      const region = allRegionsData.find(r => r.id === department.properties.id);
      onSelectRegion(region || null);
    } else {
      onSelectRegion(null);
    }
  };

  // Lógica para colorear el mapa (similar a la anterior)
  const mapData = useMemo(() => {
    const maxCount = Math.max(...regions.map(r => r.count), 0);
    return regions.reduce((acc, region) => {
      let color = '#D1D5DB'; // Color por defecto
      let value = region.count;

      if (maxCount > 0) {
        const normalized = value / maxCount;
        switch (viewType) {
          case 'crimes': color = `hsl(10 70% ${50 - normalized * 30}%)`; break;
          case 'heroes': color = `hsl(120 70% ${50 - normalized * 30}%)`; break;
          case 'trust': color = `hsl(210 70% ${50 - normalized * 30}%)`; break;
          case 'gender': color = `hsl(280 70% ${50 - normalized * 30}%)`; break;
        }
      }
      acc[region.id] = { color, value };
      return acc;
    }, {} as Record<string, { color: string, value: number }>);
  }, [regions, viewType]);

  const getColorForDepartment = (departmentId: string): string => {
    return mapData[departmentId]?.color || '#D1D5DB';
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