import { GoogleGenerativeAI } from '@google/generative-ai';
import { FALLBACK_RESPONSES, PROMPTS, STRINGS } from '../utils/constants';

const DEFAULT_API_KEY = 'AIzaSyA5rCB4aawh5wa2PZ9ybScXnP41LO7IrXw';

/**
 * Calls the Gemini API with a prompt determined by the user's number input.
 * Returns the text response, a fallback response for supported options, or an error message in Hindi.
 */
export async function callGeminiAPI(
    number: string,
    apiKey: string
): Promise<string> {
    const key = DEFAULT_API_KEY;

    const prompt = PROMPTS[number];
    if (!prompt) {
        return STRINGS.invalidOption;
    }

    try {
        const genAI = new GoogleGenerativeAI(key);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-preview-tts' });

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        if (!text) {
            // Use fallback response if available for this option
            if (FALLBACK_RESPONSES[number]) {
                return FALLBACK_RESPONSES[number];
            }
            return STRINGS.errorOccurred;
        }

        return text;
    } catch (error) {
        console.error('Gemini API error:', error);
        // Use fallback response if available for this option
        if (FALLBACK_RESPONSES[number]) {
            return FALLBACK_RESPONSES[number];
        }
        return STRINGS.errorOccurred;
    }
}
