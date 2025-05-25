import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, Mic, Zap, Newspaper } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { useWorkoutStore } from '@/store/workoutStore';
import { workouts, Workout } from '@/constants/workouts';
import { trpc } from '@/lib/trpc';
import Header from '@/components/Header';
import MoodSelector from '@/components/MoodSelector';
import WorkoutCard from '@/components/WorkoutCard';
import Button from '@/components/Button';
import HealthNewsCard from '@/components/HealthNewsCard';

export default function HomeScreen() {
  const router = useRouter();
  const { profile, isOnboarded, setOnboarded } = useUserStore();
  const { recentWorkouts } = useWorkoutStore();
  const [recommendedWorkouts, setRecommendedWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use tRPC to fetch recommended workouts
  const recommendedWorkoutsQuery = trpc.workouts.getRecommendedWorkouts.useQuery({
    bodyType: profile.bodyType || undefined,
    mood: profile.currentMood || undefined,
    limit: 3
  });
  
  // Handle data loading and errors
  useEffect(() => {
    if (recommendedWorkoutsQuery.isSuccess) {
      setRecommendedWorkouts(recommendedWorkoutsQuery.data);
      setIsLoading(false);
    } else if (recommendedWorkoutsQuery.isError) {
      console.error("Error fetching recommended workouts:", recommendedWorkoutsQuery.error);
      // Fallback to local data if API fails
      const fallbackWorkouts = profile.bodyType
        ? workouts.filter(workout => workout.bodyTypes.includes(profile.bodyType as any))
        : workouts.slice(0, 3);
      setRecommendedWorkouts(fallbackWorkouts);
      setIsLoading(false);
    }
  }, [recommendedWorkoutsQuery.status, profile.bodyType]);
  
  useEffect(() => {
    if (!isOnboarded) {
      router.push('/onboarding');
    }
  }, [isOnboarded, router]);

  // Filter workouts based on user's current mood
  const moodBasedWorkouts = profile.currentMood
    ? workouts.filter(workout => workout.moodTypes.includes(profile.currentMood as any))
    : workouts;

  // Get recent workouts
  const recentWorkoutsList = workouts.filter(workout => 
    recentWorkouts.includes(workout.id)
  ).slice(0, 3);

  const handleQuickActionPress = (route: string) => {
    router.push(route);
  };

  const handleHealthNewsPress = () => {
    router.push('/health-news');
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Header />
        
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Pressable 
            style={styles.quickAction}
            onPress={() => handleQuickActionPress('/body-scan')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(100, 181, 246, 0.15)' }]}>
              <Camera size={24} color={colors.primary} />
            </View>
            <Text style={styles.actionText}>Body Scan</Text>
          </Pressable>
          
          <Pressable 
            style={styles.quickAction}
            onPress={() => handleQuickActionPress('/voice-control')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(76, 175, 80, 0.15)' }]}>
              <Mic size={24} color={colors.secondary} />
            </View>
            <Text style={styles.actionText}>Voice Control</Text>
          </Pressable>
          
          <Pressable 
            style={styles.quickAction}
            onPress={() => handleQuickActionPress('/quick-workout')}
          >
            <View style={[styles.actionIcon, { backgroundColor: 'rgba(255, 193, 7, 0.15)' }]}>
              <Zap size={24} color="#FFC107" />
            </View>
            <Text style={styles.actionText}>Quick Workout</Text>
          </Pressable>
        </View>
        
        {/* Health News */}
        <HealthNewsCard onPress={handleHealthNewsPress} />
        
        {/* Mood Selector */}
        <MoodSelector />
        
        {/* Mood-based Workouts */}
        {profile.currentMood && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Workouts for your mood</Text>
            {moodBasedWorkouts.length > 0 ? (
              moodBasedWorkouts.slice(0, 3).map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <Text style={styles.emptyText}>No workouts found for your current mood</Text>
            )}
            
            <Button 
              title="See All Workouts" 
              onPress={() => router.push('/(tabs)/workouts')}
              variant="outline"
              style={styles.seeAllButton}
            />
          </View>
        )}
        
        {/* Recent Workouts */}
        {recentWorkoutsList.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Workouts</Text>
            {recentWorkoutsList.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </View>
        )}
        
        {/* Recommended Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {profile.bodyType 
              ? `Recommended for ${profile.bodyType} body type` 
              : 'Recommended Workouts'}
          </Text>
          
          {isLoading ? (
            <Text style={styles.loadingText}>Loading recommendations...</Text>
          ) : (
            recommendedWorkouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  quickAction: {
    alignItems: 'center',
    width: '30%',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  emptyText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 16,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  loadingText: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginVertical: 16,
  },
  seeAllButton: {
    marginTop: 8,
  },
});