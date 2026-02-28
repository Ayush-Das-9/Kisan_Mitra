import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, STORAGE_KEYS, STRINGS } from '../../src/utils/constants';

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const key = await AsyncStorage.getItem(STORAGE_KEYS.API_KEY);
      if (key) setApiKey(key);
    } catch (e) {
      console.error('Failed to load API key:', e);
    }
  };

  const saveApiKey = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.API_KEY, apiKey.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      console.error('Failed to save API key:', e);
      Alert.alert('Error', 'API Key सेव नहीं हो पाई।');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="settings-outline" size={40} color={COLORS.primary} />
            <Text style={styles.title}>{STRINGS.settingsTitle}</Text>
          </View>

          {/* API Key Input */}
          <View style={styles.card}>
            <Text style={styles.label}>{STRINGS.apiKeyLabel}</Text>
            <Text style={styles.hint}>
              Google AI Studio से API Key प्राप्त करें:{'\n'}
              https://aistudio.google.com/apikey
            </Text>

            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={apiKey}
                onChangeText={(text) => {
                  setApiKey(text);
                  setSaved(false);
                }}
                placeholder={STRINGS.apiKeyPlaceholder}
                placeholderTextColor={COLORS.gray}
                secureTextEntry={!showKey}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowKey(!showKey)}
              >
                <Ionicons
                  name={showKey ? 'eye-off' : 'eye'}
                  size={22}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.saveButton,
                saved && styles.savedButton,
              ]}
              onPress={saveApiKey}
              disabled={!apiKey.trim()}
              activeOpacity={0.7}
            >
              <Ionicons
                name={saved ? 'checkmark-circle' : 'save'}
                size={20}
                color={COLORS.white}
              />
              <Text style={styles.saveButtonText}>
                {saved ? STRINGS.saved : STRINGS.saveButton}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primaryDark,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    borderRadius: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 14,
    color: COLORS.text,
  },
  eyeButton: {
    padding: 12,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  savedButton: {
    backgroundColor: COLORS.primaryDark,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
});
