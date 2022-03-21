import React, { useState } from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import backgroundImage from '../../../assets/purple-white.jpg';
import { useNavigation } from '@react-navigation/core';
import {AntDesign} from '@expo/vector-icons';
import backgroundImage1 from '../../../assets/gradient.png';
import DateTimeButtons from './DateTimeButtons';

export default function DateTimeDepartureScreen() {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [dateButtonText, setDateButtonText] = useState("Wybierz datę");
  const [timeButtonText, setTimeButtonText] = useState("Wybierz godzinę");

  const navigation = useNavigation();
  const DateArray = date.toString().split(' ');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onButtonPressed = () => {
    navigation.navigate('ParkingSpaceBooking');
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  function renderHeader() {
    return (
        <View style={{
          width: '100%',
          height: 150
        }} >
          <ImageBackground 
            source={backgroundImage1}
            resizeMode='cover'
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center'
          }}>
            <Text style={styles.text_title}>Choose Date and Time of Departure</Text>
          </ImageBackground>
        </View>
    );
  }

  function renderButton() {
    return (
      <DateTimeButtons onPressDate={showDatepicker} onPressTime={showTimepicker} timeButtonText={timeButtonText} dateButtonText={dateButtonText} />
    );
  }

  return (
<View style={{alignItems: 'center', width: '100%', height: '100%'}}>
      <Image 
        source={backgroundImage}
        style={{...StyleSheet.absoluteFillObject, height: '100%'}}
        blurRadius={100}
        />
      <StatusBar translucent backgroundColor='transparent' />
        {renderHeader()}
                  
      <View style={{width: '100%', flex: 1}}>
        

        <View style={{flex: 1}} />
        
        <View>
          {renderButton()}
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View style={{flex: 1}} />

        <View style={{alignItems: 'center'}}>
          <Text style={styles.titleSecond}>Date of your Departure:</Text>
          <Text style={styles.text}>{DateArray[2]} {DateArray[1]} {DateArray[3]} {DateArray[4]}</Text>
        
        <View style={{flex: 1}} />

        <TouchableOpacity
          onPress={onButtonPressed}
          style={styles.roundButton}>
              <AntDesign name='arrowright' size={30} color='#fff' />
        </TouchableOpacity>
        </View>
        <View style={{flex: 2}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'mt-bold',
    color: '#9932CC',
    marginBottom: 25
  },

  titleSecond: {
    fontSize: 21,
    fontFamily: 'mt-bold',
    color: '#9932CC',
    marginBottom: 25,
    alignItems: 'center'
  },

  roundButton: {
    width: 50,
    height: 50,
    marginTop: 40,
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#9932CC',
  },

  text: {
    fontSize: 20,
    fontFamily: 'mt-bold',
    color: '#9932CC',
  },

  text_title: {
    fontSize: 22,
    width: '95%',
    fontFamily: 'mt-bold',
    color: 'white',
    marginTop: 100
  }
});



// import React, { useState } from 'react'
// import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import CustomButton from '../../components/CustomButton';
// import backgroundImage from '../../../assets/purple-white.jpg';
// import { useNavigation } from '@react-navigation/core';
// import {AntDesign} from '@expo/vector-icons';

// export default function DateTimeScreen() {
//   const [date, setDate] = useState(new Date(1598051730000));
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);

//   const navigation = useNavigation();

//   const DateArray = date.toString().split(' ');

//   const onButtonPressed = () => {
//     navigation.navigate('ParkingSpaceBooking');
//   }

//   const onChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showMode = (currentMode) => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   return (
//     <View style={{marginTop: 100}}>
//       <Image 
//           source={backgroundImage}
//           style={StyleSheet.absoluteFillObject}
//           blurRadius={100}
//       />
//       <Text style={styles.title}>{'\t\t\t\t\t\t\t\t\t'}Choose Date{'\n'}and Time of Departure</Text>
//       <View>
//         <CustomButton text='Choose Date' type='TIME' onPress={showDatepicker} />
//       </View>
//       <View>
//       <CustomButton text='Choose Time' type='TIME' onPress={showTimepicker} />
//       </View>
//       {show && (
//         <DateTimePicker
//           testID="dateTimePicker"
//           value={date}
//           mode={mode}
//           is24Hour={true}
//           display="default"
//           onChange={onChange}
//         />
//       )}

//       <Text style={styles.titleSecond}>
//         {'\n\n\n'}Date of your Departure: {'\n'}
//       </Text>
//       <Text style={styles.text}>
//       {DateArray[2]} {DateArray[1]} {DateArray[3]} {DateArray[4]} {DateArray[5]}
//       </Text>

//       <TouchableOpacity
//         onPress={onButtonPressed}
//         style={styles.roundButton}>
//             <AntDesign name='arrowright' size={30} color='#fff' />
//        </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({

//   title: {
//       fontSize: 24,
//       //alignItems: 'center',
//       width: '75%',
//       fontFamily: 'mt-bold',
//       color: '#9932CC',
//       marginLeft: 50,
//       marginBottom: 25
//   },

//   roundButton: {
//     width: 50,
//     height: 50,
//     marginTop: 100,
//     marginLeft: 150,
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 100,
//     backgroundColor: '#9932CC',
//   },

//   titleSecond: {
//     fontSize: 21,
//     width: '95%',
//     fontFamily: 'mt-bold',
//     color: '#9932CC',
//     marginLeft: 70,
//     marginBottom: 25,
//     alignItems: 'center'
//   },

//   text: {
//     fontSize: 20,
//     width: '95%',
//     fontFamily: 'mt-bold',
//     color: '#9932CC',
//     marginLeft: 40,
//     marginBottom: 25
// }
// });
