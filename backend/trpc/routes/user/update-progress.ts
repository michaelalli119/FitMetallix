import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";

export default publicProcedure
  .input(
    z.object({
      completedWorkouts: z.number().optional(),
      totalWorkoutMinutes: z.number().optional(),
      streakDays: z.number().optional(),
      lastWorkoutDate: z.string().optional(),
    })
  )
  .mutation(({ input }) => {
    // In a real app, this would update a database
    // For now, we'll just return the input as if it was saved
    return {
      success: true,
      updatedProgress: input,
      timestamp: new Date(),
    };
  });