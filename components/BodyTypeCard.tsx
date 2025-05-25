import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { colors } from '@/constants/colors';
import { BodyType } from '@/constants/workouts';

interface BodyTypeCardProps {
  bodyType: {
    id: BodyType;
    label: string;
    description: string;
    recommendations: string[];
  };
  isSelected: boolean;
  onSelect: (bodyType: BodyType) => void;
}

export default function BodyTypeCard({ bodyType, isSelected, onSelect }: BodyTypeCardProps) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onSelect(bodyType.id)}
    >
      <View style={styles.header}>
        <Text style={[styles.title, isSelected && styles.selectedText]}>
          {bodyType.label}
        </Text>
        <View style={[styles.indicator, isSelected && styles.selectedIndicator]} />
      </View>
      
      <Text style={[styles.description, isSelected && styles.selectedText]}>
        {bodyType.description}
      </Text>
      
      {isSelected && (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Recommendations:</Text>
          {bodyType.recommendations.map((recommendation, index) => (
            <View key={index} style={styles.recommendationItem}>
              <View style={styles.bullet} />
              <Text style={styles.recommendationText}>{recommendation}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  selectedContainer: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  selectedText: {
    color: colors.white,
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  selectedIndicator: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  recommendationsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 12,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 8,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.white,
    marginTop: 6,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: colors.white,
  },
});