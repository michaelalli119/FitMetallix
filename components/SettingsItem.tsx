import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';

interface SettingsItemProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
}

export default function SettingsItem({
  title,
  description,
  icon,
  rightElement,
  onPress,
  showChevron = false,
}: SettingsItemProps) {
  const isClickable = !!onPress;
  
  const content = (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      
      <View style={styles.rightContainer}>
        {rightElement}
        {(isClickable || showChevron) && <ChevronRight size={20} color={colors.textSecondary} />}
      </View>
    </View>
  );
  
  if (isClickable) {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.touchable}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
}

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: colors.surface,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.metallic.dark,
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: colors.text,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});