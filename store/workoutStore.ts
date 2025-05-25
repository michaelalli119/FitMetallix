import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Workout } from '@/constants/workouts';

interface SavedWorkout extends Workout {
  savedAt: string;
  isFavorite: boolean;
}

interface WorkoutState {
  savedWorkouts: SavedWorkout[];
  recentWorkouts: string[]; // IDs of recently viewed workouts
  favoriteWorkouts: string[]; // IDs of favorite workouts
  currentWorkout: string | null; // ID of current workout
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (workoutId: string) => void;
  addToRecent: (workoutId: string) => void;
  toggleFavorite: (workoutId: string) => void;
  setCurrentWorkout: (workoutId: string | null) => void;
  getSavedWorkout: (workoutId: string) => SavedWorkout | undefined;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      savedWorkouts: [],
      recentWorkouts: [],
      favoriteWorkouts: [],
      currentWorkout: null,
      addToSaved: (workout) =>
        set((state) => {
          // Check if workout already exists
          const exists = state.savedWorkouts.some((w) => w.id === workout.id);
          if (exists) return state;

          const savedWorkout: SavedWorkout = {
            ...workout,
            savedAt: new Date().toISOString(),
            isFavorite: false,
          };

          return {
            savedWorkouts: [...state.savedWorkouts, savedWorkout],
          };
        }),
      removeFromSaved: (workoutId) =>
        set((state) => ({
          savedWorkouts: state.savedWorkouts.filter((w) => w.id !== workoutId),
          favoriteWorkouts: state.favoriteWorkouts.filter((id) => id !== workoutId),
        })),
      addToRecent: (workoutId) =>
        set((state) => {
          const filteredRecents = state.recentWorkouts.filter((id) => id !== workoutId);
          return {
            recentWorkouts: [workoutId, ...filteredRecents].slice(0, 10), // Keep only 10 most recent
          };
        }),
      toggleFavorite: (workoutId) =>
        set((state) => {
          const isFavorite = state.favoriteWorkouts.includes(workoutId);
          
          // Update the savedWorkout object
          const updatedSavedWorkouts = state.savedWorkouts.map(workout => 
            workout.id === workoutId 
              ? { ...workout, isFavorite: !isFavorite } 
              : workout
          );

          return {
            favoriteWorkouts: isFavorite
              ? state.favoriteWorkouts.filter((id) => id !== workoutId)
              : [...state.favoriteWorkouts, workoutId],
            savedWorkouts: updatedSavedWorkouts,
          };
        }),
      setCurrentWorkout: (workoutId) => set({ currentWorkout: workoutId }),
      getSavedWorkout: (workoutId) => {
        return get().savedWorkouts.find((w) => w.id === workoutId);
      },
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);