import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-region-crime-data.ts';
import '@/ai/flows/filter-crime-map-by-query.ts';
import '@/ai/flows/chatbot-crime-guide.ts';