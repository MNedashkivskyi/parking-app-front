import React, { useState } from "react";
import {View, Text} from 'react-native';
import CustomButton from "./CustomButton";
import * as Google from 'expo-google-app-auth';
import { useNavigation } from "@react-navigation/core";


export default function SocialSignInButtons() {

    const navigation = useNavigation();

    const [googleSubmitting, setGoogleSubmitting] = useState(false);

    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    }

    const handleGoogleSignIn = () => {
        setGoogleSubmitting(true);
        const config = {
            iosClientId: '231972046751-amiv5o7fc2s0autel4o8f4g42v9lg33m.apps.googleusercontent.com',
            androidClientId: '231972046751-9o8civunle7cdrv6rr201ktepvodecan.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        };

        Google.logInAsync(config)
        .then((result) => {
            const {accessToken, type, user} = result;
            if(type == 'success') {
                const {email, name, photoUrl} = user;
                console.warn('Google SignIn successful');
                console.log(user);
                console.log(accessToken);
                setTimeout(() => navigation.navigate('HomeScreen', {email, name, photoUrl}), 1000);
            } else {
                console.warn('Google SignIn was cancelled');
            }
            setGoogleSubmitting(false);
        })
        .catch(error => {
            console.warn('An error occured. Check your network and try again!');
            setGoogleSubmitting(false);
        })
    };

    return (
        <CustomButton 
            text='Zaloguj przez Google'
            onPress={handleGoogleSignIn}
            bgColor='#FAE9EA'
            fgColor='#DD4D44'
        />
    );

};