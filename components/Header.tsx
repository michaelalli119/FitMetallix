import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useUserStore } from '@/store/userStore';
import { colors } from '@/constants/colors';

interface HeaderProps {
  showGreeting?: boolean;
  title?: string;
}

export default function Header({ showGreeting = true, title }: HeaderProps) {
  const { profile } = useUserStore();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <View style={styles.container}>
      {showGreeting ? (
        <>
          <Text style={styles.greeting}>
            {getGreeting()}, {profile.name || 'Fitness Enthusiast'}
          </Text>
          <Text style={styles.subtitle}>
            {profile.currentMood 
              ? "Let's workout based on your mood" 
              : "Let's get moving today"}
          </Text>
        </>
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
});