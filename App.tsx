import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './component/HomeScreen';
import TeamPage from './component/team';
import Profile from './component/profilePage';
import ViewProduct from './component/viewProduct';
import Refferer from './component/refer';
import Support from './component/support';
import LuckySpinner from './component/luckySpinner';
import SignupScreen from './component/signup';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer theme={{
        dark:false,
        colors:{
          primary: '',
          background: '#fefefe',
          card: '',
          text: '#000',
          border: '',
          notification: ''
        }
      }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Team"
            component={TeamPage}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Personal"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="profile"
            component={Profile}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ViewProduct"
            component={ViewProduct}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Refferer"
            component={Refferer}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Support"
            component={Support}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LuckySpinner"
            component={LuckySpinner}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
