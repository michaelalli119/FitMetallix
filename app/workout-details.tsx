import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Clock, Flame, Heart, Share2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { workouts, Workout } from '@/constants/workouts';
import { useWorkoutStore } from '@/store/workoutStore';
import { useUserStore } from '@/store/userStore';
import { trpc } from '@/lib/trpc';
import Button from '@/components/Button';
import ExerciseItem from '@/components/ExerciseItem';
import AIWorkoutTips from '@/components/AIWorkoutTips';

export default function WorkoutDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { addToSaved, toggleFavorite, favoriteWorkouts, getSavedWorkout, addToRecent } = useWorkoutStore();
  const { updateProgress, progress, profile } = useUserStore();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [aiTips, setAiTips] = useState<string | null>(null);
  const [loadingTips, setLoadingTips] = useState(false);

  // Use tRPC to fetch workout details
  const workoutQuery = trpc.workouts.getWorkoutById.useQuery({ id: id as string });

  // Use tRPC to update progress
  const updateProgressMutation = trpc.user.updateProgress.useMutation();

  // Handle data loading and errors
  useEffect(() => {
    if (workoutQuery.isSuccess) {
      setWorkout(workoutQuery.data);
      setIsLoading(false);
      // After loading workout, get AI tips
      if (workoutQuery.data) {
        generateAITips(workoutQuery.data);
      }
    } else if (workoutQuery.isError) {
      console.error("Error fetching workout:", workoutQuery.error);
      // Fallback to local data if API fails
      const localWorkout = workouts.find(w => w.id === id);
      if (localWorkout) {
        setWorkout(localWorkout);
        generateAITips(localWorkout);
      } else {
        Alert.alert('Error', 'Workout not found');
        router.back();
      }
      setIsLoading(false);
    }
  }, [workoutQuery.status, id]);

  // Generate AI tips based on user profile and workout
  const generateAITips = async (workout: Workout) => {
    if (!workout) return;

    setLoadingTips(true);
    try {
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a professional fitness coach. Provide personalized workout tips based on the user profile and workout details. Keep your response concise (max 3 sentences).'
            },
            {
              role: 'user',
              content: `User profile: Body type: ${profile.bodyType || 'unknown'}, Current mood: ${profile.currentMood || 'unknown'}, Fitness level: ${profile.fitnessLevel || 'intermediate'}. 
              Workout: ${workout.title} (${workout.level} level, ${workout.type} type, ${workout.duration} minutes).
              Give me personalized tips for this workout based on my profile.`
            }
          ]
        })
      });

      const data = await response.json();
      setAiTips(data.completion);
    } catch (error) {
      console.error('Error generating AI tips:', error);
      setAiTips('Focus on proper form and listen to your body. Adjust intensity as needed.');
    } finally {
      setLoadingTips(false);
    }
  };

  useEffect(() => {
    if (!workout && !isLoading) {
      return;
    }

    // Check if workout is favorited
    if (workout) {
      setIsFavorite(favoriteWorkouts.includes(workout.id));

      // Check if workout is saved
      const savedWorkout = getSavedWorkout(workout.id);
      setIsSaved(!!savedWorkout);

      // If it's saved, use the saved version
      if (savedWorkout) {
        setWorkout(savedWorkout);
      }

      // Add to recent workouts
      if (id) {
        addToRecent(id);
      }
    }
  }, [workout, favoriteWorkouts, getSavedWorkout, id, addToRecent, isLoading]);

  const handleFavorite = () => {
    if (!workout) return;
    toggleFavorite(workout.id);
    setIsFavorite(!isFavorite);
  };

  const handleSave = () => {
    if (!workout) return;
    addToSaved(workout);
    setIsSaved(true);
    Alert.alert('Success', 'Workout saved to your collection');
  };

  const handleShare = () => {
    Alert.alert('Share', 'Sharing functionality would be implemented here');
  };

  const startWorkout = () => {
    if (!workout) return;

    // Update progress stats
    const newCompletedWorkouts = progress.completedWorkouts + 1;
    const newTotalMinutes = progress.totalWorkoutMinutes + workout.duration;

    // Calculate streak - in a real app, this would be more sophisticated
    const today = new Date().toISOString().split('T')[0];
    const lastWorkoutDate = progress.lastWorkoutDate
      ? new Date(progress.lastWorkoutDate).toISOString().split('T')[0]
      : null;

    // If last workout was yesterday or this is first workout, increment streak
    // Otherwise, reset streak to 1
    let newStreak = 1;
    if (lastWorkoutDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toISOString().split('T')[0];

      if (lastWorkoutDate === yesterdayString || lastWorkoutDate === today) {
        newStreak = progress.streakDays + 1;
      }
    }

    const updatedProgress = {
      completedWorkouts: newCompletedWorkouts,
      totalWorkoutMinutes: newTotalMinutes,
      lastWorkoutDate: new Date().toISOString(),
      streakDays: newStreak,
    };

    // Update local state
    updateProgress(updatedProgress);

    // Update via API
    updateProgressMutation.mutate(updatedProgress);

    // In a real app, this would navigate to a workout session screen
    Alert.alert(
      'Workout Started',
      `You've started the ${workout.title} workout! In a complete app, this would navigate to an interactive workout session screen with timers and exercise guidance.`,
      [
        {
          text: 'Complete Workout',
          onPress: () => {
            // Navigate back to home screen after completing the workout
            router.push('/(tabs)');
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading workout details...</Text>
      </View>
    );
  }

  if (!workout) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Workout not found</Text>
        <Button title="Go Back" onPress={() => router.back()} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: workout.imageUrl }} style={styles.image} />
          <View style={styles.overlay} />

          <View style={styles.headerControls}>
            <Pressable
              style={styles.backButton}
              onPress={() => router.back()}
              testID="workout_details.back_button"
            >
              <ArrowLeft size={24} color={colors.white} />
            </Pressable>

            <View style={styles.headerActions}>
              <Pressable
                style={styles.actionButton}
                onPress={handleFavorite}
                testID="workout_details.favorite_button"
              >
                <Heart
                  size={24}
                  color={colors.white}
                  fill={isFavorite ? colors.error : 'transparent'}
                />
              </Pressable>

              <Pressable
                style={styles.actionButton}
                onPress={handleShare}
              >
                <Share2 size={24} color={colors.white} />
              </Pressable>
            </View>
          </View>

          <View style={styles.headerContent}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{workout.level}</Text>
            </View>

            <Text style={styles.title}>{workout.title}</Text>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Clock size={16} color={colors.white} />
                <Text style={styles.statText}>{workout.duration} min</Text>
              </View>
              <View style={styles.stat}>
                <Flame size={16} color={colors.white} />
                <Text style={styles.statText}>{workout.calories} cal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* AI Tips */}
          {(aiTips || loadingTips) && (
            <View style={styles.aiTipsContainer}>
              <Text style={styles.sectionTitle}>Personalized Tips</Text>
              {loadingTips ? (
                <View style={styles.loadingTips}>
                  <ActivityIndicator size="small" color={colors.primary} />
                  <Text style={styles.loadingTipsText}>Generating personalized tips...</Text>
                </View>
              ) : (
                <Text style={styles.aiTipsText}>{aiTips}</Text>
              )}
            </View>
          )}

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{workout.description}</Text>

          <Text style={styles.sectionTitle}>Exercises</Text>
          {workout.exercises.map((exercise, index) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              index={index}
              testID={`workout_details.exercise_${index}`}
            />
          ))}

          {!isSaved && (
            <Button
              title="Save Workout"
              onPress={handleSave}
              variant="outline"
              style={styles.saveButton}
            />
          )}
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.startButtonContainer}>
        <Button
          title="Start Workout"
          onPress={startWorkout}
          style={styles.startButton}
          textStyle={styles.startButtonText}
          fullWidth
          testID="workout_details.start_button"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.text,
    marginTop: 16,
  },
  imageContainer: {
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headerControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  levelBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  levelText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  stats: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    color: colors.white,
    fontSize: 14,
  },
  content: {
    padding: 16,
    paddingBottom: 80, // Space for the start button
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 24,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.metallic.dark,
  },
  startButton: {
    backgroundColor: colors.primary,
    height: 56,
  },
  startButtonText: {
    fontSize: 18,
  },
  aiTipsContainer: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  aiTipsText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  loadingTips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingTipsText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});