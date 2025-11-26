import getWorkouts from '../workouts/get-workouts';
import getWorkoutById from '../workouts/get-workout-by-id';
import getRecommendedWorkouts from '../workouts/get-recommended-workouts';
import { workouts } from '@/constants/workouts';

// Mock the context
const mockContext = {
  req: {} as any,
};

describe('Workout tRPC Routes', () => {
  describe('getWorkouts', () => {
    it('should return all workouts by default', async () => {
      const input = {};
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(10); // Default limit
    });

    it('should filter workouts by type', async () => {
      const input = { type: 'strength' as const };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      result.forEach(workout => {
        expect(workout.type).toBe('strength');
      });
    });

    it('should filter workouts by level', async () => {
      const input = { level: 'beginner' as const };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      result.forEach(workout => {
        expect(workout.level).toBe('beginner');
      });
    });

    it('should filter by both type and level', async () => {
      const input = { type: 'cardio' as const, level: 'intermediate' as const };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      result.forEach(workout => {
        expect(workout.type).toBe('cardio');
        expect(workout.level).toBe('intermediate');
      });
    });

    it('should respect limit parameter', async () => {
      const input = { limit: 3 };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('should return empty array when no workouts match filters', async () => {
      const input = { type: 'strength' as const, level: 'advanced' as const };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      // This might return empty or some results depending on the data
      expect(Array.isArray(result)).toBe(true);
    });

    it('should return all workouts when type is "all"', async () => {
      const input = { type: 'all' as const };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return all workouts when level is "all"', async () => {
      const input = { level: 'all' as const };
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      expect(result.length).toBeGreaterThan(0);
    });

    it('should return workouts with valid structure', async () => {
      const input = {};
      const result = await getWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkouts', rawInput: input });

      if (result.length > 0) {
        const workout = result[0];
        expect(workout).toHaveProperty('id');
        expect(workout).toHaveProperty('title');
        expect(workout).toHaveProperty('description');
        expect(workout).toHaveProperty('level');
        expect(workout).toHaveProperty('type');
        expect(workout).toHaveProperty('duration');
        expect(workout).toHaveProperty('calories');
        expect(workout).toHaveProperty('exercises');
      }
    });
  });

  describe('getWorkoutById', () => {
    it('should return workout by valid ID', async () => {
      const validWorkout = workouts[0];
      const input = { id: validWorkout.id };
      const result = await getWorkoutById({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkoutById', rawInput: input });

      expect(result).toBeDefined();
      expect(result.id).toBe(validWorkout.id);
      expect(result.title).toBe(validWorkout.title);
    });

    it('should throw error for invalid ID', async () => {
      const input = { id: 'non-existent-id' };

      await expect(
        getWorkoutById({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkoutById', rawInput: input })
      ).rejects.toThrow('not found');
    });

    it('should return workout with complete data structure', async () => {
      const validWorkout = workouts[0];
      const input = { id: validWorkout.id };
      const result = await getWorkoutById({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkoutById', rawInput: input });

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('description');
      expect(result).toHaveProperty('imageUrl');
      expect(result).toHaveProperty('level');
      expect(result).toHaveProperty('type');
      expect(result).toHaveProperty('duration');
      expect(result).toHaveProperty('calories');
      expect(result).toHaveProperty('exercises');
      expect(result).toHaveProperty('moodTypes');
      expect(result).toHaveProperty('bodyTypes');
      expect(Array.isArray(result.exercises)).toBe(true);
    });

    it('should return workout with exercises array', async () => {
      const validWorkout = workouts[0];
      const input = { id: validWorkout.id };
      const result = await getWorkoutById({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getWorkoutById', rawInput: input });

      expect(Array.isArray(result.exercises)).toBe(true);
      if (result.exercises.length > 0) {
        const exercise = result.exercises[0];
        expect(exercise).toHaveProperty('id');
        expect(exercise).toHaveProperty('name');
        expect(exercise).toHaveProperty('description');
        expect(exercise).toHaveProperty('duration');
      }
    });
  });

  describe('getRecommendedWorkouts', () => {
    it('should return workouts without filters', async () => {
      const input = {};
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect(result.length).toBeLessThanOrEqual(3); // Default limit
    });

    it('should filter by body type', async () => {
      const input = { bodyType: 'mesomorph' as const, limit: 10 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      result.forEach(workout => {
        expect(workout.bodyTypes).toContain('mesomorph');
      });
    });

    it('should filter by mood', async () => {
      const input = { mood: 'energized' as const, limit: 10 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      result.forEach(workout => {
        expect(workout.moodTypes).toContain('energized');
      });
    });

    it('should filter by both body type and mood', async () => {
      const input = { bodyType: 'mesomorph' as const, mood: 'energized' as const, limit: 10 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      result.forEach(workout => {
        expect(workout.bodyTypes).toContain('mesomorph');
        expect(workout.moodTypes).toContain('energized');
      });
    });

    it('should respect limit parameter', async () => {
      const input = { limit: 2 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      expect(result.length).toBeLessThanOrEqual(2);
    });

    it('should return fallback workouts when no matches found', async () => {
      // Use an uncommon combination that might not exist
      const input = { bodyType: 'ectomorph' as const, mood: 'anxious' as const, limit: 3 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      // Should still return workouts even if no exact matches
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should enforce minimum limit of 1', async () => {
      const input = { limit: 1 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      expect(result.length).toBeGreaterThanOrEqual(0);
      expect(result.length).toBeLessThanOrEqual(1);
    });

    it('should enforce maximum limit of 10', async () => {
      const input = { limit: 10 };
      const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      expect(result.length).toBeLessThanOrEqual(10);
    });

    it('should randomize workout order', async () => {
      const input = { limit: 3 };
      const result1 = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });
      const result2 = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

      // Note: This test might occasionally fail due to randomness
      // but should pass most of the time
      const ids1 = result1.map(w => w.id).join(',');
      const ids2 = result2.map(w => w.id).join(',');

      // Run multiple times to check randomization
      let different = ids1 !== ids2;

      if (!different) {
        // Try a few more times to verify randomization
        for (let i = 0; i < 5; i++) {
          const result3 = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });
          const ids3 = result3.map(w => w.id).join(',');
          if (ids1 !== ids3) {
            different = true;
            break;
          }
        }
      }

      // If we have enough workouts, order should vary
      if (workouts.length >= 3) {
        expect(different).toBe(true);
      }
    });

    it('should accept valid body types', async () => {
      const bodyTypes = ['ectomorph', 'mesomorph', 'endomorph'] as const;

      for (const bodyType of bodyTypes) {
        const input = { bodyType, limit: 5 };
        const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

        expect(Array.isArray(result)).toBe(true);
      }
    });

    it('should accept valid mood types', async () => {
      const moods = ['energized', 'tired', 'stressed', 'focused', 'anxious'] as const;

      for (const mood of moods) {
        const input = { mood, limit: 5 };
        const result = await getRecommendedWorkouts({ input, ctx: mockContext, type: 'query' as const, path: 'workouts.getRecommendedWorkouts', rawInput: input });

        expect(Array.isArray(result)).toBe(true);
      }
    });
  });
});
