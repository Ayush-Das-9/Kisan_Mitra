# 🌾 किसान सहायक (KisanSahayak) - Farmer Assistant

A simple React Native (Expo) farming assistant app with a numpad interface that provides audio responses in Hindi using Google's Gemini AI.

## Features

- **Numpad Interface** — Calculator-style input (press 1, 2, or 3)
- **AI Responses** — Powered by Google Gemini (gemini-pro)
- **Hindi Audio** — Text-to-Speech in Hindi (hi-IN)
- **Three Functions:**
  - `1` → फसल की जानकारी (Crop Information)
  - `2` → क्षेत्रीय खेती समाचार (Regional Farming News)
  - `3` → उर्वरक की जानकारी (Fertilizer Information)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Copy the key

### 3. Add Your API Key

1. Open the app
2. Go to the **सेटिंग्स (Settings)** tab
3. Paste your Gemini API key
4. Press **सेव करें (Save)**

### 4. Run the App

```bash
# Start Expo dev server
npx expo start

# Run on Android emulator
npx expo start --android

# Run on iOS simulator (macOS only)
npx expo start --ios
```

## How to Use

1. Open the app → see "किसान सहायक" welcome screen
2. Press **1**, **2**, or **3** on the numpad
3. Press **✓** to submit
4. Wait for Gemini to respond
5. Audio plays automatically in Hindi
6. Read the transcript on screen
7. Press **C** to clear and try again

## Tech Stack

- **React Native** (Expo SDK 54)
- **expo-router** (file-based navigation)
- **@google/generative-ai** (Gemini API)
- **expo-speech** (Text-to-Speech)
- **@react-native-async-storage/async-storage** (API key storage)

## Project Structure

```
├── app/
│   ├── _layout.tsx           # Root layout
│   └── (tabs)/
│       ├── _layout.tsx       # Tab navigator
│       ├── index.tsx         # Home screen (numpad + AI)
│       └── explore.tsx       # Settings screen
├── src/
│   ├── components/
│   │   ├── Numpad.tsx        # Calculator numpad
│   │   ├── LoadingSpinner.tsx
│   │   └── AudioPlayer.tsx
│   ├── services/
│   │   ├── geminiService.ts  # Gemini API integration
│   │   └── ttsService.ts     # Hindi TTS wrapper
│   └── utils/
│       └── constants.ts      # Colors, strings, prompts
```
