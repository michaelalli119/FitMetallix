import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { moodTypes } from '@/constants/workouts';
import { colors } from '@/constants/colors';
import { Battery, Brain, Target, Wind, Zap } from 'lucide-react-native';

export default function MoodSelector() {
  const { profile, setCurrentMood } = useUserStore();
  
  const getIcon = (iconName: string, size: number, color: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap size={size} color={color} />;
      case 'battery-low':
        return <Battery size={size} color={color} />;
      case 'brain':
        return <Brain size={size} color={color} />;
      case 'target':
        return <Target size={size} color={color} />;
      case 'wind':
        return <Wind size={size} color={color} />;
      default:
        return <Zap size={size} color={color} />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.moodList}
      >
        {moodTypes.map((mood) => {
          const isSelected = profile.currentMood === mood.id;
          return (
            <Pressable
              key={mood.id}
              style={[
                styles.moodItem,
                isSelected && styles.selectedMood
              ]}
              onPress={() => setCurrentMood(mood.id)}
            >
              <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                {getIcon(mood.icon, 24, isSelected ? colors.white : colors.primary)}
              </View>
              <Text style={[styles.moodText, isSelected && styles.selectedMoodText]}>
                {mood.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: colors.text,
  },
  moodList: {
    paddingRight: 16,
    gap: 12,
  },
  moodItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.surface,
    minWidth: 90,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  selectedMood: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(100, 181, 246, 0.3)',
  },
  selectedIconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  moodText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedMoodText: {
    color: colors.white,
  },
});