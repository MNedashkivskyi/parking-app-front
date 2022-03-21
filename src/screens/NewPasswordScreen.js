import React, {useState} from 'react';
import {View, StyleSheet, Text, useWindowDimensions, ScrollView} from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/core';



export default function NewPasswordScreen() {

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();
    const navigation = useNavigation();

    const onSubmitPressed = () => {
        navigation.navigate('SignIn');
    }

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    }

    return (
        <ScrollView>
        <View style={styles.root}>
            <Text style={styles.title}>
                Reset your Password
            </Text>
            <CustomInput placeholder='Code' value={code} setValue={setCode} />
            <CustomInput placeholder='Enter your new password' value={password} setValue={setPassword} />
            
            <CustomButton text='Submit' onPress={onSubmitPressed} />
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
        width: '170%',
        fontWeight: 'bold',
        color: '#9932CC',
        margin: 10,
        marginBottom: 25

    }
});