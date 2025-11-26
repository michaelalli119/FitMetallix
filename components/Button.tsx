import React from 'react';
import { StyleSheet, Text, Pressable, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'metallic';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
  testID?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  testID,
}: ButtonProps) {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};

    // Variant styles
    switch (variant) {
      case 'primary':
        buttonStyle.backgroundColor = colors.primary;
        break;
      case 'secondary':
        buttonStyle.backgroundColor = colors.secondary;
        break;
      case 'outline':
        buttonStyle.backgroundColor = 'transparent';
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = colors.primary;
        break;
      case 'metallic':
        buttonStyle.backgroundColor = colors.metallic.medium;
        buttonStyle.borderWidth = 1;
        buttonStyle.borderColor = colors.metallic.highlight;
        break;
    }

    // Size styles
    switch (size) {
      case 'small':
        buttonStyle.paddingVertical = 8;
        buttonStyle.paddingHorizontal = 16;
        break;
      case 'medium':
        buttonStyle.paddingVertical = 12;
        buttonStyle.paddingHorizontal = 24;
        break;
      case 'large':
        buttonStyle.paddingVertical = 16;
        buttonStyle.paddingHorizontal = 32;
        break;
    }

    // Width style
    if (fullWidth) {
      buttonStyle.width = '100%';
    }

    // Disabled style
    if (disabled) {
      buttonStyle.opacity = 0.5;
    }

    return buttonStyle;
  };

  const getTextStyle = () => {
    let textStyleObj: TextStyle = {};

    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'metallic':
        textStyleObj.color = colors.white;
        break;
      case 'outline':
        textStyleObj.color = colors.primary;
        break;
    }

    switch (size) {
      case 'small':
        textStyleObj.fontSize = 14;
        break;
      case 'medium':
        textStyleObj.fontSize = 16;
        break;
      case 'large':
        textStyleObj.fontSize = 18;
        break;
    }

    return textStyleObj;
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getButtonStyle(),
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? colors.primary : colors.white}
          size="small"
        />
      ) : (
        <Text style={[styles.text, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
});