import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { workouts } from "@/constants/workouts";

export default publicProcedure
  .input(
    z.object({
      id: z.string(),
    })
  )
  .query(({ input }) => {
    const workout = workouts.find(w => w.id === input.id);
    
    if (!workout) {
      throw new Error(`Workout with ID ${input.id} not found`);
    }
    
    return workout;
  });