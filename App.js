import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Dashboard from './screens/Dashboard/Dashboard';
import { StatusBar } from 'react-native';
import DiseasePrediction from './screens/Dashboard/DiseasePrediction';
const Stack = createStackNavigator();

const App = () => {
  return (
<NavigationContainer>
<StatusBar
        backgroundColor="black"
        barStyle="light-content"
      />
<Stack.Navigator>
<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
        <Stack.Screen
            name="DiseasePrediction"
            component={DiseasePrediction}
            options={{
              headerStyle: {
                backgroundColor: '#F57D11', 
              },
              headerTintColor: '#fff', 
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          />

</Stack.Navigator>
</NavigationContainer>

);
};

export default App;