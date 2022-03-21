import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Navigation from './src/navigation/Navigation.js';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import placesReducer from './src/reducers/places';
import loginReducer from './src/reducers/login';
import carsReducer from './src/reducers/cars';

const rootReducer = combineReducers({
  parkings: placesReducer,
  places: placesReducer,
  login: loginReducer,
  cars: carsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => Font.loadAsync({
  'mt-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  'mt-light': require('./assets/fonts/Montserrat-Light.ttf')
});

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(fontLoaded){
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.root}>
          <Navigation />
        </SafeAreaView>
      </Provider>
    );
  } else {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() =>
          setFontLoaded(true)}
        onError={(error) =>
          console.warn(error)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  root: {
    flex: 1,
    backgroundColor: '#F9FBFC'
  }
});
