"use client";

import { useState, useMemo } from 'react';
import type { Region, CrimeDataPoint, GenderViolenceData, TrustData, CrimeType } from '@/lib/types';
import DashboardSidebar from './dashboard-sidebar';
import MainContent from './main-content';
import Chatbot from './chatbot';
import { crimeDataByYear, allCrimeData, regions as allRegions, trustData as allTrustData, genderViolenceData as allGenderViolenceData } from '@/lib/data';
import heroesData from '@/lib/heroes.json';
import { Map, ShieldCheck, BarChart, Shield } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { cn } from '@/lib/utils';

interface CrimeDashboardProps {
}

// Helper function to remove accents
const removeAccents = (str: string) => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export default function CrimeDashboard({
}: CrimeDashboardProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedCrimeType, setSelectedCrimeType] = useState<CrimeType | 'All'>('All');
  const [activeTab, setActiveTab] = useState('map');
  
  const handleSelectRegion = (region: Region | null) => {
    setSelectedRegion(region);
  };

  const handleSelectCrimeType = (crimeType: CrimeType | 'All') => {
    setSelectedCrimeType(crimeType);
  };
  
  const latestYear = useMemo(() => {
    const years = Object.keys(crimeDataByYear);
    if (years.length === 0) return new Date().getFullYear().toString();
    return years.sort((a, b) => b.localeCompare(a))[0];
  }, []);


  const crimeDataForMap = useMemo(() => {
    const dataForYear = crimeDataByYear[latestYear]?.total_crimes_by_location || [];
    const crimeCounts: Record<string, number> = {};

    dataForYear.forEach(item => {
        const normalizedRegionName = removeAccents(item.dpto_pjfs).toUpperCase();
        if(!crimeCounts[normalizedRegionName]) {
            crimeCounts[normalizedRegionName] = 0;
        }
        crimeCounts[normalizedRegionName] += item.cantidad;
    });

    return allRegions.map(region => {
      const normalizedRegionName = removeAccents(region.name).toUpperCase();
      let count = 0;

      if (selectedCrimeType === 'All') {
        count = crimeCounts[normalizedRegionName] || 0;
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
  
  const trustDataForMap = useMemo(() => {
    const latestYearData = allTrustData.filter(d => d.name === 'Trust in Police').sort((a, b) => b.year - a.year);
    const latestYear = latestYearData.length > 0 ? latestYearData[0].year : new Date().getFullYear();

    const trustByRegion = latestYearData.filter(d => d.year === latestYear).reduce((acc, item) => {
        if(item.region && item.region !== 'NACIONAL'){
            const regionName = removeAccents(item.region).toUpperCase();
            acc[regionName] = item.value;
        }
        return acc;
    }, {} as Record<string, number>);


    return allRegions.map(region => {
        const normalizedRegionName = removeAccents(region.name).toUpperCase();
        const count = trustByRegion[normalizedRegionName] || 0;
        return {
            ...region,
            count,
        };
    });
  }, []);

  const genderViolenceDataForMap = useMemo(() => {
    const latestYear = Math.max(...allGenderViolenceData.map(d => d.año));
    const dataForYear = allGenderViolenceData.filter(d => d.año === latestYear);

    const violenceByRegion = dataForYear.reduce((acc, item) => {
      const regionName = removeAccents(item.dpto_hecho).toUpperCase();
      if (!acc[regionName]) {
        acc[regionName] = 0;
      }
      acc[regionName] += item.cantidad;
      return acc;
    }, {} as Record<string, number>);

    return allRegions.map(region => {
      const normalizedRegionName = removeAccents(region.name).toUpperCase();
      const count = violenceByRegion[normalizedRegionName] || 0;
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

  return (
    <Tabs value={activeTab} onValueChange={(tab) => {
        setActiveTab(tab);
        setSelectedRegion(null);
    }} orientation="vertical" className="flex h-screen w-full bg-background font-body">
<aside className="w-24 flex-shrink-0 bg-card p-4 flex flex-col items-center justify-center z-20 comic-panel">
  <TabsList className="bg-transparent flex-col gap-4 h-full">
    <TabsTrigger value="map" className="font-headline text-lg flex-col h-20 w-20 comic-panel">
      <img src="icono_mapa_crimenes.png" alt="Crímenes" className="mb-1 h-10 w-10" />
      <span>Crímenes</span>
    </TabsTrigger>
    <TabsTrigger value="heroes" className="font-headline text-lg flex-col h-20 w-20 comic-panel">
      <img src="icono_policia.png" alt="Héroes" className="mb-1 h-10 w-10" />
      <span>Héroes</span>
    </TabsTrigger>
    <TabsTrigger value="gender-violence" className="font-headline text-lg flex-col h-20 w-20 comic-panel">
      <img src="icono_violencia_genero.png" alt="Violencia de Género" className="mb-1 h-10 w-10" />
      <span>Género</span>
    </TabsTrigger>
    <TabsTrigger value="trust" className="font-headline text-lg flex-col h-20 w-20 comic-panel">
      <img src="icono_confianza.png" alt="Confianza" className="mb-1 h-10 w-10" />
      <span>Confianza</span>
    </TabsTrigger>
  </TabsList>
</aside>
      
      <MainContent
        activeTab={activeTab}
        crimeRegions={crimeDataForMap}
        heroesRegions={heroesDataForMap}
        trustRegions={trustDataForMap}
        genderViolenceRegions={genderViolenceDataForMap}
        onSelectRegion={handleSelectRegion}
        selectedRegion={selectedRegion}
      />
      
      <DashboardSidebar
        activeTab={activeTab}
        selectedRegion={selectedRegion}
        onSelectRegion={handleSelectRegion}
        selectedCrimeType={selectedCrimeType}
        onSelectCrimeType={handleSelectCrimeType}
        onExport={handleExportData}
        allRegions={allRegions}
        crimeDataByYear={crimeDataByYear}
        allCrimeData={allCrimeData}
        trustData={allTrustData}
        genderViolenceData={allGenderViolenceData}
      />
      
      <Chatbot />
    </Tabs>
  );
}
