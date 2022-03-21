import React, {useState} from 'react';
import {View, StyleSheet, Text, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../assets/PARCO.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/core';



export default function ConfirmEmailScreen() {

    const [code, setCode] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onConfirmPressed = () => {
        navigation.navigate('SignIn');
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    const onResendPress = () => {
        navigation.navigate('onResendPress');
    }

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>
                Confirm your Email
            </Text>
            <CustomInput placeholder='Enter your confirmation code' value={code} setValue={setCode} />
            
            <CustomButton text='Podtwierdź' onPress={onConfirmPressed} />
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
        padding: 120
    },

    title: {
        fontSize: 24,
        width: '150%',
        fontWeight: 'bold',
        color: '#9932CC',
        margin: 10,
        marginBottom: 25

    }
});