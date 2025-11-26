export type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutType = 'strength' | 'cardio' | 'flexibility' | 'recovery' | 'hiit' | 'yoga' | 'weightlifting' | 'sprint' | 'norwegian4x4';
export type MoodType = 'energized' | 'tired' | 'stressed' | 'focused' | 'anxious';
export type BodyType = 'ectomorph' | 'mesomorph' | 'endomorph';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number; // in seconds
  sets?: number;
  reps?: number;
  restTime?: number; // in seconds
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: WorkoutLevel;
  type: WorkoutType;
  duration: number; // in minutes
  calories: number;
  exercises: Exercise[];
  moodTypes: MoodType[];
  bodyTypes: BodyType[];
}

export const workouts: Workout[] = [
  {
    id: '1',
    title: 'Full Body Strength',
    description: 'A complete workout targeting all major muscle groups',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'intermediate',
    type: 'strength',
    duration: 45,
    calories: 350,
    moodTypes: ['energized', 'focused'],
    bodyTypes: ['mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e1',
        name: 'Push-ups',
        description: 'Classic exercise for chest, shoulders, and triceps',
        imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60,
        sets: 3,
        reps: 15,
        restTime: 45
      },
      {
        id: 'e2',
        name: 'Squats',
        description: 'Lower body exercise targeting quads, hamstrings, and glutes',
        imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60,
        sets: 3,
        reps: 20,
        restTime: 60
      },
      {
        id: 'e3',
        name: 'Plank',
        description: 'Core stabilizing exercise',
        imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 45,
        sets: 3,
        restTime: 30
      }
    ]
  },
  {
    id: '2',
    title: 'Stress Relief Yoga',
    description: 'Gentle yoga flow to reduce stress and anxiety',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'beginner',
    type: 'yoga',
    duration: 30,
    calories: 150,
    moodTypes: ['stressed', 'anxious', 'tired'],
    bodyTypes: ['ectomorph', 'mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e4',
        name: 'Child\'s Pose',
        description: 'Relaxing pose that gently stretches the back',
        imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60
      },
      {
        id: 'e5',
        name: 'Downward Dog',
        description: 'Stretches the shoulders, hamstrings, calves, and hands',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60
      },
      {
        id: 'e6',
        name: 'Corpse Pose',
        description: 'Final relaxation pose',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 180
      }
    ]
  },
  {
    id: '3',
    title: 'HIIT Cardio Blast',
    description: 'High-intensity interval training to maximize calorie burn',
    imageUrl: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'advanced',
    type: 'hiit',
    duration: 25,
    calories: 400,
    moodTypes: ['energized', 'focused'],
    bodyTypes: ['mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e7',
        name: 'Jumping Jacks',
        description: 'Full body exercise to get your heart rate up',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 30,
        sets: 4,
        restTime: 15
      },
      {
        id: 'e8',
        name: 'Mountain Climbers',
        description: 'Dynamic exercise targeting core and cardiovascular system',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 30,
        sets: 4,
        restTime: 15
      },
      {
        id: 'e9',
        name: 'Burpees',
        description: 'Full body exercise combining a squat, push-up, and jump',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 30,
        sets: 4,
        restTime: 15
      }
    ]
  },
  {
    id: '4',
    title: 'Recovery Session',
    description: 'Low-intensity recovery workout to promote muscle repair',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'beginner',
    type: 'recovery',
    duration: 20,
    calories: 100,
    moodTypes: ['tired', 'stressed'],
    bodyTypes: ['ectomorph', 'mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e10',
        name: 'Foam Rolling',
        description: 'Self-myofascial release to reduce muscle tension',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      },
      {
        id: 'e11',
        name: 'Light Stretching',
        description: 'Gentle stretches for the whole body',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      },
      {
        id: 'e12',
        name: 'Deep Breathing',
        description: 'Breathing exercises to promote relaxation',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 180
      }
    ]
  },
  {
    id: '5',
    title: 'Norwegian 4x4 Interval',
    description: 'High-intensity cardio workout based on the Norwegian 4x4 method',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'advanced',
    type: 'norwegian4x4',
    duration: 32,
    calories: 450,
    moodTypes: ['energized', 'focused'],
    bodyTypes: ['mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e13',
        name: 'Warm-up',
        description: 'Light jogging or cycling to prepare for intervals',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 600
      },
      {
        id: 'e14',
        name: 'High-Intensity Interval 1',
        description: '4 minutes at 85-95% of maximum heart rate',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 240,
        restTime: 180
      },
      {
        id: 'e15',
        name: 'High-Intensity Interval 2',
        description: '4 minutes at 85-95% of maximum heart rate',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 240,
        restTime: 180
      },
      {
        id: 'e16',
        name: 'High-Intensity Interval 3',
        description: '4 minutes at 85-95% of maximum heart rate',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 240,
        restTime: 180
      },
      {
        id: 'e17',
        name: 'High-Intensity Interval 4',
        description: '4 minutes at 85-95% of maximum heart rate',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 240,
        restTime: 180
      },
      {
        id: 'e18',
        name: 'Cool Down',
        description: 'Light activity to gradually reduce heart rate',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      }
    ]
  },
  {
    id: '6',
    title: 'Sprint Interval Training',
    description: 'Short, intense sprint workouts to build speed and power',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'advanced',
    type: 'sprint',
    duration: 30,
    calories: 400,
    moodTypes: ['energized', 'focused'],
    bodyTypes: ['ectomorph', 'mesomorph'],
    exercises: [
      {
        id: 'e19',
        name: 'Dynamic Warm-up',
        description: 'Active stretching and mobility exercises',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      },
      {
        id: 'e20',
        name: '100m Sprint',
        description: 'Maximum effort sprint',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 15,
        sets: 6,
        restTime: 120
      },
      {
        id: 'e21',
        name: '200m Sprint',
        description: 'Sustained maximum effort sprint',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 30,
        sets: 4,
        restTime: 180
      },
      {
        id: 'e22',
        name: 'Cool Down Jog',
        description: 'Easy jogging to reduce heart rate',
        imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      }
    ]
  },
  {
    id: '7',
    title: 'Power Weightlifting',
    description: 'Heavy compound lifts to build strength and power',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'advanced',
    type: 'weightlifting',
    duration: 60,
    calories: 350,
    moodTypes: ['energized', 'focused'],
    bodyTypes: ['mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e23',
        name: 'Barbell Squats',
        description: 'Compound lower body exercise',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60,
        sets: 5,
        reps: 5,
        restTime: 180
      },
      {
        id: 'e24',
        name: 'Deadlifts',
        description: 'Full body compound movement',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60,
        sets: 5,
        reps: 5,
        restTime: 180
      },
      {
        id: 'e25',
        name: 'Bench Press',
        description: 'Upper body pushing movement',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60,
        sets: 5,
        reps: 5,
        restTime: 180
      },
      {
        id: 'e26',
        name: 'Overhead Press',
        description: 'Shoulder and upper body strength',
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 60,
        sets: 3,
        reps: 8,
        restTime: 120
      }
    ]
  },
  {
    id: '8',
    title: 'Vinyasa Flow Yoga',
    description: 'Dynamic yoga sequence linking breath with movement',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'intermediate',
    type: 'yoga',
    duration: 45,
    calories: 200,
    moodTypes: ['stressed', 'anxious', 'focused'],
    bodyTypes: ['ectomorph', 'mesomorph', 'endomorph'],
    exercises: [
      {
        id: 'e27',
        name: 'Sun Salutation A',
        description: 'Flowing sequence to warm up the body',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      },
      {
        id: 'e28',
        name: 'Warrior Sequence',
        description: 'Series of standing poses to build strength and focus',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 600
      },
      {
        id: 'e29',
        name: 'Balance Poses',
        description: 'Tree pose, eagle pose, and other balancing postures',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      },
      {
        id: 'e30',
        name: 'Final Relaxation',
        description: 'Savasana to integrate the practice',
        imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 300
      }
    ]
  },
  {
    id: '9',
    title: 'Steady State Cardio',
    description: 'Moderate intensity steady state cardio to build endurance',
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    level: 'beginner',
    type: 'cardio',
    duration: 30,
    calories: 250,
    moodTypes: ['focused', 'energized'],
    bodyTypes: ['mesomorph', 'ectomorph'],
    exercises: [
      {
        id: 'e31',
        name: 'Jogging',
        description: 'Steady pace jogging',
        imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        duration: 1800
      }
    ]
  }
];

