import * as Speech from 'expo-speech';

const TTS_OPTIONS: Speech.SpeechOptions = {
    language: 'hi-IN',
    rate: 0.9,
    pitch: 1.0,
};

/**
 * Speaks the given text in Hindi using expo-speech.
 * Returns a promise that resolves when speaking finishes.
 */
export function speakHindi(text: string): Promise<void> {
    return new Promise((resolve, reject) => {
        Speech.speak(text, {
            ...TTS_OPTIONS,
            onDone: () => resolve(),
            onError: (error) => reject(error),
            onStopped: () => resolve(),
        });
    });
}

/**
 * Stops any currently playing speech.
 */
export function stopSpeaking(): void {
    Speech.stop();
}

/**
 * Checks whether speech is currently in progress.
 */
export async function isSpeaking(): Promise<boolean> {
    return Speech.isSpeakingAsync();
}
