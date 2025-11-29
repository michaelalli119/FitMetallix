# FitMetallix - AI-Powered Personalized Fitness App
## Complete Application Documentation

---

## Table of Contents
1. [App Overview](#app-overview)
2. [Tech Stack](#tech-stack)
3. [Application Architecture](#application-architecture)
4. [Features](#features)
5. [Screens & UI Components](#screens--ui-components)
6. [Backend & API](#backend--api)
7. [State Management](#state-management)
8. [Data Models](#data-models)
9. [Integration & Flow](#integration--flow)
10. [Development Setup](#development-setup)
11. [Testing](#testing)

---

## App Overview

### App Name
**FitMetallix** (Technical name: AI-Powered Personalized Fitness App)

### Purpose
FitMetallix is a cross-platform fitness tracking application that provides personalized workout recommendations based on user body type, mood, and fitness level. The app uses AI-powered body scanning to analyze user physiology and recommend tailored workout programs.

### Key Value Propositions
- AI-powered body type analysis using camera
- Personalized workout recommendations based on mood and body type
- Cross-platform support (iOS, Android, Web)
- Comprehensive progress tracking and achievements system
- Type-safe API communication between frontend and backend
- Offline-first architecture with local data persistence

### Target Platforms
- iOS (iPhone & iPad)
- Android
- Web

### Bundle Identifiers
- **iOS**: `app.rork.ai-powered-personalized-fitness-app`
- **Android**: `app.rork.ai-powered-personalized-fitness-app`

---

## Tech Stack

### Frontend Technologies

#### Core Framework
- **React Native** (v0.81.5) - Cross-platform mobile development framework
- **React** (v19.1.0) - UI library
- **React DOM** (v19.1.0) - Web rendering
- **Expo** (v54.0.25) - Development platform and build tools
- **Expo Router** (v6.0.15) - File-based routing system

#### Styling & UI
- **NativeWind** (v4.1.23) - Tailwind CSS for React Native
- **Lucide React Native** (v0.555.0) - Icon library
- **Expo Linear Gradient** (v15.0.7) - Gradient components
- **Expo Blur** (v15.0.7) - Blur effects

#### Navigation
- **Expo Router** - File-based navigation
- **React Navigation Native** (v7.1.6) - Navigation primitives

#### Device Features
- **Expo Camera** (v17.0.9) - Camera access for body scanning
- **Expo Image Picker** (v17.0.8) - Photo selection from gallery
- **Expo Location** (v19.0.7) - GPS and location services
- **Expo Haptics** (v15.0.7) - Haptic feedback
- **Expo Image** (v3.0.10) - Optimized image component

### Backend & API

#### API Framework
- **Hono** (v4.7.10) - Lightweight, fast web framework
- **tRPC** (v11.1.2) - End-to-end typesafe APIs
  - `@trpc/server` - Server-side tRPC
  - `@trpc/client` - Client-side tRPC
  - `@trpc/react-query` - React Query integration
  - `@hono/trpc-server` - Hono adapter for tRPC

#### Validation & Serialization
- **Zod** (v3.25.28) - Schema validation and type inference
- **Superjson** (v2.2.2) - JSON serialization with type preservation

### State Management & Data

#### State Management
- **Zustand** (v5.0.2) - Lightweight state management
- **TanStack Query** (v5.77.0) - Data fetching, caching, and synchronization

#### Storage
- **AsyncStorage** (v2.2.0) - Local persistent storage for React Native

### Development Tools

#### Language & Types
- **TypeScript** (v5.9.2) - Static type checking
- **@types/react** - React type definitions

#### Code Quality
- **ESLint** (v8.57.1) - Code linting
- **@react-native/eslint-config** - React Native ESLint rules

#### Testing
- **Jest** (v29.7.0) - Unit and API testing framework
- **@testing-library/react-native** (v13.3.3) - React Native testing utilities
- **@testing-library/jest-native** - Additional matchers for React Native
- **Maestro** - E2E testing framework
- **ts-jest** - TypeScript support for Jest

#### Build Tools
- **Babel** (v7.25.2) - JavaScript compiler
- **Metro** (bundled with React Native) - JavaScript bundler

---

## Application Architecture

### Architecture Pattern
FitMetallix follows a **client-server architecture** with:
- **Frontend**: React Native mobile/web app
- **Backend**: Embedded tRPC server running within the same codebase
- **Type Safety**: Shared TypeScript types between frontend and backend

### Directory Structure

```
FitMetallix/
├── app/                          # Expo Router screens (file-based routing)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── index.tsx            # Home screen
│   │   ├── workouts.tsx         # Workouts list
│   │   ├── progress.tsx         # Progress tracking
│   │   ├── profile.tsx          # User profile
│   │   └── _layout.tsx          # Tab layout configuration
│   ├── onboarding.tsx           # Onboarding flow
│   ├── login.tsx                # Login screen
│   ├── body-scan.tsx            # AI body scanning
│   ├── workout-details.tsx      # Workout details view
│   ├── quick-workout.tsx        # Quick workout selection
│   ├── favorites.tsx            # Favorite workouts
│   ├── achievements.tsx         # Achievements screen
│   ├── settings.tsx             # App settings
│   ├── edit-profile.tsx         # Profile editing
│   ├── voice-control.tsx        # Voice command feature
│   ├── health-news.tsx          # Health news feed
│   ├── notifications.tsx        # Notifications
│   ├── modal.tsx                # Modal screens
│   └── _layout.tsx              # Root layout
│
├── components/                   # Reusable UI components
│   ├── Button.tsx               # Custom button component
│   ├── WorkoutCard.tsx          # Workout display card
│   ├── Header.tsx               # Screen header
│   ├── MoodSelector.tsx         # Mood selection UI
│   ├── ProgressChart.tsx        # Progress visualization
│   ├── AchievementCard.tsx      # Achievement display
│   ├── BodyTypeCard.tsx         # Body type selector
│   ├── ExerciseItem.tsx         # Exercise list item
│   ├── HealthNewsCard.tsx       # Health news card
│   ├── SettingsItem.tsx         # Settings menu item
│   ├── SocialLoginButton.tsx    # Social login buttons
│   ├── AIWorkoutTips.tsx        # AI-generated tips
│   ├── SplashScreen.tsx         # Custom splash screen
│   └── __tests__/               # Component tests
│
├── backend/                      # Backend logic
│   ├── trpc/                    # tRPC setup
│   │   ├── app-router.ts        # Main tRPC router
│   │   ├── create-context.ts    # tRPC context
│   │   └── routes/              # API route handlers
│   │       ├── workouts/        # Workout-related routes
│   │       │   ├── get-workouts.ts
│   │       │   ├── get-workout-by-id.ts
│   │       │   ├── get-recommended-workouts.ts
│   │       │   └── get-favorite-workouts.ts
│   │       ├── user/            # User-related routes
│   │       │   ├── update-profile.ts
│   │       │   ├── update-progress.ts
│   │       │   ├── analyze-body-scan.ts
│   │       │   └── get-achievements.ts
│   │       └── __tests__/       # API tests
│   └── hono.ts                  # Hono server setup
│
├── store/                        # Zustand state stores
│   ├── userStore.ts             # User profile & settings
│   ├── workoutStore.ts          # Workout data & favorites
│   └── __tests__/               # Store tests
│
├── types/                        # TypeScript type definitions
│   ├── workout.ts               # Workout types
│   ├── user.ts                  # User types
│   ├── api.ts                   # API types
│   ├── navigation.ts            # Navigation types
│   └── env.d.ts                 # Environment types
│
├── constants/                    # App constants
│   ├── workouts.ts              # Workout data & types
│   ├── colors.ts                # Color theme
│   └── __tests__/               # Constant tests
│
├── lib/                          # Utility functions
│   └── trpc.ts                  # tRPC client configuration
│
├── hooks/                        # Custom React hooks
│   └── __tests__/               # Hook tests
│
├── assets/                       # Static assets
│   └── images/                  # App icons & images
│
├── .maestro/                     # E2E test flows
│   ├── login.yaml               # Login test
│   ├── onboarding.yaml          # Onboarding test
│   ├── workout_flow.yaml        # Workout selection test
│   └── profile_flow.yaml        # Profile editing test
│
├── package.json                  # Dependencies & scripts
├── app.json                      # Expo configuration
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Project documentation
```

### Design Patterns Used

1. **File-based Routing** (Expo Router)
   - Screens are organized as files in the `app/` directory
   - Automatic route generation based on file structure

2. **Atomic State Management** (Zustand)
   - Small, focused stores for different concerns
   - Persistent storage with AsyncStorage middleware

3. **Type-safe API Communication** (tRPC)
   - Full type safety from client to server
   - No code generation needed

4. **Component Composition**
   - Small, reusable components
   - Separation of concerns

5. **Repository Pattern**
   - Centralized data access through stores
   - Abstraction of data storage logic

---

## Features

### 1. User Onboarding

**Description**: Multi-step onboarding flow to collect user information and personalize the experience.

**Steps**:
1. **Personal Information**: Name, age, weight, height
2. **Fitness Goals**: Select multiple goals (Lose Weight, Build Muscle, Improve Flexibility, etc.)
3. **Fitness Level**: Beginner, Intermediate, or Advanced
4. **Body Type**: Ectomorph, Mesomorph, or Endomorph

**Technology**:
- Screen: `app/onboarding.tsx`
- State: `store/userStore.ts`
- API: `backend/trpc/routes/user/update-profile.ts`

**Flow**:
```
User enters app → Check isOnboarded state →
If false: Show onboarding → Collect data →
Save to local store → Send to API → Mark as onboarded →
Navigate to home
```

### 2. AI Body Scanning

**Description**: Uses device camera to capture user photo and analyze body type using simulated AI.

**Capabilities**:
- Camera access with front/back toggle
- Photo capture and preview
- Body type analysis (Ectomorph, Mesomorph, Endomorph)
- Confidence score display
- Personalized recommendations based on body type
- BMI calculation

**Technology**:
- Screen: `app/body-scan.tsx`
- Camera: `expo-camera`
- API: `backend/trpc/routes/user/analyze-body-scan.ts`

**Algorithm** (Simplified):
```typescript
BMI = weight / (height/100)²

if BMI < 18.5:
  bodyType = 'ectomorph'
else if BMI > 25:
  bodyType = 'endomorph'
else:
  bodyType = 'mesomorph'
```

**Features**:
- Permission handling
- Camera flip (front/back)
- Photo retake option
- Analysis with loading state
- Recommendation display
- Save to profile

### 3. Personalized Workout Recommendations

**Description**: Intelligent workout suggestions based on user body type, mood, and fitness level.

**Recommendation Factors**:
- **Body Type**: Filters workouts suitable for user's physiology
- **Current Mood**: Matches workout intensity to emotional state
- **Fitness Level**: Ensures appropriate difficulty
- **Randomization**: Provides variety in recommendations

**Technology**:
- API: `backend/trpc/routes/workouts/get-recommended-workouts.ts`
- Display: Home screen, Workouts screen

**Algorithm**:
```typescript
1. Filter workouts by body type (if set)
2. Filter by current mood (if set)
3. If no matches, use all workouts
4. Shuffle filtered workouts
5. Return top N workouts (default 3)
```

### 4. Mood-Based Workout Selection

**Description**: Select current mood to get workouts that match emotional state.

**Mood Types**:
- **Energized** 🔋: High-intensity workouts (HIIT, Strength, Weightlifting)
- **Tired** 😴: Low-intensity workouts (Recovery, Gentle Yoga)
- **Stressed** 🧠: Stress-relief workouts (Yoga, Recovery)
- **Focused** 🎯: Technique-focused workouts (Strength, Yoga)
- **Anxious** 🌬️: Calming workouts (Yoga, Recovery)

**Technology**:
- Component: `components/MoodSelector.tsx`
- State: `store/userStore.ts` (currentMood)

### 5. Workout Library

**Description**: Comprehensive library of 9 pre-built workouts with filtering and search.

**Workout Types**:
1. **Strength Training**: Full body muscle building
2. **Cardio**: Cardiovascular endurance
3. **Flexibility**: Range of motion and stretching
4. **Recovery**: Low-intensity muscle repair
5. **HIIT**: High-Intensity Interval Training
6. **Yoga**: Mind-body connection
7. **Weightlifting**: Heavy compound lifts
8. **Sprint Training**: Speed and power development
9. **Norwegian 4x4**: Specific interval protocol

**Workout Levels**:
- Beginner
- Intermediate
- Advanced

**Features**:
- Search by name/description
- Filter by workout type
- Filter by fitness level
- Real-time filtering
- Workout details view

**Technology**:
- Screen: `app/(tabs)/workouts.tsx`
- API: `backend/trpc/routes/workouts/get-workouts.ts`
- Data: `constants/workouts.ts` (9 workouts, 30+ exercises)

### 6. Workout Details & Exercises

**Description**: Detailed view of workout with exercise list, sets, reps, and timing.

**Workout Information**:
- Title and description
- Duration (minutes)
- Estimated calories burned
- Difficulty level
- Workout type
- Target body types
- Suitable moods

**Exercise Information**:
- Exercise name
- Description
- Image
- Duration/Sets/Reps
- Rest time between sets

**Example Workout Structure**:
```typescript
{
  id: '1',
  title: 'Full Body Strength',
  duration: 45, // minutes
  calories: 350,
  level: 'intermediate',
  type: 'strength',
  exercises: [
    {
      name: 'Push-ups',
      sets: 3,
      reps: 15,
      restTime: 45, // seconds
      duration: 60 // seconds per set
    },
    // ... more exercises
  ]
}
```

**Technology**:
- Screen: `app/workout-details.tsx`
- API: `backend/trpc/routes/workouts/get-workout-by-id.ts`

### 7. Progress Tracking

**Description**: Track workout completion, time spent, and streak maintenance.

**Tracked Metrics**:
- **Completed Workouts**: Total number of finished workouts
- **Total Minutes**: Cumulative workout time
- **Streak Days**: Consecutive days with workouts
- **Last Workout Date**: Most recent workout completion

**Visualizations**:
- Progress chart (7-day history)
- Stat cards with key metrics
- Achievement progress indicators

**Technology**:
- Screen: `app/(tabs)/progress.tsx`
- Component: `components/ProgressChart.tsx`
- State: `store/userStore.ts` (progress object)
- API: `backend/trpc/routes/user/update-progress.ts`

**Update Logic**:
```typescript
On workout completion:
1. Increment completedWorkouts
2. Add workout duration to totalWorkoutMinutes
3. Check if workout is today
4. If consecutive day, increment streakDays
5. Update lastWorkoutDate
6. Persist to storage
7. Sync to backend
```

### 8. Achievements System

**Description**: Gamification through unlockable achievements and badges.

**Achievement Types**:
- **First Workout** 🏆: Complete first workout
- **3-Day Streak** 📅: Work out 3 consecutive days
- **Calorie Burner** 🔥: Burn 1000+ total calories
- **Time Commitment** ⏰: Accumulate 5+ hours (300 minutes)
- **Consistency King** 📈: Complete 10+ workouts

**Features**:
- Locked/unlocked states
- Progress indicators
- Achievement descriptions
- Icon-based visual feedback

**Technology**:
- Screen: `app/achievements.tsx`
- API: `backend/trpc/routes/user/get-achievements.ts`
- Icons: Lucide React Native

### 9. Favorites System

**Description**: Save and quickly access favorite workouts.

**Features**:
- Toggle favorite status on any workout
- Dedicated favorites screen
- Persistent storage
- Quick access from home screen

**Technology**:
- Screen: `app/favorites.tsx`
- State: `store/workoutStore.ts` (favoriteWorkouts array)
- API: `backend/trpc/routes/workouts/get-favorite-workouts.ts`

### 10. User Profile Management

**Description**: View and edit user information and preferences.

**Editable Fields**:
- Profile photo
- Name
- Age
- Weight (kg or lbs)
- Height (cm or inches)
- Body type
- Fitness level
- Fitness goals

**Technology**:
- Screen: `app/(tabs)/profile.tsx`, `app/edit-profile.tsx`
- State: `store/userStore.ts`
- API: `backend/trpc/routes/user/update-profile.ts`

### 11. Settings & Preferences

**Description**: Customize app behavior and appearance.

**Settings Available**:
- **Dark Mode**: Toggle dark/light theme
- **Units**: Metric (kg, cm) or Imperial (lbs, inches)
- **Sound**: Enable/disable sound effects
- **Haptic Feedback**: Enable/disable vibrations
- **Notifications**: Enable/disable push notifications
- **Reminder Time**: Set daily workout reminder

**Technology**:
- Screen: `app/settings.tsx`
- State: `store/userStore.ts` (settings object)
- Persistence: AsyncStorage

### 12. Quick Workout

**Description**: Start a randomized workout session immediately.

**Features**:
- No browsing needed
- Instant workout start
- Random selection from suitable workouts
- Time-saving feature

**Technology**:
- Screen: `app/quick-workout.tsx`

### 13. Voice Control

**Description**: Voice command interface for hands-free workout control.

**Potential Commands**:
- "Start workout"
- "Next exercise"
- "Pause"
- "Show progress"

**Technology**:
- Screen: `app/voice-control.tsx`
- Microphone icon in UI

### 14. Health News

**Description**: Curated health and fitness news feed.

**Features**:
- Article cards
- External links to full articles
- Categorized content

**Technology**:
- Screen: `app/health-news.tsx`
- Component: `components/HealthNewsCard.tsx`

### 15. Notifications

**Description**: Workout reminders and motivational messages.

**Features**:
- Scheduled reminders
- Achievement notifications
- Streak maintenance alerts

**Technology**:
- Screen: `app/notifications.tsx`
- Service: Expo Notifications (to be implemented)

### 16. Social Login

**Description**: Authentication via social providers.

**Supported Providers**:
- Google
- Apple
- Facebook

**Technology**:
- Screen: `app/login.tsx`
- Component: `components/SocialLoginButton.tsx`

---

## Screens & UI Components

### Navigation Structure

```
Root Stack Navigator
├── Onboarding (if !isOnboarded)
├── Login (if !isAuthenticated)
└── Tab Navigator (Main App)
    ├── Home Tab
    ├── Workouts Tab
    ├── Progress Tab
    └── Profile Tab

Modal Stack
├── Body Scan
├── Workout Details
├── Quick Workout
├── Voice Control
├── Health News
├── Notifications
├── Achievements
├── Favorites
├── Settings
└── Edit Profile
```

### Screen Details

#### 1. Home Screen (`app/(tabs)/index.tsx`)

**Purpose**: Main dashboard with quick actions and recommendations

**Sections**:
- Header with greeting and profile picture
- Quick Actions (3 buttons)
  - Body Scan
  - Voice Control
  - Quick Workout
- Health News Card
- Mood Selector
- Mood-based Workouts (if mood selected)
- Recent Workouts
- Recommended Workouts (based on body type)

**State Dependencies**:
- `userStore`: profile, isOnboarded
- `workoutStore`: recentWorkouts

**API Calls**:
- `trpc.workouts.getRecommendedWorkouts.useQuery()`

#### 2. Workouts Screen (`app/(tabs)/workouts.tsx`)

**Purpose**: Browse and filter all available workouts

**Features**:
- Search bar
- Type filter chips (All, Strength, Cardio, Flexibility, Recovery)
- Level filter chips (All, Beginner, Intermediate, Advanced)
- Scrollable workout list

**State**:
- Local: searchQuery, selectedType, selectedLevel, filteredWorkouts
- Loading state from tRPC query

**API Calls**:
- `trpc.workouts.getWorkouts.useQuery()`

#### 3. Progress Screen (`app/(tabs)/progress.tsx`)

**Purpose**: Visualize workout progress and achievements

**Components**:
- Header
- Progress Chart (7-day visualization)
- Stats Cards (3 columns)
  - Completed Workouts
  - Total Minutes
  - Streak Days
- Achievements List (locked/unlocked)

**State Dependencies**:
- `userStore`: progress

#### 4. Profile Screen (`app/(tabs)/profile.tsx`)

**Purpose**: Display user information and app navigation

**Sections**:
- Profile header (photo, name)
- Stats summary
- Menu items
  - Edit Profile
  - Favorites
  - Achievements
  - Settings
  - Health News
  - Notifications
- Logout button

**State Dependencies**:
- `userStore`: profile, progress

#### 5. Onboarding Screen (`app/onboarding.tsx`)

**Purpose**: Collect user information on first launch

**Steps** (4 total):
1. Personal Info (name, age, weight, height)
2. Fitness Goals (multi-select)
3. Fitness Level (single select)
4. Body Type (single select with descriptions)

**Features**:
- Progress dots indicator
- Back/Next navigation
- Input validation
- Loading state on submission

**State**:
- Local form state
- Updates `userStore` on completion

**API Calls**:
- `trpc.user.updateProfile.useMutation()`

#### 6. Body Scan Screen (`app/body-scan.tsx`)

**Purpose**: Capture photo and analyze body type

**Flow**:
1. Request camera permission
2. Show camera view
3. Capture photo
4. Preview photo
5. Analyze photo (API call)
6. Show results with recommendations
7. Save to profile

**States**:
- No permission → Permission request
- Permission granted → Camera view
- Photo captured → Preview/Analyze
- Analyzed → Results display

**API Calls**:
- `trpc.user.analyzeBodyScan.useMutation()`

#### 7. Workout Details Screen (`app/workout-details.tsx`)

**Purpose**: Show detailed workout information and exercises

**Sections**:
- Workout header (image, title)
- Metadata (duration, calories, level)
- Description
- Exercise list (expandable items)
  - Exercise name & image
  - Sets, reps, duration
  - Rest time
- Start Workout button

**State**:
- Local: workout data
- Navigation params: workoutId

**API Calls**:
- `trpc.workouts.getWorkoutById.useQuery()`

#### 8. Settings Screen (`app/settings.tsx`)

**Purpose**: Configure app preferences

**Settings Groups**:
- **Appearance**
  - Dark Mode toggle
- **Measurements**
  - Units (Metric/Imperial)
- **Interaction**
  - Sound toggle
  - Haptic feedback toggle
- **Notifications**
  - Enable/disable
  - Reminder time picker

**State Dependencies**:
- `userStore`: settings

**Persistence**: Automatically saved to AsyncStorage via Zustand middleware

### Component Library

#### Core Components

**Button** (`components/Button.tsx`)
```typescript
Props:
- title: string
- onPress: () => void
- variant?: 'primary' | 'outline' | 'text'
- disabled?: boolean
- loading?: boolean
- style?: StyleProp<ViewStyle>
- testID?: string
```

**WorkoutCard** (`components/WorkoutCard.tsx`)
```typescript
Props:
- workout: Workout
- onPress?: () => void
- testID?: string

Features:
- Workout image
- Title & description
- Duration, calories, level badges
- Tap to navigate to details
```

**Header** (`components/Header.tsx`)
```typescript
Props:
- showGreeting?: boolean
- title?: string

Features:
- Displays user name with greeting
- Time-based greeting (Good morning/afternoon/evening)
- Profile picture
- Custom title support
```

**MoodSelector** (`components/MoodSelector.tsx`)
```typescript
Features:
- Horizontal scrollable mood chips
- Active mood highlighting
- Updates userStore on selection
- Icons for each mood type
```

**ProgressChart** (`components/ProgressChart.tsx`)
```typescript
Features:
- 7-day workout history
- Bar chart visualization
- Workout minutes per day
- Responsive to screen size
```

**AchievementCard** (`components/AchievementCard.tsx`)
```typescript
Props:
- achievement: Achievement
- unlocked: boolean

Features:
- Icon display
- Title & description
- Locked/unlocked styling
- Progress indication
```

**BodyTypeCard** (`components/BodyTypeCard.tsx`)
```typescript
Props:
- bodyType: BodyType
- isSelected: boolean
- onSelect: (type: string) => void

Features:
- Body type name & description
- Recommendations list
- Selection highlighting
```

---

## Backend & API

### tRPC Setup

**Server Configuration** (`backend/hono.ts`, `backend/trpc/create-context.ts`)

```typescript
// Context creation
export const createTRPCContext = async (opts: any) => {
  return {
    // Add user session, database connections, etc.
  };
};

// Router creation
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
```

**Router Organization** (`backend/trpc/app-router.ts`)

```typescript
export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  workouts: createTRPCRouter({
    getWorkouts,
    getWorkoutById,
    getRecommendedWorkouts,
    getFavoriteWorkouts,
  }),
  user: createTRPCRouter({
    updateProgress,
    updateProfile,
    analyzeBodyScan,
    getAchievements,
  }),
  health: createTRPCRouter({
    // Future health news endpoints
  }),
});

export type AppRouter = typeof appRouter;
```

### API Endpoints

#### Workout Routes

**1. Get Workouts** (`routes/workouts/get-workouts.ts`)
```typescript
Input:
  type?: WorkoutType
  level?: WorkoutLevel

Output:
  Workout[]

Logic:
  - Filter workouts by type if provided
  - Filter by level if provided
  - Return filtered array
```

**2. Get Workout By ID** (`routes/workouts/get-workout-by-id.ts`)
```typescript
Input:
  id: string

Output:
  Workout | null

Logic:
  - Find workout by ID
  - Return workout or null
```

**3. Get Recommended Workouts** (`routes/workouts/get-recommended-workouts.ts`)
```typescript
Input:
  bodyType?: BodyType
  mood?: MoodType
  limit?: number (default: 3)

Output:
  Workout[]

Logic:
  1. Filter by bodyType if provided
  2. Filter by mood if provided
  3. If no matches, use all workouts
  4. Shuffle array randomly
  5. Return top N results
```

**4. Get Favorite Workouts** (`routes/workouts/get-favorite-workouts.ts`)
```typescript
Input:
  workoutIds: string[]

Output:
  Workout[]

Logic:
  - Filter workouts by IDs in favoriteWorkouts array
  - Return matching workouts
```

#### User Routes

**1. Update Profile** (`routes/user/update-profile.ts`)
```typescript
Input:
  name?: string
  age?: number
  weight?: number
  height?: number
  bodyType?: BodyType
  fitnessLevel?: WorkoutLevel
  fitnessGoals?: string[]
  profileImage?: string

Output:
  { success: boolean, profile: UserProfile }

Logic:
  - Validate input with Zod
  - Update user profile (in real app: save to database)
  - Return updated profile
```

**2. Update Progress** (`routes/user/update-progress.ts`)
```typescript
Input:
  completedWorkouts?: number
  totalWorkoutMinutes?: number
  streakDays?: number
  lastWorkoutDate?: string

Output:
  { success: boolean, progress: WorkoutProgress }

Logic:
  - Validate input
  - Update progress metrics
  - Return updated progress
```

**3. Analyze Body Scan** (`routes/user/analyze-body-scan.ts`)
```typescript
Input:
  imageBase64?: string
  height?: number
  weight?: number
  age?: number
  gender?: 'male' | 'female' | 'other'

Output:
  {
    bodyType: BodyType,
    recommendations: string[],
    measurements: {
      bodyFatPercentage: number,
      muscleMass: number,
      metabolicRate: number
    }
  }

Logic:
  1. Calculate BMI from height/weight
  2. Determine body type:
     - BMI < 18.5 → Ectomorph
     - BMI > 25 → Endomorph
     - BMI 18.5-25 → Mesomorph
  3. Generate recommendations based on body type
  4. Simulate additional measurements
  5. Return analysis results
```

**4. Get Achievements** (`routes/user/get-achievements.ts`)
```typescript
Input:
  userId?: string

Output:
  Achievement[]

Logic:
  - Fetch user progress
  - Calculate which achievements are unlocked
  - Return achievement list with status
```

### Client Configuration (`lib/trpc.ts`)

```typescript
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
import superjson from 'superjson';
import type { AppRouter } from '@/backend/trpc/app-router';

export const trpc = createTRPCReact<AppRouter>();

export const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
      // Use your server URL in production
    }),
  ],
});
```

### Data Flow

```
Frontend Component
    ↓
trpc.workouts.getRecommendedWorkouts.useQuery()
    ↓
tRPC Client (React Query)
    ↓
HTTP Request → Hono Server
    ↓
tRPC Server Middleware
    ↓
Route Handler (get-recommended-workouts.ts)
    ↓
Business Logic & Data Access
    ↓
Response (Type-safe)
    ↓
tRPC Client Cache (React Query)
    ↓
Component Re-render with Data
```

---

## State Management

### Zustand Stores

#### User Store (`store/userStore.ts`)

**Purpose**: Manage user profile, progress, and settings

**State Shape**:
```typescript
interface UserState {
  // Profile data
  profile: {
    name: string;
    age: number | null;
    weight: number | null; // kg
    height: number | null; // cm
    bodyType: BodyType | null;
    fitnessLevel: WorkoutLevel;
    fitnessGoals: string[];
    currentMood: MoodType | null;
    profileImage: string | null;
  };

  // Progress tracking
  progress: {
    completedWorkouts: number;
    totalWorkoutMinutes: number;
    streakDays: number;
    lastWorkoutDate: string | null;
  };

  // App settings
  settings: {
    darkMode: boolean;
    units: 'metric' | 'imperial';
    soundEnabled: boolean;
    hapticEnabled: boolean;
    notificationsEnabled: boolean;
    reminderTime: string | null; // HH:MM format
  };

  // App state
  isOnboarded: boolean;
  isAuthenticated: boolean;

  // Actions
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateProgress: (progress: Partial<WorkoutProgress>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  setOnboarded: (value: boolean) => void;
  setAuthenticated: (value: boolean) => void;
  setCurrentMood: (mood: MoodType) => void;
  setBodyType: (bodyType: BodyType) => void;
  resetUser: () => void;
}
```

**Persistence**:
- Storage: AsyncStorage
- Key: `user-storage`
- Middleware: Zustand persist middleware

**Usage Example**:
```typescript
const { profile, updateProfile, setCurrentMood } = useUserStore();

// Update profile
updateProfile({ name: 'John Doe', age: 30 });

// Set mood
setCurrentMood('energized');
```

#### Workout Store (`store/workoutStore.ts`)

**Purpose**: Manage saved workouts, favorites, and recently viewed

**State Shape**:
```typescript
interface WorkoutState {
  savedWorkouts: SavedWorkout[]; // Workouts with savedAt timestamp
  recentWorkouts: string[]; // Workout IDs (max 10)
  favoriteWorkouts: string[]; // Workout IDs
  currentWorkout: string | null; // Active workout ID

  // Actions
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (workoutId: string) => void;
  addToRecent: (workoutId: string) => void;
  toggleFavorite: (workoutId: string) => void;
  setCurrentWorkout: (workoutId: string | null) => void;
  getSavedWorkout: (workoutId: string) => SavedWorkout | undefined;
}
```

**Persistence**:
- Storage: AsyncStorage
- Key: `workout-storage`
- Middleware: Zustand persist middleware

**Usage Example**:
```typescript
const { favoriteWorkouts, toggleFavorite, addToRecent } = useWorkoutStore();

// Toggle favorite
toggleFavorite('workout-1');

// Add to recent history
addToRecent('workout-2');
```

### React Query Integration

**Provider Setup** (`app/_layout.tsx`)

```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@/lib/trpc';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {/* App content */}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
```

**Query Hooks**:
```typescript
// Automatic caching, refetching, and state management
const { data, isLoading, error } = trpc.workouts.getWorkouts.useQuery({
  type: 'strength',
  level: 'beginner'
});

// Mutations with optimistic updates
const mutation = trpc.user.updateProfile.useMutation({
  onSuccess: (data) => {
    // Handle success
  },
  onError: (error) => {
    // Handle error
  }
});
```

---

## Data Models

### Workout Types

```typescript
// Workout difficulty levels
type WorkoutLevel = 'beginner' | 'intermediate' | 'advanced';

// Workout categories
type WorkoutType =
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'recovery'
  | 'hiit'
  | 'yoga'
  | 'weightlifting'
  | 'sprint'
  | 'norwegian4x4';

// User mood states
type MoodType =
  | 'energized'
  | 'tired'
  | 'stressed'
  | 'focused'
  | 'anxious';

// Body type classifications
type BodyType =
  | 'ectomorph'   // Lean, difficulty gaining weight
  | 'mesomorph'   // Athletic, balanced
  | 'endomorph';  // Higher body fat, easier to gain weight

// Individual exercise
interface Exercise {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  duration: number;       // seconds
  sets?: number;
  reps?: number;
  restTime?: number;      // seconds
}

// Complete workout
interface Workout {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  level: WorkoutLevel;
  type: WorkoutType;
  duration: number;       // minutes
  calories: number;       // estimated burn
  exercises: Exercise[];
  moodTypes: MoodType[];  // Suitable moods
  bodyTypes: BodyType[];  // Suitable body types
}
```

### User Types

```typescript
interface UserProfile {
  name: string;
  age: number | null;
  weight: number | null;        // kg (or converted to lbs)
  height: number | null;        // cm (or converted to inches)
  bodyType: BodyType | null;
  fitnessLevel: WorkoutLevel;
  fitnessGoals: string[];       // Array of goal strings
  currentMood: MoodType | null;
  profileImage: string | null;  // URI or base64
}

interface WorkoutProgress {
  completedWorkouts: number;
  totalWorkoutMinutes: number;
  streakDays: number;
  lastWorkoutDate: string | null; // ISO date string
}

interface UserSettings {
  darkMode: boolean;
  units: 'metric' | 'imperial';
  soundEnabled: boolean;
  hapticEnabled: boolean;
  notificationsEnabled: boolean;
  reminderTime: string | null;    // HH:MM format
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;            // ISO date string
}
```

### API Types

```typescript
// Body scan analysis result
interface BodyScanResult {
  bodyType: BodyType;
  recommendations: string[];
  measurements: {
    bodyFatPercentage: number;
    muscleMass: number;
    metabolicRate: number;
  };
}

// Saved workout (extends Workout)
interface SavedWorkout extends Workout {
  savedAt: string;                // ISO date string
  isFavorite: boolean;
}
```

---

## Integration & Flow

### App Initialization Flow

```
1. App Launch
   ↓
2. Load Zustand Stores from AsyncStorage
   ↓
3. Check Authentication Status
   ↓
   ├─ Not Authenticated → Login Screen
   └─ Authenticated
      ↓
4. Check Onboarding Status
   ↓
   ├─ Not Onboarded → Onboarding Flow
   └─ Onboarded → Main App (Tab Navigator)
```

### Onboarding Flow

```
1. Onboarding Screen (Step 1/4)
   - Collect: name, age, weight, height
   ↓
2. Onboarding Screen (Step 2/4)
   - Select fitness goals (multi-select)
   ↓
3. Onboarding Screen (Step 3/4)
   - Select fitness level (single select)
   ↓
4. Onboarding Screen (Step 4/4)
   - Select body type with recommendations
   ↓
5. Submit Profile
   - Update local store (userStore)
   - Call API: trpc.user.updateProfile
   - Set isOnboarded = true
   ↓
6. Navigate to Home Screen
```

### Workout Selection & Viewing Flow

```
1. Home Screen or Workouts Screen
   ↓
2. Browse/Search Workouts
   - Filter by type/level
   - Search by name
   ↓
3. Tap Workout Card
   ↓
4. Workout Details Screen
   - Load workout by ID
   - Display exercises
   - Add to recent (workoutStore.addToRecent)
   ↓
5. User Actions:
   ├─ Toggle Favorite (workoutStore.toggleFavorite)
   ├─ Start Workout → Navigate to workout player
   └─ Back to list
```

### Body Scan Flow

```
1. Tap "Body Scan" from Home
   ↓
2. Body Scan Screen
   ↓
3. Request Camera Permission
   ↓
   ├─ Denied → Show permission explanation
   └─ Granted
      ↓
4. Show Camera View
   ↓
5. Capture Photo
   ↓
6. Preview Photo
   ↓
7. User Confirms → Analyze
   ↓
8. Call API: trpc.user.analyzeBodyScan
   - Input: image, height, weight, age, gender
   ↓
9. Display Results
   - Body type determination
   - Confidence score
   - Personalized recommendations
   ↓
10. Save to Profile (optional)
    - Update userStore.profile.bodyType
    ↓
11. Navigate back to Home
    - Recommended workouts update automatically
```

### Progress Update Flow

```
1. User Completes Workout
   ↓
2. Calculate Updates:
   - completedWorkouts += 1
   - totalWorkoutMinutes += workout.duration
   - Check streak logic
   ↓
3. Update Local State
   - userStore.updateProgress()
   ↓
4. Persist to AsyncStorage (automatic via Zustand)
   ↓
5. Sync to Backend
   - Call: trpc.user.updateProgress
   ↓
6. Check Achievements
   - Calculate newly unlocked achievements
   - Show celebration if new achievement
   ↓
7. Update UI
   - Progress screen refreshes
   - Achievement badges update
```

### Settings Update Flow

```
1. User Opens Settings
   ↓
2. Display Current Settings
   - Load from userStore.settings
   ↓
3. User Changes Setting (e.g., Dark Mode)
   ↓
4. Update Local State
   - userStore.updateSettings({ darkMode: true })
   ↓
5. Persist to AsyncStorage (automatic)
   ↓
6. Apply Setting Immediately
   - Theme changes take effect
   - No page reload needed
   ↓
7. (Optional) Sync to Backend
   - In full app: save preferences to server
```

### Data Synchronization Strategy

**Local-First Approach**:
1. All user data stored locally in AsyncStorage
2. UI updates immediately from local state
3. Background sync to API when online
4. Graceful degradation when offline

**Cache Strategy**:
- Workouts: Cache indefinitely (static data)
- User profile: Cache with stale-while-revalidate
- Progress: Optimistic updates with background sync
- Recommendations: Cache for 5 minutes, then refetch

**Offline Handling**:
```typescript
trpc.user.updateProfile.useMutation({
  onSuccess: () => {
    // Sync successful
  },
  onError: (error) => {
    // Still update local state
    // Queue for retry when online
    console.log('Will retry when online');
  }
});
```

---

## Development Setup

### Prerequisites

- **Node.js**: 18.0.0 or later
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **iOS Simulator** (macOS only): Xcode
- **Android Studio**: For Android emulator
- **Maestro CLI** (E2E testing):
  ```bash
  curl -Ls "https://get.maestro.mobile.dev" | bash
  ```

### Installation

```bash
# Clone repository
git clone <repository-url>
cd FitMetallix

# Install dependencies
npm install --legacy-peer-deps
```

**Note**: `--legacy-peer-deps` is required due to dependency version conflicts. This doesn't affect functionality.

### Development Commands

```bash
# Start Expo development server with tunnel
npm start

# Start web development server
npm run start-web

# Start web with debugging info
npm run start-web-dev

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run unit and API tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate test coverage report
npm run test:coverage

# Run all tests (Jest + Maestro E2E)
npm run test:all
```

### Running on Devices

**iOS**:
```bash
# Start server
npm start

# Press 'i' in terminal
# OR scan QR code with Camera app
```

**Android**:
```bash
# Start server
npm start

# Press 'a' in terminal
# OR scan QR code with Expo Go app
```

**Web**:
```bash
# Start web server
npm run start-web

# Press 'w' in terminal
# OR navigate to http://localhost:8081
```

### Environment Configuration

**app.json** (Expo configuration):
```json
{
  "expo": {
    "name": "AI-Powered Personalized Fitness App",
    "slug": "ai-powered-personalized-fitness-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "app.rork.ai-powered-personalized-fitness-app"
    },
    "android": {
      "package": "app.rork.ai-powered-personalized-fitness-app"
    }
  }
}
```

**tsconfig.json** (TypeScript configuration):
- Strict mode enabled
- Path aliases: `@/*` → project root
- ES2020 target
- Module resolution: Node

---

## Testing

### Testing Strategy

FitMetallix employs **three levels of testing**:

1. **Unit Tests** (Jest): Component and utility testing
2. **API Tests** (Jest): Backend route testing
3. **E2E Tests** (Maestro): Full user flow testing

### Unit Tests

**Location**: `components/__tests__/`, `hooks/__tests__/`, `store/__tests__/`

**Framework**: Jest + React Native Testing Library

**Example: Button Component Test** (`components/__tests__/Button.test.tsx`):
```typescript
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

test('renders button with title', () => {
  const { getByText } = render(
    <Button title="Click Me" onPress={() => {}} />
  );
  expect(getByText('Click Me')).toBeTruthy();
});

test('calls onPress when clicked', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <Button title="Click Me" onPress={onPress} />
  );
  fireEvent.press(getByText('Click Me'));
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

**Example: Store Test** (`store/__tests__/userStore.test.ts`):
```typescript
import { useUserStore } from '../userStore';

test('updates user profile', () => {
  const { updateProfile, profile } = useUserStore.getState();

  updateProfile({ name: 'John Doe', age: 30 });

  expect(useUserStore.getState().profile.name).toBe('John Doe');
  expect(useUserStore.getState().profile.age).toBe(30);
});
```

### API Tests

**Location**: `backend/trpc/routes/__tests__/`

**Framework**: Jest

**Example: Workout Routes Test** (`backend/trpc/routes/__tests__/workout-routes.test.ts`):
```typescript
import getRecommendedWorkouts from '../workouts/get-recommended-workouts';

test('returns workouts filtered by body type', async () => {
  const result = await getRecommendedWorkouts({
    input: { bodyType: 'mesomorph', limit: 3 }
  });

  expect(result).toHaveLength(3);
  result.forEach(workout => {
    expect(workout.bodyTypes).toContain('mesomorph');
  });
});
```

### E2E Tests (Maestro)

**Location**: `.maestro/`

**Framework**: Maestro

**Test Flows**:

**1. Login Flow** (`.maestro/login.yaml`):
```yaml
appId: app.rork.ai-powered-personalized-fitness-app
---
- launchApp
- tapOn: "Login with Google"
- assertVisible: "Welcome back"
```

**2. Onboarding Flow** (`.maestro/onboarding.yaml`):
```yaml
appId: app.rork.ai-powered-personalized-fitness-app
---
- launchApp
- assertVisible: "Tell us about yourself"
- inputText: "John Doe"
- tapOn: "Next"
- tapOn: "Build Muscle"
- tapOn: "Next"
- tapOn: "Intermediate"
- tapOn: "Next"
- tapOn: "Mesomorph"
- tapOn: "Finish"
- assertVisible: "Quick Actions"
```

**3. Workout Flow** (`.maestro/workout_flow.yaml`):
```yaml
appId: app.rork.ai-powered-personalized-fitness-app
---
- launchApp
- tapOn: "Workouts"
- assertVisible: "Search workouts"
- tapOn: "Full Body Strength"
- assertVisible: "45 min"
- assertVisible: "350 cal"
- tapOn: "Start Workout"
```

**4. Profile Flow** (`.maestro/profile_flow.yaml`):
```yaml
appId: app.rork.ai-powered-personalized-fitness-app
---
- launchApp
- tapOn: "Profile"
- tapOn: "Edit Profile"
- clearText
- inputText: "Jane Smith"
- tapOn: "Save"
- assertVisible: "Jane Smith"
```

### Running Tests

```bash
# Unit & API tests
npm test

# Tests with coverage
npm run test:coverage

# E2E tests (requires running app)
maestro test .maestro

# Run all tests
npm run test:all
```

### Test Coverage Goals

- **Unit Tests**: >80% coverage for components and utilities
- **API Tests**: 100% coverage for all tRPC routes
- **E2E Tests**: Cover all critical user paths

---

## Building from Scratch: Key Takeaways

If you're building a similar app from this documentation, here are the **critical implementation steps**:

### 1. Foundation Setup
- Set up React Native with Expo
- Configure TypeScript
- Install core dependencies (tRPC, Zustand, React Query)
- Set up file-based routing with Expo Router

### 2. Type System
- Define all data models in `types/` directory
- Create shared types between frontend and backend
- Use Zod schemas for runtime validation

### 3. State Management
- Create Zustand stores with AsyncStorage persistence
- Define clear store boundaries (user vs. workout data)
- Implement optimistic updates

### 4. Backend Setup
- Set up Hono server
- Configure tRPC with Zod input validation
- Organize routes by domain (workouts, user, etc.)
- Implement recommendation algorithm

### 5. Frontend Screens
- Build screens following the navigation structure
- Use shared components for consistency
- Implement proper loading and error states
- Add accessibility testIDs for E2E testing

### 6. Key Features
- **Onboarding**: Multi-step form with validation
- **Body Scan**: Camera integration with analysis
- **Recommendations**: Algorithm based on user attributes
- **Progress**: Local tracking with visualization
- **Achievements**: Gamification with unlock conditions

### 7. Polish & Testing
- Add comprehensive unit tests
- Implement E2E test flows with Maestro
- Test offline functionality
- Optimize performance (image loading, list virtualization)

---

## Conclusion

FitMetallix is a modern, type-safe fitness application that demonstrates best practices in:
- Cross-platform mobile development
- Type-safe API communication
- State management with persistence
- AI-powered personalization
- Comprehensive testing strategies

This documentation provides everything needed to understand the app's architecture and rebuild it from scratch with the same technology stack.
