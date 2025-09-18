// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Provides a chatbot guide to assist users in navigating the crime dashboard.
 *
 * - chatBotGuide - A function that provides guidance and information about the crime dashboard.
 * - ChatBotGuideInput - The input type for the chatBotGuide function.
 * - ChatBotGuideOutput - The return type for the chatBotGuide function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatBotGuideInputSchema = z.object({
  query: z.string().describe('The user query about the dashboard.'),
});
export type ChatBotGuideInput = z.infer<typeof ChatBotGuideInputSchema>;

const ChatBotGuideOutputSchema = z.object({
  response: z.string().describe('The chatbot response to the user query.'),
});
export type ChatBotGuideOutput = z.infer<typeof ChatBotGuideOutputSchema>;

export async function chatBotGuide(input: ChatBotGuideInput): Promise<ChatBotGuideOutput> {
  return chatBotGuideFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatBotGuidePrompt',
  input: {schema: ChatBotGuideInputSchema},
  output: {schema: ChatBotGuideOutputSchema},
  prompt: `You are a helpful chatbot assistant that guides users through a crime dashboard for Peru.

  The dashboard includes:
  - An interactive crime map displaying crime hotspots.
  - Crime type filtering to visualize the distribution of specific crimes.
  - Gender violence insights, including trends and statistics.
  - Trust level measurement of public perception of insecurity and trust in the police.
  - Region drill-down for detailed crime statistics in specific regions.
  - Data export functionality.
  - Crime type icons representing common crimes in each region.

  Use the above information to answer the following user query:
  {{{query}}}`,
});

const chatBotGuideFlow = ai.defineFlow(
  {
    name: 'chatBotGuideFlow',
    inputSchema: ChatBotGuideInputSchema,
    outputSchema: ChatBotGuideOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
