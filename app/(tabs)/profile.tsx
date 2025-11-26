import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import {
  User, Settings, Bell, Heart, HelpCircle, LogOut, ChevronRight, Shield, Award
} from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import Button from '@/components/Button';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile, setOnboarded } = useUserStore();

  const menuItems = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: <User size={20} color={colors.primary} />,
      onPress: () => router.push('/edit-profile'),
    },
    {
      id: 'settings',
      title: 'App Settings',
      icon: <Settings size={20} color={colors.primary} />,
      onPress: () => router.push('/settings'),
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color={colors.primary} />,
      onPress: () => router.push('/notifications'),
    },
    {
      id: 'favorites',
      title: 'Favorite Workouts',
      icon: <Heart size={20} color={colors.primary} />,
      onPress: () => router.push('/favorites'),
    },
    {
      id: 'achievements',
      title: 'Achievements',
      icon: <Award size={20} color={colors.primary} />,
      onPress: () => router.push('/achievements'),
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: <Shield size={20} color={colors.primary} />,
      onPress: () => router.push('/privacy'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={colors.primary} />,
      onPress: () => router.push('/help'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => {
            // In a real app, you would clear auth tokens here
            setOnboarded(false);
            router.replace('/login');
          },
        },
      ]
    );
  };

  const handleBodyScan = () => {
    router.push('/body-scan');
  };

  const handleMenuItemPress = (item: typeof menuItems[0]) => {
    // For demo purposes, show an alert for screens that aren't implemented
    if (item.id === 'privacy' || item.id === 'help') {
      Alert.alert(
        'Coming Soon',
        `The ${item.title} screen is not implemented in this demo.`,
        [{ text: 'OK' }]
      );
    } else {
      item.onPress();
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {profile.profileImage ? (
              <Image source={{ uri: profile.profileImage }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>
                {profile.name ? profile.name.charAt(0).toUpperCase() : 'U'}
              </Text>
            )}
          </View>

          <Text style={styles.name}>{profile.name || 'User'}</Text>

          <View style={styles.profileInfo}>
            {profile.bodyType && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Body Type</Text>
                <Text style={styles.infoValue}>{profile.bodyType}</Text>
              </View>
            )}

            {profile.fitnessLevel && (
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Fitness Level</Text>
                <Text style={styles.infoValue}>{profile.fitnessLevel}</Text>
              </View>
            )}
          </View>

          <Button
            title="Edit Profile"
            onPress={() => router.push('/edit-profile')}
            variant="outline"
            size="small"
            style={styles.editButton}
            testID="profile_screen.edit_button"
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.menuItem,
                pressed && styles.menuItemPressed,
                item.id === menuItems[menuItems.length - 1].id && styles.lastMenuItem
              ]}
              onPress={() => handleMenuItemPress(item)}
              testID={`profile_screen.menu_${item.id}`}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemIcon}>
                  {item.icon}
                </View>
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        {/* Logout Button */}
        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutButtonPressed
          ]}
          onPress={handleLogout}
          testID="profile_screen.logout_button"
        >
          <LogOut size={20} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

        {/* App Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: colors.metallic.highlight,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 16,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textTransform: 'capitalize',
  },
  editButton: {
    marginTop: 8,
  },
  menuContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.metallic.dark,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemPressed: {
    backgroundColor: colors.lightGray,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(100, 181, 246, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontSize: 16,
    color: colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.error,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  logoutButtonPressed: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.error,
    marginLeft: 8,
  },
  versionText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
  },
});