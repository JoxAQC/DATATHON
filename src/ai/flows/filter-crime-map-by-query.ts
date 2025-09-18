'use server';
/**
 * @fileOverview Filters the crime map based on a free-text query describing a crime type.
 *
 * - filterCrimeMapByQuery - A function that filters the crime map by a query.
 * - FilterCrimeMapByQueryInput - The input type for the filterCrimeMapByQuery function.
 * - FilterCrimeMapByQueryOutput - The return type for the filterCrimeMapByQuery function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterCrimeMapByQueryInputSchema = z.object({
  query: z.string().describe('A free-text query describing a crime type.'),
});
export type FilterCrimeMapByQueryInput = z.infer<typeof FilterCrimeMapByQueryInputSchema>;

const FilterCrimeMapByQueryOutputSchema = z.object({
  crimeType: z.string().describe('The standardized crime type extracted from the query.'),
});
export type FilterCrimeMapByQueryOutput = z.infer<typeof FilterCrimeMapByQueryOutputSchema>;

export async function filterCrimeMapByQuery(input: FilterCrimeMapByQueryInput): Promise<FilterCrimeMapByQueryOutput> {
  return filterCrimeMapByQueryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterCrimeMapByQueryPrompt',
  input: {schema: FilterCrimeMapByQueryInputSchema},
  output: {schema: FilterCrimeMapByQueryOutputSchema},
  prompt: `You are an AI assistant that helps to filter a crime map based on user queries.

  Given a free-text query describing a crime type, extract the standardized crime type.

  Query: {{{query}}}
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_ONLY_HIGH',
      },
    ],
  },
});

const filterCrimeMapByQueryFlow = ai.defineFlow(
  {
    name: 'filterCrimeMapByQueryFlow',
    inputSchema: FilterCrimeMapByQueryInputSchema,
    outputSchema: FilterCrimeMapByQueryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
