import React from 'react';
import {View, ScrollView, Text, ImageBackground, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import backgroundImage from '../../assets/gradient.png';
import LastReservation from './HomeScreen/LastReservation';
import { useNavigation } from '@react-navigation/core';
import {AntDesign} from '@expo/vector-icons';


export default function MyAccountScreen() {

    const navigation = useNavigation();

    const onMyAccountPressed = () => {
        console.info('MyAccount Pressed');
    }

    const onBackButtonPressed = () => {
        navigation.navigate('HomeScreen');
    };

    function renderHeader() {
        return (
            <View style={{
                width: '100%',
                height: 200,
                alignItems: 'center',
            }}>
                <ImageBackground 
                source={backgroundImage}
                resizeMode='cover'
                style={StyleSheet.absoluteFillObject}
                />
                <TouchableOpacity onPress={onBackButtonPressed}>
                    <AntDesign style={{marginTop: 50, marginRight: 280, direction:'ltr'}} name='arrowleft' size={30} color='#fff' />
                </TouchableOpacity>
                <View style={{flex: 2}} />
                <Text style={styles.headerText}>Moje konto</Text>
                <View style={{flex: 1}} />
            </View>
        );
    }

    function readerMyAccount(){
        return (
            <LastReservation onPress={onMyAccountPressed} text={
                'Imię:  Człowiek \n\nNazwisko:  Człowiekowicz \n\nEmail:  czlowiek@gmail.com \n\nInfo o samochodach: \nDacia Logan 2003\nBMW X5  \n\nNumery rejestracyjne: WA651287\nWS327989'}/>
        )
    }


    return (
      <ScrollView>
          <View style={{flex: 1}}>
          <StatusBar translucent backgroundColor='transparent' />
                {renderHeader()}
                {readerMyAccount()}
          </View>
      </ScrollView>
    );
};


const styles = StyleSheet.create({
    headerText: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'mt-bold',
    },
});