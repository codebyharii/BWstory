# BWStory - React Native Test Assignment

This is the source code for the **React Native Developer Test Assignment** by Blackcoffer. It implements the "Discover" and "Profile" screens from the BWStory application using React Native and Expo.

## Project Structure

The project was created using `npx create-expo-app` and follows this folder structure:

```text
reactnative/
├── App.js                      # Main entry point, sets up navigation and loads fonts
├── src/
│   ├── components/
│   │   └── NewsCard.js         # Reusable card component for the Discover feed
│   ├── screens/
│   │   ├── DiscoverScreen.js   # Implementation of the Feed / Discover Screen
│   │   └── ProfileScreen.js    # Implementation of the Profile Screen
│   └── theme/
│       └── theme.js            # Design system (colors, typography, spacing)
└── README.md                   # This documentation file
```

## Setup & Installation Instructions

To run this project locally, ensure you have Node.js installed on your machine.

1. **Navigate to the project directory:**
   ```bash
   cd reactnative
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```

4. **View the App:**
   - **Android:** Press `a` in the terminal to open in an Android Emulator, or scan the QR code with the **Expo Go** app on your physical Android device.
   - **iOS:** Press `i` in the terminal to open in an iOS Simulator, or scan the QR code with the Camera app on your iPhone.

## Building the APK

To generate an `.apk` file for Android:

1. Install the EAS CLI globally:
   ```bash
   npm install -g eas-cli
   ```
2. Log in to your Expo account:
   ```bash
   eas login
   ```
3. Run the Android build command:
   ```bash
   eas build -p android --profile preview
   ```
   *This will queue a build on Expo's servers. Once completed, it will provide a link to download the APK.*

## Ideas to Improve It Further

If given more time and resources, here are a few ideas to enhance this application:

1. **Backend Integration (Firebase/Supabase):**
   - Connect the app to a live database (like Firebase Firestore or Supabase) to dynamically fetch the feed and user profile data instead of using dummy data.
   - Implement real Authentication (Email/Password or OAuth) so users can log in and view their personal feed.
2. **Video Playback:**
   - Integrate `expo-video` or `react-native-video` to autoplay videos in the feed natively as the user scrolls, implementing viewable items logic to pause/play videos automatically.
3. **State Management:**
   - Integrate Redux Toolkit, Zustand, or Context API to manage the global state (e.g., user session, theme preferences, cached posts).
4. **Animations & Micro-interactions:**
   - Add fluid animations for liking a post (e.g., a heart popping up), page transitions, and skeleton loaders while data is fetching.
5. **Dark Mode Support:**
   - Since the UI heavily relies on Navy and White backgrounds, implementing a system-wide toggle for Dark/Light mode would enhance the UX significantly.

## What I Do In Projects (My Workflow)

1. **Analysis & Planning:** I review the provided UI/UX designs (like Figma or screenshots) and establish a global **Design System** (colors, typography, spacing) right away.
2. **Initialization:** I bootstrap the project using reliable tools (Expo for React Native) to ensure smooth cross-platform compatibility and rapid development.
3. **Component Architecture:** I break down the UI into reusable components (like `NewsCard`) to keep the code DRY and maintainable.
4. **Execution:** I build the screens progressively, hooking up dummy data first to perfect the layout, then moving to API integrations.
5. **Testing & Build:** I constantly test on physical devices or emulators using Expo Go. Finally, I use EAS to generate production-ready IPAs and APKs.
