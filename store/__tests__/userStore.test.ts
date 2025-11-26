import { renderHook, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserStore } from '../userStore';
import { mockUserProfile, mockWorkoutProgress, mockUserSettings } from '../../__tests__/utils/mock-data';

describe('userStore', () => {
  beforeEach(() => {
    // Clear store state before each test
    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.resetUser();
    });
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should have correct default profile values', () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.profile.name).toBe('');
      expect(result.current.profile.age).toBeNull();
      expect(result.current.profile.weight).toBeNull();
      expect(result.current.profile.height).toBeNull();
      expect(result.current.profile.bodyType).toBeNull();
      expect(result.current.profile.fitnessLevel).toBe('beginner');
      expect(result.current.profile.fitnessGoals).toEqual([]);
      expect(result.current.profile.currentMood).toBeNull();
      expect(result.current.profile.profileImage).toBeNull();
    });

    it('should have correct default progress values', () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.progress.completedWorkouts).toBe(0);
      expect(result.current.progress.totalWorkoutMinutes).toBe(0);
      expect(result.current.progress.streakDays).toBe(0);
      expect(result.current.progress.lastWorkoutDate).toBeNull();
    });

    it('should have correct default settings values', () => {
      const { result } = renderHook(() => useUserStore());

      expect(result.current.settings.darkMode).toBe(true);
      expect(result.current.settings.units).toBe('metric');
      expect(result.current.settings.soundEnabled).toBe(true);
      expect(result.current.settings.hapticEnabled).toBe(true);
      expect(result.current.settings.notificationsEnabled).toBe(true);
      expect(result.current.settings.reminderTime).toBeNull();
    });

    it('should have isOnboarded as false by default', () => {
      const { result } = renderHook(() => useUserStore());
      expect(result.current.isOnboarded).toBe(false);
    });

    it('should have isAuthenticated as false by default', () => {
      const { result } = renderHook(() => useUserStore());
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('updateProfile', () => {
    it('should update profile with partial data', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProfile({ name: 'John Doe', age: 30 });
      });

      expect(result.current.profile.name).toBe('John Doe');
      expect(result.current.profile.age).toBe(30);
      expect(result.current.profile.weight).toBeNull(); // Other fields unchanged
    });

    it('should merge profile updates without overwriting other fields', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProfile({ name: 'John Doe' });
        result.current.updateProfile({ age: 30 });
      });

      expect(result.current.profile.name).toBe('John Doe');
      expect(result.current.profile.age).toBe(30);
    });

    it('should update bodyType', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProfile({ bodyType: 'mesomorph' });
      });

      expect(result.current.profile.bodyType).toBe('mesomorph');
    });

    it('should update fitness goals array', () => {
      const { result } = renderHook(() => useUserStore());
      const goals = ['Build Muscle', 'Lose Weight'];

      act(() => {
        result.current.updateProfile({ fitnessGoals: goals });
      });

      expect(result.current.profile.fitnessGoals).toEqual(goals);
    });

    it('should update profileImage', () => {
      const { result } = renderHook(() => useUserStore());
      const imageUri = 'file://path/to/image.jpg';

      act(() => {
        result.current.updateProfile({ profileImage: imageUri });
      });

      expect(result.current.profile.profileImage).toBe(imageUri);
    });
  });

  describe('updateProgress', () => {
    it('should update progress with partial data', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProgress({ completedWorkouts: 5, streakDays: 3 });
      });

      expect(result.current.progress.completedWorkouts).toBe(5);
      expect(result.current.progress.streakDays).toBe(3);
      expect(result.current.progress.totalWorkoutMinutes).toBe(0); // Unchanged
    });

    it('should increment completed workouts', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProgress({ completedWorkouts: 1 });
        result.current.updateProgress({ completedWorkouts: 2 });
      });

      expect(result.current.progress.completedWorkouts).toBe(2);
    });

    it('should update last workout date', () => {
      const { result } = renderHook(() => useUserStore());
      const date = '2024-01-01T00:00:00.000Z';

      act(() => {
        result.current.updateProgress({ lastWorkoutDate: date });
      });

      expect(result.current.progress.lastWorkoutDate).toBe(date);
    });

    it('should update total workout minutes', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProgress({ totalWorkoutMinutes: 150 });
      });

      expect(result.current.progress.totalWorkoutMinutes).toBe(150);
    });
  });

  describe('updateSettings', () => {
    it('should update settings with partial data', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateSettings({ darkMode: false, soundEnabled: false });
      });

      expect(result.current.settings.darkMode).toBe(false);
      expect(result.current.settings.soundEnabled).toBe(false);
      expect(result.current.settings.hapticEnabled).toBe(true); // Unchanged
    });

    it('should toggle dark mode', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateSettings({ darkMode: false });
      });

      expect(result.current.settings.darkMode).toBe(false);
    });

    it('should change units', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateSettings({ units: 'imperial' });
      });

      expect(result.current.settings.units).toBe('imperial');
    });

    it('should update reminder time', () => {
      const { result } = renderHook(() => useUserStore());
      const time = '09:00';

      act(() => {
        result.current.updateSettings({ reminderTime: time });
      });

      expect(result.current.settings.reminderTime).toBe(time);
    });

    it('should toggle notifications', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateSettings({ notificationsEnabled: false });
      });

      expect(result.current.settings.notificationsEnabled).toBe(false);
    });
  });

  describe('setOnboarded', () => {
    it('should set onboarded to true', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setOnboarded(true);
      });

      expect(result.current.isOnboarded).toBe(true);
    });

    it('should set onboarded to false', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setOnboarded(true);
        result.current.setOnboarded(false);
      });

      expect(result.current.isOnboarded).toBe(false);
    });
  });

  describe('setAuthenticated', () => {
    it('should set authenticated to true', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setAuthenticated(true);
      });

      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should set authenticated to false', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setAuthenticated(true);
        result.current.setAuthenticated(false);
      });

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('setCurrentMood', () => {
    it('should set current mood', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setCurrentMood('energized');
      });

      expect(result.current.profile.currentMood).toBe('energized');
    });

    it('should change mood', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setCurrentMood('energized');
        result.current.setCurrentMood('tired');
      });

      expect(result.current.profile.currentMood).toBe('tired');
    });

    it('should accept all valid mood types', () => {
      const { result } = renderHook(() => useUserStore());
      const moods = ['energized', 'tired', 'stressed', 'focused', 'anxious'] as const;

      moods.forEach(mood => {
        act(() => {
          result.current.setCurrentMood(mood);
        });
        expect(result.current.profile.currentMood).toBe(mood);
      });
    });
  });

  describe('setBodyType', () => {
    it('should set body type', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setBodyType('ectomorph');
      });

      expect(result.current.profile.bodyType).toBe('ectomorph');
    });

    it('should change body type', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setBodyType('ectomorph');
        result.current.setBodyType('mesomorph');
      });

      expect(result.current.profile.bodyType).toBe('mesomorph');
    });

    it('should accept all valid body types', () => {
      const { result } = renderHook(() => useUserStore());
      const bodyTypes = ['ectomorph', 'mesomorph', 'endomorph'] as const;

      bodyTypes.forEach(bodyType => {
        act(() => {
          result.current.setBodyType(bodyType);
        });
        expect(result.current.profile.bodyType).toBe(bodyType);
      });
    });
  });

  describe('resetUser', () => {
    it('should reset profile to defaults', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProfile(mockUserProfile);
        result.current.resetUser();
      });

      expect(result.current.profile.name).toBe('');
      expect(result.current.profile.age).toBeNull();
      expect(result.current.profile.bodyType).toBeNull();
    });

    it('should reset progress to defaults', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProgress(mockWorkoutProgress);
        result.current.resetUser();
      });

      expect(result.current.progress.completedWorkouts).toBe(0);
      expect(result.current.progress.totalWorkoutMinutes).toBe(0);
      expect(result.current.progress.streakDays).toBe(0);
      expect(result.current.progress.lastWorkoutDate).toBeNull();
    });

    it('should reset onboarded status', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setOnboarded(true);
        result.current.resetUser();
      });

      expect(result.current.isOnboarded).toBe(false);
    });

    it('should reset authenticated status', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.setAuthenticated(true);
        result.current.resetUser();
      });

      expect(result.current.isAuthenticated).toBe(false);
    });

    it('should not reset settings', () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateSettings({ darkMode: false, units: 'imperial' });
        result.current.resetUser();
      });

      // Settings should remain unchanged
      expect(result.current.settings.darkMode).toBe(false);
      expect(result.current.settings.units).toBe('imperial');
    });
  });

  describe('Persistence', () => {
    it('should call AsyncStorage setItem when state changes', async () => {
      const { result } = renderHook(() => useUserStore());

      act(() => {
        result.current.updateProfile({ name: 'Test' });
      });

      // Wait for async storage to be called
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(AsyncStorage.setItem).toHaveBeenCalled();
    });
  });
});
