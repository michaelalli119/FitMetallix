import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { trpc } from '@/lib/trpc';
import AchievementCard from '@/components/AchievementCard';

// Define the Achievement type
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  total: number;
  dateUnlocked: string | null;
}

export default function AchievementsScreen() {
  const router = useRouter();
  const { progress } = useUserStore();
  
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
  
  // Use tRPC to fetch achievements
  const achievementsQuery = trpc.user.getAchievements.useQuery({ progress });
  
  useEffect(() => {
    if (achievementsQuery.isSuccess) {
      setAchievements(achievementsQuery.data);
      setIsLoading(false);
    } else if (achievementsQuery.isError) {
      console.error("Error fetching achievements:", achievementsQuery.error);
      // Fallback to local data if API fails
      setAchievements(getLocalAchievements());
      setIsLoading(false);
    }
  }, [achievementsQuery.isSuccess, achievementsQuery.isError, achievementsQuery.data, achievementsQuery.error]);
  
  // Local achievements data as fallback
  const getLocalAchievements = (): Achievement[] => {
    return [
      {
        id: '1',
        title: 'First Workout',
        description: 'Completed your first workout',
        icon: 'award',
        unlocked: progress.completedWorkouts >= 1,
        progress: progress.completedWorkouts >= 1 ? 1 : 0,
        total: 1,
        dateUnlocked: progress.completedWorkouts >= 1 ? new Date().toISOString() : null,
      },
      {
        id: '2',
        title: '3-Day Streak',
        description: 'Worked out for 3 days in a row',
        icon: 'calendar',
        unlocked: progress.streakDays >= 3,
        progress: Math.min(progress.streakDays, 3),
        total: 3,
        dateUnlocked: progress.streakDays >= 3 ? new Date().toISOString() : null,
      },
      {
        id: '3',
        title: 'Calorie Burner',
        description: 'Burned 1000 total calories',
        icon: 'flame',
        unlocked: false,
        progress: 650, // Mock progress
        total: 1000,
        dateUnlocked: null,
      },
      {
        id: '4',
        title: 'Time Commitment',
        description: 'Spent 5 hours working out',
        icon: 'clock',
        unlocked: progress.totalWorkoutMinutes >= 300,
        progress: Math.min(progress.totalWorkoutMinutes, 300),
        total: 300,
        dateUnlocked: progress.totalWorkoutMinutes >= 300 ? new Date().toISOString() : null,
      },
      {
        id: '5',
        title: 'Consistency King',
        description: 'Completed 10 workouts',
        icon: 'trending-up',
        unlocked: progress.completedWorkouts >= 10,
        progress: Math.min(progress.completedWorkouts, 10),
        total: 10,
        dateUnlocked: progress.completedWorkouts >= 10 ? new Date().toISOString() : null,
      },
      {
        id: '6',
        title: 'Variety Seeker',
        description: 'Try 5 different workout types',
        icon: 'layers',
        unlocked: false,
        progress: 3, // Mock progress
        total: 5,
        dateUnlocked: null,
      },
      {
        id: '7',
        title: 'Early Bird',
        description: 'Complete 5 workouts before 8 AM',
        icon: 'sunrise',
        unlocked: false,
        progress: 2, // Mock progress
        total: 5,
        dateUnlocked: null,
      },
      {
        id: '8',
        title: 'Weekend Warrior',
        description: 'Complete workouts on 4 consecutive weekends',
        icon: 'shield',
        unlocked: false,
        progress: 1, // Mock progress
        total: 4,
        dateUnlocked: null,
      },
    ];
  };
  
  // Filter achievements based on selected filter
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });
  
  // Calculate stats
  const totalAchievements = achievements.length;
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionPercentage = totalAchievements > 0 
    ? Math.round((unlockedCount / totalAchievements) * 100) 
    : 0;

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Achievements',
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
        {/* Stats Card */}
        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Your Progress</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${completionPercentage}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {unlockedCount} of {totalAchievements} achievements ({completionPercentage}%)
            </Text>
          </View>
          
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{unlockedCount}</Text>
              <Text style={styles.statLabel}>Unlocked</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalAchievements - unlockedCount}</Text>
              <Text style={styles.statLabel}>Locked</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{totalAchievements}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>
        </View>
        
        {/* Filters */}
        <View style={styles.filtersContainer}>
          <Pressable
            style={[
              styles.filterButton,
              filter === 'all' && styles.activeFilter
            ]}
            onPress={() => setFilter('all')}
          >
            <Text 
              style={[
                styles.filterText,
                filter === 'all' && styles.activeFilterText
              ]}
            >
              All
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.filterButton,
              filter === 'unlocked' && styles.activeFilter
            ]}
            onPress={() => setFilter('unlocked')}
          >
            <Text 
              style={[
                styles.filterText,
                filter === 'unlocked' && styles.activeFilterText
              ]}
            >
              Unlocked
            </Text>
          </Pressable>
          
          <Pressable
            style={[
              styles.filterButton,
              filter === 'locked' && styles.activeFilter
            ]}
            onPress={() => setFilter('locked')}
          >
            <Text 
              style={[
                styles.filterText,
                filter === 'locked' && styles.activeFilterText
              ]}
            >
              Locked
            </Text>
          </Pressable>
        </View>
        
        {/* Achievements List */}
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading achievements...</Text>
          </View>
        ) : filteredAchievements.length > 0 ? (
          <View style={styles.achievementsContainer}>
            {filteredAchievements.map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No achievements found for the selected filter.
            </Text>
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
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: 4,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    width: '30%',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  activeFilterText: {
    color: colors.white,
  },
  achievementsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});