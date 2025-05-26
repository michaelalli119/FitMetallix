import { BodyType, MoodType, WorkoutLevel } from '@/constants/workouts';

export interface UserProfile {
  name: string;
  age: number | null;
  weight: number | null;
  height: number | null;
  bodyType: BodyType | null;
  fitnessLevel: WorkoutLevel;
  fitnessGoals: string[];
  currentMood: MoodType | null;
  profileImage: string | null;
}

export interface WorkoutProgress {
  completedWorkouts: number;
  totalWorkoutMinutes: number;
  streakDays: number;
  lastWorkoutDate: string | null;
}

export interface UserSettings {
  darkMode: boolean;
  units: 'metric' | 'imperial';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
  reminderTime: string | null;
}