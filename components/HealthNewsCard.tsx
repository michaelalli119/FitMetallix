import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { ExternalLink } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface HealthNewsCardProps {
  onPress?: () => void;
}

export default function HealthNewsCard({ onPress }: HealthNewsCardProps) {
  const [news, setNews] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHealthNews();
  }, []);

  const fetchHealthNews = async () => {
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
              content: 'You are a health news curator. Create a brief summary of the latest health and fitness news. Keep it concise (2-3 sentences) and informative. Make it sound like a news headline with a brief explanation.'
            },
            {
              role: 'user',
              content: 'Generate a brief health or fitness news update that would be relevant today. Make it sound authentic and informative.'
            }
          ]
        })
      });
      
      const data = await response.json();
      setNews(data.completion);
    } catch (error) {
      console.error('Error fetching health news:', error);
      setError('Unable to load health news. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Daily Health Update</Text>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text style={styles.loadingText}>Loading health news...</Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.newsText}>{news}</Text>
            <View style={styles.footer}>
              <ExternalLink size={16} color={colors.primary} />
              <Text style={styles.readMoreText}>Read more</Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  newsText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  readMoreText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 12,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
    marginVertical: 12,
  },
});