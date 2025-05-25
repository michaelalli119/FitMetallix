import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Moon, Sun, Globe, Smartphone, VolumeX, Volume2, Trash2 } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import SettingsItem from '@/components/SettingsItem';
import Button from '@/components/Button';

export default function SettingsScreen() {
  const router = useRouter();
  const { setOnboarded } = useUserStore();
  
  // Settings state
  const [darkMode, setDarkMode] = useState(true); // App is already in dark mode
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);
  
  const handleUnitChange = (newUnit: 'metric' | 'imperial') => {
    setUnits(newUnit);
    // In a real app, this would update a settings store and possibly convert existing measurements
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // In a real app, this would call an API to delete the user's account
            setOnboarded(false);
            router.replace('/login');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Settings',
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
        {/* Appearance */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <SettingsItem
            title="Dark Mode"
            icon={darkMode ? <Moon size={22} color={colors.primary} /> : <Sun size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={darkMode ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
        </View>
        
        {/* Units */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Units</Text>
          
          <SettingsItem
            title="Measurement System"
            icon={<Globe size={22} color={colors.primary} />}
            rightElement={
              <View style={styles.segmentedControl}>
                <Pressable
                  style={[
                    styles.segmentButton,
                    units === 'metric' && styles.segmentButtonActive,
                    { borderTopLeftRadius: 8, borderBottomLeftRadius: 8 }
                  ]}
                  onPress={() => handleUnitChange('metric')}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      units === 'metric' && styles.segmentButtonTextActive
                    ]}
                  >
                    Metric
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.segmentButton,
                    units === 'imperial' && styles.segmentButtonActive,
                    { borderTopRightRadius: 8, borderBottomRightRadius: 8 }
                  ]}
                  onPress={() => handleUnitChange('imperial')}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      units === 'imperial' && styles.segmentButtonTextActive
                    ]}
                  >
                    Imperial
                  </Text>
                </Pressable>
              </View>
            }
          />
        </View>
        
        {/* Sound & Haptics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound & Haptics</Text>
          
          <SettingsItem
            title="Sound Effects"
            icon={soundEnabled ? <Volume2 size={22} color={colors.primary} /> : <VolumeX size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={soundEnabled ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="Haptic Feedback"
            icon={<Smartphone size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={hapticEnabled}
                onValueChange={setHapticEnabled}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={hapticEnabled ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="Auto-Play Workout Videos"
            description="Automatically play exercise demonstration videos"
            rightElement={
              <Switch
                value={autoPlay}
                onValueChange={setAutoPlay}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={autoPlay ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
        </View>
        
        {/* Privacy */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          
          <SettingsItem
            title="Data Collection"
            description="Allow anonymous usage data to improve the app"
            rightElement={
              <Switch
                value={dataCollection}
                onValueChange={setDataCollection}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={dataCollection ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="Privacy Policy"
            onPress={() => Alert.alert('Privacy Policy', 'This would open the privacy policy.')}
          />
          
          <SettingsItem
            title="Terms of Service"
            onPress={() => Alert.alert('Terms of Service', 'This would open the terms of service.')}
          />
        </View>
        
        {/* Account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <SettingsItem
            title="Change Password"
            onPress={() => Alert.alert('Change Password', 'This would open the change password screen.')}
          />
          
          <SettingsItem
            title="Linked Accounts"
            onPress={() => Alert.alert('Linked Accounts', 'This would show connected social accounts.')}
          />
          
          <Button
            title="Delete Account"
            onPress={handleDeleteAccount}
            variant="outline"
            style={styles.deleteButton}
            textStyle={{ color: colors.error }}
            fullWidth
          />
        </View>
        
        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <SettingsItem
            title="Version"
            rightElement={<Text style={styles.versionText}>1.0.0</Text>}
          />
          
          <SettingsItem
            title="Send Feedback"
            onPress={() => Alert.alert('Send Feedback', 'This would open a feedback form.')}
          />
          
          <SettingsItem
            title="Rate the App"
            onPress={() => Alert.alert('Rate the App', 'This would open the app store rating.')}
          />
        </View>
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
  section: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.metallic.dark,
  },
  segmentedControl: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    overflow: 'hidden',
  },
  segmentButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
  },
  segmentButtonActive: {
    backgroundColor: colors.primary,
  },
  segmentButtonText: {
    fontSize: 14,
    color: colors.text,
  },
  segmentButtonTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  deleteButton: {
    margin: 16,
    borderColor: colors.error,
  },
  versionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});