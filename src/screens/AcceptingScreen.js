import React, {useState} from 'react';
import {View, StyleSheet, Text, useWindowDimensions, ScrollView} from 'react-native';
import {Tick} from 'react-crude-animated-tick';

export default function AcceptingScreen() {
    return (
        <View>
            <div>
                <Tick size={200} />
            </div>
        </View>
    );
};