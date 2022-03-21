import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import { Formik } from 'formik';
import CustomButton from '../../components/CustomButton';

import * as carsActions from '../../actions/cars';
import OverscreenModal from '../../components/OverscreenModal';
import LoadingScreenModal from '../../components/LoadingScreenModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

export default function FormAddCarScreen() {
    const [waitingForResponse, setWaitingForResponse] = useState(false);
    const [failureModalVisible, showFailureModalVisible] = useState(false);
    const [successModalVisible, showSuccessModalVisible] = useState(false);
    
    const addCarResponse = useSelector((state) => state.cars.addResponseTimestamp);
    const addCarOutcome = useSelector((state) => state.cars.addOutcome);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        setWaitingForResponse(false);
        showFailureModalVisible(false);
        showSuccessModalVisible(false);
    }, [dispatch]);

    useEffect(() => {
        setWaitingForResponse(false);
        if (addCarResponse == null)
            return;
        if (addCarOutcome == true)
            showSuccessModalVisible(true);
        else
            showFailureModalVisible(true);
    }, [addCarResponse]);

    return (
        <View >
            <Formik
                initialValues={{manufacturer: '', model: '', registration: ''}}
                onSubmit={async (values, action) => {
                    await dispatch(carsActions.addCar(values.manufacturer, values.model, values.registration));
                    action.resetForm();
            }}>
                {(props) => (
                    <View>
                        <TextInput style={styles.input} value={props.values.manufacturer} multiline placeholder="Marka" onChangeText={props.handleChange('manufacturer')} />
                        <TextInput style={styles.input} value={props.values.model} multiline placeholder="Model" onChangeText={props.handleChange('model')} />
                        <TextInput style={styles.input} value={props.values.registration} multiline placeholder="Numer rejestracyjny" onChangeText={props.handleChange('registration')} />
                        <CustomButton text='Dodaj samochód' onPress={props.handleSubmit} type='FORM' />
                    </View>
                )}
            </Formik>

            <LoadingScreenModal amIVisible={waitingForResponse} />
            <OverscreenModal
                title={"Nie udało się zarejestrować samochodu"}
                message={"Serwer odrzucił próbę rejestracji."}
                buttons={[
                    {
                        type: 'arrowleft',
                        color: '#9932CC',
                        onClick: () => {
                            showFailureModalVisible(false);
                        },
                    },
                ]}
                amIVisible={failureModalVisible}
            />
            <OverscreenModal
                title={"Rejestracja przebiegła pomyślnie!"}
                message={"Twój samochód jest już przypisany do Twojego konta."}
                buttons={[
                    {
                        type: 'check',
                        color: '#228c22',
                        onClick: () => {
                            showSuccessModalVisible(false);
                            navigation.navigate('MyCarsScreen');
                        },
                    },
                ]}
                amIVisible={successModalVisible}
            />
        </View>
    ); 
}

const styles = StyleSheet.create({
input: {
    backgroundColor: 'white',
    fontFamily: 'mt-light',
    alignSelf: 'center',
    width: '60%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 9,
    marginVertical: 5
  },

  view: {
    marginTop: 100, 
  },

  text: {
    color: 'white',
    fontSize: 26,
    fontFamily: 'mt-bold',
    textAlign: 'center',
    marginTop: 138,
    width: '180%'
  }
});




















// import React from 'react';
// import { StyleSheet, View, Text, Button, TextInput, ScrollView, StatusBar, ImageBackground } from 'react-native';
// import backgroundImage from '../../../assets/gradient.png';
// import { Formik } from 'formik';
// import CustomButton from '../../components/CustomButton';
// import MyCarsScreen from './MyCarsScreen';


// export default function FormAddCarScreen({ addArticle }) {

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
//                     <Text style={styles.text}>Dodanie samochodu</Text>

//                 </ImageBackground>

//             </View>
//         );
//     }

//     return (
//         <View>
//             <ScrollView>
//             <View style={{flex: 1, paddingBottom: 70}}>
//             <StatusBar translucent backgroundColor='transparent' />
//                     {renderHeader()}
//             </View>
//             </ScrollView>

//             <Formik initialValues={{name: '', registrationNumber: '', img: ''}} onSubmit={(values, action) => {
//                 addArticle(values);
//                 action.resetForm();
//             }}>
//                 {(props) => (
//                     <View>
//                         <TextInput style={styles.input} value={props.values.name} multiline placeholder="Введіть назву" onChangeText={props.handleChange('name')} />
//                         <TextInput style={styles.input} value={props.values.registrationNumber} multiline placeholder="Введіть анонс" onChangeText={props.handleChange('registrationNumber')} />
//                         <TextInput style={styles.input} value={props.values.img} multiline placeholder="Виберіть фото" onChangeText={props.handleChange('img')} />
//                         <Button title='Додати' onPress={props.handleSubmit} />
//                     </View>
//                 )}
//             </Formik>

//             {/* <Formik initialValues={{name: '', registrationNumber: '', img: ''}} onSubmit={(values, action) => {
//                 addCars(values);
//                 action.resetForm();
//             }}>
//                 {(props) => (
//                     <View>
//                         <TextInput value={props.values.name} multiline placeholder="Nazwa" onChangeText={props.handleChange('name')} />
//                         <TextInput value={props.values.registrationNumber} multiline placeholder="Numer rejestracyjny" onChangeText={props.handleChange('registrationNumber')} />
//                         <TextInput value={props.values.img} multiline placeholder="Zdjęcie" onChangeText={props.handleChange('img')} />
//                         <Button title="Dodaj samochód" onPress={props.handleSubmit} />
//                     </View>
//                 )}

//             </Formik> */}


//             {/* <Formik initialValues={{name: '', registrationNumber: '', img: ''}} onSubmit={(values, action) => {
//                 console.warn(values);
//                 action.resetForm();
//             }}>
//                 {(props) => (
//                     <View>
//                         <TextInput style={styles.input} value={props.values.name} multiline placeholder="Nazwa" onChangeText={props.handleChange('name')} />
//                         <TextInput style={styles.input} value={props.values.registrationNumber} multiline placeholder="Numer rejestracyjny" onChangeText={props.handleChange('registrationNumber')} />
//                         <TextInput style={styles.input} value={props.values.img} multiline placeholder="Zdjęcie" onChangeText={props.handleChange('img')} />
//                         <CustomButton text='Dodać samochód' onPress={props.handleSubmit} type='FORM' />
//                     </View>
//                 )}
//             </Formik> */}
//         </View>
//     ); 
// }

// const styles = StyleSheet.create({
//   input: {
//     backgroundColor: 'white',
//     fontFamily: 'mt-light',
//     alignSelf: 'center',
//     width: '60%',
//     borderColor: '#e8e8e8',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 9,
//     marginVertical: 5
//   },

//   view: {
//     marginTop: 100, 
//   },

//   text: {
//     color: 'white',
//     fontSize: 26,
//     fontFamily: 'mt-bold',
//     textAlign: 'center',
//     marginTop: 138,
//     width: '180%'
//   }

// });