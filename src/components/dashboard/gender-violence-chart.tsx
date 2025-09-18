"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GenderViolenceData } from "@/lib/types";

const chartConfig = {
  cases: {
    label: "Femicide Cases",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig;

interface GenderViolenceChartProps {
  data: GenderViolenceData[];
}

export default function GenderViolenceChart({ data }: GenderViolenceChartProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline text-primary">Gender Violence Insights</CardTitle>
        <CardDescription>Reported femicide cases in Peru (2019-2023).</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
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
  );
}
