import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Mic, MicOff, ChevronLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';

export default function VoiceControlScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  
  // Mock commands that would be recognized
  const availableCommands = [
    'Start workout',
    'Pause',
    'Resume',
    'Skip exercise',
    'Add 15 seconds',
    'Reduce 15 seconds',
    'Show next exercise',
    'How many reps left',
    'Finish workout',
  ];
  
  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };
  
  const startListening = () => {
    setIsListening(true);
    setTranscript('Listening...');
    
    // Simulate voice recognition with random commands
    if (Platform.OS === 'web') {
      Alert.alert('Web Limitation', 'Voice recognition is limited on web. Using simulated commands.');
    }
    
    // Simulate receiving a command after a delay
    const timeout = setTimeout(() => {
      const randomCommand = availableCommands[Math.floor(Math.random() * availableCommands.length)];
      setTranscript(randomCommand);
      processCommand(randomCommand);
    }, 2000);
    
    return () => clearTimeout(timeout);
  };
  
  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };
  
  const processCommand = (command: string) => {
    // Add command to history
    setCommandHistory(prev => [command, ...prev].slice(0, 5));
    
    // Process the command (in a real app, this would trigger actions)
    setTimeout(() => {
      let response = '';
      
      switch (command.toLowerCase()) {
        case 'start workout':
          response = 'Starting your workout now';
          break;
        case 'pause':
          response = 'Workout paused';
          break;
        case 'resume':
          response = 'Resuming your workout';
          break;
        case 'skip exercise':
          response = 'Skipping to the next exercise';
          break;
        case 'add 15 seconds':
          response = 'Added 15 seconds to the timer';
          break;
        case 'reduce 15 seconds':
          response = 'Reduced timer by 15 seconds';
          break;
        case 'show next exercise':
          response = 'Next up: Push-ups';
          break;
        case 'how many reps left':
          response = '5 reps remaining in this set';
          break;
        case 'finish workout':
          response = 'Finishing your workout. Great job!';
          break;
        default:
          response = "I didn't understand that command";
      }
      
      setTranscript(response);
      
      // Reset after showing response
      setTimeout(() => {
        if (isListening) {
          setTranscript('Listening...');
        } else {
          setTranscript('');
        }
      }, 3000);
    }, 500);
  };
  
  // Clean up on unmount
  useEffect(() => {
    return () => {
      setIsListening(false);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Voice Control',
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ChevronLeft size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Voice Commands</Text>
        <Text style={styles.subtitle}>
          Control your workout hands-free with voice commands
        </Text>
        
        {/* Voice Recognition Area */}
        <View style={styles.recognitionArea}>
          <Pressable 
            style={[
              styles.micButton,
              isListening && styles.listeningButton
            ]}
            onPress={toggleListening}
          >
            {isListening ? (
              <MicOff size={32} color={colors.white} />
            ) : (
              <Mic size={32} color={colors.white} />
            )}
          </Pressable>
          
          <Text style={styles.statusText}>
            {isListening ? 'Tap to stop' : 'Tap to start voice control'}
          </Text>
          
          {transcript ? (
            <View style={styles.transcriptContainer}>
              <Text style={styles.transcript}>{transcript}</Text>
            </View>
          ) : null}
        </View>
        
        {/* Available Commands */}
        <View style={styles.commandsContainer}>
          <Text style={styles.commandsTitle}>Available Commands</Text>
          
          <View style={styles.commandsList}>
            {availableCommands.map((command, index) => (
              <View key={index} style={styles.commandItem}>
                <Text style={styles.commandText}>{command}</Text>
              </View>
            ))}
          </View>
        </View>
        
        {/* Command History */}
        {commandHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Recent Commands</Text>
            
            {commandHistory.map((command, index) => (
              <Text key={index} style={styles.historyItem}>
                • {command}
              </Text>
            ))}
          </View>
        )}
        
        {/* Try It Button */}
        <Button
          title="Try with a Workout"
          onPress={() => router.push('/workouts')}
          style={styles.tryButton}
        />
      </View>
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
  },
  recognitionArea: {
    alignItems: 'center',
    marginBottom: 32,
  },
  micButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  listeningButton: {
    backgroundColor: colors.error,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  transcriptContainer: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  transcript: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'center',
  },
  commandsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  commandsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  commandsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  commandItem: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.metallic.dark,
  },
  commandText: {
    fontSize: 14,
    color: colors.text,
  },
  historyContainer: {
    width: '100%',
    marginBottom: 24,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  historyItem: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 8,
  },
  tryButton: {
    width: '100%',
    marginTop: 16,
  },
});