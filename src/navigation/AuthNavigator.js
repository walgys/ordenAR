import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInWelcomeScreen from '../screens/authScreens/SignInWelcomeScreen';
import SignInScreen from '../screens/authScreens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import ClientNavigator from './ClientNavigator';
import SignUpScreen from '../screens/authScreens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignInWelcomeScreen" component={SignInWelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} options={{headerShown: false}} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}
