"use client";

import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, LineChart, Line, Legend, Tooltip } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenderViolenceCase, Region } from "@/lib/types";

const removeAccents = (str: string) => {
  if (!str) return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const chartConfig = {
  cases: {
    label: "Femicide Cases",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

const districtChartConfig = {
  district1: { label: "District 1", color: "hsl(var(--chart-1))" },
  district2: { label: "District 2", color: "hsl(var(--chart-2))" },
  district3: { label: "District 3", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;


interface GenderViolenceChartProps {
  region: Region;
  allData: GenderViolenceCase[];
}

export default function GenderViolenceChart({ region, allData }: GenderViolenceChartProps) {

  const normalizedRegionName = removeAccents(region.name).toUpperCase();
  
  const regionData = useMemo(() => {
    const dataByYear: { [year: number]: number } = {};
    allData
      .filter(d => removeAccents(d.dpto_hecho).toUpperCase() === normalizedRegionName)
      .forEach(item => {
        if (!dataByYear[item.año]) {
          dataByYear[item.año] = 0;
        }
        dataByYear[item.año] += item.cantidad;
      });
    
    return Object.keys(dataByYear).map(year => ({
      year: parseInt(year),
      cases: dataByYear[parseInt(year)],
    })).sort((a,b) => a.year - b.year);
  }, [region, allData]);

  const districtData = useMemo(() => {
    const latestYear = Math.max(...allData.map(d => d.año));
    const regionDataLatestYear = allData.filter(d => 
        removeAccents(d.dpto_hecho).toUpperCase() === normalizedRegionName &&
        d.año === latestYear
    );

    const casesByDistrict = regionDataLatestYear.reduce((acc, item) => {
        const district = item.dist_hecho;
        if(!acc[district]) acc[district] = 0;
        acc[district] += item.cantidad;
        return acc;
    }, {} as Record<string, number>);

    const topDistricts = Object.entries(casesByDistrict)
        .sort(([,a],[,b]) => b - a)
        .slice(0, 3)
        .map(([district]) => district);

    if (topDistricts.length === 0) return { data: [], config: {}, districts: topDistricts };

    const historicalDataByYear: Record<string, any> = {};

    allData
        .filter(d => removeAccents(d.dpto_hecho).toUpperCase() === normalizedRegionName && topDistricts.includes(d.dist_hecho))
        .forEach(item => {
            if(!historicalDataByYear[item.año]) {
                historicalDataByYear[item.año] = { year: item.año };
            }
            if(topDistricts.includes(item.dist_hecho) && !historicalDataByYear[item.año][item.dist_hecho]) {
                historicalDataByYear[item.año][item.dist_hecho] = 0;
            }
            if(topDistricts.includes(item.dist_hecho)) {
              historicalDataByYear[item.año][item.dist_hecho] += item.cantidad;
            }
        });
        
    const finalData = Object.values(historicalDataByYear).sort((a,b) => a.year - b.year);

    const newConfig: ChartConfig = {};
    topDistricts.forEach((dist, i) => {
        newConfig[dist] = {
            label: dist,
            color: `hsl(var(--chart-${i + 1}))`
        }
    });

    return { data: finalData, config: newConfig, districts: topDistricts };

  }, [region, allData]);


  return (
    <div className="space-y-4">
      <Card className="flex flex-col comic-panel">
        <CardHeader>
          <CardTitle className="font-headline text-primary">Gender Violence Trend</CardTitle>
          <CardDescription>Reported femicide cases in {region.name}.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 h-48">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer>
              <BarChart data={regionData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="year"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.toString()}
                />
                 <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                 />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="cases" fill="var(--color-cases)" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      {districtData.data.length > 0 && (
        <Card className="flex flex-col comic-panel">
            <CardHeader>
                <CardTitle className="font-headline text-primary text-lg">Top Districts Trend</CardTitle>
                <CardDescription>Historical cases for top 3 districts in {region.name}.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 h-56">
                <ChartContainer config={districtData.config} className="h-full w-full">
                    <ResponsiveContainer>
                        <LineChart data={districtData.data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="year" tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                            <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={12} />
                            <Tooltip content={<ChartTooltipContent />} />
                            <Legend />
                            {districtData.districts.map((dist, i) => (
                                <Line key={dist} type="monotone" dataKey={dist} stroke={`var(--color-${dist})`} strokeWidth={2} dot={true} />
                            ))}
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
