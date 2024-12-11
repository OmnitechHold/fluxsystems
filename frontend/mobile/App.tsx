import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { NetworkProvider } from 'react-native-offline';

// Screens
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import PolicyScreen from './screens/PolicyScreen';
import TillScreen from './screens/TillScreen';

// Database
import { initDatabase } from './utils/database';

const Stack = createStackNavigator();

// Initialize database on app start
initDatabase().catch(console.error);

const App = () => {
  return (
    <NetworkProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Dashboard" 
              component={DashboardScreen}
              options={{ title: 'Dashboard' }}
            />
            <Stack.Screen 
              name="Policy" 
              component={PolicyScreen}
              options={{ title: 'Policy Management' }}
            />
            <Stack.Screen 
              name="Till" 
              component={TillScreen}
              options={{ title: 'Till Management' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </NetworkProvider>
  );
};

export default App;
