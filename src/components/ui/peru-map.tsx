"use client";

import { useMemo } from "react";
import type { DepartmentFeature, PeruGeoJson } from "@/lib/types";
import { cn } from "@/lib/utils";

type PeruMapProps = {
  geojson: PeruGeoJson;
  selectedDepartment: DepartmentFeature | null;
  onSelectDepartment: (feature: DepartmentFeature) => void;
};

export function PeruMap({
  geojson,
  selectedDepartment,
  onSelectDepartment,
}: PeruMapProps) {
  const { paths, width, height } = useMemo(() => {
    if (!geojson.features || geojson.features.length === 0) {
      return { paths: [], width: 0, height: 0, projection: () => [0, 0] };
    }

    let minLon = Infinity,
      maxLon = -Infinity,
      minLat = Infinity,
      maxLat = -Infinity;

    geojson.features.forEach((feature) => {
      const geometries =
        feature.geometry.type === "Polygon"
          ? [feature.geometry.coordinates]
          : feature.geometry.coordinates;

      geometries.forEach((polygon) => {
        polygon.forEach((ring) => {
          ring.forEach(([lon, lat]) => {
            if (lon < minLon) minLon = lon;
            if (lon > maxLon) maxLon = lon;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
          });
        });
      });
    });

    const svgWidth = 800;
    const svgHeight = 800;

    const lonRange = maxLon - minLon;
    const latRange = maxLat - minLat;

    const scaleX = svgWidth / lonRange;
    const scaleY = svgHeight / latRange;
    const scale = Math.min(scaleX, scaleY);
    
    const mapWidth = lonRange * scale;
    const mapHeight = latRange * scale;

    const offsetX = (svgWidth - mapWidth) / 2;
    const offsetY = (svgHeight - mapHeight) / 2;

    const projectionFunc = ([lon, lat]: [number, number]): [number, number] => {
      const x = (lon - minLon) * scale + offsetX;
      const y = (maxLat - lat) * scale + offsetY;
      return [x, y];
    };
    
    const getPathData = (geometry: DepartmentFeature["geometry"]) => {
        const geometries =
          geometry.type === "Polygon"
            ? [geometry.coordinates]
            : geometry.coordinates;
        
        return geometries.map(polygon =>
            polygon.map(ring => "M" + ring.map(p => projectionFunc(p as [number, number]).join(",")).join("L") + "Z")
            .join(" ")
        ).join(" ");
    };

    const pathData = geojson.features.map((feature) => ({
      ...feature,
      path: getPathData(feature.geometry),
    }));

    return { paths: pathData, width: svgWidth, height: svgHeight };
  }, [geojson]);

  return (
    <div className="w-full h-full bg-secondary/20 flex items-center justify-center p-4">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        className="max-w-full max-h-full"
      >
        <g>
          {paths.map((feature) => (
            <path
              key={feature.properties.NOMBDEP}
              d={feature.path}
              className={cn(
                "stroke-background/50 stroke-[0.5] transition-all duration-200 ease-in-out cursor-pointer",
                selectedDepartment?.properties.NOMBDEP ===
                  feature.properties.NOMBDEP
                  ? "fill-accent stroke-background"
                  : "fill-primary hover:fill-primary/80"
              )}
              onClick={() => onSelectDepartment(feature)}
            >
              <title>{feature.properties.NOMBDEP}</title>
            </path>
          ))}
        </g>
      </svg>
    </div>
  );
}
