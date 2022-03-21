import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, useWindowDimensions, ScrollView} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import Logo from '../../assets/PARCO.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialSignInButtons from '../components/SocialSignInButtons';
import OverscreenModal from '../components/OverscreenModal';
import LoadingScreenModal from '../components/LoadingScreenModal';
import * as loginActions from '../actions/login';

import '../constants/global.js';


export default function SignUpScreen() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [failureModalVisible, setFailureModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const registerResponse = useSelector((state) => state.login.registerResponseTimestamp);
    const registerOutcome = useSelector((state) => state.login.registerOutcome);

    const {height} = useWindowDimensions();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        setWaitingForResponse(false);
        if (registerResponse == null)
            return;
        if (registerOutcome == true)
            setSuccessModalVisible(true);
        else
            setFailureModalVisible(true);
    }, [registerResponse]);

    const onRegisterPressed = () => {
        setWaitingForResponse(true);
        dispatch(loginActions.register(username, password, email));
        // navigation.navigate('ConfirmEmail');
    }

    const onSignInPressed = () => {
        navigation.navigate('SignIn');
    }

    const onTermsOfUsePressed = () => {
        navigation.navigate('onTermsOfUsePressed');
    }

    const onPrivacyPolicyPressed = () => {
        navigation.navigate('onPrivacyPolicyPressed');
    }

    return (
        <ScrollView>
            <View style={styles.root}>
                <Text style={styles.title}>Utwórz konto</Text>
                <CustomInput placeholder='Login' value={username} setValue={setUsername} />
                <CustomInput placeholder='Email' value={email} setValue={setEmail} />
                <CustomInput placeholder='Hasło' value={password} setValue={setPassword} secureTextEntry={true}/>
                <CustomInput placeholder='Powtórz hasło' value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry={true}/>
                <CustomButton text='Zarejestruj' onPress={onRegisterPressed} />
                <Text style={styles.text}>By registering, you confirm that you accept our{' '}<Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text>{' '}and{' '}<Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text></Text>
                <SocialSignInButtons />
                <CustomButton text="Masz już konto? Zaloguj się" onPress={onSignInPressed} type='TERTIARY' />
            </View>
            <LoadingScreenModal amIVisible={waitingForResponse} />
            <OverscreenModal
                title={"Rejestracja nie powiodła się"}
                message={"Serwer odrzucił próbę rejestracji."}
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
                            onRegisterPressed();
                        },
                    },
                ]}
                amIVisible={failureModalVisible}
            />
            <OverscreenModal
                title={"Rejestracja przebiegła pomyślnie!"}
                message={"Jesteś zarejestrowany w naszym serwisie. Kliknij poniższy przycisk, aby przejść do strony logowania."}
                buttons={[
                    {
                        type: 'check',
                        color: '#228c22',
                        onClick: () => {
                            setSuccessModalVisible(false);
                            navigation.navigate('SignIn');
                        },
                    },
                ]}
                
                amIVisible={successModalVisible}
            />
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    text: {
        color: 'gray',
        fontFamily: 'mt-bold',
        marginVertical: 15,
        width: '180%',
        textAlign: 'center',
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
        width: '165%',
        fontFamily: 'mt-bold',
        color: '#9932CC',
        margin: 10,
        marginBottom: 25,
        textAlign: 'center',

    }
});