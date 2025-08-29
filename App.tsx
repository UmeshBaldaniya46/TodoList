import {registerRootComponent} from 'expo';
import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import AppNavigator from './src/AppNavigator';
import Colors from './src/constants/colors';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };

  return (
    <SafeAreaView style={[{flex: 1}, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={Colors.blue}
      />
      <AppNavigator />
    </SafeAreaView>
  );
}

export default registerRootComponent(App);
