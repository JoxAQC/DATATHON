"use client";

import { useState, useMemo } from 'react';
import type { Region, CrimeDataPoint, GenderViolenceData, TrustData, CrimeType } from '@/lib/types';
import DashboardSidebar from './dashboard-sidebar';
import MainContent from './main-content';
import Chatbot from './chatbot';
import { crimeDataByYear, allCrimeData, regions as allRegions } from '@/lib/data';
import heroesData from '@/lib/heroes.json';

interface CrimeDashboardProps {
  genderViolenceData: GenderViolenceData[];
  trustData: TrustData[];
}

// Helper function to remove accents
const removeAccents = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

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
  
  const latestYear = useMemo(() => Object.keys(crimeDataByYear).sort((a, b) => b.localeCompare(a)).pop() || new Date().getFullYear().toString(), []);

  const crimeDataForMap = useMemo(() => {
    const dataForYear = crimeDataByYear[latestYear]?.total_crimes_by_location || [];
    
    return allRegions.map(region => {
      let count = 0;
      const normalizedRegionName = removeAccents(region.name).toUpperCase();
      
      if (selectedCrimeType === 'All') {
        const regionData = dataForYear.find(d => removeAccents(d.dpto_pjfs).toUpperCase() === normalizedRegionName);
        count = regionData ? regionData.cantidad : 0;
      } else {
        const regionCrimes = allCrimeData.filter(d => 
            removeAccents(d.region).toUpperCase() === normalizedRegionName && 
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

  const heroesDataForMap = useMemo(() => {
    const heroesByRegion = heroesData.police_by_location.reduce((acc, hero) => {
      const regionName = removeAccents(hero.departamento).toUpperCase();
      if (!acc[regionName]) {
        acc[regionName] = 0;
      }
      acc[regionName] += hero.cantidad;
      return acc;
    }, {} as Record<string, number>);

    return allRegions.map(region => {
      const normalizedRegionName = removeAccents(region.name).toUpperCase();
      const count = heroesByRegion[normalizedRegionName] || 0;
      return {
        ...region,
        count,
      };
    });
  }, []);


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
        crimeRegions={crimeDataForMap}
        heroesRegions={heroesDataForMap}
        genderViolenceData={genderViolenceData}
        trustData={trustData}
        onSelectRegion={handleSelectRegion}
        selectedRegion={selectedRegion}
      />
      <Chatbot />
    </div>
  );
}
