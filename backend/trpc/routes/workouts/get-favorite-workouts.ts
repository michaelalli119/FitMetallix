import { z } from "zod";
import { publicProcedure } from "@/backend/trpc/create-context";
import { workouts } from "@/constants/workouts";

export default publicProcedure
  .input(
    z.object({
      ids: z.array(z.string()),
    })
  )
  .query(({ input }) => {
    // Filter workouts by the provided IDs
    const favoriteWorkouts = workouts.filter(workout => 
      input.ids.includes(workout.id)
    );
    
    return favoriteWorkouts;
  });