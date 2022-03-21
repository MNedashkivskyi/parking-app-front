import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, useWindowDimensions} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import OverscreenModal from '../components/OverscreenModal';
import LoadingScreenModal from '../components/LoadingScreenModal';

import * as loginActions from '../actions/login';

import Logo from '../../assets/PARCO.png';
import '../constants/global.js'

export default function SignInScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failureModalVisible, setFailureModalVisible] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const token = useSelector((state) => state.login.token);
    const loginResponse = useSelector((state) => state.login.loginResponseTimestamp);

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        setWaitingForResponse(false);
        console.log(token);
        if (loginResponse == null)
            return;
        if (token != null)
        {
            global.username = username;
            // global.token = token;
            global.user_id = token;
            navigation.navigate('HomeScreen');
        }
        else
            setFailureModalVisible(true);
    }, [loginResponse]);

    const onSignInPressed = () => {
        setWaitingForResponse(true);
        dispatch(loginActions.signIn(username, password));
        // navigation.navigate('HomeScreen');
    }

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    }

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    }

    return (
        <View style={styles.root}>
            <Image source={Logo} style={[styles.logo, {height: height * 0.05 }]} resizeMode='contain' />
            <CustomInput placeholder='Login' value={username} setValue={setUsername} />
            <CustomInput placeholder='Hasło' value={password} setValue={setPassword} secureTextEntry={true}/>
            <CustomButton text='Zaloguj' onPress={onSignInPressed} type='PRIMARY' />
            <SocialSignInButtons />
            <CustomButton text='Zapomniałeś hasła?' onPress={onForgotPasswordPressed} type='TERTIARY' />
            <CustomButton text="Nie masz konta? Zarejestruj się" onPress={onSignUpPress} type='TERTIARY' />
            
            <LoadingScreenModal amIVisible={waitingForResponse} />
            <OverscreenModal
                title={"Logowanie nie powiodło się"}
                message={"Serwer odrzucił próbę logowania. Sprawdź, czy wprowadzone hasło na pewno jest prawidłowe."}
                buttons={[
                    {
                        type: 'arrowleft',
                        color: '#9932CC',
                        onClick: () => setFailureModalVisible(false),
                    },
                    {
                        type: 'reload1',
                        color: '#9932CC',
                        onClick: () => {
                            setFailureModalVisible(false);
                            onSignInPressed();
                        },
                    },
                ]}
                amIVisible={failureModalVisible}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
        padding: 90
    },

    root: {
        alignItems: 'center',
        padding: 120
    },
    
});