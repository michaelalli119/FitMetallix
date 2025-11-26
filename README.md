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
- **Jest** - Unit and API testing
- **Maestro** - E2E testing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (18.0.0 or later)
- **npm** or **yarn**
- **Expo CLI**: `npm install -g @expo/cli`
- **iOS Simulator** (for iOS development on macOS)
- **Android Studio** (for Android development)
- **Maestro CLI** (for E2E testing): `curl -Ls "https://get.maestro.mobile.dev" | bash`

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

## 🧪 Testing Guide

We employ a comprehensive testing strategy covering Unit, API, and End-to-End (E2E) tests.

### Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Runs Unit and API tests using Jest. |
| `npm run test:coverage` | Runs Jest tests and generates a code coverage report. |
| `maestro test .maestro` | Runs E2E tests using Maestro (requires running simulator). |
| `npm run test:all` | **Recommended**: Runs Jest tests (with coverage) followed by Maestro E2E tests. |

### 1. Unit & API Tests (Jest)

Located in `__tests__`, `components/__tests__`, `hooks/__tests__`, and `backend/trpc/routes/__tests__`.

-   **Unit Tests**: Verify individual components and hooks.
    -   Example: `components/__tests__/Button.test.tsx`
-   **API Tests**: Verify tRPC backend routes and logic.
    -   Example: `backend/trpc/routes/__tests__/workout-routes.test.ts`

**How to add a new Unit Test:**
1.  Create a `__tests__` folder next to your component/hook.
2.  Create a file named `YourComponent.test.tsx`.
3.  Use `@testing-library/react-native` to render and assert.

### 2. End-to-End Tests (Maestro)

Located in the `.maestro/` directory. These tests simulate real user interactions on a running app.

-   **Flows**:
    -   `login.yaml`: Login process.
    -   `onboarding.yaml`: User onboarding journey.
    -   `workout_flow.yaml`: Selecting and starting a workout.
    -   `profile_flow.yaml`: Profile editing and logout.

**How to add a new E2E Flow:**
1.  Create a `.yaml` file in `.maestro/`.
2.  Define steps using Maestro syntax (e.g., `tapOn`, `assertVisible`).
3.  Run `maestro test .maestro/your_flow.yaml` to verify.

**Note**: Ensure accessibility IDs (`testID`) are added to UI elements to make them testable.

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
├── backend/                # Backend logic and routes
├── store/                  # Zustand state stores
├── constants/              # App constants and mock data
├── .maestro/               # Maestro E2E test flows
├── .expo/                  # Expo configuration (auto-generated)
├── package.json            # Dependencies and scripts
├── app.json                # Expo app configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo development server with tunnel |
| `npm run start-web` | Start web development server with tunnel |
| `npm run start-web-dev` | Start web development server with debug info |
| `npm run lint` | Run ESLint code linting |
| `npm run lint:fix` | Run ESLint and automatically fix issues |
| `npm test` | Run Jest tests |
| `npm run test:coverage` | Run Jest tests with coverage |
| `npm run test:all` | Run all tests (Jest + Maestro) |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.