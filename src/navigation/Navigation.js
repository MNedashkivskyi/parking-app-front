import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DateTimeDepartureScreen from '../screens/DateTimeScreen/DateTimeDepartureScreen';
import DateTimeScreen from '../screens/DateTimeScreen/DateTimeScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

import MyAccountScreen from '../screens/MyAccountScreen';
import ChooseParkingScreen from '../screens/ChooseParkingScreen';
import ParkingSpaceBooking from '../screens/ParkingSpaceBooking';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import MyCarsScreen from '../screens/MyCarsScreen/MyCarsScreen';
import FormAddCarScreen from '../screens/MyCarsScreen/FormAddCarScreen';
import ParkingHistoryScreen from '../screens/ParkingHistoryScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='SignIn' component={SignInScreen} />
                <Stack.Screen name='SignUp' component={SignUpScreen} />
                <Stack.Screen name='ConfirmEmail' component={ConfirmEmailScreen} />
                <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
                <Stack.Screen name='NewPassword' component={NewPasswordScreen} />
                <Stack.Screen name='DateTimeScreen' component={DateTimeScreen} />
                <Stack.Screen name='DateTimeDepartureScreen' component={DateTimeDepartureScreen} />
                <Stack.Screen name='HomeScreen' component={HomeScreen} />
                <Stack.Screen name='MyAccountScreen' component={MyAccountScreen} />
                <Stack.Screen name='ChooseParkingScreen' component={ChooseParkingScreen} />
                <Stack.Screen name='ParkingSpaceBooking' component={ParkingSpaceBooking} />
                <Stack.Screen name='MyCarsScreen' component={MyCarsScreen} />
                <Stack.Screen name='FormAddCarScreen' component={FormAddCarScreen} />
                <Stack.Screen name='ParkingHistoryScreen' component={ParkingHistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
