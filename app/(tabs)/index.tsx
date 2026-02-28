import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AudioPlayer from '../../src/components/AudioPlayer';
import LoadingSpinner from '../../src/components/LoadingSpinner';
import Numpad from '../../src/components/Numpad';
import { callGeminiAPI } from '../../src/services/geminiService';
import { speakHindi, stopSpeaking } from '../../src/services/ttsService';
import { COLORS, STORAGE_KEYS, STRINGS } from '../../src/utils/constants';

export default function HomeScreen() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [apiKey, setApiKey] = useState('AIzaSyAb17-Yt_xNXT8X2YH7RvPcdgOpoAyp-aM');

  // Load API key when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadApiKey = async () => {
        try {
          const key = await AsyncStorage.getItem(STORAGE_KEYS.API_KEY);
          if (key) setApiKey(key);
        } catch (e) {
          console.error('Failed to load API key:', e);
        }
      };
      loadApiKey();
    }, [])
  );

  const handleNumberPress = (num: string) => {
    // Only allow single digit input
    setInput(num);
  };

  const handleClear = () => {
    setInput('');
    setTranscript('');
    stopSpeaking();
    setSpeaking(false);
  };

  const handleSubmit = async () => {
    if (!input) return;

    if (!apiKey) {
      setTranscript(STRINGS.noApiKey);
      return;
    }

    setLoading(true);
    setTranscript('');

    try {
      // Call Gemini API
      const response = await callGeminiAPI(input, apiKey);
      setTranscript(response);
      setLoading(false);

      // Play audio
      setSpeaking(true);
      await speakHindi(response);
      setSpeaking(false);
    } catch (error) {
      console.error('Error:', error);
      setTranscript(STRINGS.errorOccurred);
      setLoading(false);
      setSpeaking(false);
    }
  };

  const handleStopSpeaking = () => {
    stopSpeaking();
    setSpeaking(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>🌾</Text>
          <Text style={styles.title}>{STRINGS.appTitle}</Text>
          <Text style={styles.welcome}>{STRINGS.welcome}</Text>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>{STRINGS.instructions}</Text>
          <Text style={styles.option}>{STRINGS.option1}</Text>
          <Text style={styles.option}>{STRINGS.option2}</Text>
          <Text style={styles.option}>{STRINGS.option3}</Text>
        </View>

        {/* Loading / Audio / Transcript */}
        {loading && <LoadingSpinner message={STRINGS.processing} />}

        <AudioPlayer isSpeaking={speaking} onStop={handleStopSpeaking} />

        {transcript ? (
          <View style={styles.transcriptCard}>
            <Text style={styles.transcriptLabel}>जवाब:</Text>
            <Text style={styles.transcriptText}>{transcript}</Text>
          </View>
        ) : null}

        {/* Numpad */}
        <View style={styles.numpadSection}>
          <Numpad
            value={input}
            onNumberPress={handleNumberPress}
            onClear={handleClear}
            onSubmit={handleSubmit}
            disabled={loading || speaking}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  welcome: {
    fontSize: 18,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  instructionsCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  option: {
    fontSize: 17,
    color: COLORS.text,
    lineHeight: 30,
    paddingLeft: 8,
  },
  transcriptCard: {
    backgroundColor: COLORS.white,
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  transcriptLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 8,
  },
  transcriptText: {
    fontSize: 16,
    color: COLORS.text,
    lineHeight: 26,
  },
  numpadSection: {
    marginTop: 12,
    paddingBottom: 16,
  },
});
