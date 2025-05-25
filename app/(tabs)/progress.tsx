import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Award, Calendar, Clock, Flame, TrendingUp } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import Header from '@/components/Header';
import ProgressChart from '@/components/ProgressChart';

export default function ProgressScreen() {
  const { progress } = useUserStore();
  
  // Mock achievements data
  const achievements = [
    {
      id: '1',
      title: 'First Workout',
      description: 'Completed your first workout',
      icon: 'award',
      unlocked: true,
    },
    {
      id: '2',
      title: '3-Day Streak',
      description: 'Worked out for 3 days in a row',
      icon: 'calendar',
      unlocked: progress.streakDays >= 3,
    },
    {
      id: '3',
      title: 'Calorie Burner',
      description: 'Burned 1000 total calories',
      icon: 'flame',
      unlocked: false,
    },
    {
      id: '4',
      title: 'Time Commitment',
      description: 'Spent 5 hours working out',
      icon: 'clock',
      unlocked: progress.totalWorkoutMinutes >= 300,
    },
    {
      id: '5',
      title: 'Consistency King',
      description: 'Completed 10 workouts',
      icon: 'trending-up',
      unlocked: progress.completedWorkouts >= 10,
    },
  ];
  
  const getAchievementIcon = (iconName: string, size: number, color: string) => {
    switch (iconName) {
      case 'award':
        return <Award size={size} color={color} />;
      case 'calendar':
        return <Calendar size={size} color={color} />;
      case 'flame':
        return <Flame size={size} color={color} />;
      case 'clock':
        return <Clock size={size} color={color} />;
      case 'trending-up':
        return <TrendingUp size={size} color={color} />;
      default:
        return <Award size={size} color={color} />;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Header showGreeting={false} title="Your Progress" />
        
        {/* Progress Chart */}
        <ProgressChart />
        
        {/* Stats Summary */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{progress.completedWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{progress.totalWorkoutMinutes}</Text>
            <Text style={styles.statLabel}>Minutes</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{progress.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
        
        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          {achievements.map(achievement => (
            <View 
              key={achievement.id} 
              style={[
                styles.achievementCard,
                !achievement.unlocked && styles.lockedAchievement
              ]}
            >
              <View style={[
                styles.achievementIcon,
                !achievement.unlocked && styles.lockedIcon
              ]}>
                {getAchievementIcon(
                  achievement.icon, 
                  24, 
                  achievement.unlocked ? colors.primary : colors.textSecondary
                )}
              </View>
              
              <View style={styles.achievementContent}>
                <Text style={[
                  styles.achievementTitle,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.title}
                </Text>
                <Text style={[
                  styles.achievementDescription,
                  !achievement.unlocked && styles.lockedText
                ]}>
                  {achievement.description}
                </Text>
              </View>
              
              {!achievement.unlocked && (
                <View style={styles.lockIconContainer}>
                  <Text style={styles.lockIcon}>🔒</Text>
                </View>
              )}
            </View>
          ))}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '30%',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.text,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  lockedAchievement: {
    opacity: 0.7,
    backgroundColor: colors.surface,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  lockedIcon: {
    backgroundColor: 'rgba(158, 158, 158, 0.1)',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  lockedText: {
    color: colors.textSecondary,
  },
  lockIconContainer: {
    marginLeft: 8,
  },
  lockIcon: {
    fontSize: 16,
  },
});