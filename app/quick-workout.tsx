import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Clock, Zap } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { trpc } from '@/lib/trpc';
import Button from '@/components/Button';

export default function QuickWorkoutScreen() {
  const router = useRouter();
  const { updateProgress, progress } = useUserStore();
  
  // Mini workout options
  const quickWorkouts = [
    {
      id: '1',
      title: 'Morning Stretch',
      duration: 3,
      calories: 45,
      description: 'Wake up your body with gentle stretches',
      exercises: [
        'Neck rolls - 30s',
        'Shoulder circles - 30s',
        'Side stretches - 30s each side',
        'Forward fold - 30s',
        'Quad stretch - 30s each leg',
      ],
    },
    {
      id: '2',
      title: 'Desk Detox',
      duration: 5,
      calories: 60,
      description: 'Relieve tension from sitting at a desk',
      exercises: [
        'Wrist stretches - 30s',
        'Shoulder blade squeezes - 30s',
        'Seated spinal twist - 30s each side',
        'Neck stretches - 30s',
        'Seated hip opener - 30s each side',
        'Ankle circles - 30s',
      ],
    },
    {
      id: '3',
      title: 'Quick Core Blast',
      duration: 4,
      calories: 90,
      description: 'Strengthen your core in just 4 minutes',
      exercises: [
        'Plank - 30s',
        'Bicycle crunches - 30s',
        'Russian twists - 30s',
        'Mountain climbers - 30s',
        'Hollow hold - 30s',
        'Side plank - 30s each side',
      ],
    },
    {
      id: '4',
      title: 'Energy Boost',
      duration: 3,
      calories: 80,
      description: 'Quick cardio to boost energy levels',
      exercises: [
        'Jumping jacks - 30s',
        'High knees - 30s',
        'Butt kicks - 30s',
        'Lateral jumps - 30s',
        'Squat jumps - 30s',
        'Arm circles - 30s',
      ],
    },
    {
      id: '5',
      title: 'Stress Relief',
      duration: 5,
      calories: 50,
      description: 'Calm your mind and release tension',
      exercises: [
        'Deep breathing - 1m',
        'Child\'s pose - 1m',
        'Cat-cow stretch - 1m',
        'Seated forward fold - 1m',
        'Corpse pose with guided relaxation - 1m',
      ],
    },
  ];
  
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(false);
  
  // tRPC mutation for updating progress
  const updateProgressMutation = trpc.user.updateProgress.useMutation({
    onSuccess: (data) => {
      setIsStarting(false);
      // Show completion alert
      const workout = quickWorkouts.find(w => w.id === selectedWorkout);
      if (workout) {
        Alert.alert(
          'Workout Complete',
          `Great job completing the ${workout.title} workout! You burned approximately ${workout.calories} calories.`,
          [
            { 
              text: 'Done', 
              onPress: () => router.push('/(tabs)') 
            }
          ]
        );
      }
    },
    onError: (error) => {
      console.error("Error updating progress:", error);
      setIsStarting(false);
      // Still show completion alert even if API fails
      const workout = quickWorkouts.find(w => w.id === selectedWorkout);
      if (workout) {
        Alert.alert(
          'Workout Complete',
          `Great job completing the ${workout.title} workout! You burned approximately ${workout.calories} calories.`,
          [
            { 
              text: 'Done', 
              onPress: () => router.push('/(tabs)') 
            }
          ]
        );
      }
    }
  });
  
  const handleSelectWorkout = (id: string) => {
    setSelectedWorkout(id);
  };
  
  const handleStartWorkout = () => {
    if (!selectedWorkout) return;
    
    setIsStarting(true);
    const workout = quickWorkouts.find(w => w.id === selectedWorkout);
    
    if (workout) {
      // Update progress stats
      const newCompletedWorkouts = progress.completedWorkouts + 1;
      const newTotalMinutes = progress.totalWorkoutMinutes + workout.duration;
      
      // Calculate streak
      const today = new Date().toISOString().split('T')[0];
      const lastWorkoutDate = progress.lastWorkoutDate 
        ? new Date(progress.lastWorkoutDate).toISOString().split('T')[0] 
        : null;
      
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
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Quick Workouts',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Mini Workouts</Text>
        <Text style={styles.subtitle}>
          Short, effective workouts you can do anytime
        </Text>
        
        <View style={styles.workoutsList}>
          {quickWorkouts.map(workout => (
            <Pressable
              key={workout.id}
              style={[
                styles.workoutCard,
                selectedWorkout === workout.id && styles.selectedWorkout
              ]}
              onPress={() => handleSelectWorkout(workout.id)}
            >
              <View style={styles.workoutHeader}>
                <Text 
                  style={[
                    styles.workoutTitle,
                    selectedWorkout === workout.id && styles.selectedText
                  ]}
                >
                  {workout.title}
                </Text>
                <View style={[
                  styles.durationBadge,
                  selectedWorkout === workout.id && styles.selectedDurationBadge
                ]}>
                  <Clock 
                    size={14} 
                    color={selectedWorkout === workout.id ? colors.white : colors.primary} 
                  />
                  <Text 
                    style={[
                      styles.durationText,
                      selectedWorkout === workout.id && styles.selectedDurationText
                    ]}
                  >
                    {workout.duration} min
                  </Text>
                </View>
              </View>
              
              <Text 
                style={[
                  styles.workoutDescription,
                  selectedWorkout === workout.id && styles.selectedText
                ]}
              >
                {workout.description}
              </Text>
              
              {selectedWorkout === workout.id && (
                <View style={styles.exercisesList}>
                  <View style={styles.calorieInfo}>
                    <Zap size={16} color={colors.white} />
                    <Text style={styles.calorieText}>
                      Approx. {workout.calories} calories
                    </Text>
                  </View>
                  
                  {workout.exercises.map((exercise, index) => (
                    <View key={index} style={styles.exerciseItem}>
                      <View style={styles.exerciseBullet} />
                      <Text style={styles.exerciseText}>{exercise}</Text>
                    </View>
                  ))}
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <Button
          title="Start Workout"
          onPress={handleStartWorkout}
          disabled={!selectedWorkout || isStarting}
          loading={isStarting}
          fullWidth
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
  backButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  workoutsList: {
    gap: 16,
    marginBottom: 80, // Space for the footer
  },
  workoutCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  selectedWorkout: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  selectedText: {
    color: colors.white,
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(100, 181, 246, 0.3)',
  },
  selectedDurationBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  durationText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  selectedDurationText: {
    color: colors.white,
  },
  workoutDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  exercisesList: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  calorieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
    gap: 4,
  },
  calorieText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  exerciseBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    marginTop: 6,
    marginRight: 8,
  },
  exerciseText: {
    fontSize: 14,
    color: colors.white,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});