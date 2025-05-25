import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useWorkoutStore } from '@/store/workoutStore';
import { workouts, Workout } from '@/constants/workouts';
import { trpc } from '@/lib/trpc';
import WorkoutCard from '@/components/WorkoutCard';
import Button from '@/components/Button';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteWorkouts, toggleFavorite } = useWorkoutStore();
  const [favoriteWorkoutsList, setFavoriteWorkoutsList] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use tRPC to fetch favorite workouts
  const favoritesQuery = trpc.workouts.getFavoriteWorkouts.useQuery({ ids: favoriteWorkouts });
  
  useEffect(() => {
    if (favoritesQuery.isSuccess) {
      setFavoriteWorkoutsList(favoritesQuery.data);
      setIsLoading(false);
    } else if (favoritesQuery.isError) {
      console.error("Error fetching favorite workouts:", favoritesQuery.error);
      // Fallback to local data if API fails
      const localFavorites = workouts.filter(workout => 
        favoriteWorkouts.includes(workout.id)
      );
      setFavoriteWorkoutsList(localFavorites);
      setIsLoading(false);
    }
  }, [favoritesQuery.isSuccess, favoritesQuery.isError, favoritesQuery.data, favoritesQuery.error, favoriteWorkouts]);
  
  // If no favorites, use local data
  useEffect(() => {
    if (favoriteWorkouts.length === 0) {
      setFavoriteWorkoutsList([]);
      setIsLoading(false);
    }
  }, [favoriteWorkouts]);
  
  const handleRemoveAll = () => {
    if (favoriteWorkouts.length === 0) return;
    
    Alert.alert(
      'Remove All Favorites',
      'Are you sure you want to remove all favorites?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove All',
          style: 'destructive',
          onPress: () => {
            // Remove all favorites one by one
            favoriteWorkouts.forEach(id => toggleFavorite(id));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Favorite Workouts',
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
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Heart size={24} color={colors.error} fill={colors.error} />
            <Text style={styles.headerTitle}>Your Favorite Workouts</Text>
          </View>
          
          {favoriteWorkouts.length > 0 && (
            <Pressable onPress={handleRemoveAll} style={styles.removeAllButton}>
              <Text style={styles.removeAllText}>Remove All</Text>
            </Pressable>
          )}
        </View>
        
        {isLoading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.loadingText}>Loading favorites...</Text>
          </View>
        ) : favoriteWorkoutsList.length > 0 ? (
          <View style={styles.workoutsContainer}>
            {favoriteWorkoutsList.map(workout => (
              <WorkoutCard 
                key={workout.id} 
                workout={workout} 
                isFavorite={true}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Heart size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>
              Tap the heart icon on any workout to add it to your favorites for quick access.
            </Text>
            <Button
              title="Browse Workouts"
              onPress={() => router.push('/(tabs)/workouts')}
              style={styles.browseButton}
            />
          </View>
        )}
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginLeft: 12,
  },
  removeAllButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderWidth: 1,
    borderColor: colors.error,
  },
  removeAllText: {
    fontSize: 14,
    color: colors.error,
  },
  workoutsContainer: {
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginTop: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  browseButton: {
    marginTop: 16,
  },
});