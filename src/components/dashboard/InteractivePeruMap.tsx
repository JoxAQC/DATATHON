// src/components/dashboard/InteractivePeruMap.tsx
'use client';

import { useMemo } from "react";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import peruGeoJsonData from '@/data/peru.json';
import { DepartmentFeature, PeruGeoJson } from "@/lib/types";

const peruGeoJson = peruGeoJsonData as PeruGeoJson;

interface InteractivePeruMapProps {
  regions: DepartmentFeature[];
  onSelectRegion: (region: DepartmentFeature | null) => void;
  selectedRegion: DepartmentFeature | null;
  viewType: 'crimes' | 'heroes';
}

export default function InteractivePeruMap({ regions, onSelectRegion, selectedRegion, viewType }: InteractivePeruMapProps) {
  
  const geojsonData = useMemo(() => {
    return {
      ...peruGeoJson,
      features: peruGeoJson.features.map(feature => {
        const matchingRegion = regions.find(r => r.properties.NOMBDEP.toUpperCase() === feature.properties.NOMBDEP.toUpperCase());
        return {
          ...feature,
          properties: {
            ...feature.properties,
            COUNT: matchingRegion?.properties.COUNT || 0,
            crimeIndex: matchingRegion?.properties.crimeIndex || 0,
            policeCount: matchingRegion?.properties.policeCount || 0,
          }
        };
      })
    };
  }, [regions, viewType]);

  const style = (feature: any) => {
    const isSelected = selectedRegion?.properties.NOMBDEP.toUpperCase() === feature.properties.NOMBDEP.toUpperCase();
    return {
      fillColor: isSelected ? '#ffcc00' : '#4a90e2',
      weight: 1,
      opacity: 1,
      color: '#ccc',
      dashArray: '3',
      fillOpacity: 0.5,
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const departmentName = feature.properties.NOMBDEP;
    
    const fullRegionData = regions.find(r => r.properties.NOMBDEP.toUpperCase() === departmentName.toUpperCase());
    
    layer.on({
      click: () => {
        onSelectRegion(fullRegionData || null);
      },
      mouseover: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        });
      },
      mouseout: (e: any) => {
        const layer = e.target;
        layer.setStyle({
          weight: 1,
          color: '#ccc',
          dashArray: '3',
          fillOpacity: 0.5,
        });
      },
    });
  };

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[-9.19, -75.015]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON
          data={geojsonData as any}
          style={style}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}