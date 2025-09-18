"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Region, CrimeDataPoint, GenderViolenceData, TrustData } from '@/lib/types';
import { Map, BarChart, Shield } from "lucide-react";
import CrimeMapWrapper from "./crime-map-wrapper";
import GenderViolenceChart from "./gender-violence-chart";
import TrustLevelChart from "./trust-level-chart";
import { Card } from "../ui/card";

interface MainContentProps {
  regions: Region[];
  crimeData: CrimeDataPoint[];
  genderViolenceData: GenderViolenceData[];
  trustData: TrustData[];
  onSelectRegion: (region: Region | null) => void;
}

export default function MainContent({
  regions,
  crimeData,
  genderViolenceData,
  trustData,
  onSelectRegion,
}: MainContentProps) {
  return (
    <main className="flex-1 p-6 bg-background/80">
      <Tabs defaultValue="map" className="h-full w-full flex flex-col">
        <TabsList className="bg-card shadow-sm">
          <TabsTrigger value="map" className="font-headline text-lg">
            <Map className="mr-2 h-5 w-5" />
            Mapa de Regiones
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
          <Card className="h-full w-full overflow-auto p-4">
             <CrimeMapWrapper
                regions={regions}
                onSelectRegion={onSelectRegion}
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
