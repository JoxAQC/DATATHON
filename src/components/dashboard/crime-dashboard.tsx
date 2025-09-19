"use client";

import { useState, useMemo } from 'react';
import type { Region, CrimeDataPoint, GenderViolenceData, TrustData, CrimeType } from '@/lib/types';
import DashboardSidebar from './dashboard-sidebar';
import MainContent from './main-content';
import Chatbot from './chatbot';
import { crimeDataByYear, allCrimeData, regions as allRegions } from '@/lib/data';

interface CrimeDashboardProps {
  genderViolenceData: GenderViolenceData[];
  trustData: TrustData[];
}

export default function CrimeDashboard({
  genderViolenceData,
  trustData,
}: CrimeDashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType | 'All'>('All');
  
  const handleSelectRegion = (region: Region | null) => {
    setSelectedRegion(region);
  };

  const handleSelectCrimeType = (crimeType: CrimeType | 'All') => {
    setSelectedCrimeType(crimeType);
  };
  
  const latestYear = useMemo(() => Object.keys(crimeDataByYear).sort().pop() || new Date().getFullYear().toString(), []);

  const crimeDataForMap = useMemo(() => {
    const dataForYear = crimeDataByYear[latestYear]?.total_crimes_by_location || [];
    const crimeTypeData = crimeDataByYear[latestYear]?.crimes_by_type_and_location || [];
    
    return allRegions.map(region => {
      let count = 0;
      if (selectedCrimeType === 'All') {
        const regionData = dataForYear.find(d => d.dpto_pjfs === region.name);
        count = regionData ? regionData.cantidad : 0;
      } else {
        const regionCrimes = allCrimeData.filter(d => 
            d.region === region.name && 
            d.type === selectedCrimeType &&
            d.date === latestYear
        );
        count = regionCrimes.reduce((acc, crime) => acc + crime.count, 0);
      }
      return {
        ...region,
        count,
      };
    });
  }, [selectedCrimeType, latestYear]);

  const handleExportData = () => {
    const dataStr = JSON.stringify({
      selectedRegion,
      selectedCrimeType,
      crimeDataForMap
    }, null, 2);
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
        allRegions={allRegions}
        crimeDataByYear={crimeDataByYear}
        allCrimeData={allCrimeData}
      />
      <MainContent
        regions={crimeDataForMap}
        genderViolenceData={genderViolenceData}
        trustData={trustData}
        onSelectRegion={handleSelectRegion}
        selectedRegion={selectedRegion}
      />
      <Chatbot />
    </div>
  );
}
