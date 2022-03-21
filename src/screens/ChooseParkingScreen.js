import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import backgroundImage from '../../assets/purple-white.jpg'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import backgroundImage1 from '../../assets/gradient.png';
import { useDispatch, useSelector } from 'react-redux';
import * as parkingActions from '../actions/parking';
import {AntDesign} from '@expo/vector-icons';
import { isLoading } from 'expo-font';

import OverscreenModal from '../components/OverscreenModal';
import LoadingScreenModal from '../components/LoadingScreenModal';


const {width, height} = Dimensions.get('screen')

const SPACING = 20;
const AVATAR_SIZE = 80;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function ChooseParkingScreen() {
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const parkings = useSelector((state) => state.parkings);
    const [fetchFailureModal, showFetchFailureModal] = useState(false);

    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    
    const dispatch = useDispatch();

    async function fetchParking() {
        setWaitingForResponse(true);
        console.log('Fetching parkings');
        await dispatch(parkingActions.fetchParkingsList());
        console.log('Fetched parkings');
        setWaitingForResponse(false);
        if(parkings.parkings == null)
            showFetchFailureModal(true);
    };

    useEffect(() => {
        fetchParking();
    }, [dispatch]);

    const onButtonPressed = () => {
        navigation.navigate('ParkingSpaceBooking', {city: null});
    };

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
                source={backgroundImage1}
                resizeMode='cover'
                style={StyleSheet.absoluteFillObject}
                />
                <TouchableOpacity onPress={onBackButtonPressed}>
                    <AntDesign style={{marginTop: 50, marginRight: 295, direction:'ltr'}} name='arrowleft' size={30} color='#fff' />
                </TouchableOpacity>
                <View style={{flex: 2}} />
                <Text style={styles.headerText}>Wybierz parking</Text>
                <View style={{flex: 1}} />
            </View>
    
        );
    }

    if(waitingForResponse)
        return <View style={{backgroundColor: 'gray'}}>
            <LoadingScreenModal amIVisible={waitingForResponse} />
        </View>

    return (
        <View >
            <StatusBar translucent backgroundColor='transparent' />
            {renderHeader()}

            {/* <Image 
            source={BACKGROUND_IMAGE}
            style={StyleSheet.absoluteFillObject}
            blurRadius={100}
            /> */}

            <LoadingScreenModal amIVisible={waitingForResponse} />
            <Animated.FlatList
                data={parkings.parkings}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true}
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                renderItem={({item, index}) => {
                    const inputRange = [
                        -1, 
                        0, 
                        ITEM_SIZE * (index),
                        ITEM_SIZE * (index + 2)
                    ]

                    const opacityInputRange = [
                        -1, 
                        0, 
                        ITEM_SIZE * (index),
                        ITEM_SIZE * (index + 2)
                    ]

                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    const opacity = scrollY.interpolate({
                        inputRange: opacityInputRange,
                        outputRange: [1, 1, 1, 0]
                    })

                    const address = item.address.split(', ')

                    return <AnimatedTouchable
                    onPress={onButtonPressed}
                    style={{...styles.animatedTouchable, transform: [{scale}]}}>
                        <Image
                            resizeMode='cover'
                            source={{uri: item.image_url}}
                            style={{flex: 2, borderRadius: AVATAR_SIZE, aspectRatio: 1, marginRight: 15}} />
                        <View style={{flex: 5}}>
                            <Text style={{fontSize: 19, fontFamily: 'mt-bold'}}>{item.name}</Text>
                            <Text style={{fontSize: 17, fontFamily: 'mt-light', marginBottom: 5}}>{item.description}</Text>
                            <Text style={{fontSize: 17, opacity: .9, fontFamily: 'mt-light', marginBottom: 5}}>Wolnych miejsc: {item.free_places}</Text>
                            <Text style={{fontSize: 15, fontFamily: 'mt-bold', opacity: .8, color: '#9932CC'}}>{address[0]}</Text>
                            <Text style={{fontSize: 15, fontFamily: 'mt-bold', opacity: .8, color: '#9932CC'}}>{address[1]}</Text>
                        </View>
                    </AnimatedTouchable>
                }}  
            />
            <OverscreenModal
                title={"Wystąpił błąd!"}
                message={"Nie udało się załadować listy parkingów. Sprawdź połączenie internetowe.\nCzy chcesz ponowić próbę połączenia?"}
                buttons={[
                    {
                        type: 'arrowleft',
                        color: '#9932CC',
                        onClick: onBackButtonPressed,
                    },
                    {
                        type: 'reload1',
                        color: '#9932CC',
                        onClick: () => {
                            showFetchFailureModal(false);
                            fetchParking();
                        },
                    },
                ]}
                amIVisible={fetchFailureModal}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    headerText: {
        color: 'white',
        marginTop: -30,
        fontSize: 28,
        fontFamily: 'mt-bold',
    },
    title: {
        fontSize: 24,
        width: '90%',
        fontFamily: 'mt-bold',
        color: '#9932CC',
        margin: 70,
        marginBottom: 25
    },
    text: {
        color: 'white',
        fontSize: 26,
        fontFamily: 'mt-bold',
        marginLeft: 50,
        marginTop: 50,
        width: '180%'
    },
    animatedTouchable: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        marginBottom: SPACING,
        backgroundColor: 'rgba(255,255,255, 1)',
        borderRadius: 12,
        elevation: 25,
    }
});