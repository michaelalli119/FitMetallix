import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Image, Alert, Platform } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Camera as CameraIcon, Check, ChevronLeft, RefreshCw } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/store/userStore';
import { bodyTypes, BodyType } from '@/constants/workouts';
import { trpc } from '@/lib/trpc';
import Button from '@/components/Button';

export default function BodyScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const { setBodyType } = useUserStore();
  
  const [facing, setFacing] = useState<CameraType>('back');
  const [photo, setPhoto] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<BodyType | null>(null);
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number>(0);
  const cameraRef = useRef<CameraView>(null);
  
  // tRPC mutation for body scan analysis
  const analyzeBodyScanMutation = trpc.user.analyzeBodyScan.useMutation({
    onSuccess: (data) => {
      setResult(data.bodyType);
      setConfidence(data.confidence);
      setAiRecommendations(data.recommendations);
      setAnalyzing(false);
    },
    onError: (error) => {
      console.error("Error analyzing body scan:", error);
      Alert.alert("Error", "Failed to analyze body scan. Please try again.");
      setAnalyzing(false);
    }
  });
  
  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  
  const takePhoto = async () => {
    if (!cameraRef.current) return;
    
    try {
      // This is a mock since we can't actually take photos in this environment
      setPhoto('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
      
      // In a real app, you would use:
      // const photo = await cameraRef.current.takePictureAsync();
      // setPhoto(photo.uri);
    } catch (error) {
      console.error('Failed to take photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };
  
  const analyzePhoto = async () => {
    setAnalyzing(true);
    
    // Call the tRPC mutation to analyze the body scan
    analyzeBodyScanMutation.mutate({
      imageUrl: photo || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      height: 175, // Example height in cm
      weight: 70, // Example weight in kg
    });
  };
  
  const resetScan = () => {
    setPhoto(null);
    setResult(null);
    setAiRecommendations([]);
    setConfidence(0);
  };
  
  const saveResults = () => {
    if (result) {
      setBodyType(result);
      Alert.alert(
        'Success',
        'Your body type has been saved successfully!',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
  };
  
  if (!permission) {
    // Camera permissions are still loading
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Requesting camera permissions...</Text>
      </View>
    );
  }
  
  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ 
          title: 'Body Scan',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
        }} />
        <Text style={styles.permissionText}>
          We need your permission to use the camera for body scanning
        </Text>
        <Button 
          title="Grant Permission" 
          onPress={requestPermission} 
          style={styles.permissionButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Body Scan',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      {!photo ? (
        // Camera View
        <View style={styles.cameraContainer}>
          <Text style={styles.instructions}>
            Stand 6-8 feet away from the camera in good lighting
          </Text>
          
          {Platform.OS !== 'web' ? (
            <CameraView
              style={styles.camera}
              facing={facing}
              ref={cameraRef}
            >
              <View style={styles.cameraControls}>
                <Pressable 
                  style={styles.flipButton}
                  onPress={toggleCameraFacing}
                >
                  <RefreshCw size={24} color={colors.white} />
                </Pressable>
                
                <Pressable 
                  style={styles.captureButton}
                  onPress={takePhoto}
                >
                  <CameraIcon size={32} color={colors.white} />
                </Pressable>
              </View>
            </CameraView>
          ) : (
            // Fallback for web
            <View style={styles.webFallback}>
              <Text style={styles.webFallbackText}>
                Camera functionality is limited on web.
              </Text>
              <Button 
                title="Simulate Photo Capture" 
                onPress={takePhoto}
                style={styles.webButton}
              />
            </View>
          )}
          
          <Text style={styles.tip}>
            Tip: Wear form-fitting clothes for more accurate results
          </Text>
        </View>
      ) : (
        // Photo Review & Analysis
        <View style={styles.resultContainer}>
          {!result ? (
            // Photo review before analysis
            <>
              <Image source={{ uri: photo }} style={styles.photoPreview} />
              
              <View style={styles.actionButtons}>
                <Button 
                  title="Retake" 
                  onPress={resetScan}
                  variant="outline"
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button 
                  title="Analyze" 
                  onPress={analyzePhoto}
                  loading={analyzing}
                  style={{ flex: 1, marginLeft: 8 }}
                />
              </View>
            </>
          ) : (
            // Analysis results
            <>
              <View style={styles.resultHeader}>
                <Text style={styles.resultTitle}>Analysis Complete</Text>
                <View style={styles.resultBadge}>
                  <Check size={16} color={colors.white} />
                </View>
              </View>
              
              <Text style={styles.bodyTypeTitle}>
                Your Body Type: <Text style={styles.bodyTypeValue}>{result}</Text>
              </Text>
              
              <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceLabel}>Confidence: {confidence}%</Text>
                <View style={styles.confidenceBar}>
                  <View style={[styles.confidenceFill, { width: `${confidence}%` }]} />
                </View>
              </View>
              
              <View style={styles.bodyTypeInfo}>
                <Text style={styles.recommendationsTitle}>AI Recommendations:</Text>
                {aiRecommendations.length > 0 ? (
                  aiRecommendations.map((rec, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.recommendationText}>{rec}</Text>
                    </View>
                  ))
                ) : (
                  bodyTypes.find(bt => bt.id === result)?.recommendations.map((rec, index) => (
                    <View key={index} style={styles.recommendationItem}>
                      <View style={styles.bullet} />
                      <Text style={styles.recommendationText}>{rec}</Text>
                    </View>
                  ))
                )}
              </View>
              
              <View style={styles.actionButtons}>
                <Button 
                  title="Scan Again" 
                  onPress={resetScan}
                  variant="outline"
                  style={{ flex: 1, marginRight: 8 }}
                />
                <Button 
                  title="Save Results" 
                  onPress={saveResults}
                  style={{ flex: 1, marginLeft: 8 }}
                />
              </View>
            </>
          )}
        </View>
      )}
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
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 24,
    color: colors.text,
  },
  permissionText: {
    fontSize: 16,
    textAlign: 'center',
    margin: 24,
    color: colors.text,
  },
  permissionButton: {
    marginHorizontal: 24,
  },
  cameraContainer: {
    flex: 1,
    padding: 16,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: colors.text,
  },
  camera: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  flipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.metallic.highlight,
  },
  captureButton: {
    alignSelf: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: colors.metallic.highlight,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  tip: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  webFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  webFallbackText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: colors.text,
  },
  webButton: {
    marginTop: 20,
  },
  resultContainer: {
    flex: 1,
    padding: 16,
  },
  photoPreview: {
    flex: 1,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginRight: 12,
  },
  resultBadge: {
    backgroundColor: colors.success,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyTypeTitle: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  bodyTypeValue: {
    fontWeight: 'bold',
    color: colors.primary,
    textTransform: 'capitalize',
  },
  confidenceContainer: {
    marginBottom: 16,
  },
  confidenceLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  confidenceBar: {
    height: 8,
    backgroundColor: colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  confidenceFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  bodyTypeInfo: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 6,
    marginRight: 8,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
  },
});