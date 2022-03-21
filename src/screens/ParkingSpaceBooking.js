import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, StatusBar, FlatList, Animated, Pressable, ImageBackground, Modal, TouchableWithoutFeedback } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as parkingActions from '../actions/parking';
import * as carsActions from '../actions/cars';

import backgroundImage from '../../assets/purple-white.jpg'
import { useNavigation } from '@react-navigation/core';
import backgroundImage1 from '../../assets/gradient.png';
import {AntDesign} from '@expo/vector-icons';
import OverscreenModal from '../components/OverscreenModal';
import LoadingScreenModal from '../components/LoadingScreenModal';

const {screenWidth, screenHeight} = Dimensions.get('screen')

const BACKGROUND_IMAGE = backgroundImage;
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

let colorMap = new Map([
  [0, 'green'],   // empty place
  [1, 'orange'],  // ready to claim
  [2, 'red'],     // place full
  [3, 'yellow'],  // chosen place
]); 

let carImgMap = new Map([
  ['green', ],
  ['orange', require('../../assets/orange_car.png')],
  ['red', require('../../assets/red_car.png')],
  ['yellow', require('../../assets/yellow_car.png')],
])

const manufacturer_pic = {
  'audi': 'https://www.lifepng.com/wp-content/uploads/2020/12/Audi-Logo-png-hd.png',
  'bmw': 'https://i2.wp.com/thinkmarketingmagazine.com/wp-content/uploads/2012/08/bmw-logo.png',
  'volkswagen': 'https://w7.pngwing.com/pngs/463/43/png-transparent-logo-car-volkswagen-phaeton-brand-car-emblem-trademark-logo-thumbnail.png',
  'ferrari': 'https://prod.cloud.rockstargames.com/crews/sc/2620/9252858/publish/emblem/emblem_512.png',
  }

