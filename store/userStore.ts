import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BodyType, MoodType, WorkoutLevel } from '@/constants/workouts';

interface UserProfile {
  name: string;
  age: number | null;
  weight: number | null; // in kg
  height: number | null; // in cm
  bodyType: BodyType | null;
  fitnessLevel: WorkoutLevel;
  fitnessGoals: string[];
  currentMood: MoodType | null;
  profileImage: string | null;
}

interface WorkoutProgress {
  completedWorkouts: number;
  totalWorkoutMinutes: number;
  streakDays: number;
  lastWorkoutDate: string | null;
}

interface UserSettings {
  darkMode: boolean;
  units: 'metric' | 'imperial';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
  reminderTime: string | null; // HH:MM format
}

interface UserState {
  profile: UserProfile;
  progress: WorkoutProgress;
  settings: UserSettings;
  isOnboarded: boolean;
  isAuthenticated: boolean;
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateProgress: (progress: Partial<WorkoutProgress>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  setOnboarded: (value: boolean) => void;
  setAuthenticated: (value: boolean) => void;
  setCurrentMood: (mood: MoodType) => void;
  setBodyType: (bodyType: BodyType) => void;
  resetUser: () => void;
}

const defaultProfile: UserProfile = {
  name: '',
  age: null,
  weight: null,
  height: null,
  bodyType: null,
  fitnessLevel: 'beginner',
  fitnessGoals: [],
  currentMood: null,
  profileImage: null,
};

const defaultProgress: WorkoutProgress = {
  completedWorkouts: 0,
  totalWorkoutMinutes: 0,
  streakDays: 0,
  lastWorkoutDate: null,
};

const defaultSettings: UserSettings = {
  darkMode: true,
  units: 'metric',
  soundEnabled: true,
  hapticEnabled: true,
  notificationsEnabled: true,
  reminderTime: null,
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      progress: defaultProgress,
      settings: defaultSettings,
      isOnboarded: false,
      isAuthenticated: false,
      updateProfile: (newProfileData) =>
        set((state) => ({
          profile: { ...state.profile, ...newProfileData },
        })),
      updateProgress: (newProgressData) =>
        set((state) => ({
          progress: { ...state.progress, ...newProgressData },
        })),
      updateSettings: (newSettingsData) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettingsData },
        })),
      setOnboarded: (value) => set({ isOnboarded: value }),
      setAuthenticated: (value) => set({ isAuthenticated: value }),
      setCurrentMood: (mood) =>
        set((state) => ({
          profile: { ...state.profile, currentMood: mood },
        })),
      setBodyType: (bodyType) =>
        set((state) => ({
          profile: { ...state.profile, bodyType },
        })),
      resetUser: () => set({
        profile: defaultProfile,
        progress: defaultProgress,
        isOnboarded: false,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);