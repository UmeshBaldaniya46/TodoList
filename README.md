# Secure Todo List App (React Native + Expo)

This is a secure Todo List application built using Bare React Native along with Expo modules, particularly expo-local-authentication. It demonstrates secure task operations, robust architecture, and clean UI/UX design.

# Features

Biometric authentication using expo-local-authentication before adding, updating, or deleting todos.
CRUD operations for todo tasks.
Persistent state using redux-persist.
Clean and scalable state management using Redux Toolkit.
Unit testing with Jest and Testing Library.
Built with React Navigation for smooth screen transitions.
Code is well-structured, commented, and easy to follow.

# Project Structure
```bash
TODOLIST/
├── android/
├── ios/
├── screenshots/
├── src/
│   ├── components/          # Reusable components like dialogs and list items
│   ├── hooks/               # Custom hooks for todo state management
│   ├── redux/               # Redux setup: actions, reducers, selectors, store
│   ├── screens/             # App screens: Add, Update, and Todo List view
│   └── AppNavigator.js      # Stack navigation setup
├── App.js                   # Root app file with SafeAreaView and StatusBar
├── .eslintrc.js
├── .prettierrc.js
└── README.md                
```
# Getting Started

## Step 1: Clone the Repository

First, you will need to clone project

```bash
git clone https://github.com/UmeshBaldaniya46/TodoList.git
cd TodoList
```

## Step 2: Install Dependencies

```bash
# With npm
npm install

# OR with yarn
yarn install
```

## Step 3: Run the App

Make sure to start the Metro bundler:

```bash
# using npm
npx expo start
```
The app will launch in your simulator or device via QR code.

## Testing

Basic unit tests are written to cover the most critical logic.
To run tests:

```bash
npx jest
```

## Screenshots

Add screenshots inside the screenshots/ folder and reference them here.