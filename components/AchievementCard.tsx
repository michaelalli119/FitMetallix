import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Award, Calendar, Clock, Flame, Layers, Shield, Sunrise, TrendingUp } from 'lucide-react-native';
import { colors } from '@/constants/colors';

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

interface AchievementCardProps {
  achievement: Achievement;
  onPress?: () => void;
}

export default function AchievementCard({ achievement, onPress }: AchievementCardProps) {
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
      case 'layers':
        return <Layers size={size} color={color} />;
      case 'sunrise':
        return <Sunrise size={size} color={color} />;
      case 'shield':
        return <Shield size={size} color={color} />;
      default:
        return <Award size={size} color={color} />;
    }
  };
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const progressPercentage = Math.min(
    Math.round((achievement.progress / achievement.total) * 100),
    100
  );
  
  const content = (
    <View style={[
      styles.container,
      achievement.unlocked ? styles.unlockedContainer : styles.lockedContainer
    ]}>
      <View style={styles.header}>
        <View style={[
          styles.iconContainer,
          achievement.unlocked ? styles.unlockedIconContainer : styles.lockedIconContainer
        ]}>
          {getAchievementIcon(
            achievement.icon,
            28,
            achievement.unlocked ? colors.white : colors.textSecondary
          )}
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            achievement.unlocked ? styles.unlockedTitle : styles.lockedTitle
          ]}>
            {achievement.title}
          </Text>
          <Text style={styles.description}>{achievement.description}</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` },
              achievement.unlocked ? styles.unlockedProgressFill : styles.lockedProgressFill
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {achievement.progress} / {achievement.total} ({progressPercentage}%)
        </Text>
      </View>
      
      {achievement.unlocked && achievement.dateUnlocked && (
        <Text style={styles.dateText}>
          Unlocked on {formatDate(achievement.dateUnlocked)}
        </Text>
      )}
    </View>
  );
  
  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        {content}
      </Pressable>
    );
  }
  
  return content;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  unlockedContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
  },
  lockedContainer: {
    backgroundColor: colors.surface,
    borderColor: colors.metallic.dark,
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  unlockedIconContainer: {
    backgroundColor: colors.primary,
  },
  lockedIconContainer: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  unlockedTitle: {
    color: colors.text,
  },
  lockedTitle: {
    color: colors.textSecondary,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  progressContainer: {
    marginBottom: 8,
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
    borderRadius: 4,
  },
  unlockedProgressFill: {
    backgroundColor: colors.primary,
  },
  lockedProgressFill: {
    backgroundColor: colors.metallic.medium,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
  },
  dateText: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: 'italic',
  },
});