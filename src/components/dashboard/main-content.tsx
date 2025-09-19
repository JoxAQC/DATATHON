"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Region, GenderViolenceData, TrustData } from '@/lib/types';
import { Map, BarChart, Shield, ShieldCheck } from "lucide-react";
import CrimeMapWrapper from "./crime-map-wrapper";
import GenderViolenceChart from "./gender-violence-chart";
import TrustLevelChart from "./trust-level-chart";
import { Card } from "../ui/card";

interface MainContentProps {
  crimeRegions: (Region & { count: number })[];
  heroesRegions: (Region & { count: number })[];
  genderViolenceData: GenderViolenceData[];
  trustData: TrustData[];
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
}

export default function MainContent({
  crimeRegions,
  heroesRegions,
  genderViolenceData,
  trustData,
  onSelectRegion,
  selectedRegion,
}: MainContentProps) {
  return (
    <main className="flex-1 p-6 bg-transparent">
      <Tabs defaultValue="map" className="h-full w-full flex flex-col">
        <TabsList className="bg-card comic-panel">
          <TabsTrigger value="map" className="font-headline text-lg">
            <Map className="mr-2 h-5 w-5" />
            Mapa de Crímenes
          </TabsTrigger>
          <TabsTrigger value="heroes" className="font-headline text-lg">
            <ShieldCheck className="mr-2 h-5 w-5" />
            Nuestros Héroes
          </TabsTrigger>
          <TabsTrigger value="gender-violence" className="font-headline text-lg">
            <BarChart className="mr-2 h-5 w-5" />
            Violencia de Género
          </TabsTrigger>
          <TabsTrigger value="trust" className="font-headline text-lg">
            <Shield className="mr-2 h-5 w-5" />
            Confianza Pública
          </TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="flex-1 mt-4">
          <Card className="h-full w-full overflow-auto p-4 comic-panel">
             <CrimeMapWrapper
                regions={crimeRegions}
                onSelectRegion={onSelectRegion}
                selectedRegion={selectedRegion}
                viewType="crimes"
            />
          </Card>
        </TabsContent>
         <TabsContent value="heroes" className="flex-1 mt-4">
          <Card className="h-full w-full overflow-auto p-4 comic-panel">
             <CrimeMapWrapper
                regions={heroesRegions}
                onSelectRegion={onSelectRegion}
                selectedRegion={selectedRegion}
                viewType="heroes"
            />
          </Card>
        </TabsContent>
        <TabsContent value="gender-violence" className="flex-1 mt-4">
          <GenderViolenceChart data={genderViolenceData} />
        </TabsContent>
        <TabsContent value="trust" className="flex-1 mt-4">
            <TrustLevelChart data={trustData} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
