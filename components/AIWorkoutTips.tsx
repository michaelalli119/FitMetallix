import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { colors } from '@/constants/colors';
import { Workout } from '@/constants/workouts';
import { useUserStore } from '@/store/userStore';

interface AIWorkoutTipsProps {
  workout: Workout;
}

export default function AIWorkoutTips({ workout }: AIWorkoutTipsProps) {
  const { profile } = useUserStore();
  const [tips, setTips] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateTips();
  }, [workout, profile]);

  const generateTips = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://toolkit.rork.com/text/llm/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a professional fitness coach. Provide personalized workout tips based on the user profile and workout details. Keep your response concise (max 3 sentences).'
            },
            {
              role: 'user',
              content: `User profile: Body type: ${profile.bodyType || 'unknown'}, Current mood: ${profile.currentMood || 'unknown'}, Fitness level: ${profile.fitnessLevel || 'intermediate'}. 
              Workout: ${workout.title} (${workout.level} level, ${workout.type} type, ${workout.duration} minutes).
              Give me personalized tips for this workout based on my profile.`
            }
          ]
        })
      });
      
      const data = await response.json();
      setTips(data.completion);
    } catch (error) {
      console.error('Error generating AI tips:', error);
      setTips('Focus on proper form and listen to your body. Adjust intensity as needed.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.primary} />
        <Text style={styles.loadingText}>Generating personalized tips...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Coach Tips</Text>
      <Text style={styles.tips}>{tips}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  tips: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});