import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";
import { workouts } from "@/constants/workouts";

export default publicProcedure
  .input(
    z.object({
      type: z.enum(['strength', 'cardio', 'flexibility', 'recovery', 'all']).optional().default('all'),
      level: z.enum(['beginner', 'intermediate', 'advanced', 'all']).optional().default('all'),
      limit: z.number().optional().default(10),
    })
  )
  .query(({ input }) => {
    let filteredWorkouts = [...workouts];
    
    // Filter by type
    if (input.type !== 'all') {
      filteredWorkouts = filteredWorkouts.filter(workout => workout.type === input.type);
    }
    
    // Filter by level
    if (input.level !== 'all') {
      filteredWorkouts = filteredWorkouts.filter(workout => workout.level === input.level);
    }
    
    // Limit results
    return filteredWorkouts.slice(0, input.limit);
  });