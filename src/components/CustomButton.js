import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function CustomButton({onPress, text, type = 'PRIMARY', bgColor, fgColor}){

    return (
        <Pressable onPress={onPress} style={[
            styles.container, 
            styles[`container_${type}`],
            bgColor ? {backgroundColor : bgColor} : {} 
            ]}>
            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>{text}</Text>
        </Pressable>
    );

};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        width: '140%',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 5
    },

    container_PRIMARY: {
        backgroundColor: '#3B71F3',
    },

    container_FORM: {
        alignSelf: 'center',
        marginTop: 50,
        backgroundColor: '#9932CC',
        width: '80%'
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2
    },

    container_TERTIARY: {
        marginVertical: 10,
        width: '180%'
    },

    text: {
        fontFamily: 'mt-bold',
        color: 'white'
    },

    text_SECONDARY: {
        color: '#3B71F3'
    },

    text_TERTIARY: {
        color: 'gray'
    },
})