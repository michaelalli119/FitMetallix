import { Workout, Exercise } from '@/types/workout';
import { UserProfile, WorkoutProgress, UserSettings } from '@/types/user';

export const mockExercise: Exercise = {
  id: 'e1',
  name: 'Push-ups',
  description: 'Classic exercise for chest, shoulders, and triceps',
  imageUrl: 'https://example.com/pushups.jpg',
  duration: 60,
  sets: 3,
  reps: 10,
  restTime: 30,
};

export const mockWorkout: Workout = {
  id: '1',
  title: 'Full Body Strength',
  description: 'A complete workout targeting all major muscle groups',
  imageUrl: 'https://example.com/workout.jpg',
  level: 'intermediate',
  type: 'strength',
  duration: 45,
  calories: 350,
  moodTypes: ['energized', 'focused'],
  bodyTypes: ['mesomorph', 'endomorph'],
  exercises: [mockExercise],
};

export const mockWorkouts: Workout[] = [
  mockWorkout,
  {
    id: '2',
    title: 'Cardio Blast',
    description: 'High-intensity cardio workout',
    imageUrl: 'https://example.com/cardio.jpg',
    level: 'beginner',
    type: 'cardio',
    duration: 30,
    calories: 250,
    moodTypes: ['energized', 'stressed'],
    bodyTypes: ['ectomorph', 'mesomorph', 'endomorph'],
    exercises: [mockExercise],
  },
  {
    id: '3',
    title: 'Yoga Flow',
    description: 'Relaxing yoga session',
    imageUrl: 'https://example.com/yoga.jpg',
    level: 'beginner',
    type: 'yoga',
    duration: 20,
    calories: 100,
    moodTypes: ['stressed', 'tired'],
    bodyTypes: ['ectomorph', 'mesomorph', 'endomorph'],
    exercises: [mockExercise],
  },
];

export const mockUserProfile: UserProfile = {
  name: 'Test User',
  age: 25,
  weight: 70,
  height: 175,
  bodyType: 'mesomorph',
  fitnessLevel: 'intermediate',
  fitnessGoals: ['Build Muscle', 'Lose Weight'],
  currentMood: 'energized',
  profileImage: null,
};

export const mockWorkoutProgress: WorkoutProgress = {
  completedWorkouts: 5,
  totalWorkoutMinutes: 150,
  streakDays: 3,
  lastWorkoutDate: '2024-01-01T00:00:00.000Z',
};

export const mockUserSettings: UserSettings = {
  darkMode: true,
  units: 'metric',
  soundEnabled: true,
  hapticEnabled: true,
  notificationsEnabled: true,
  reminderTime: '08:00',
};
