// Add custom jest matchers from react-native-testing-library
require('@testing-library/react-native/extend-expect');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
  getAllKeys: jest.fn(() => Promise.resolve([])),
  multiGet: jest.fn(() => Promise.resolve([])),
  multiSet: jest.fn(() => Promise.resolve()),
  multiRemove: jest.fn(() => Promise.resolve()),
}));

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    canGoBack: jest.fn(() => true),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
  Stack: 'Stack',
  Tabs: 'Tabs',
}));

// Mock expo modules
jest.mock('expo-font', () => ({
  useFonts: () => [true, null],
}));

jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
  hideAsync: jest.fn(() => Promise.resolve()),
}));

jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient',
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

// Mock lucide-react-native icons
jest.mock('lucide-react-native', () => ({
  Home: 'Home',
  Dumbbell: 'Dumbbell',
  TrendingUp: 'TrendingUp',
  User: 'User',
  Camera: 'Camera',
  Mic: 'Mic',
  Zap: 'Zap',
  Heart: 'Heart',
  Clock: 'Clock',
  Flame: 'Flame',
  Bell: 'Bell',
  Settings: 'Settings',
  ChevronRight: 'ChevronRight',
  Eye: 'Eye',
  EyeOff: 'EyeOff',
  Mail: 'Mail',
  Lock: 'Lock',
  Battery: 'Battery',
  Brain: 'Brain',
  Target: 'Target',
  Wind: 'Wind',
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock window object for web-specific functionality
global.window = global.window || {};
global.window.frameworkReady = jest.fn();

// Suppress console warnings in tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  warn: jest.fn(),
  error: jest.fn(),
};
