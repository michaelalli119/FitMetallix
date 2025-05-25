import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';

const { width } = Dimensions.get('window');
const BAR_WIDTH = (width - 80) / 7; // 7 days of the week
const MAX_HEIGHT = 150;

export default function ProgressChart() {
  const { progress } = useUserStore();
  
  // Mock data for the chart - in a real app, this would come from actual user data
  const weeklyData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 30 },
    { day: 'Wed', minutes: 0 },
    { day: 'Thu', minutes: 60 },
    { day: 'Fri', minutes: 25 },
    { day: 'Sat', minutes: 0 },
    { day: 'Sun', minutes: 0 },
  ];
  
  const maxMinutes = Math.max(...weeklyData.map(d => d.minutes), 60); // Ensure at least 60 minutes as max
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Activity</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.completedWorkouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.totalWorkoutMinutes}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{progress.streakDays}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
      
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {weeklyData.map((data, index) => {
            const height = data.minutes > 0 
              ? (data.minutes / maxMinutes) * MAX_HEIGHT 
              : 0;
              
            return (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.bar, { height }]}>
                  {height > 0 && (
                    <Text style={styles.barValue}>{data.minutes}</Text>
                  )}
                </View>
                <Text style={styles.barLabel}>{data.day}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    minWidth: width / 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chartContainer: {
    height: MAX_HEIGHT + 30, // Add space for labels
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: MAX_HEIGHT,
  },
  barContainer: {
    alignItems: 'center',
    width: BAR_WIDTH,
  },
  bar: {
    width: BAR_WIDTH - 8,
    backgroundColor: colors.primary,
    borderRadius: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(100, 181, 246, 0.7)',
  },
  barValue: {
    color: colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  barLabel: {
    marginTop: 8,
    fontSize: 12,
    color: colors.textSecondary,
  },
});