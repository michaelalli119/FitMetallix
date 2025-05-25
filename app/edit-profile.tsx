import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Camera, User, Mail, Calendar, Weight, Ruler } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { bodyTypes, WorkoutLevel } from '@/constants/workouts';
import Button from '@/components/Button';

export default function EditProfileScreen() {
  const router = useRouter();
  const { profile, updateProfile } = useUserStore();
  
  const [name, setName] = useState(profile.name || '');
  const [email, setEmail] = useState('user@example.com'); // Example email
  const [age, setAge] = useState(profile.age ? profile.age.toString() : '');
  const [weight, setWeight] = useState(profile.weight ? profile.weight.toString() : '');
  const [height, setHeight] = useState(profile.height ? profile.height.toString() : '');
  const [fitnessLevel, setFitnessLevel] = useState<WorkoutLevel>(profile.fitnessLevel || 'beginner');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const fitnessLevels: { id: WorkoutLevel; label: string }[] = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];
  
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };
  
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (!name.trim()) {
        Alert.alert('Error', 'Name is required');
        setIsLoading(false);
        return;
      }
      
      // Parse numeric values
      const ageNum = age ? parseInt(age) : null;
      const weightNum = weight ? parseFloat(weight) : null;
      const heightNum = height ? parseFloat(height) : null;
      
      // Update profile
      updateProfile({
        name,
        age: ageNum,
        weight: weightNum,
        height: heightNum,
        fitnessLevel,
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert(
        'Success',
        'Profile updated successfully',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Edit Profile',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileImageText}>
                  {name ? name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
            )}
            
            <Pressable style={styles.cameraButton} onPress={pickImage}>
              <Camera size={20} color={colors.white} />
            </Pressable>
          </View>
        </View>
        
        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <View style={styles.inputContainer}>
              <User size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={colors.textSecondary}
                cursorColor={colors.primary}
              />
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputContainer}>
              <Mail size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={email}
                editable={false}
                placeholder="Your email"
                placeholderTextColor={colors.textSecondary}
              />
            </View>
            <Text style={styles.helperText}>Email cannot be changed</Text>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Age</Text>
            <View style={styles.inputContainer}>
              <Calendar size={20} color={colors.textSecondary} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Your age"
                placeholderTextColor={colors.textSecondary}
                keyboardType="number-pad"
                cursorColor={colors.primary}
              />
            </View>
          </View>
          
          <View style={styles.rowInputs}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.inputLabel}>Weight (kg)</Text>
              <View style={styles.inputContainer}>
                <Weight size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={weight}
                  onChangeText={setWeight}
                  placeholder="Weight"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                  cursorColor={colors.primary}
                />
              </View>
            </View>
            
            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.inputLabel}>Height (cm)</Text>
              <View style={styles.inputContainer}>
                <Ruler size={20} color={colors.textSecondary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={height}
                  onChangeText={setHeight}
                  placeholder="Height"
                  placeholderTextColor={colors.textSecondary}
                  keyboardType="decimal-pad"
                  cursorColor={colors.primary}
                />
              </View>
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Fitness Level</Text>
            <View style={styles.levelsContainer}>
              {fitnessLevels.map(level => (
                <Pressable
                  key={level.id}
                  style={[
                    styles.levelItem,
                    fitnessLevel === level.id && styles.selectedLevel
                  ]}
                  onPress={() => setFitnessLevel(level.id)}
                >
                  <Text
                    style={[
                      styles.levelText,
                      fitnessLevel === level.id && styles.selectedLevelText
                    ]}
                  >
                    {level.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Body Type</Text>
            <Pressable 
              style={styles.bodyTypeButton}
              onPress={() => router.push('/body-scan')}
            >
              <Text style={styles.bodyTypeButtonText}>
                {profile.bodyType 
                  ? `Current: ${profile.bodyType} (Tap to update)`
                  : 'Take body scan to determine your body type'}
              </Text>
            </Pressable>
          </View>
        </View>
        
        <Button
          title="Save Changes"
          onPress={handleSave}
          loading={isLoading}
          style={styles.saveButton}
        />
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
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.metallic.highlight,
  },
  profileImageText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    color: colors.text,
    fontSize: 16,
  },
  disabledInput: {
    color: colors.textSecondary,
  },
  helperText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    marginLeft: 4,
  },
  rowInputs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  levelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelItem: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  selectedLevel: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  selectedLevelText: {
    color: colors.white,
  },
  bodyTypeButton: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: 'dashed',
  },
  bodyTypeButtonText: {
    fontSize: 14,
    color: colors.primary,
  },
  saveButton: {
    marginTop: 8,
  },
});