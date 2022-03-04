import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Otp from './OTP';
import Splash from './Splash';
import {PermissionsAndroid} from 'react-native';
// import ForgotPassword from './ForgotPassword'
// import ConfirmPassword from './ConfirmPassword'

const Stack = createNativeStackNavigator();

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Otp">
        <Stack.Screen name="LogIn" component={LogIn} />

        <Stack.Screen name="Home" component={Home} />

        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="Otp" component={Otp} />

        <Stack.Screen name="Splash" component={Splash} />

        {/* <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
