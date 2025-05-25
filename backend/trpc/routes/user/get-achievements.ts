import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";

export default publicProcedure
  .input(
    z.object({
      progress: z.object({
        completedWorkouts: z.number(),
        totalWorkoutMinutes: z.number(),
        streakDays: z.number(),
        lastWorkoutDate: z.string().nullable(),
      }),
    })
  )
  .query(({ input }) => {
    const { progress } = input;
    
    // Generate achievements based on user progress
    return [
      {
        id: '1',
        title: 'First Workout',
        description: 'Completed your first workout',
        icon: 'award',
        unlocked: progress.completedWorkouts >= 1,
        progress: progress.completedWorkouts >= 1 ? 1 : 0,
        total: 1,
        dateUnlocked: progress.completedWorkouts >= 1 ? new Date().toISOString() : null,
      },
      {
        id: '2',
        title: '3-Day Streak',
        description: 'Worked out for 3 days in a row',
        icon: 'calendar',
        unlocked: progress.streakDays >= 3,
        progress: Math.min(progress.streakDays, 3),
        total: 3,
        dateUnlocked: progress.streakDays >= 3 ? new Date().toISOString() : null,
      },
      {
        id: '3',
        title: 'Calorie Burner',
        description: 'Burned 1000 total calories',
        icon: 'flame',
        unlocked: false,
        progress: 650, // Mock progress
        total: 1000,
        dateUnlocked: null,
      },
      {
        id: '4',
        title: 'Time Commitment',
        description: 'Spent 5 hours working out',
        icon: 'clock',
        unlocked: progress.totalWorkoutMinutes >= 300,
        progress: Math.min(progress.totalWorkoutMinutes, 300),
        total: 300,
        dateUnlocked: progress.totalWorkoutMinutes >= 300 ? new Date().toISOString() : null,
      },
      {
        id: '5',
        title: 'Consistency King',
        description: 'Completed 10 workouts',
        icon: 'trending-up',
        unlocked: progress.completedWorkouts >= 10,
        progress: Math.min(progress.completedWorkouts, 10),
        total: 10,
        dateUnlocked: progress.completedWorkouts >= 10 ? new Date().toISOString() : null,
      },
      {
        id: '6',
        title: 'Variety Seeker',
        description: 'Try 5 different workout types',
        icon: 'layers',
        unlocked: false,
        progress: 3, // Mock progress
        total: 5,
        dateUnlocked: null,
      },
      {
        id: '7',
        title: 'Early Bird',
        description: 'Complete 5 workouts before 8 AM',
        icon: 'sunrise',
        unlocked: false,
        progress: 2, // Mock progress
        total: 5,
        dateUnlocked: null,
      },
      {
        id: '8',
        title: 'Weekend Warrior',
        description: 'Complete workouts on 4 consecutive weekends',
        icon: 'shield',
        unlocked: false,
        progress: 1, // Mock progress
        total: 4,
        dateUnlocked: null,
      },
    ];
  });