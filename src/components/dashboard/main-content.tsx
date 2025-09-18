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
  onSelectRegion: (region: Region) => void;
  mapCenter: { lat: number; lng: number };
  mapZoom: number;
}

export default function MainContent({
  regions,
  crimeData,
  genderViolenceData,
  trustData,
  onSelectRegion,
  mapCenter,
  mapZoom
}: MainContentProps) {
  return (
    <main className="flex-1 p-6 bg-background/80">
      <Tabs defaultValue="map" className="h-full w-full flex flex-col">
        <TabsList className="bg-card shadow-sm">
          <TabsTrigger value="map" className="font-headline text-lg">
            <Map className="mr-2 h-5 w-5" />
            Interactive Crime Map
          </TabsTrigger>
          <TabsTrigger value="gender-violence" className="font-headline text-lg">
            <BarChart className="mr-2 h-5 w-5" />
            Gender Violence
          </TabsTrigger>
          <TabsTrigger value="trust" className="font-headline text-lg">
            <Shield className="mr-2 h-5 w-5" />
            Public Trust
          </TabsTrigger>
        </TabsList>
        <TabsContent value="map" className="flex-1 mt-4">
          <Card className="h-full w-full overflow-hidden">
             <CrimeMapWrapper
                regions={regions}
                crimeData={crimeData}
                onSelectRegion={onSelectRegion}
                center={mapCenter}
                zoom={mapZoom}
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
