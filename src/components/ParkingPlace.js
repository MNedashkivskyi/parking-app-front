import React, { Component, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import Place from '../models/place';

let colorMap = new Map<Number>([
    [0, 'green'],
    [1, 'orange'],
    [2, 'red'],
    [3, 'yellow'],
]);

export default function ParkingPlace({place, onClick}) {
    function onClick()  {
        if (place.status == 1)
        {
            place.status = 3;
            onClick(place);
        }
        else return;
    }
    
    return (
        <View style={{...styles.parkingPlace, backgroundColor: colorMap.get(place.status)}} onTouchEnd={() => onClick()}>
          <Text>ID: {place.id}</Text>
          <Text>status: {place.status}</Text>
          <Text>level: {place.level}</Text>
        </View>
    )
};

/*
<Image
            source={require('../assets/parking-sign.png')}
            style={styles.parkingSignImage}
            resizeMode="cover"/>
*/

const styles = StyleSheet.create({
    parkingPlace: {
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
      },
    parkingSignImage: {
        width: 30,
        height: 30,
        },
});