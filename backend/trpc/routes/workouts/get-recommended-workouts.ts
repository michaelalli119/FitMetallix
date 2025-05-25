import { z } from "zod";
import { publicProcedure } from "../../create-context";
import { workouts, BodyType, MoodType } from "@/constants/workouts";

export default publicProcedure
  .input(
    z.object({
      bodyType: z.enum(['ectomorph', 'mesomorph', 'endomorph']).optional(),
      mood: z.enum(['energized', 'tired', 'stressed', 'focused', 'anxious']).optional(),
      limit: z.number().min(1).max(10).default(3),
    })
  )
  .query(({ input }) => {
    let filteredWorkouts = [...workouts];
    
    // Filter by body type if provided
    if (input.bodyType) {
      filteredWorkouts = filteredWorkouts.filter(workout => 
        workout.bodyTypes.includes(input.bodyType as BodyType)
      );
    }
    
    // Filter by mood if provided
    if (input.mood) {
      filteredWorkouts = filteredWorkouts.filter(workout => 
        workout.moodTypes.includes(input.mood as MoodType)
      );
    }
    
    // If no workouts match the filters, return a subset of all workouts
    if (filteredWorkouts.length === 0) {
      filteredWorkouts = workouts;
    }
    
    // Shuffle the workouts to get random recommendations
    const shuffled = filteredWorkouts.sort(() => 0.5 - Math.random());
    
    // Return the requested number of workouts
    return shuffled.slice(0, input.limit);
  });