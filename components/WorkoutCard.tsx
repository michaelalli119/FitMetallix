import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Clock, Flame, Heart } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { Workout } from '@/constants/workouts';
import { useWorkoutStore } from '@/store/workoutStore';

interface WorkoutCardProps {
  workout: Workout;
  isFavorite?: boolean;
}

export default function WorkoutCard({ workout, isFavorite = false }: WorkoutCardProps) {
  const router = useRouter();
  const { addToRecent, toggleFavorite, favoriteWorkouts } = useWorkoutStore();
  
  const isFav = isFavorite || favoriteWorkouts.includes(workout.id);

  const handlePress = () => {
    // Make sure we're adding to recent workouts
    addToRecent(workout.id);
    // Navigate to workout details with the workout ID
    router.push({
      pathname: '/workout-details',
      params: { id: workout.id }
    });
  };

  const handleFavoritePress = (e: any) => {
    e.stopPropagation();
    toggleFavorite(workout.id);
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={handlePress}
    >
      <Image source={{ uri: workout.imageUrl }} style={styles.image} />
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{workout.level}</Text>
          </View>
          <Pressable 
            onPress={handleFavoritePress}
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && { opacity: 0.7 }
            ]}
          >
            <Heart 
              size={22} 
              color={isFav ? colors.error : colors.white} 
              fill={isFav ? colors.error : 'transparent'} 
            />
          </Pressable>
        </View>
        
        <View style={styles.footer}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: 'rgba(100, 181, 246, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  levelText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  footer: {
    gap: 8,
  },
  title: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
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
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
  },
});