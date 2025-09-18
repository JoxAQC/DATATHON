'use server';
/**
 * @fileOverview Summarizes crime statistics and trends for a specific region.
 *
 * - summarizeRegionCrimeData - A function that summarizes the crime data for a region.
 * - SummarizeRegionCrimeDataInput - The input type for the summarizeRegionCrimeData function.
 * - SummarizeRegionCrimeDataOutput - The return type for the summarizeRegionCrimeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeRegionCrimeDataInputSchema = z.object({
  regionName: z.string().describe('The name of the region to summarize crime data for.'),
  crimeStatistics: z.string().describe('Crime statistics for the region.'),
  crimeTrends: z.string().describe('Crime trends for the region.'),
});
export type SummarizeRegionCrimeDataInput = z.infer<
  typeof SummarizeRegionCrimeDataInputSchema
>;

const SummarizeRegionCrimeDataOutputSchema = z.object({
  summary: z.string().describe('A summary of the crime statistics and trends for the region.'),
});
export type SummarizeRegionCrimeDataOutput = z.infer<
  typeof SummarizeRegionCrimeDataOutputSchema
>;

export async function summarizeRegionCrimeData(
  input: SummarizeRegionCrimeDataInput
): Promise<SummarizeRegionCrimeDataOutput> {
  return summarizeRegionCrimeDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeRegionCrimeDataPrompt',
  input: {schema: SummarizeRegionCrimeDataInputSchema},
  output: {schema: SummarizeRegionCrimeDataOutputSchema},
  prompt: `You are an expert in summarizing crime data for different regions.

  Summarize the crime statistics and trends for the following region in an easy-to-read format.

  Region Name: {{{regionName}}}
  Crime Statistics: {{{crimeStatistics}}}
  Crime Trends: {{{crimeTrends}}}
  `,
});

const summarizeRegionCrimeDataFlow = ai.defineFlow(
  {
    name: 'summarizeRegionCrimeDataFlow',
    inputSchema: SummarizeRegionCrimeDataInputSchema,
    outputSchema: SummarizeRegionCrimeDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
