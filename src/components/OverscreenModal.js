import React from "react";
import {View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

export default function OverscreenModal({title, message, amIVisible, onClose,
    buttons = [
        {
        type:'check',
        color:'#9932CC',
        onClick:console.log("No function assigned to button"),
        },
    ] }) { return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={amIVisible}
            onRequestClose={() => onClose}
        >
            <View 
                style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)'}}
                blurRadius={100}
            />
            <View style={{flex: 1}}/>
            <View style={styles.modalView}>
                <Text style={styles.modalTitle}>{title}</Text>
                <Text style={styles.modalText}>{message}</Text>
                <View style={{flexDirection: 'row'}}>
                    {
                    buttons.map(button => (
                        <View key={button.type} style={{flex: 1, alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={button.onClick}
                                style={{...styles.modalButton, backgroundColor: button.color}}
                            >
                                <AntDesign name={button.type} size={30} color='#fff' />
                            </TouchableOpacity>
                        </View>
                    ))
                    }
                </View>
            </View>
            <View style={{flex: 1}}/>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalTitle: {
        fontSize: 28,
        marginTop: 30,
        fontFamily: 'mt-bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'mt-light',
    },
    modalButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 100,
      },
    modalView: {
        margin: 40,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
})
