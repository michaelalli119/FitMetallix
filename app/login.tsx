import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import Button from '@/components/Button';
import SocialLoginButton from '@/components/SocialLoginButton';

export default function LoginScreen() {
  const router = useRouter();
  const { setOnboarded, updateProfile } = useUserStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };
  
  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (isLogin) {
        // In a real app, this would validate credentials with a backend
        console.log('Logging in with:', email, password);
      } else {
        // In a real app, this would create a new account
        console.log('Signing up with:', email, password);
      }
      
      // Set default profile name from email
      const name = email.split('@')[0];
      updateProfile({ name });
      
      // Set as onboarded to skip onboarding
      setOnboarded(true);
      
      // Navigate to home or onboarding based on whether it's a new account
      router.replace(isLogin ? '/' : '/onboarding');
    } catch (error) {
      console.error('Authentication error:', error);
      Alert.alert('Error', isLogin ? 'Login failed' : 'Sign up failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'apple' | 'google') => {
    try {
      // In a real app, this would trigger the respective social auth flow
      console.log(`Authenticating with ${provider}`);
      
      // Simulate authentication delay
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set default profile name
      updateProfile({ name: provider === 'apple' ? 'Apple User' : 'Google User' });
      
      // Set as onboarded to skip onboarding
      setOnboarded(true);
      
      // Navigate to home
      router.replace('/');
    } catch (error) {
      console.error(`${provider} authentication error:`, error);
      Alert.alert('Error', `${provider} authentication failed`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSkip = () => {
    router.replace('/onboarding');
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 0}
    >
      <LinearGradient
        colors={['#1a1a1a', '#2d2d2d']}
        style={styles.background}
      />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80' }} 
            style={styles.logoImage}
          />
          <Text style={styles.appName}>FitMetallic</Text>
          <Text style={styles.tagline}>Forge your fitness journey</Text>
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
          
          <View style={styles.inputContainer}>
            <Mail size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              cursorColor={colors.primary}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Lock size={20} color={colors.textSecondary} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              cursorColor={colors.primary}
            />
            <TouchableOpacity 
              onPress={togglePasswordVisibility}
              style={styles.passwordToggle}
            >
              {showPassword ? (
                <EyeOff size={20} color={colors.textSecondary} />
              ) : (
                <Eye size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          </View>
          
          {isLogin && (
            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          )}
          
          <Button
            title={isLogin ? 'Log In' : 'Sign Up'}
            onPress={handleAuth}
            loading={isLoading}
            style={styles.authButton}
            fullWidth
          />
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <View style={styles.socialButtons}>
            <SocialLoginButton
              provider="apple"
              onPress={() => handleSocialLogin('apple')}
              disabled={isLoading}
            />
            <SocialLoginButton
              provider="google"
              onPress={() => handleSocialLogin('google')}
              disabled={isLoading}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.toggleAuth}
            onPress={toggleAuthMode}
          >
            <Text style={styles.toggleAuthText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.toggleAuthTextHighlight}>
                {isLogin ? 'Sign Up' : 'Log In'}
              </Text>
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.skipButton}
            onPress={handleSkip}
          >
            <Text style={styles.skipButtonText}>
              Skip for now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  formContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.text,
    fontSize: 16,
  },
  passwordToggle: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
  },
  authButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.metallic.dark,
  },
  dividerText: {
    color: colors.textSecondary,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  toggleAuth: {
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleAuthText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  toggleAuthTextHighlight: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  skipButton: {
    alignItems: 'center',
  },
  skipButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});