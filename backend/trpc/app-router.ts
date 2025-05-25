import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import getWorkouts from "./routes/workouts/get-workouts";
import getWorkoutById from "./routes/workouts/get-workout-by-id";
import getRecommendedWorkouts from "./routes/workouts/get-recommended-workouts";
import getFavoriteWorkouts from "./routes/workouts/get-favorite-workouts";
import updateProgress from "./routes/user/update-progress";
import updateProfile from "./routes/user/update-profile";
import analyzeBodyScan from "./routes/user/analyze-body-scan";
import getAchievements from "./routes/user/get-achievements";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  workouts: createTRPCRouter({
    getWorkouts: getWorkouts,
    getWorkoutById: getWorkoutById,
    getRecommendedWorkouts: getRecommendedWorkouts,
    getFavoriteWorkouts: getFavoriteWorkouts,
  }),
  user: createTRPCRouter({
    updateProgress: updateProgress,
    updateProfile: updateProfile,
    analyzeBodyScan: analyzeBodyScan,
    getAchievements: getAchievements,
  }),
  health: createTRPCRouter({
    // We could add health news endpoints here in a real app
  }),
});

export type AppRouter = typeof appRouter;