export default function ParkingSpaceBooking({city=null}) {
  //const scrollY = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const parkingPlaces = useSelector((state) => state.places.places);
  const occupyOutcome = useSelector((state) => state.places.occupyOutcome);
  const occupyResponse = useSelector((state) => state.places.occupyResponseTimestamp);
  const [chosenPlace, setChosenPlace] = useState(null);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failureModalVisible, setFailureModalVisible] = useState(false);
  const [isCarModalVisible, setCarModalVisible] = useState(false);
  const [fetchFailureModal, showFetchFailureModal] = useState(false);
  const [chosenCar, setChosenCar] = useState(null);

  const cars = useSelector((state) => state.cars.cars);
  const [areCarsReady, makeCarsReady] = useState(false);

  const dispatch = useDispatch();

  const onBackButtonPressed = () => {
      navigation.navigate('ChooseParkingScreen');
  };

  async function fetchParking() {
    setWaitingForResponse(true);
    await dispatch(parkingActions.fetchParking(city));
    setWaitingForResponse(false);
    if(parkingPlaces == null)
        showFetchFailureModal(true);
  }

  async function fetchCars() {
    await dispatch(carsActions.fetchMyCars());
    console.log('Fetched cars');
    makeCarsReady(true);
  };

  useEffect(() => {
    fetchParking();
    fetchCars();
  }, [dispatch]);

  useEffect(() => {
    if (occupyOutcome == null)
      return;
    if(occupyOutcome)
    {
      setChosenPlace(null);
      console.log("Success!");
    }
    else
      console.log("Oops! Couldn't occupy this spot! Choose another one.");
  }, [occupyResponse]);

  const onCarTouch = car_registration => {
    if (chosenCar == car_registration)
      setChosenCar(null);
    else setChosenCar(car_registration);
  }

  function renderHeader() {
    return (
      <View style={{
        width: '100%',
        height: 150
      }}>
        <ImageBackground 
        source={backgroundImage1}
        resizeMode='cover'
        style={{
          flex: 1,
          alignItems: 'center'
        }} >

        <TouchableOpacity onPress={onBackButtonPressed}>
          <AntDesign style={{marginTop: 50, marginRight: 295, direction:'ltr'}} name='arrowleft' size={30} color='#fff' />
        </TouchableOpacity>

          <Text style={{marginTop: 25, marginRight: 3, color: 'white', fontSize: 22, fontFamily: 'mt-bold'}}>Wybierz miejsce</Text>
        </ImageBackground>
      </View>
    );
  }

  const choosePlace = (place) => {
    switch (place.status) {
      case 1:
        if(chosenPlace == null)
        {
          place.status = 3;
          setChosenPlace(place);
        } else {
          chosenPlace.status = 1;
          place.status = 3;
          setChosenPlace(place);
        }
        break;
      case 3:
        place.status = 1;
        setChosenPlace(null);
        break;
      case 0:
      case 2:
        break;
      default:
        console.log('Whoops! Unexpected place status!');
        console.log(place.status);
        break;
    }
  }

  async function claimPlace() {
    setWaitingForResponse(true);
    const outcome = await dispatch(parkingActions.occupyPlace(chosenPlace.id, chosenCar));
    setWaitingForResponse(false);
    if(outcome == true) {
      chosenPlace.status = 2;
      setChosenPlace(null);
      setSuccessModalVisible(true);
    } else {
      setChosenPlace(null);
      setFailureModalVisible(true);
    }
  }

  if(parkingPlaces == undefined)
    return <View style={{backgroundColor: 'gray'}}>
      <LoadingScreenModal amIVisible={waitingForResponse} />
    </View>
  return <View style={{flex: 1, alignItems: 'center', backgroundColor: '#fff'}}>
    <StatusBar translucent backgroundColor='transparent' />
      {renderHeader()}

    <FlatList
      style={{width: '100%'}}
      data={parkingPlaces}
      numColumns={3}
      keyExtractor={place => place.id.toString()}
      renderItem={({item}) => {
        return ( 
          <View style={{alignItems: 'center', flex: 1}}>
            <Pressable style={{alignItems: 'center', flex: 1}} onTouchEnd={() => choosePlace(item)} disabled={chosenPlace == null ? true : false}>
              <Image source={carImgMap.get(colorMap.get(item.status))} resizeMode='contain' style={{width: 120, height: 60}} />
              <Text style={{fontFamily: 'mt-bold'}}>{(item.level + 10).toString(36).toUpperCase()}-{item.id + 1} | id: {item.id}</Text>
            </Pressable>
          </View>
        );
      }}  
    />
    <ImageBackground 
      source={backgroundImage1}
      resizeMode='stretch'
      style={{
        alignItems: 'center',
        width: '100%',
    }}>
      <TouchableOpacity
        disabled={chosenPlace == null ? true : areCarsReady ? false : true}
        onPress={() => { setCarModalVisible(true) }}
        style={{...styles.roundButton, backgroundColor: chosenPlace == null ? '#c4a7cc' : '#9932CC'}}>
        <AntDesign name='check' size={30} color='#fff' />
      </TouchableOpacity>
    </ImageBackground>

    <Modal
      animationType="slide"
      transparent={true}
      visible={isCarModalVisible}
      onRequestClose={() => {
        setCarModalVisible(false);
        setChosenCar(null);
    }}>
      <View style={CarsModalStyles.modalMainView}>
        <TouchableWithoutFeedback onPress={() => setCarModalVisible(false)}>
          <View style={{flex: 1, width: '100%'}} />
        </TouchableWithoutFeedback>
        <View style={CarsModalStyles.modalView}>
          <Text style={CarsModalStyles.modalTitle}>Wybierz samochód</Text>
          <FlatList
            style={{width: '100%'}}
            data={cars}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={({item}) => {
            return <AnimatedTouchable style={{...CarsModalStyles.listElement, opacity: chosenCar == null || chosenCar == item.id ? 1 : .5}} onPress={() => onCarTouch(item.id)}>
              <Image style={CarsModalStyles.listImage} source={{ uri: manufacturer_pic[item.manufacturer.toLowerCase()] }} />
              <View style={{flex: 1}}>
                <Text style={{fontSize: 20, fontFamily: 'mt-bold', flex: 1, flexWrap: 'wrap'}}>{item.manufacturer} {item.model}</Text>
                <Text style={{fontSize: 17, fontFamily: 'mt-light'}}>{item.registration_number}</Text>
              </View>
            </AnimatedTouchable>
          }} />
          <ImageBackground 
            source={backgroundImage1}
            resizeMode='stretch'
            style={{
              alignItems: 'center',
              width: '100%',
          }}>
            <TouchableOpacity
                disabled={chosenCar == null}
                onPress={claimPlace}
                style={{...styles.roundButton, backgroundColor: chosenCar == null ? '#c4a7cc' : '#9932CC'}}
            >
              <AntDesign name='arrowright' size={30} color='#fff' />
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </View>
    </Modal>

    <LoadingScreenModal amIVisible={waitingForResponse} />
    <OverscreenModal
      title={"Gotowe!"}
      message={"Zarejestrowaliśmy Twój samochód w naszym systemie."}
      buttons={[
        {
          type: 'check',
          color: "#228c22",
          onClick: () => navigation.navigate('HomeScreen'),
        },
      ]}
      amIVisible={successModalVisible}
    />
    <OverscreenModal
      title={"Wystąpił błąd!"}
      message={"Nie udało się zarejestrować samochodu. Sprawdź, czy na pewno wybrałeś swój samochód."}
      buttons={[
      {
        type: 'arrowleft',
        color: '#9932CC',
        onClick: () => setFailureModalVisible(false),
      },
      {
        type: 'reload1',
        color: '#9932CC',
        onClick: () => {
            setFailureModalVisible(false);
            setWaitingForResponse(true);
            dispatch(parkingActions.fetchParking());
            setWaitingForResponse(false);
        },
      },
      ]}
      amIVisible={failureModalVisible}
    />
    <OverscreenModal
      title={"Wystąpił błąd!"}
      message={"Nie udało się załadować listy miejsc. Sprawdź połączenie internetowe. Czy chcesz ponowić próbę połączenia?"}
      buttons={[
      {
        type: 'arrowleft',
        color: '#9932CC',
        onClick: () => {
            showFetchFailureModal(false);
            onBackButtonPressed();
        },
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
};


const styles = StyleSheet.create({

  roundButton: {
      width: 50,
      height: 50,
      alignItems: 'center',
      padding: 10,
      margin: 30,
      borderRadius: 100,
      backgroundColor: '#9932CC',
  },
  title: {
      fontSize: 22,
      width: '80%',
      fontFamily: 'mt-bold',
      //color: '#da467d',
      color: '#9932CC',
  },
  modalTitle: {
      fontSize: 28,
      marginTop: 30,
      fontFamily: 'mt-bold',
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
      backgroundColor: "#228c22",
    },
  modalView: {
      marginTop: 200,
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
});

const CarsModalStyles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalView: {
    width: '95%',
    maxHeight: '80%',
    backgroundColor: '#a895ff',
    opacity: 0.95,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  modalTitle: {
      marginVertical: 20,
    marginRight: 3,
    color: 'white',
    fontSize: 26,
    fontFamily: 'mt-bold'
},
  listElement: {
    flexDirection: 'row',
    flex: 1,
    padding: 30,
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
    elevation: 10,
},
listImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
},
});