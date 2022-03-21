import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core';
import {AntDesign} from '@expo/vector-icons';
import backgroundImage from '../../assets/gradient.png';
import { HISTORY_LIST } from './HISTORY_LIST';

const {width, height} = Dimensions.get('screen')

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default function ParkingHistoryScreen() {
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const onBackButtonPressed = () => {
        navigation.navigate('HomeScreen');
    }

    function renderHeader() {
        return (
            <View style={{
                width: '100%',
                height: 150
                 }}>
    
                <ImageBackground 
                source={backgroundImage}
                resizeMode='cover'
                style={{
                    flex: 1,
                    alignItems: 'center'
                }} >

                    <TouchableOpacity onPress={onBackButtonPressed}>
                    <AntDesign style={{marginTop: 45, marginRight: 290, direction:'ltr'}} name='arrowleft' size={30} color='#fff' />
                    </TouchableOpacity>
                    <Text style={{marginTop: 25, color: 'white', fontSize: 26, fontFamily: 'mt-bold'}}> Historia parkowań </Text>
    
                </ImageBackground>
    
            </View>
        );
    }

    return (
      <View >
          <StatusBar translucent backgroundColor='transparent' />
            {renderHeader()}

          <Animated.FlatList
                data={HISTORY_LIST}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true}
                )}
                keyExtractor={item => item.key}
                contentContainerStyle={{
                    padding: SPACING,
                    paddingTop: StatusBar.currentHeight || 42
                }}
                renderItem={({item, index}) => {
                    const inputRange = [
                        -1, 
                        0, 
                        ITEM_SIZE * index,
                        ITEM_SIZE * (index + 2)
                    ]

                    const opacityInputRange = [
                        -1, 
                        0, 
                        ITEM_SIZE * index,
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

                    return <AnimatedTouchable style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255, 1)', borderRadius: 12, 
                         elevation: 25, opacity, transform: [{scale}]}}>
                        <View style={{marginTop: 10}}>
                            <Text style={{fontSize: 21, fontFamily: 'mt-light'}}>{item.title}</Text>
                            <Text style={{fontSize: 21, fontFamily: 'mt-light'}}>Samochód: {item.car}</Text>
                            <Text style={{fontSize: 18, opacity: .9, fontFamily: 'mt-light'}}>Data: {item.date}</Text>
                            <Text style={{fontSize: 17, fontFamily: 'mt-bold', opacity: .8, color: '#9932CC'}}>Cena: {item.amount}</Text>
                        </View>
                    </AnimatedTouchable>
                }}  
           />
      </View>



    );
};


const styles = StyleSheet.create({

    title: {
        fontSize: 24,
        width: '90%',
        fontFamily: 'mt-bold',
        //color: '#da467d',
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
    }
});