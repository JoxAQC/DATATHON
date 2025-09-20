"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrustData } from "@/lib/types";

const chartConfig = {
  value: {
    label: "Value",
  },
  "Perception of Insecurity": {
    label: "Insecurity Perception",
    color: "hsl(var(--destructive))",
  },
  "Trust in Police": {
    label: "Trust in Police",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

interface TrustLevelChartProps {
  data: TrustData[];
}

export default function TrustLevelChart({ data }: TrustLevelChartProps) {
  if (data.length === 0) {
    return (
      <Card className="h-full flex flex-col items-center justify-center comic-panel text-muted-foreground">
        <p>No data available</p>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col comic-panel">
      <CardHeader className="p-4">
        <CardTitle className="font-headline text-primary text-xl">Public Trust</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex items-center justify-center gap-4 p-2">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-1">
            <ChartContainer
              config={chartConfig}
              className="w-32 h-32"
            >
              <ResponsiveContainer>
                <RadialBarChart
                  data={[item]}
                  startAngle={-90}
                  endAngle={270}
                  innerRadius="70%"
                  outerRadius="100%"
                  barSize={15}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={10}
                    className={
                      `fill-[var(--color-${item.name.replace(/ /g, "-")})]`
                    }
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="text-center">
              <p className="font-semibold text-base">{item.value}%</p>
              <p className="text-xs text-muted-foreground">{item.name}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
