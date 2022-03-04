import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Otp from './screens/OTP';
import Splash from './screens/Splash';
import SignupPackage from './screens/SignupPackage';
import ForgetPassword from './screens/ForgetPassword';

const AuthStack = createNativeStackNavigator();

const AuthRootStackScreen = () => {
  return (
    <AuthStack.Navigator
      headerTransparent={true}
      screenOptions={{gestureEnabled: true, headerShown: false}}
      initialRouteName="Splash">
      <AuthStack.Screen name="LogIn" component={LogIn} />

      <AuthStack.Screen name="SignUp" component={SignUp} />

      <AuthStack.Screen name="Otp" component={Otp} />

      <AuthStack.Screen name="Splash" component={Splash} />

      <AuthStack.Screen name="ForgetPassword" component={ForgetPassword} />

      <AuthStack.Screen name="SignupPackage" component={SignupPackage} />
    </AuthStack.Navigator>
  );
};

export default AuthRootStackScreen;
