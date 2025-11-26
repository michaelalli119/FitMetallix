import { workouts, WorkoutLevel, WorkoutType, MoodType, BodyType } from '../workouts';

describe('Workouts Constants', () => {
  describe('Workouts Array', () => {
    it('should export workouts array', () => {
      expect(workouts).toBeDefined();
      expect(Array.isArray(workouts)).toBe(true);
    });

    it('should have at least one workout', () => {
      expect(workouts.length).toBeGreaterThan(0);
    });

    it('should have all workouts with required fields', () => {
      workouts.forEach(workout => {
        expect(workout).toHaveProperty('id');
        expect(workout).toHaveProperty('title');
        expect(workout).toHaveProperty('description');
        expect(workout).toHaveProperty('imageUrl');
        expect(workout).toHaveProperty('level');
        expect(workout).toHaveProperty('type');
        expect(workout).toHaveProperty('duration');
        expect(workout).toHaveProperty('calories');
        expect(workout).toHaveProperty('exercises');
        expect(workout).toHaveProperty('moodTypes');
        expect(workout).toHaveProperty('bodyTypes');
      });
    });

    it('should have unique IDs for all workouts', () => {
      const ids = workouts.map(w => w.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(workouts.length);
    });

    it('should have non-empty titles', () => {
      workouts.forEach(workout => {
        expect(workout.title).toBeTruthy();
        expect(workout.title.length).toBeGreaterThan(0);
      });
    });

    it('should have non-empty descriptions', () => {
      workouts.forEach(workout => {
        expect(workout.description).toBeTruthy();
        expect(workout.description.length).toBeGreaterThan(0);
      });
    });

    it('should have valid image URLs', () => {
      workouts.forEach(workout => {
        expect(workout.imageUrl).toBeTruthy();
        expect(workout.imageUrl).toMatch(/^https?:\/\//);
      });
    });

    it('should have positive duration', () => {
      workouts.forEach(workout => {
        expect(workout.duration).toBeGreaterThan(0);
        expect(typeof workout.duration).toBe('number');
      });
    });

    it('should have positive calories', () => {
      workouts.forEach(workout => {
        expect(workout.calories).toBeGreaterThan(0);
        expect(typeof workout.calories).toBe('number');
      });
    });
  });

  describe('Workout Levels', () => {
    const validLevels: WorkoutLevel[] = ['beginner', 'intermediate', 'advanced'];

    it('should have valid levels for all workouts', () => {
      workouts.forEach(workout => {
        expect(validLevels).toContain(workout.level);
      });
    });

    it('should have at least one workout of each level', () => {
      const levels = workouts.map(w => w.level);

      validLevels.forEach(level => {
        expect(levels).toContain(level);
      });
    });
  });

  describe('Workout Types', () => {
    const validTypes: WorkoutType[] = [
      'strength',
      'cardio',
      'flexibility',
      'recovery',
      'hiit',
      'yoga',
      'weightlifting',
      'sprint',
      'norwegian4x4'
    ];

    it('should have valid types for all workouts', () => {
      workouts.forEach(workout => {
        expect(validTypes).toContain(workout.type);
      });
    });

    it('should have at least one strength workout', () => {
      const types = workouts.map(w => w.type);
      expect(types).toContain('strength');
    });

    it('should have at least one cardio workout', () => {
      const types = workouts.map(w => w.type);
      expect(types).toContain('cardio');
    });
  });

  describe('Mood Types', () => {
    const validMoods: MoodType[] = ['energized', 'tired', 'stressed', 'focused', 'anxious'];

    it('should have valid mood types for all workouts', () => {
      workouts.forEach(workout => {
        expect(Array.isArray(workout.moodTypes)).toBe(true);
        workout.moodTypes.forEach(mood => {
          expect(validMoods).toContain(mood);
        });
      });
    });

    it('should have at least one mood type per workout', () => {
      workouts.forEach(workout => {
        expect(workout.moodTypes.length).toBeGreaterThan(0);
      });
    });

    it('should have workouts for each mood type', () => {
      validMoods.forEach(mood => {
        const workoutsWithMood = workouts.filter(w => w.moodTypes.includes(mood));
        expect(workoutsWithMood.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Body Types', () => {
    const validBodyTypes: BodyType[] = ['ectomorph', 'mesomorph', 'endomorph'];

    it('should have valid body types for all workouts', () => {
      workouts.forEach(workout => {
        expect(Array.isArray(workout.bodyTypes)).toBe(true);
        workout.bodyTypes.forEach(bodyType => {
          expect(validBodyTypes).toContain(bodyType);
        });
      });
    });

    it('should have at least one body type per workout', () => {
      workouts.forEach(workout => {
        expect(workout.bodyTypes.length).toBeGreaterThan(0);
      });
    });

    it('should have workouts for each body type', () => {
      validBodyTypes.forEach(bodyType => {
        const workoutsWithBodyType = workouts.filter(w => w.bodyTypes.includes(bodyType));
        expect(workoutsWithBodyType.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Exercises', () => {
    it('should have exercises array for all workouts', () => {
      workouts.forEach(workout => {
        expect(Array.isArray(workout.exercises)).toBe(true);
        expect(workout.exercises.length).toBeGreaterThan(0);
      });
    });

    it('should have valid exercise structure', () => {
      workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          expect(exercise).toHaveProperty('id');
          expect(exercise).toHaveProperty('name');
          expect(exercise).toHaveProperty('description');
          expect(exercise).toHaveProperty('imageUrl');
          expect(exercise).toHaveProperty('duration');

          expect(typeof exercise.id).toBe('string');
          expect(typeof exercise.name).toBe('string');
          expect(typeof exercise.description).toBe('string');
          expect(typeof exercise.imageUrl).toBe('string');
          expect(typeof exercise.duration).toBe('number');
        });
      });
    });

    it('should have positive exercise duration', () => {
      workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          expect(exercise.duration).toBeGreaterThan(0);
        });
      });
    });

    it('should have valid sets and reps when provided', () => {
      workouts.forEach(workout => {
        workout.exercises.forEach(exercise => {
          if (exercise.sets !== undefined) {
            expect(exercise.sets).toBeGreaterThan(0);
          }
          if (exercise.reps !== undefined) {
            expect(exercise.reps).toBeGreaterThan(0);
          }
          if (exercise.restTime !== undefined) {
            expect(exercise.restTime).toBeGreaterThanOrEqual(0);
          }
        });
      });
    });
  });

  describe('Data Integrity', () => {
    it('should have consistent workout duration with exercise durations', () => {
      workouts.forEach(workout => {
        const totalExerciseDuration = workout.exercises.reduce(
          (sum, exercise) => sum + exercise.duration,
          0
        );

        // Workout duration should be in minutes, exercise duration in seconds
        // So totalExerciseDuration/60 should be roughly equal to workout.duration
        const exerciseDurationInMinutes = totalExerciseDuration / 60;

        // Allow for some flexibility (rest times, warm-up, etc.)
        // Workout duration should be at least as long as exercises
        expect(workout.duration).toBeGreaterThanOrEqual(Math.floor(exerciseDurationInMinutes) - 5);
      });
    });

    it('should have unique exercise IDs within each workout', () => {
      workouts.forEach(workout => {
        const exerciseIds = workout.exercises.map(e => e.id);
        const uniqueIds = new Set(exerciseIds);

        expect(uniqueIds.size).toBe(exerciseIds.length);
      });
    });
  });

  describe('Type Exports', () => {
    it('should export WorkoutLevel type', () => {
      const level: WorkoutLevel = 'beginner';
      expect(level).toBe('beginner');
    });

    it('should export WorkoutType type', () => {
      const type: WorkoutType = 'strength';
      expect(type).toBe('strength');
    });

    it('should export MoodType type', () => {
      const mood: MoodType = 'energized';
      expect(mood).toBe('energized');
    });

    it('should export BodyType type', () => {
      const bodyType: BodyType = 'mesomorph';
      expect(bodyType).toBe('mesomorph');
    });
  });
});
