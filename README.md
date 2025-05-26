# FitMetallix

A modern fitness tracking application built with React Native and Expo, featuring a robust backend powered by Hono and tRPC.

## 🚀 Features

- **Cross-Platform**: Runs on iOS, Android, and Web
- **Type-Safe API**: Full-stack type safety with tRPC
- **Modern UI**: Built with NativeWind (Tailwind CSS for React Native)
- **Camera Integration**: Photo capture and image picker functionality
- **Location Services**: GPS and location tracking capabilities
- **Offline Support**: AsyncStorage for local data persistence
- **Haptic Feedback**: Enhanced user experience with tactile feedback
- **Icon Library**: Comprehensive icon set with Lucide React Native

## 🛠️ Tech Stack

### Frontend
- **React Native** (0.79.1) - Cross-platform mobile development
- **Expo** (53.0.4) - Development platform and build tools
- **TypeScript** - Type-safe JavaScript
- **NativeWind** - Tailwind CSS for React Native
- **Expo Router** - File-based routing for React Native

### Backend & API
- **Hono** - Lightweight web framework
- **tRPC** - End-to-end typesafe APIs
- **Zod** - Schema validation
- **Superjson** - JSON serialization

### State Management
- **Zustand** - Lightweight state management
- **TanStack Query** - Data fetching and caching

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking
- **Expo Dev Tools** - Development and debugging

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (18.0.0 or later)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **iOS Simulator** (for iOS development on macOS)
- **Android Studio** (for Android development)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd FitMetallix
```

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: We use `--legacy-peer-deps` due to some dependency conflicts. This is a known issue and doesn't affect functionality.

### 3. Start the Development Server

```bash
# Start Expo development server with tunnel
npm start

# Start web development server
npm run start-web

# Start web development server with debug info
npm run start-web-dev
```

### 4. Run on Device/Simulator

- **iOS**: Press `i` in the terminal or scan the QR code with your iOS device
- **Android**: Press `a` in the terminal or scan the QR code with the Expo Go app
- **Web**: Press `w` in the terminal or navigate to the displayed localhost URL

## 📱 Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| iOS | ✅ Supported | Requires iOS 13.0+ |
| Android | ✅ Supported | Requires Android 6.0+ (API 23) |
| Web | ✅ Supported | Modern browsers |

## 🏗️ Project Structure

```
FitMetallix/
├── app/                    # Expo Router pages and layouts
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and configurations
├── assets/                 # Images, fonts, and other static assets
├── types/                  # TypeScript type definitions
├── server/                 # Backend API (Hono + tRPC)
├── .expo/                  # Expo configuration (auto-generated)
├── package.json            # Dependencies and scripts
├── app.json               # Expo app configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server with tunnel |
| `npm run start-web` | Start web development server with tunnel |
| `npm run start-web-dev` | Start web development server with debug info |
| `npm run lint` | Run ESLint code linting |
| `npm run lint:fix` | Run ESLint and automatically fix issues |

## 🌐 Environment Setup

### Development

1. Copy environment variables:
```bash
cp .env.example .env.local
```

2. Update the environment variables in `.env.local`:
```env
EXPO_PUBLIC_API_URL=http://localhost:3000
EXPO_PUBLIC_APP_ENV=development
```

### Production

Set up your production environment variables in your hosting platform or CI/CD pipeline.

## 📦 Key Dependencies

### Core Libraries
- `expo` - Expo development platform
- `react` & `react-native` - Core React Native framework
- `expo-router` - File-based routing
- `typescript` - Static type checking

### UI & Styling
- `nativewind` - Tailwind CSS for React Native
- `expo-linear-gradient` - Gradient components
- `expo-blur` - Blur effects
- `lucide-react-native` - Icon library

### API & State Management
- `@trpc/client`, `@trpc/react-query`, `@trpc/server` - Type-safe API
- `@tanstack/react-query` - Data fetching and caching
- `zustand` - State management
- `hono` - Backend framework

### Device Features
- `expo-camera` - Camera functionality
- `expo-image-picker` - Image selection
- `expo-location` - GPS and location services
- `expo-haptics` - Haptic feedback
- `@react-native-async-storage/async-storage` - Local storage

## 🔧 Development Tips

### Hot Reloading
The app supports hot reloading. Save any file to see changes instantly on your device/simulator.

### Debugging
- Use Expo Dev Tools for debugging
- Enable remote debugging for advanced debugging features
- Use Flipper for React Native debugging (Android/iOS)

### Type Safety
This project uses TypeScript and tRPC for full-stack type safety. Make sure to:
- Define proper types for your data
- Use the tRPC client for API calls
- Leverage Zod schemas for validation

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

## 🚀 Deployment

### Build for Production

```bash
# Build for all platforms
expo build

# Build for specific platform
expo build:ios
expo build:android
expo build:web
```

### Deploy to App Stores

1. **iOS App Store**: Use Expo Application Services (EAS) or build locally with Xcode
2. **Google Play Store**: Use EAS Build or build locally with Android Studio
3. **Web**: Deploy the web build to any static hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Follow the ESLint configuration
- Use TypeScript for type safety
- Follow React Native best practices
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Expo Documentation](https://docs.expo.dev/)
2. Check the [React Native Documentation](https://reactnative.dev/docs/getting-started)
3. Open an issue in this repository
4. Contact the development team

## 🎯 Roadmap

- [ ] User authentication and profiles
- [ ] Workout tracking and analytics
- [ ] Social features and community
- [ ] Nutrition tracking
- [ ] Wearable device integration
- [ ] Offline mode improvements
- [ ] Performance optimizations

---

Built with ❤️ using Expo and React Native