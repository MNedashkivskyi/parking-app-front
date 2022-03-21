import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function DateTimeButtons({onPressDate, onPressTime, timeButtonText, dateButtonText}) {

    return (
        <View>
        <TouchableOpacity onPress={onPressDate}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 40,
                marginHorizontal: 80,
                marginVertical: 15,
                paddingVertical: 15,
                paddingHorizontal: 10,
                backgroundColor:'#9932CC',
                borderRadius: 8,
                ...styles.shadow
            }}
        >

        <View style={{flex: 1, alignItems:'center'}}>
            <Text style={{color:'white', fontSize: 19, fontFamily:'mt-bold'}}>{dateButtonText}</Text>
        </View>

        </TouchableOpacity>

        <TouchableOpacity onPress={onPressTime}
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            marginHorizontal: 80,
            marginVertical: 15,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor:'#9932CC',
            borderRadius: 8,
            ...styles.shadow
        }}
        >

        <View style={{flex: 1, alignItems:'center'}}>
        <Text style={{color:'white', fontSize: 19, fontFamily:'mt-bold'}}>{timeButtonText}</Text>
        </View>

        </TouchableOpacity>
        </View>
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