import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default function LastReservation({text, onPress='', icon}) {

    return (
        <TouchableOpacity onPress={onPress}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 15,
                marginHorizontal: 15,
                paddingVertical: 30,
                paddingHorizontal: 30,
                backgroundColor: 'white',
                borderRadius: 8,
                ...styles.shadow
            }}
        >

        <AntDesign name={icon} size={30} color='black'/>

        <View style={{flex: 1, marginLeft: 20}}>
            <Text style={{color:'black', fontSize: 19, fontFamily:'mt-bold'}}>{text}</Text>
        </View>

        </TouchableOpacity>
    );

};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8
}});