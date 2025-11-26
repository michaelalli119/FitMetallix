import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '@/constants/colors';
import { Exercise } from '@/constants/workouts';

interface ExerciseItemProps {
  exercise: Exercise;
  index: number;
  testID?: string;
}

export default function ExerciseItem({ exercise, index, testID }: ExerciseItemProps) {
  // Format duration to minutes and seconds
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds > 0 ? remainingSeconds + 's' : ''}`;
    }
    return `${seconds}s`;
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index + 1}</Text>
      </View>

      <Image source={{ uri: exercise.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {exercise.description}
        </Text>

        <View style={styles.details}>
          {exercise.sets && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Sets</Text>
              <Text style={styles.detailValue}>{exercise.sets}</Text>
            </View>
          )}

          {exercise.reps && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Reps</Text>
              <Text style={styles.detailValue}>{exercise.reps}</Text>
            </View>
          )}

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Time</Text>
            <Text style={styles.detailValue}>{formatDuration(exercise.duration)}</Text>
          </View>

          {exercise.restTime && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Rest</Text>
              <Text style={styles.detailValue}>{formatDuration(exercise.restTime)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  indexContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.2)',
  },
  index: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 80,
    height: 80,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  details: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailItem: {
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  detailLabel: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
});