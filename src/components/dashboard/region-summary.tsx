"use client";

import { useEffect, useState } from 'react';
import type { Region } from '@/lib/types';
import { getRegionSummary } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RegionSummaryProps {
  region: Region;
}

export default function RegionSummary({ region }: RegionSummaryProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSummary() {
      setIsLoading(true);
      setError('');
      setSummary('');
      const result = await getRegionSummary(region);
      if (result.success && result.summary) {
        setSummary(result.summary);
      } else {
        setError(result.error || 'Could not load summary.');
      }
      setIsLoading(false);
    }
    fetchSummary();
  }, [region]);

  return (
    <ScrollArea className="mt-2 flex-1 pr-3">
      <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground space-y-4">
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        )}
        {error && <p className="text-destructive">{error}</p>}
        {summary && <p>{summary}</p>}
      </div>
    </ScrollArea>
  );
}
