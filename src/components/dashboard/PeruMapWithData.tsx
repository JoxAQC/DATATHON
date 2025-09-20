"use client";

import { useState } from "react";
import type { DepartmentFeature, PeruGeoJson } from "@/lib/types";
import peruGeoJsonData from "@/data/peru.json";
import { PeruMap } from "@/components/ui/peru-map";
import { DepartmentInfo } from "@/components/ui/department-info";
import { cn } from "@/lib/utils";

const peruGeoJson = peruGeoJsonData as PeruGeoJson;

interface PeruMapWithDataProps {
  regions: any[]; // Usamos `any` para simplificar, pero idealmente se tiparía
  onSelectRegion: (region: any) => void;
  selectedRegion: any;
  viewType: "crimes" | "heroes";
  maxCount: number;
}

export default function PeruMapWithData({
  regions,
  onSelectRegion,
  selectedRegion,
  viewType,
  maxCount,
}: PeruMapWithDataProps) {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFeature | null>(null);

  const handleSelectDepartment = (department: DepartmentFeature | null) => {
    setSelectedDepartment(department);
    // Llama a la función original de la grilla para mantener la lógica
    // de selección externa.
    if (department) {
      const region = regions.find(
        (r) => r.name.toLowerCase() === department.properties.NOMBDEP.toLowerCase()
      );
      if (region) {
        onSelectRegion(region);
      }
    } else {
      onSelectRegion(null);
    }
  };

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="h-3/5 w-full lg:h-full lg:w-2/3">
        <PeruMap
          geojson={peruGeoJson}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={handleSelectDepartment}
          // Aquí puedes pasar las props necesarias para mostrar los círculos
          // Por ejemplo:
          // regionsData={regions}
          // viewType={viewType}
          // maxCount={maxCount}
        />
      </div>
      <div
        className={cn(
          "h-2/5 w-full p-4 transition-all duration-300 ease-in-out lg:h-full lg:w-1/3",
          "bg-background"
        )}
      >

      </div>
    </div>
  );
}