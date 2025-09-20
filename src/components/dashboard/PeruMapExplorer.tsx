"use client";

import { useState } from "react";
import type { DepartmentFeature, PeruGeoJson } from "@/lib/types";
import peruGeoJsonData from "@/data/peru.json";
import { PeruMap } from "@/components/ui/peru-map";
import { DepartmentInfo } from "@/components/ui/department-info";
import { cn } from "@/lib/utils";

const peruGeoJson = peruGeoJsonData as PeruGeoJson;

export default function PeruMapExplorer() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<DepartmentFeature | null>(null);

  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="h-3/5 w-full lg:h-full lg:w-2/3">
        <PeruMap
          geojson={peruGeoJson}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
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