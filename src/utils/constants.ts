// Color palette
export const COLORS = {
  primary: '#4CAF50',       // Green for agriculture
  primaryDark: '#388E3C',
  primaryLight: '#C8E6C9',
  secondary: '#FF9800',     // Orange accent
  secondaryDark: '#F57C00',
  background: '#F5F5F5',
  surface: '#FFFFFF',
  text: '#212121',
  textSecondary: '#757575',
  error: '#D32F2F',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9E9E9E',
  lightGray: '#E0E0E0',
};

// Hindi prompts for each option
export const PROMPTS: Record<string, string> = {
  '1': 'किसान को फसल की बुनियादी जानकारी बताएं। सरल हिंदी में 2-3 वाक्य में जवाब दें।',
  '2': 'भारत में खेती से जुड़ी हाल की एक खबर बताएं। सरल हिंदी में 2-3 वाक्य में।',
  '3': 'उर्वरक के बारे में बुनियादी जानकारी दें। सरल हिंदी में 2-3 वाक्य में।',
};

// Hindi UI strings
export const STRINGS = {
  appTitle: 'किसान सहायक',
  welcome: 'स्वागत है!',
  instructions: 'कृपया चुनें:',
  option1: '1 - फसल की जानकारी',
  option2: '2 - क्षेत्रीय खेती समाचार',
  option3: '3 - उर्वरक की जानकारी',
  askButton: 'पूछें',
  listening: 'सुन रहे हैं...',
  processing: 'जवाब तैयार हो रहा है...',
  speaking: 'बोल रहे हैं...',
  noApiKey: 'कृपया पहले सेटिंग्स में API Key डालें।',
  invalidOption: 'यह विकल्प अभी उपलब्ध नहीं है। कृपया 1, 2 या 3 दबाएं।',
  settingsTitle: 'सेटिंग्स',
  apiKeyLabel: 'Gemini API Key',
  apiKeyPlaceholder: 'अपनी API Key यहाँ डालें',
  saveButton: 'सेव करें',
  saved: 'सेव हो गया!',
  homeTab: 'होम',
  settingsTab: 'सेटिंग्स',
  stopSpeaking: 'रुकें',
  errorOccurred: 'कोई त्रुटि हुई। कृपया फिर से प्रयास करें।',
  enterNumber: 'नंबर दबाएं',
};

// AsyncStorage keys
export const STORAGE_KEYS = {
  API_KEY: '@kisansahayak_api_key',
};

// Fallback responses when Gemini API fails or returns empty
export const FALLBACK_RESPONSES: Record<string, string> = {
  '1': 'गेहूँ भारत की प्रमुख रबी फसल है। इसकी बुआई अक्टूबर-नवंबर में होती है और कटाई मार्च-अप्रैल में। अच्छी उपज के लिए समय पर सिंचाई और उर्वरक का प्रयोग ज़रूरी है। धान, मक्का, बाजरा, और दालें भी भारत की महत्वपूर्ण फसलें हैं। फसल चक्र अपनाने से मिट्टी की उर्वरता बनी रहती है।',
};

// Numpad layout
export const NUMPAD_ROWS = [
  ['7', '8', '9'],
  ['4', '5', '6'],
  ['1', '2', '3'],
  ['C', '0', '✓'],
];
