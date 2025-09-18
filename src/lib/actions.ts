'use server';

import { chatBotGuide } from '@/ai/flows/chatbot-crime-guide';
import { filterCrimeMapByQuery } from '@/ai/flows/filter-crime-map-by-query';
import { summarizeRegionCrimeData } from '@/ai/flows/summarize-region-crime-data';
import type { Region } from './types';

export async function getChatbotResponse(query: string) {
  try {
    const result = await chatBotGuide({ query });
    return { success: true, response: result.response };
  } catch (error) {
    console.error('Error in getChatbotResponse:', error);
    return { success: false, error: 'Failed to get a response from the assistant.' };
  }
}

export async function getRegionSummary(region: Region) {
  try {
    const result = await summarizeRegionCrimeData({
      regionName: region.name,
      crimeStatistics: region.crimeStats,
      crimeTrends: region.crimeTrends,
    });
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error('Error in getRegionSummary:', error);
    return { success: false, error: 'Failed to generate region summary.' };
  }
}

export async function getCrimeTypeFromQuery(query: string) {
  try {
    const result = await filterCrimeMapByQuery({ query });
    return { success: true, crimeType: result.crimeType };
  } catch (error) {
    console.error('Error in getCrimeTypeFromQuery:', error);
    return { success: false, error: 'Failed to understand the crime type.' };
  }
}
