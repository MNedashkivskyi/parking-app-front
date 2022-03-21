import React, { useState } from 'react';
import {View, ScrollView, Text, ImageBackground, StatusBar, StyleSheet} from 'react-native';
import backgroundImage from '../../../assets/gradient.png';
import LastReservation from './LastReservation';
import { useNavigation } from '@react-navigation/core';

import '../../constants/global.js';

export default function HomeScreen() {
    const navigation = useNavigation();

    const redirect = (destination) => {
        navigation.navigate(destination);
    }

    function renderHeader() {
        return (
            <View style={{
                width: '100%',
                height: 200,
                marginBottom: 20,
            }}>

                <ImageBackground 
                source={backgroundImage}
                resizeMode='cover'
                style={{
                    flex: 1,
                    alignItems: 'center'
                }} >
                    <View style={{flex: 2}}/>
                    <Text style={styles.text}>Hello, Człowiek. id:{global.user_id}</Text>
                    <View style={{flex: 1}}/>

                </ImageBackground>

            </View>
        );
    }

    function renderScrollViewButton(text, icon, onPress)
    {
        return <LastReservation text={text} icon={icon} onPress={onPress} />
    }

    return (
        <View style={{justifyContent: 'center', width: '100%'}}>
            <View style={{height: '100%'}}>
                <ScrollView contentContainerStyle={styles.list}>
                    <View>
                        <StatusBar translucent backgroundColor='transparent' />
                        {renderHeader()}
                        <LastReservation text={'Zajmij miejsce'} icon={'pluscircleo'} onPress={() => redirect('ChooseParkingScreen')} />
                        <LastReservation text={'Moje samochody'} icon={'car'} onPress={() => redirect('MyCarsScreen')} />
                        <LastReservation text={'Historia parkowań'} icon={'bars'} onPress={() => redirect('ParkingHistoryScreen')} />
                        <LastReservation text={'Moje konto'} icon={'user'} onPress={() => redirect('MyAccountScreen')} />
                        <LastReservation text={'Wyloguj'} icon={'logout'} onPress={() => redirect('SignIn')} />
                    </View>
                </ScrollView>
            </View>
        </View>
      
    );
};


const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 32,
        fontFamily: 'mt-bold',
    },
    list: {
        flexGrow: 1,
    },
});