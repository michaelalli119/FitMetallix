import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '@/constants/colors';

interface SocialLoginButtonProps {
  provider: 'apple' | 'google';
  onPress: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}

export default function SocialLoginButton({
  provider,
  onPress,
  style,
  disabled = false,
}: SocialLoginButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        provider === 'apple' ? styles.appleButton : styles.googleButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.buttonText,
        provider === 'apple' ? styles.appleText : styles.googleText,
      ]}>
        {provider === 'apple' ? 'Apple' : 'Google'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '48%',
    borderWidth: 1,
  },
  appleButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  appleText: {
    color: '#fff',
  },
  googleText: {
    color: '#757575',
  },
});