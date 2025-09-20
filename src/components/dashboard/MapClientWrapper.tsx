// src/components/dashboard/MapClientWrapper.tsx
'use client';

import dynamic from 'next/dynamic';
import { DepartmentFeature } from '@/lib/types';
import { useState, useMemo, useEffect } from 'react';

// Importa el mapa de forma dinámica para evitar que se renderice en el servidor
const InteractivePeruMap = dynamic(
  () => import('./InteractivePeruMap'),
  { ssr: false }
);

interface MapClientWrapperProps {
  regions: DepartmentFeature[];
  onSelectRegion: (region: DepartmentFeature | null) => void;
  selectedRegion: DepartmentFeature | null;
  viewType: 'crimes' | 'heroes';
}

export default function MapClientWrapper({
  regions,
  onSelectRegion,
  selectedRegion,
  viewType,
}: MapClientWrapperProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <InteractivePeruMap
        regions={regions}
        onSelectRegion={onSelectRegion}
        selectedRegion={selectedRegion}
        viewType={viewType}
      />
    </div>
  );
}