import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { bodyTypes, WorkoutLevel } from '@/constants/workouts';
import { trpc } from '@/lib/trpc';
import Button from '@/components/Button';
import BodyTypeCard from '@/components/BodyTypeCard';

export default function OnboardingScreen() {
  const router = useRouter();
  const { updateProfile, setOnboarded } = useUserStore();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState<WorkoutLevel>('beginner');
  const [fitnessGoals, setFitnessGoals] = useState<string[]>([]);
  const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // tRPC mutation for updating profile
  const updateProfileMutation = trpc.user.updateProfile.useMutation({
    onSuccess: (data) => {
      setIsSubmitting(false);
      setOnboarded(true);
      router.replace('/');
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      setIsSubmitting(false);
      // Still complete onboarding even if API fails
      setOnboarded(true);
      router.replace('/');
    }
  });
  
  const fitnessLevels: { id: WorkoutLevel; label: string }[] = [
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ];
  
  const goalOptions = [
    'Lose Weight',
    'Build Muscle',
    'Improve Flexibility',
    'Increase Endurance',
    'Reduce Stress',
    'Better Sleep',
    'Overall Health',
  ];
  
  const toggleGoal = (goal: string) => {
    if (fitnessGoals.includes(goal)) {
      setFitnessGoals(fitnessGoals.filter(g => g !== goal));
    } else {
      setFitnessGoals([...fitnessGoals, goal]);
    }
  };
  
  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Save all user data
      setIsSubmitting(true);
      
      const profileData = {
        name,
        age: age ? parseInt(age) : null,
        weight: weight ? parseFloat(weight) : null,
        height: height ? parseFloat(height) : null,
        fitnessLevel,
        fitnessGoals,
        bodyType: selectedBodyType as any,
      };
      
      // Update local state
      updateProfile(profileData);
      
      // Update via API
      updateProfileMutation.mutate(profileData);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return !name;
      case 2:
        return fitnessGoals.length === 0;
      case 3:
        return !fitnessLevel;
      case 4:
        return !selectedBodyType || isSubmitting;
      default:
        return false;
    }
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Tell us about yourself</Text>
            <Text style={styles.stepDescription}>
              We'll use this information to personalize your experience
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={colors.textSecondary}
                cursorColor={colors.primary}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Age (optional)</Text>
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
            
            <View style={styles.rowInputs}>
              <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                <Text style={styles.inputLabel}>Weight (kg)</Text>
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
              
              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <Text style={styles.inputLabel}>Height (cm)</Text>
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
        );
      
      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What are your fitness goals?</Text>
            <Text style={styles.stepDescription}>
              Select all that apply to you
            </Text>
            
            <View style={styles.goalsContainer}>
              {goalOptions.map(goal => (
                <Pressable
                  key={goal}
                  style={[
                    styles.goalItem,
                    fitnessGoals.includes(goal) && styles.selectedGoal
                  ]}
                  onPress={() => toggleGoal(goal)}
                >
                  <Text
                    style={[
                      styles.goalText,
                      fitnessGoals.includes(goal) && styles.selectedGoalText
                    ]}
                  >
                    {goal}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        );
      
      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your fitness level?</Text>
            <Text style={styles.stepDescription}>
              This helps us recommend appropriate workouts
            </Text>
            
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
                  
                  {level.id === 'beginner' && (
                    <Text style={[
                      styles.levelDescription,
                      fitnessLevel === level.id && styles.selectedLevelDescription
                    ]}>
                      New to fitness or returning after a long break
                    </Text>
                  )}
                  
                  {level.id === 'intermediate' && (
                    <Text style={[
                      styles.levelDescription,
                      fitnessLevel === level.id && styles.selectedLevelDescription
                    ]}>
                      Consistent with workouts for several months
                    </Text>
                  )}
                  
                  {level.id === 'advanced' && (
                    <Text style={[
                      styles.levelDescription,
                      fitnessLevel === level.id && styles.selectedLevelDescription
                    ]}>
                      Experienced with challenging workouts
                    </Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        );
      
      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>What's your body type?</Text>
            <Text style={styles.stepDescription}>
              This helps us tailor workouts to your specific needs
            </Text>
            
            <ScrollView showsVerticalScrollIndicator={false}>
              {bodyTypes.map(bodyType => (
                <BodyTypeCard
                  key={bodyType.id}
                  bodyType={bodyType}
                  isSelected={selectedBodyType === bodyType.id}
                  onSelect={(type) => setSelectedBodyType(type)}
                />
              ))}
            </ScrollView>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {[1, 2, 3, 4].map(i => (
          <View
            key={i}
            style={[
              styles.progressDot,
              i <= step && styles.activeDot
            ]}
          />
        ))}
      </View>
      
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>
      
      <View style={styles.buttonsContainer}>
        {step > 1 && (
          <Button
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={{ flex: 1, marginRight: 8 }}
          />
        )}
        
        <Button
          title={step === 4 ? "Finish" : "Next"}
          onPress={handleNext}
          disabled={isNextDisabled()}
          loading={isSubmitting}
          style={{ flex: 1, marginLeft: step > 1 ? 8 : 0 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 24,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.metallic.medium,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 20,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: colors.text,
  },
  rowInputs: {
    flexDirection: 'row',
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  goalItem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    borderRadius: 12,
    padding: 12,
    minWidth: '45%',
  },
  selectedGoal: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  goalText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  selectedGoalText: {
    color: colors.white,
    fontWeight: '600',
  },
  levelsContainer: {
    gap: 16,
  },
  levelItem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    borderRadius: 12,
    padding: 16,
  },
  selectedLevel: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  selectedLevelText: {
    color: colors.white,
  },
  levelDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  selectedLevelDescription: {
    color: colors.white,
    opacity: 0.9,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 24,
  },
});