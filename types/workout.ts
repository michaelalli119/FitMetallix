import { MoodType, BodyType, WorkoutLevel } from '@/constants/workouts';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;
  sets?: number;
  reps?: number;
  restTime?: number;
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: WorkoutLevel;
  type: WorkoutType;
  duration: number;
  calories: number;
  exercises: Exercise[];
  moodTypes: MoodType[];
  bodyTypes: BodyType[];
}

export type WorkoutType = 
  | 'strength' 
  | 'cardio' 
  | 'flexibility' 
  | 'recovery' 
  | 'hiit' 
  | 'yoga' 
  | 'weightlifting' 
  | 'sprint' 
  | 'norwegian4x4';