"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import type { Region, CrimeDataPoint } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

interface CrimeMapProps {
  regions: Region[];
  crimeData: CrimeDataPoint[];
  onSelectRegion: (region: Region) => void;
  center: { lat: number, lng: number };
  zoom: number;
}

function CrimeMap({ regions, crimeData, onSelectRegion, center, zoom }: CrimeMapProps) {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Map
        mapId="crime-map-peru"
        style={{ width: '100%', height: '100%' }}
        defaultCenter={center}
        defaultZoom={zoom}
        center={center}
        zoom={zoom}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
        mapTypeId="roadmap"
        options={{
          styles: [
            { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#263c3f" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#6b9a76" }],
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#38414e" }],
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#212a37" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9ca5b3" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#746855" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry.stroke",
              stylers: [{ color: "#1f2835" }],
            },
            {
              featureType: "road.highway",
              elementType: "labels.text.fill",
              stylers: [{ color: "#f3d19c" }],
            },
            {
              featureType: "transit",
              elementType: "geometry",
              stylers: [{ color: "#2f3948" }],
            },
            {
              featureType: "transit.station",
              elementType: "labels.text.fill",
              stylers: [{ color: "#d59563" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#17263c" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#515c6d" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#17263c" }],
            },
          ],
        }}
      >
        {crimeData.map((point) => (
          <AdvancedMarker key={point.id} position={{ lat: point.lat, lng: point.lng }}>
            <div className="h-4 w-4 bg-destructive/70 rounded-full border-2 border-destructive animate-pulse"></div>
          </AdvancedMarker>
        ))}

        {regions.map((region) => (
          <AdvancedMarker
            key={region.id}
            position={{ lat: region.lat, lng: region.lng }}
            onClick={() => onSelectRegion(region)}
          >
            <Pin background={'hsl(var(--primary))'} glyphColor={'hsl(var(--primary-foreground))'} borderColor={'hsl(var(--primary-foreground))'} />
          </AdvancedMarker>
        ))}
      </Map>
    </div>
  );
}


export default function CrimeMapWrapper(props: CrimeMapProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
        return (
            <Card className="h-full w-full flex items-center justify-center bg-muted">
                <CardContent className="text-center p-6">
                    <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                    <h2 className="mt-4 text-xl font-semibold font-headline text-destructive">
                        MAPS API KEY MISSING
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                        Please add your Google Maps API Key to a <code className="font-code text-sm bg-secondary p-1 rounded">.env.local</code> file to display the map.
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        <code className="font-code text-sm bg-secondary p-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_API_KEY</code>
                    </p>
                </CardContent>
            </Card>
        );
    }
    
    return (
        <APIProvider apiKey={apiKey}>
            <CrimeMap {...props} />
        </APIProvider>
    );
}
