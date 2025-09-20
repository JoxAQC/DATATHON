"use client";

import { TabsContent } from "@/components/ui/tabs";
import type { Region, GenderViolenceData, TrustData } from '@/lib/types';
import CrimeMapWrapper from "./crime-map-wrapper";
import GenderViolenceChart from "./gender-violence-chart";
import TrustLevelChart from "./trust-level-chart";
import { Card } from "../ui/card";

interface MainContentProps {
  activeTab: string;
  crimeRegions: (Region & { count: number })[];
  heroesRegions: (Region & { count: number })[];
  genderViolenceData: GenderViolenceData[];
  trustData: TrustData[];
  onSelectRegion: (region: Region | null) => void;
  selectedRegion: Region | null;
}

export default function MainContent({
  activeTab,
  crimeRegions,
  heroesRegions,
  genderViolenceData,
  trustData,
  onSelectRegion,
  selectedRegion,
}: MainContentProps) {
  return (
    <main className="flex-1 p-6 bg-transparent">
        <TabsContent value="map" className="h-full mt-0">
          <Card className="h-full w-full overflow-auto p-4 comic-panel">
             <CrimeMapWrapper
                regions={crimeRegions}
                onSelectRegion={onSelectRegion}
                selectedRegion={selectedRegion}
                viewType="crimes"
            />
          </Card>
        </TabsContent>
         <TabsContent value="heroes" className="h-full mt-0">
          <Card className="h-full w-full overflow-auto p-4 comic-panel">
             <CrimeMapWrapper
                regions={heroesRegions}
                onSelectRegion={onSelectRegion}
                selectedRegion={selectedRegion}
                viewType="heroes"
            />
          </Card>
        </TabsContent>
        <TabsContent value="gender-violence" className="h-full mt-0">
          <GenderViolenceChart data={genderViolenceData} />
        </TabsContent>
        <TabsContent value="trust" className="h-full mt-0">
            <TrustLevelChart data={trustData} />
        </TabsContent>
    </main>
  );
}
