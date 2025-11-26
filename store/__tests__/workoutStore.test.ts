import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useWorkoutStore } from '../workoutStore';
import { mockWorkout, mockWorkouts } from '../../__tests__/utils/mock-data';

describe('workoutStore', () => {
  beforeEach(() => {
    // Clear store state before each test
    const { result } = renderHook(() => useWorkoutStore());
    act(() => {
      result.current.savedWorkouts = [];
      result.current.recentWorkouts = [];
      result.current.favoriteWorkouts = [];
      result.current.currentWorkout = null;
    });
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have empty saved workouts by default', () => {
      const { result } = renderHook(() => useWorkoutStore());
      expect(result.current.savedWorkouts).toEqual([]);
    });

    it('should have empty recent workouts by default', () => {
      const { result } = renderHook(() => useWorkoutStore());
      expect(result.current.recentWorkouts).toEqual([]);
    });

    it('should have empty favorite workouts by default', () => {
      const { result } = renderHook(() => useWorkoutStore());
      expect(result.current.favoriteWorkouts).toEqual([]);
    });

    it('should have null current workout by default', () => {
      const { result } = renderHook(() => useWorkoutStore());
      expect(result.current.currentWorkout).toBeNull();
    });
  });

  describe('addToSaved', () => {
    it('should add a workout to saved workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
      });

      expect(result.current.savedWorkouts).toHaveLength(1);
      expect(result.current.savedWorkouts[0].id).toBe(mockWorkout.id);
      expect(result.current.savedWorkouts[0].title).toBe(mockWorkout.title);
    });

    it('should set savedAt timestamp when adding workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
      });

      expect(result.current.savedWorkouts[0].savedAt).toBeDefined();
      expect(typeof result.current.savedWorkouts[0].savedAt).toBe('string');
    });

    it('should set isFavorite to false by default', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
      });

      expect(result.current.savedWorkouts[0].isFavorite).toBe(false);
    });

    it('should not add duplicate workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.addToSaved(mockWorkout);
      });

      expect(result.current.savedWorkouts).toHaveLength(1);
    });

    it('should add multiple different workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkouts[0]);
        result.current.addToSaved(mockWorkouts[1]);
      });

      expect(result.current.savedWorkouts).toHaveLength(2);
    });
  });

  describe('removeFromSaved', () => {
    it('should remove a workout from saved workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.removeFromSaved(mockWorkout.id);
      });

      expect(result.current.savedWorkouts).toHaveLength(0);
    });

    it('should remove workout from favorites when removed from saved', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.toggleFavorite(mockWorkout.id);
        result.current.removeFromSaved(mockWorkout.id);
      });

      expect(result.current.favoriteWorkouts).not.toContain(mockWorkout.id);
    });

    it('should not error when removing non-existent workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      expect(() => {
        act(() => {
          result.current.removeFromSaved('non-existent-id');
        });
      }).not.toThrow();
    });

    it('should only remove the specified workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkouts[0]);
        result.current.addToSaved(mockWorkouts[1]);
        result.current.removeFromSaved(mockWorkouts[0].id);
      });

      expect(result.current.savedWorkouts).toHaveLength(1);
      expect(result.current.savedWorkouts[0].id).toBe(mockWorkouts[1].id);
    });
  });

  describe('addToRecent', () => {
    it('should add workout to recent workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToRecent(mockWorkout.id);
      });

      expect(result.current.recentWorkouts).toContain(mockWorkout.id);
      expect(result.current.recentWorkouts).toHaveLength(1);
    });

    it('should add workout to the beginning of recent list', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToRecent('workout1');
        result.current.addToRecent('workout2');
      });

      expect(result.current.recentWorkouts[0]).toBe('workout2');
      expect(result.current.recentWorkouts[1]).toBe('workout1');
    });

    it('should move existing workout to the front', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToRecent('workout1');
        result.current.addToRecent('workout2');
        result.current.addToRecent('workout1'); // Re-add workout1
      });

      expect(result.current.recentWorkouts[0]).toBe('workout1');
      expect(result.current.recentWorkouts).toHaveLength(2); // No duplicate
    });

    it('should limit recent workouts to 10 items', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        // Add 15 workouts
        for (let i = 1; i <= 15; i++) {
          result.current.addToRecent(`workout${i}`);
        }
      });

      expect(result.current.recentWorkouts).toHaveLength(10);
      expect(result.current.recentWorkouts[0]).toBe('workout15'); // Most recent
    });

    it('should not have duplicates in recent workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToRecent('workout1');
        result.current.addToRecent('workout2');
        result.current.addToRecent('workout1');
        result.current.addToRecent('workout3');
      });

      const uniqueWorkouts = new Set(result.current.recentWorkouts);
      expect(uniqueWorkouts.size).toBe(result.current.recentWorkouts.length);
    });
  });

  describe('toggleFavorite', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useWorkoutStore());
      act(() => {
        result.current.addToSaved(mockWorkout);
      });
    });

    it('should add workout to favorites when not favorited', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.toggleFavorite(mockWorkout.id);
      });

      expect(result.current.favoriteWorkouts).toContain(mockWorkout.id);
    });

    it('should remove workout from favorites when already favorited', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.toggleFavorite(mockWorkout.id);
        result.current.toggleFavorite(mockWorkout.id);
      });

      expect(result.current.favoriteWorkouts).not.toContain(mockWorkout.id);
    });

    it('should update savedWorkout isFavorite property when favorited', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.toggleFavorite(mockWorkout.id);
      });

      const savedWorkout = result.current.savedWorkouts.find(w => w.id === mockWorkout.id);
      expect(savedWorkout?.isFavorite).toBe(true);
    });

    it('should update savedWorkout isFavorite property when unfavorited', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.toggleFavorite(mockWorkout.id);
        result.current.toggleFavorite(mockWorkout.id);
      });

      const savedWorkout = result.current.savedWorkouts.find(w => w.id === mockWorkout.id);
      expect(savedWorkout?.isFavorite).toBe(false);
    });

    it('should handle toggle for non-saved workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.toggleFavorite('non-existent-id');
      });

      expect(result.current.favoriteWorkouts).toContain('non-existent-id');
    });

    it('should handle multiple favorites', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkouts[0]);
        result.current.addToSaved(mockWorkouts[1]);
        result.current.toggleFavorite(mockWorkouts[0].id);
        result.current.toggleFavorite(mockWorkouts[1].id);
      });

      expect(result.current.favoriteWorkouts).toHaveLength(2);
    });
  });

  describe('setCurrentWorkout', () => {
    it('should set current workout ID', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.setCurrentWorkout(mockWorkout.id);
      });

      expect(result.current.currentWorkout).toBe(mockWorkout.id);
    });

    it('should change current workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.setCurrentWorkout('workout1');
        result.current.setCurrentWorkout('workout2');
      });

      expect(result.current.currentWorkout).toBe('workout2');
    });

    it('should set current workout to null', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.setCurrentWorkout(mockWorkout.id);
        result.current.setCurrentWorkout(null);
      });

      expect(result.current.currentWorkout).toBeNull();
    });
  });

  describe('getSavedWorkout', () => {
    it('should return saved workout by ID', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
      });

      const workout = result.current.getSavedWorkout(mockWorkout.id);
      expect(workout).toBeDefined();
      expect(workout?.id).toBe(mockWorkout.id);
    });

    it('should return undefined for non-existent workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      const workout = result.current.getSavedWorkout('non-existent-id');
      expect(workout).toBeUndefined();
    });

    it('should return correct workout from multiple saved workouts', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkouts[0]);
        result.current.addToSaved(mockWorkouts[1]);
      });

      const workout = result.current.getSavedWorkout(mockWorkouts[1].id);
      expect(workout?.id).toBe(mockWorkouts[1].id);
      expect(workout?.title).toBe(mockWorkouts[1].title);
    });
  });

  describe('Persistence', () => {
    it('should call AsyncStorage setItem when state changes', async () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
      });

      // Wait for async storage to be called
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle complete workout flow', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        // Add workout to saved
        result.current.addToSaved(mockWorkout);
        // Add to recent
        result.current.addToRecent(mockWorkout.id);
        // Favorite it
        result.current.toggleFavorite(mockWorkout.id);
        // Set as current
        result.current.setCurrentWorkout(mockWorkout.id);
      });

      expect(result.current.savedWorkouts).toHaveLength(1);
      expect(result.current.recentWorkouts).toContain(mockWorkout.id);
      expect(result.current.favoriteWorkouts).toContain(mockWorkout.id);
      expect(result.current.currentWorkout).toBe(mockWorkout.id);
      expect(result.current.savedWorkouts[0].isFavorite).toBe(true);
    });

    it('should properly handle removal of favorited workout', () => {
      const { result } = renderHook(() => useWorkoutStore());

      act(() => {
        result.current.addToSaved(mockWorkout);
        result.current.toggleFavorite(mockWorkout.id);
        result.current.removeFromSaved(mockWorkout.id);
      });

      expect(result.current.savedWorkouts).toHaveLength(0);
      expect(result.current.favoriteWorkouts).toHaveLength(0);
    });
  });
});
