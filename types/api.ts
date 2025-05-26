import { z } from 'zod';

export const workoutSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  type: z.enum([
    'strength',
    'cardio',
    'flexibility',
    'recovery',
    'hiit',
    'yoga',
    'weightlifting',
    'sprint',
    'norwegian4x4'
  ]),
  duration: z.number(),
  calories: z.number(),
  exercises: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    imageUrl: z.string().url(),
    duration: z.number(),
    sets: z.number().optional(),
    reps: z.number().optional(),
    restTime: z.number().optional()
  })),
  moodTypes: z.array(z.enum(['energized', 'tired', 'stressed', 'focused', 'anxious'])),
  bodyTypes: z.array(z.enum(['ectomorph', 'mesomorph', 'endomorph']))
});

export type WorkoutSchemaType = z.infer<typeof workoutSchema>;

export const userProfileSchema = z.object({
  name: z.string(),
  age: z.number().nullable(),
  weight: z.number().nullable(),
  height: z.number().nullable(),
  bodyType: z.enum(['ectomorph', 'mesomorph', 'endomorph']).nullable(),
  fitnessLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  fitnessGoals: z.array(z.string()),
  currentMood: z.enum(['energized', 'tired', 'stressed', 'focused', 'anxious']).nullable(),
  profileImage: z.string().nullable()
});

export type UserProfileSchemaType = z.infer<typeof userProfileSchema>;