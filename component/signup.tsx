import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import InputField from './commons/InputField';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './commons/CustomButton';
import Loader from './commons/Loader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
import {backend_url} from './helper';

const RegisterScreen = ({navigation}) => {
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(false);
  const [error, setIsError] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [address, setAddress] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [verification, setVerification] = useState(null);
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState('');
  const [password, setPassword] = useState('');
  const [refral_code, setReferCode] = useState('');

  const BASE_URL = 'https://verify-3067-ilr6fk.twil.io';

  const sendSmsVerification = async phoneNumber => {
    try {
      const data = {
        to: '+91' + phoneNumber,
        channel: 'sms',
      };

      const json = await axios.post(`${BASE_URL}/start-verify`, {
        data,
      });
      // const response = await fetch(`${BASE_URL}/start-verify`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: data,
      // });
      // const json = response.json();
      return json;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const validatePhone = phone => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  async function HandleSignUp() {
    try {
      if (
        !fullName ||
        !emailId ||
        !validateEmail(emailId) ||
        !password ||
        !validatePassword(password) ||
        !phoneNumber ||
        !validatePhone(phoneNumber) ||
        !address
      ) {
        setIsError('Please Fill all the values right1');
        return;
      } else {
        setIsLoadingGlobal(true);
        axios
          .post(backend_url + '/auth/register', {
            name: fullName,
            email: emailId,
            password,
            phone: phoneNumber,
            address: address,
            userReferCode: refral_code,
          })
          .then(({data}) => {
            if (data.user) {
              AsyncStorage.setItem('user', JSON.stringify(data.user), () => {
                Alert.alert('Confirm', 'Thank you for creating account', [
                  {
                    text: 'ok',
                    onPress: () => {
                      navigation.navigate('Home');
                    },
                  },
                ]);
              });
            } else {
              if (data.massage) {
                Alert.alert('Alert', data.massage);
              }
            }
          })
          .catch(err => {
            console.log(err);
            Alert.alert('Alert', err.massage);
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingGlobal(false);
    }
  }

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: responsiveWidth(7)}}>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: responsiveFontSize(3.8),
            fontWeight: '500',
            color: '#333',
            marginBottom: responsiveWidth(8),
          }}>
          Register
        </Text>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <InputField
            label={'Full Name'}
            onChangeText={text => {
              setFullName(text);
            }}
            value={fullName}
            maxLength={25}
            icon={
              <Ionicons
                name="person-outline"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
              />
            }
            inputType={undefined}
            keyboardType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginVertical: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'Email ID'}
            onChangeText={text => {
              setEmailId(text);
            }}
            value={emailId}
            icon={
              <MaterialIcons
                name="alternate-email"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
              />
            }
            keyboardType="email-address"
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
            maxLength={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'Phone Number'}
            icon={
              <MaterialIcons
                name="phone"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
              />
            }
            keyboardType="phone-pad"
            onChangeText={text => {
              setPhoneNumber(text);
            }}
            value={phoneNumber}
            maxLength={10}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginBottom: responsiveWidth(4.2),
          }}>
          <InputField
            label={'Password'}
            icon={
              <MaterialIcons
                name="password"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
              />
            }
            keyboardType="default"
            onChangeText={text => {
              setPassword(text);
            }}
            value={password}
            maxLength={20}
            inputType={'password'}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'address'}
            icon={
              <MaterialIcons
                name="phone"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
              />
            }
            keyboardType="default"
            onChangeText={text => {
              setAddress(text);
            }}
            value={address}
            maxLength={100}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginBottom: responsiveWidth(4.2),
            flexDirection: 'column',
          }}>
          <InputField
            label={'Referal code'}
            icon={
              <MaterialIcons
                name="phone"
                size={responsiveWidth(6)}
                color="#666"
                style={{marginRight: responsiveWidth(1.5)}}
              />
            }
            keyboardType="default"
            onChangeText={text => {
              setReferCode(text);
            }}
            value={refral_code}
            maxLength={10}
            inputType={undefined}
            fieldButtonLabel={undefined}
            fieldButtonFunction={undefined}
          />
        </View>
        <Text
          style={{
            color: 'red',
            fontSize: responsiveFontSize(1.5),
            fontFamily: 'Roboto-Regular',
          }}>
          {error}
        </Text>

        <CustomButton
          label={'Sign Up'}
          onPress={() => {
            HandleSignUp();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: responsiveWidth(8),
          }}>
          <Text style={{color: '#666'}}>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={{color: '#6a0028', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Loader visible={isLoadingGlobal} />
    </SafeAreaView>
  );
};

export default RegisterScreen;
