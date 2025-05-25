import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Bell, Clock, Award, Calendar, Zap, MessageCircle } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import SettingsItem from '@/components/SettingsItem';

export default function NotificationsScreen() {
  const router = useRouter();
  
  // Notification settings state
  const [allNotifications, setAllNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [achievements, setAchievements] = useState(true);
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [tips, setTips] = useState(true);
  const [updates, setUpdates] = useState(false);
  
  // Handle toggling all notifications
  const handleToggleAll = (value: boolean) => {
    setAllNotifications(value);
    
    if (!value) {
      // Turn off all notifications
      setWorkoutReminders(false);
      setAchievements(false);
      setStreakAlerts(false);
      setTips(false);
      setUpdates(false);
    } else {
      // Turn on default notifications
      setWorkoutReminders(true);
      setAchievements(true);
      setStreakAlerts(true);
      setTips(true);
      // Keep updates as is
    }
  };
  
  // Handle setting workout reminder time
  const handleSetReminderTime = () => {
    Alert.alert(
      'Set Reminder Time',
      'In a real app, this would open a time picker to set your workout reminder time.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Notifications',
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notification Preferences</Text>
          <Text style={styles.headerDescription}>
            Customize which notifications you want to receive and how you receive them.
          </Text>
        </View>
        
        {/* Main toggle */}
        <View style={styles.section}>
          <SettingsItem
            title="All Notifications"
            description="Turn on/off all notifications"
            icon={<Bell size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={allNotifications}
                onValueChange={handleToggleAll}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={allNotifications ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
        </View>
        
        {/* Notification types */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>
          
          <SettingsItem
            title="Workout Reminders"
            description="Daily reminders for scheduled workouts"
            icon={<Clock size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={workoutReminders}
                onValueChange={setWorkoutReminders}
                disabled={!allNotifications}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={workoutReminders && allNotifications ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="Achievement Alerts"
            description="Get notified when you earn achievements"
            icon={<Award size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={achievements}
                onValueChange={setAchievements}
                disabled={!allNotifications}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={achievements && allNotifications ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="Streak Alerts"
            description="Reminders to maintain your workout streak"
            icon={<Calendar size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={streakAlerts}
                onValueChange={setStreakAlerts}
                disabled={!allNotifications}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={streakAlerts && allNotifications ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="Fitness Tips"
            description="Weekly tips and workout suggestions"
            icon={<Zap size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={tips}
                onValueChange={setTips}
                disabled={!allNotifications}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={tips && allNotifications ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
          
          <SettingsItem
            title="App Updates"
            description="News about app features and improvements"
            icon={<MessageCircle size={22} color={colors.primary} />}
            rightElement={
              <Switch
                value={updates}
                onValueChange={setUpdates}
                disabled={!allNotifications}
                trackColor={{ false: colors.lightGray, true: `${colors.primary}80` }}
                thumbColor={updates && allNotifications ? colors.primary : colors.mediumGray}
                ios_backgroundColor={colors.lightGray}
              />
            }
          />
        </View>
        
        {/* Reminder settings */}
        {allNotifications && workoutReminders && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reminder Settings</Text>
            
            <SettingsItem
              title="Reminder Time"
              description="Set your daily workout reminder time"
              onPress={handleSetReminderTime}
              showChevron
            />
            
            <SettingsItem
              title="Reminder Days"
              description="Choose which days to receive reminders"
              onPress={() => Alert.alert('Reminder Days', 'This would open a day selector.')}
              showChevron
            />
          </View>
        )}
        
        <Text style={styles.footerText}>
          You can change these settings at any time. Notifications help you stay on track with your fitness goals.
        </Text>
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
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
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
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
});