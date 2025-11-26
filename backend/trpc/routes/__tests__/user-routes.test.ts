import analyzeBodyScan from '../user/analyze-body-scan';
import getAchievements from '../user/get-achievements';
import updateProgress from '../user/update-progress';
import updateProfile from '../user/update-profile';

// Mock the context
const mockContext = {
  req: {} as any,
};

describe('User tRPC Routes', () => {
  describe('updateProfile', () => {
    it('should update profile with valid data', async () => {
      const input = {
        name: 'John Doe',
        age: 30,
        weight: 75,
        height: 180,
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile).toEqual(input);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should handle partial profile updates', async () => {
      const input = {
        name: 'Jane Doe',
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile.name).toBe('Jane Doe');
    });

    it('should handle body type update', async () => {
      const input = {
        bodyType: 'mesomorph' as const,
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile.bodyType).toBe('mesomorph');
    });

    it('should handle fitness level update', async () => {
      const input = {
        fitnessLevel: 'intermediate' as const,
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile.fitnessLevel).toBe('intermediate');
    });

    it('should handle fitness goals update', async () => {
      const input = {
        fitnessGoals: ['Build Muscle', 'Lose Weight', 'Improve Endurance'],
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile.fitnessGoals).toEqual(input.fitnessGoals);
    });

    it('should handle current mood update', async () => {
      const input = {
        currentMood: 'energized' as const,
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile.currentMood).toBe('energized');
    });

    it('should handle nullable fields', async () => {
      const input = {
        age: null,
        weight: null,
      };

      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProfile.age).toBeNull();
      expect(result.updatedProfile.weight).toBeNull();
    });

    it('should include timestamp in response', async () => {
      const input = { name: 'Test' };
      const result = await updateProfile({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProfile', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.timestamp).toBeDefined();
      expect(result.timestamp instanceof Date).toBe(true);
    });
  });

  describe('updateProgress', () => {
    it('should update progress with all fields', async () => {
      const input = {
        completedWorkouts: 10,
        totalWorkoutMinutes: 300,
        streakDays: 5,
        lastWorkoutDate: '2024-01-01T00:00:00.000Z',
      };

      const result = await updateProgress({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProgress', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProgress).toEqual(input);
      expect(result.timestamp).toBeInstanceOf(Date);
    });

    it('should update progress with partial fields', async () => {
      const input = {
        completedWorkouts: 5,
      };

      const result = await updateProgress({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProgress', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProgress.completedWorkouts).toBe(5);
    });

    it('should handle zero values', async () => {
      const input = {
        completedWorkouts: 0,
        totalWorkoutMinutes: 0,
        streakDays: 0,
      };

      const result = await updateProgress({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProgress', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.success).toBe(true);
      expect(result.updatedProgress).toEqual(input);
    });

    it('should include timestamp in response', async () => {
      const input = { completedWorkouts: 1 };
      const result = await updateProgress({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.updateProgress', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.timestamp).toBeDefined();
      expect(result.timestamp instanceof Date).toBe(true);
    });
  });

  describe('analyzeBodyScan', () => {
    it('should analyze body scan with height and weight', async () => {
      const input = {
        height: 180,
        weight: 75,
        age: 25,
        gender: 'male' as const,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result).toHaveProperty('bodyType');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('measurements');
      expect(['ectomorph', 'mesomorph', 'endomorph']).toContain(result.bodyType);
    });

    it('should classify as ectomorph for low BMI', async () => {
      const input = {
        height: 180, // 180 cm
        weight: 55,  // 55 kg - BMI ~17
        age: 25,
        gender: 'male' as const,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.bodyType).toBe('ectomorph');
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(r => r.includes('strength training'))).toBe(true);
    });

    it('should classify as mesomorph for normal BMI', async () => {
      const input = {
        height: 180, // 180 cm
        weight: 75,  // 75 kg - BMI ~23
        age: 25,
        gender: 'male' as const,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.bodyType).toBe('mesomorph');
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(r => r.includes('Balanced'))).toBe(true);
    });

    it('should classify as endomorph for high BMI', async () => {
      const input = {
        height: 180, // 180 cm
        weight: 95,  // 95 kg - BMI ~29
        age: 25,
        gender: 'male' as const,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.bodyType).toBe('endomorph');
      expect(result.recommendations.length).toBeGreaterThan(0);
      expect(result.recommendations.some(r => r.includes('cardio') || r.includes('HIIT'))).toBe(true);
    });

    it('should return measurements', async () => {
      const input = {
        height: 180,
        weight: 75,
        age: 25,
        gender: 'male' as const,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result.measurements).toHaveProperty('bodyFatPercentage');
      expect(result.measurements).toHaveProperty('muscleMass');
      expect(result.measurements).toHaveProperty('metabolicRate');

      expect(typeof result.measurements.bodyFatPercentage).toBe('number');
      expect(typeof result.measurements.muscleMass).toBe('number');
      expect(typeof result.measurements.metabolicRate).toBe('number');
    });

    it('should handle optional parameters', async () => {
      const input = {
        imageBase64: 'base64encodedstring...',
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result).toHaveProperty('bodyType');
      expect(result).toHaveProperty('recommendations');
      expect(result).toHaveProperty('measurements');
    });

    it('should handle missing height and weight', async () => {
      const input = {
        age: 25,
        gender: 'male' as const,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(result).toHaveProperty('bodyType');
      expect(result.bodyType).toBe('mesomorph'); // Default when no BMI calculation
    });

    it('should complete within reasonable time', async () => {
      const input = {
        height: 180,
        weight: 75,
      };

      const startTime = Date.now();
      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });
      const endTime = Date.now();

      // Should complete within 3 seconds (including 1.5s simulated delay)
      expect(endTime - startTime).toBeLessThan(3000);
      expect(result).toBeDefined();
    });

    it('should provide recommendations array', async () => {
      const input = {
        height: 180,
        weight: 75,
      };

      const result = await analyzeBodyScan({ input, ctx: mockContext, type: 'mutation' as const, path: 'user.analyzeBodyScan', getRawInput: async () => input, signal: new AbortController().signal });

      expect(Array.isArray(result.recommendations)).toBe(true);
      expect(result.recommendations.length).toBeGreaterThan(0);
      result.recommendations.forEach(rec => {
        expect(typeof rec).toBe('string');
        expect(rec.length).toBeGreaterThan(0);
      });
    });
  });

  describe('getAchievements', () => {
    it('should return list of achievements', async () => {
      const input = {
        progress: {
          completedWorkouts: 5,
          totalWorkoutMinutes: 150,
          streakDays: 3,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });

      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });

    it('should unlock "First Workout" achievement', async () => {
      const input = {
        progress: {
          completedWorkouts: 1,
          totalWorkoutMinutes: 30,
          streakDays: 0,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const firstWorkout = result.find(a => a.title === 'First Workout');

      expect(firstWorkout).toBeDefined();
      expect(firstWorkout?.unlocked).toBe(true);
      expect(firstWorkout?.progress).toBe(1);
    });

    it('should not unlock "First Workout" with 0 workouts', async () => {
      const input = {
        progress: {
          completedWorkouts: 0,
          totalWorkoutMinutes: 0,
          streakDays: 0,
          lastWorkoutDate: null,
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const firstWorkout = result.find(a => a.title === 'First Workout');

      expect(firstWorkout).toBeDefined();
      expect(firstWorkout?.unlocked).toBe(false);
    });

    it('should unlock "3-Day Streak" achievement', async () => {
      const input = {
        progress: {
          completedWorkouts: 5,
          totalWorkoutMinutes: 150,
          streakDays: 3,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const streak = result.find(a => a.title === '3-Day Streak');

      expect(streak).toBeDefined();
      expect(streak?.unlocked).toBe(true);
      expect(streak?.dateUnlocked).toBeTruthy();
    });

    it('should track progress towards "3-Day Streak"', async () => {
      const input = {
        progress: {
          completedWorkouts: 2,
          totalWorkoutMinutes: 60,
          streakDays: 2,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const streak = result.find(a => a.title === '3-Day Streak');

      expect(streak).toBeDefined();
      expect(streak?.unlocked).toBe(false);
      expect(streak?.progress).toBe(2);
      expect(streak?.total).toBe(3);
    });

    it('should unlock "Time Commitment" achievement', async () => {
      const input = {
        progress: {
          completedWorkouts: 10,
          totalWorkoutMinutes: 300, // 5 hours
          streakDays: 5,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const timeCommitment = result.find(a => a.title === 'Time Commitment');

      expect(timeCommitment).toBeDefined();
      expect(timeCommitment?.unlocked).toBe(true);
    });

    it('should unlock "Consistency King" achievement', async () => {
      const input = {
        progress: {
          completedWorkouts: 10,
          totalWorkoutMinutes: 300,
          streakDays: 5,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const consistency = result.find(a => a.title === 'Consistency King');

      expect(consistency).toBeDefined();
      expect(consistency?.unlocked).toBe(true);
    });

    it('should have correct structure for each achievement', async () => {
      const input = {
        progress: {
          completedWorkouts: 5,
          totalWorkoutMinutes: 150,
          streakDays: 3,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });

      result.forEach(achievement => {
        expect(achievement).toHaveProperty('id');
        expect(achievement).toHaveProperty('title');
        expect(achievement).toHaveProperty('description');
        expect(achievement).toHaveProperty('icon');
        expect(achievement).toHaveProperty('unlocked');
        expect(achievement).toHaveProperty('progress');
        expect(achievement).toHaveProperty('total');
        expect(achievement).toHaveProperty('dateUnlocked');

        expect(typeof achievement.id).toBe('string');
        expect(typeof achievement.title).toBe('string');
        expect(typeof achievement.description).toBe('string');
        expect(typeof achievement.unlocked).toBe('boolean');
        expect(typeof achievement.progress).toBe('number');
        expect(typeof achievement.total).toBe('number');
      });
    });

    it('should set dateUnlocked for unlocked achievements', async () => {
      const input = {
        progress: {
          completedWorkouts: 10,
          totalWorkoutMinutes: 300,
          streakDays: 5,
          lastWorkoutDate: '2024-01-01T00:00:00.000Z',
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const unlocked = result.filter(a => a.unlocked);

      unlocked.forEach(achievement => {
        expect(achievement.dateUnlocked).not.toBeNull();
        expect(typeof achievement.dateUnlocked).toBe('string');
      });
    });

    it('should set dateUnlocked to null for locked achievements', async () => {
      const input = {
        progress: {
          completedWorkouts: 0,
          totalWorkoutMinutes: 0,
          streakDays: 0,
          lastWorkoutDate: null,
        },
      };

      const result = await getAchievements({ input, ctx: mockContext, type: 'query' as const, path: 'user.getAchievements', getRawInput: async () => input, signal: new AbortController().signal });
      const locked = result.filter(a => !a.unlocked);

      locked.forEach(achievement => {
        expect(achievement.dateUnlocked).toBeNull();
      });
    });
  });
});
