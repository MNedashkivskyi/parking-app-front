import React from "react";
import {View, TextInput, StyleSheet} from 'react-native';

export default function CustomInput({value, setValue, placeholder, secureTextEntry}){
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}
                secureTextEntry={secureTextEntry}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '140%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input: {
        fontFamily: 'mt-light',
    }
})
