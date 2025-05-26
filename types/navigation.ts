import { NavigatorScreenParams } from '@react-navigation/native';

// Define the param list for each stack
export type RootStackParamList = {
  '(tabs)': NavigatorScreenParams<TabParamList>;
  'modal': undefined;
  'edit-profile': undefined;
  'settings': undefined;
  'notifications': undefined;
  'favorites': undefined;
  'achievements': undefined;
  'body-scan': undefined;
  'voice-control': undefined;
  'quick-workout': undefined;
  'workout-details': { id: string };
  'health-news': undefined;
  'login': undefined;
  'onboarding': undefined;
};

export type TabParamList = {
  'index': undefined;
  'workouts': undefined;
  'progress': undefined;
  'profile': undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}