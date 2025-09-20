"use client";

import type { DepartmentFeature } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain, Users, ShieldAlert, Shield } from "lucide-react";
import { regions } from "@/lib/data"; // Importa tus tipos de región si los necesitas

type DepartmentInfoProps = {
  department: DepartmentFeature | null;
  regionData: typeof regions[0] | null; // Nuevo prop para los datos de criminalidad
};

export function DepartmentInfo({ department, regionData }: DepartmentInfoProps) {
  if (!department) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center text-muted-foreground">
        <p>Select a department on the map to view its details.</p>
      </div>
    );
  }

  const {
    NOMBDEP,
    HECTARES,
    COUNT,
    crimeIndex,
    policeCount,
  } = department.properties;

  return (
    <Card className="h-full animate-in fade-in-50">
      <CardHeader>
        <CardTitle className="text-2xl font-bold font-headline text-primary">
          {NOMBDEP}
        </CardTitle>
        <CardDescription>Departmental Data</CardDescription>
      </CardHeader>
      <CardContent>
        {/* --- Información del GeoJSON --- */}
        <ul className="space-y-4 text-sm mb-6">
          <li className="flex items-center">
            <Mountain className="mr-3 h-5 w-5 text-accent" />
            <span className="font-semibold">Area:</span>
            <span className="ml-auto">{HECTARES ? HECTARES.toLocaleString("en-US", { maximumFractionDigits: 2 }) : 'N/A'} hectares</span>
          </li>
          <li className="flex items-center">
            <Users className="mr-3 h-5 w-5 text-accent" />
            <span className="font-semibold">Population Metric (Count):</span>
            <span className="ml-auto">{COUNT ? COUNT.toLocaleString("en-US") : 'N/A'}</span>
          </li>
          <li className="flex items-center">
            <ShieldAlert className="mr-3 h-5 w-5 text-accent" />
            <span className="font-semibold">Crime Index:</span>
            <span className="ml-auto">{crimeIndex !== undefined ? `${crimeIndex} / 100` : 'N/A'}</span>
          </li>
          <li className="flex items-center">
            <Shield className="mr-3 h-5 w-5 text-accent" />
            <span className="font-semibold">Police Officers:</span>
            <span className="ml-auto">{policeCount ? policeCount.toLocaleString("en-US") : 'N/A'}</span>
          </li>
        </ul>

        {/* --- Información de data.js --- */}
        {regionData ? (
          <div className="border-t pt-4">
            <h3 className="text-xl font-bold font-headline mb-2 text-primary">
              Información de Criminalidad
            </h3>
            {regionData.crimeStats && (
              <p className="text-sm mb-2">
                <span className="font-semibold">Estadísticas:</span> {regionData.crimeStats}
              </p>
            )}
            {regionData.crimeTrends && (
              <p className="text-sm mb-2">
                <span className="font-semibold">Tendencias:</span> {regionData.crimeTrends}
              </p>
            )}
            {regionData.mostCommonCrimes && regionData.mostCommonCrimes.length > 0 && (
              <div>
                <span className="font-semibold">Crímenes Comunes:</span>
                <ul className="list-disc list-inside text-sm">
                  {regionData.mostCommonCrimes.map((crime, index) => (
                    <li key={index}>{crime}</li>
                  ))}
                </ul>
              </div>
            )}
            {!regionData.crimeStats && !regionData.crimeTrends && (!regionData.mostCommonCrimes || regionData.mostCommonCrimes.length === 0) && (
              <p className="text-sm text-muted-foreground">
                No hay información detallada de criminalidad disponible.
              </p>
            )}
          </div>
        ) : (
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">
              No hay datos de criminalidad disponibles para esta región.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}