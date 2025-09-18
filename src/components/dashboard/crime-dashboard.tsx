"use client";

import { useState, useMemo } from 'react';
import type { Region, CrimeDataPoint, GenderViolenceData, TrustData, CrimeType } from '@/lib/types';
import DashboardSidebar from './dashboard-sidebar';
import MainContent from './main-content';
import Chatbot from './chatbot';

interface CrimeDashboardProps {
  regions: Region[];
  initialCrimeData: CrimeDataPoint[];
  genderViolenceData: GenderViolenceData[];
  trustData: TrustData[];
}

export default function CrimeDashboard({
  regions,
  initialCrimeData,
  genderViolenceData,
  trustData,
}: CrimeDashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType | 'All'>('All');
  
  const handleSelectRegion = (region: Region | null) => {
    setSelectedRegion(region);
    if (region) {
      setSelectedCrimeType('All');
    }
  };

  const handleSelectCrimeType = (crimeType: CrimeType | 'All') => {
    setSelectedCrimeType(crimeType);
  };
  
  const filteredCrimeData = useMemo(() => {
    let data = initialCrimeData;
    if (selectedRegion) {
      data = data.filter(d => d.region === selectedRegion.name);
    }
    if (selectedCrimeType !== 'All') {
      return data.filter(d => d.type === selectedCrimeType);
    }
    return data;
  }, [initialCrimeData, selectedRegion, selectedCrimeType]);

  const handleExportData = () => {
    const dataStr = JSON.stringify(filteredCrimeData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = 'crime_data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const mostCommonCrimesInView = selectedRegion ? selectedRegion.mostCommonCrimes : ['Aggravated Robbery', 'Homicide', 'Assault', 'Extortion'];

  return (
    <div className="flex h-screen w-full bg-background font-body">
      <DashboardSidebar
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
        selectedCrimeType={selectedCrimeType}
        onSelectCrimeType={handleSelectCrimeType}
        mostCommonCrimes={mostCommonCrimesInView}
        onExport={handleExportData}
        allRegions={regions}
      />
      <MainContent
        regions={regions}
        crimeData={filteredCrimeData}
        genderViolenceData={genderViolenceData}
        trustData={trustData}
        onSelectRegion={handleSelectRegion}
      />
      <Chatbot />
    </div>
  );
}
