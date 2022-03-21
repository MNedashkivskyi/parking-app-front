import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, Modal, ScrollView, StatusBar, ImageBackground, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import backgroundImage from '../../../assets/gradient.png';
import LastReservation from '../HomeScreen/LastReservation';
import { useNavigation } from '@react-navigation/core';
import FormAddCarScreen from './FormAddCarScreen';
import { useDispatch, useSelector } from 'react-redux';
import * as manufacturers from '../../../assets/manufacturers';

import * as carsActions from '../../actions/cars';
import OverscreenModal from '../../components/OverscreenModal';
import LoadingScreenModal from '../../components/LoadingScreenModal';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const manufacturer_pic = {
  'audi': 'https://www.lifepng.com/wp-content/uploads/2020/12/Audi-Logo-png-hd.png',
  'bmw': 'https://i2.wp.com/thinkmarketingmagazine.com/wp-content/uploads/2012/08/bmw-logo.png',
  'volkswagen': 'https://w7.pngwing.com/pngs/463/43/png-transparent-logo-car-volkswagen-phaeton-brand-car-emblem-trademark-logo-thumbnail.png',
  'ferrari': 'https://prod.cloud.rockstargames.com/crews/sc/2620/9252858/publish/emblem/emblem_512.png',
}

export default function MyCarsScreen() {

    //const scrollY = React.useRef(new Animated.Value(0)).current;
    const [modalWindow, setModalWindow] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [fetchFailureModal, showFetchFailureModal] = useState(false);
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const navigation = useNavigation();
    const cars = useSelector((state) => state.cars.cars);
    const carsResponse = useSelector((state) => state.cars.carsResponseTimestamp);

    var progress_green = {};
    var progress_black = {};

    const dispatch = useDispatch();

    async function fetchCars() {
        setWaitingForResponse(true);
        console.log('Fetching cars');
        await dispatch(carsActions.fetchMyCars());
        console.log(`Fetched cars. carsResponse: ${carsResponse}`);
        setWaitingForResponse(false);
    };

    useEffect(() => {
        fetchCars();
    }, [dispatch]);

    useEffect(() => {
      if(cars != undefined && cars == null) // for some reason without checking undefined
          showFetchFailureModal(true);      // it triggers every time user opens this screen
    }, [carsResponse])                      // for the first time

    const onBackButtonPressed = () => {
        navigation.navigate('HomeScreen');
    };

    const onBackModalButtonPressed = () => {
        setModalWindow(false);
        fetchCars();
    };

    function carBatteryLoadingBar(car) {
        if(car.battery_status !== null && waitingForResponse === false)
          return <View style={{flexDirection: 'row', justifyContent: 'flex-start', borderRadius: 15, overflow: 'hidden', marginVertical: 10, backgroundColor: 'grey'}}>
            <Animated.View style={{height: 30, flex: progress_green[car.id], backgroundColor: 'lime', borderRadius: 15}} />
            <Animated.View style={{height: 30, flex: progress_black[car.id], translucent: true}} />
          </View>
    }

    function renderHeader() {
        return (
            <View style={{
                width: '100%',
                height: 200
            }}>

                <ImageBackground 
                source={backgroundImage}
                resizeMode='cover'
                style={{
                    flex: 1,
                    alignItems: 'center'
                }} >

                    <TouchableOpacity onPress={onBackButtonPressed}>
                    <AntDesign style={{marginTop: 65, marginRight: 290, direction:'ltr'}} name='arrowleft' size={30} color='#fff' />
                    </TouchableOpacity>

                    <Text style={styles.text}>Moje samochody</Text>

                </ImageBackground>

            </View>
        );
    }

    function renderModalHeader() {
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

                    <TouchableOpacity onPress={onBackModalButtonPressed}>
                    <AntDesign style={{marginTop: 35, marginRight: 300, direction:'ltr'}} name='arrowleft' size={30} color='#fff' />
                    </TouchableOpacity>
                    <Text style={styles.text}>Dodaj samochód</Text>

                </ImageBackground>

            </View>
        );
    }

    return (
    <View style={{flex: 1}}>
        <LoadingScreenModal amIVisible={waitingForResponse} />
        <StatusBar translucent={true} backgroundColor='transparent' />
        {renderHeader()}
        
      <Modal visible={modalWindow} animationType='slide'>
        <View>
              <View style={{flex: 1, paddingBottom: 260}}>
              <StatusBar translucent backgroundColor='transparent' />
                      {renderModalHeader()}
             </View>
            <FormAddCarScreen/>
        </View>
      </Modal>
      {/* <StatusBar translucent backgroundColor='transparent' /> */}
      <Animated.FlatList
        style={{paddingVertical: 20, flex: 1}}
        data={cars}
        renderItem={({item}) => {
        // console.log(item);
        if(item.battery_status != null) {
            progress_green[item.id] = new Animated.Value(0);
            progress_black[item.id] = new Animated.Value(100);

            // Will change follOutAnim value to 100 in 3 seconds
            Animated.timing(progress_green[item.id], {
            toValue: item.battery_status,
            duration: 1500,
            useNativeDriver: false,
            }).start();
            Animated.timing(progress_black[item.id], {
            toValue: 100 - item.battery_status,
            duration: 1500,
            useNativeDriver: false,
            }).start();
        }
        return <AnimatedTouchable style={styles.listElement}>
            <Image style={styles.listImage} source={{ uri: manufacturer_pic[item.manufacturer.toLowerCase()] }} />
            <View style={{flex: 1}}>
              <Text style={{fontSize: 20, fontFamily: 'mt-bold', flex: 1, flexWrap: 'wrap'}}>{item.manufacturer} {item.model}</Text>
              <Text style={{fontSize: 17, opacity: .9, fontFamily: 'mt-light'}}>{item.registration_number}</Text>
              <Text style={{fontSize: 17, opacity: .9, fontFamily: 'mt-light'}}>Stan: {item.battery_status != null ? 'ładowanie' : 'nieznany'}</Text>
              {carBatteryLoadingBar(item)}
            </View>
          </AnimatedTouchable>
      }} />
        
        <ImageBackground 
            source={backgroundImage}
            resizeMode='cover'
            style={{
                width: '100%',
            }}
        >
            <LastReservation onPress={() => setModalWindow(true)} icon={'pluscircleo'} text={'Dodaj samochód'}/>
        </ImageBackground>
        
        <OverscreenModal
                title={"Wystąpił błąd!"}
                message={"Nie udało się załadować listy Twoich samochodów. Sprawdź połączenie internetowe.\nCzy chcesz ponowić próbę połączenia?"}
                buttons={[
                    {
                        type: 'arrowleft',
                        color: '#9932CC',
                        onClick: onBackButtonPressed,
                    },
                    {
                        type: 'reload1',
                        color: '#9932CC',
                        onClick: () => {
                            showFetchFailureModal(false);
                            fetchCars();
                        },
                    },
                ]}
                amIVisible={fetchFailureModal}
            />
    </View>
  ); 
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 28,
        fontFamily: 'mt-bold',
        textAlign: 'center',
        marginTop: 28,
        width: '180%'
    },

    item: {
        width: '100%',
        marginBottom: 20
    },

    image: {
        width: '100%',
        height: 200
    },
    listElement: {
        flexDirection: 'row',
        flex: 1,
        padding: 30,
        padding: SPACING,
        marginBottom: SPACING,
        backgroundColor: 'rgba(255,255,255, 1)',
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



















// import React, { useState } from 'react'; 
// onScroll={Animated.event(
//                     [{nativeEvent: {contentOffset: {y: scrollY}}}],
//                     {useNativeDriver: true}
//                 )}
// import {View, ScrollView, Text, ImageBackground, StatusBar, StyleSheet, FlatList, Modal, AnimatedTouchable, Image} from 'react-native';
// import backgroundImage from '../../../assets/gradient.png';
// import LastReservation from '../HomeScreen/LastReservation'
// import { useNavigation } from '@react-navigation/core';
// import FormAddCarScreen from './FormAddCarScreen';


// const SPACING = 20;
// const AVATAR_SIZE = 70;
// const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

// export default function MyCarsScreen() {

//     const navigation = useNavigation();

//     const [news, setNews] = useState([
//         {name: 'BMW', key: '1', registrationNumber: 'BMW', img: 'BMW'}
//     ]);

//     const [modalWindow, setModalWindow] = useState(false);

//     const onAddCarPressed = () => {
//         setModalWindow(true);
//         navigation.navigate('FormAddCarScreen');
//     }

//     const addArticle = (article) => {
//         setNews((list) => {
//             article.key = Math.random().toString();
//             return [article, ...list];
//         });

//         setModalWindow(false);
//     }


//     function renderHeader() {
//         return (
//             <View style={{
//                 width: '100%',
//                 height: 200
//             }}>

//                 <ImageBackground 
//                 source={backgroundImage}
//                 resizeMode='cover'
//                 style={{
//                     flex: 1,
//                     alignItems: 'center'
//                 }} >
//                     <Text style={styles.text}>Moje samochody</Text>

//                 </ImageBackground>

//             </View>
//         );
//     }

//     function readerAddCar(){
//         return (
//             <LastReservation onPress={onAddCarPressed} icon={'pluscircleo'} text={'Dodaj samochód'}/>
//         )
//     }

//     return (
//         <View>
//         <ScrollView>
//             <View style={{flex: 1, paddingBottom: 130}}>
//             <StatusBar translucent backgroundColor='transparent' />
//                     {renderHeader()}
//                     {readerAddCar()}
//             </View>
//         </ScrollView>

//         <Modal visible={modalWindow}>
//             <View>
//             <FormAddCarScreen addArticle={addArticle}/>
//             </View>
//         </Modal>

//         <FlatList data={news} renderItem={({item}) => (
//             // <AnimatedTouchable style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255, 1)', borderRadius: 12, 
//             // elevation: 25}}>
//             <View>
//            {/* <Image  
//                source={{uri: item.img}}
//                style={{width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE,
//                        marginRight: SPACING / 2}} /> */}
//            <View>
//                <Text style={{fontSize: 20, fontFamily: 'mt-bold'}}>{item.name}</Text>
//                <Text style={{fontSize: 17, opacity: .9, fontFamily: 'mt-light'}}>{item.registrationNumber}</Text>
//            </View>
//            </View>
//             // </AnimatedTouchable>
//         )} />
//       </View>
//     );
// };


// const styles = StyleSheet.create({
//     text: {
//         color: 'white',
//         fontSize: 26,
//         fontFamily: 'mt-bold',
//         textAlign: 'center',
//         marginTop: 138,
//         width: '180%'
//     }
// });