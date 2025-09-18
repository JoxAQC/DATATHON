import { Skeleton } from "@/components/ui/skeleton";
import { Bot, Map, BarChart, Shield } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full bg-background">
      <div className="w-80 border-r bg-card p-4 flex flex-col gap-6">
        <Skeleton className="h-10 w-48" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="mt-auto space-y-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="flex border-b">
          <div className="flex items-center gap-2 p-4">
            <Map className="h-5 w-5 text-muted-foreground" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center gap-2 p-4">
            <BarChart className="h-5 w-5 text-muted-foreground" />
            <Skeleton className="h-6 w-40" />
          </div>
           <div className="flex items-center gap-2 p-4">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <Skeleton className="h-6 w-36" />
          </div>
        </div>
        <div className="mt-4 h-[calc(100%-100px)] w-full">
            <Skeleton className="h-full w-full rounded-lg" />
        </div>
      </div>
      <div className="fixed bottom-6 right-6">
        <Skeleton className="h-16 w-16 rounded-full" />
      </div>
    </div>
  );
}
