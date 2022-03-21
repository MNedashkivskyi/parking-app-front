import React, {useState} from 'react';
import {View, StyleSheet, Text, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../assets/PARCO.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/core';



export default function ForgotPasswordScreen() {

    const [username, setUsername] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSendPressed = () => {
        navigation.navigate('NewPassword');
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    const onResendPress = () => {
        console.warn('Resend code');
    }

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>
                Reset your Password
            </Text>
            <CustomInput placeholder='Username' value={username} setValue={setUsername} />
            
            <CustomButton text='Send' onPress={onSendPressed} />
            <CustomButton text='Resend code' onPress={onResendPress} type='SECONDARY' />
            <CustomButton text='Back to sign in' onPress={onSignInPress} type='TERTIARY' />
        </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    text: {
        color: 'gray',
        marginVertical: 10,
        width: '170%'
    },

    link: {
        color: '#FDB075'
    },

    root: {
        alignItems: 'center',
        padding: 120,
        marginTop: 5
    },

    title: {
        fontSize: 24,
        width: '190%',
        fontFamily: 'mt-bold',
        color: '#9932CC',
        margin: 10,
        marginBottom: 25

    }
});