export const moodTypes: { id: MoodType; label: string; description: string; icon: string }[] = [
  {
    id: 'energized',
    label: 'Energized',
    description: 'Ready to take on a challenging workout',
    icon: 'zap'
  },
  {
    id: 'tired',
    label: 'Tired',
    description: 'Low energy, need a gentle session',
    icon: 'battery-low'
  },
  {
    id: 'stressed',
    label: 'Stressed',
    description: 'Need to release tension',
    icon: 'brain'
  },
  {
    id: 'focused',
    label: 'Focused',
    description: 'Ready to concentrate on form and technique',
    icon: 'target'
  },
  {
    id: 'anxious',
    label: 'Anxious',
    description: 'Need to calm the mind',
    icon: 'wind'
  }
];

export const bodyTypes: { id: BodyType; label: string; description: string; recommendations: string[] }[] = [
  {
    id: 'ectomorph',
    label: 'Ectomorph',
    description: 'Naturally lean and thin with difficulty gaining weight',
    recommendations: [
      'Focus on strength training with heavy weights',
      'Longer rest periods between sets (2-3 minutes)',
      'Consume calorie surplus with emphasis on protein',
      'Limit cardio to 2 sessions per week'
    ]
  },
  {
    id: 'mesomorph',
    label: 'Mesomorph',
    description: 'Athletic build with moderate difficulty gaining or losing weight',
    recommendations: [
      'Balanced approach with both strength and cardio',
      'Moderate rest periods (1-2 minutes)',
      'Maintain balanced macronutrient intake',
      'Can adapt to various training styles'
    ]
  },
  {
    id: 'endomorph',
    label: 'Endomorph',
    description: 'Naturally higher body fat with ease of gaining weight',
    recommendations: [
      'Higher rep ranges with moderate weights',
      'Shorter rest periods (30-60 seconds)',
      'Include more HIIT and cardio sessions',
      'Focus on calorie deficit with higher protein'
    ]
  }
];

export const workoutTypes: { id: WorkoutType; label: string; description: string }[] = [
  {
    id: 'strength',
    label: 'Strength Training',
    description: 'Build muscle and increase strength with resistance exercises'
  },
  {
    id: 'cardio',
    label: 'Cardio',
    description: 'Improve cardiovascular health and endurance'
  },
  {
    id: 'flexibility',
    label: 'Flexibility',
    description: 'Increase range of motion and prevent injuries'
  },
  {
    id: 'recovery',
    label: 'Recovery',
    description: 'Low-intensity exercises to promote muscle repair and relaxation'
  },
  {
    id: 'hiit',
    label: 'HIIT',
    description: 'High-intensity interval training for maximum calorie burn'
  },
  {
    id: 'yoga',
    label: 'Yoga',
    description: 'Connect mind and body through poses and breathing'
  },
  {
    id: 'weightlifting',
    label: 'Weightlifting',
    description: 'Heavy compound lifts to build strength and power'
  },
  {
    id: 'sprint',
    label: 'Sprint Training',
    description: 'Short, intense running intervals to build speed and power'
  },
  {
    id: 'norwegian4x4',
    label: 'Norwegian 4x4',
    description: 'Four 4-minute high-intensity intervals with 3-minute recovery periods'
  }
];