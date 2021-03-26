import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text, LogBox } from 'react-native';
import RootTabNavigation from './Navigatorss/RootTabs';
import SignIn from './Screens/SignIn';
import DrawerContent from './Screens/DrawerContents'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './Components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SupportStackScreen from './Navigatorss/SupportStack';
import SetttingStackScreen from './Navigatorss/SettingStack';



const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();
export default function App() {


  const initialLoginState = {

    isLoggedIn: 'false',
    userPayload: null,
    checkingLoginState: true


  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          isLoggedIn: action.isLoggedIn,
          userPayload: action.userPayload,
          checkingLoginState: false,


        };
      case 'LOGIN':
        return {
          ...prevState,

          isLoggedIn: 'true',
          userPayload: action.userPayload,
          checkingLoginState: false,

        };
      case 'LOGOUT':
        return {
          ...prevState,

          isLoggedIn: 'false',
          userPayload: null,
          checkingLoginState: false,


        };


    }
  }

  const authContext = React.useMemo(() => ({
    signIn: async (payload) => {

      try {
        await AsyncStorage.setItem('@loggedIn', 'true');
        await AsyncStorage.setItem('@loggedInPayload', JSON.stringify(payload));
      } catch (e) {
        console.log('Sign In error reducer', e);
      }
      dispatch({ type: 'LOGIN', userPayload: payload });

    },
    signOut: async () => {
      try {
        await AsyncStorage.removeItem('@loggedIn');
        await AsyncStorage.removeItem('@loggedInPayload');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {

    }
  }), []);






  React.useEffect(() => {
    setTimeout(async () => {
      let isLoggedIn;
      let payLoad;
      isLoggedIn = null;
      payLoad = null;
      try {
        isLoggedIn = await AsyncStorage.getItem('@loggedIn');
        payLoad = await AsyncStorage.getItem('@loggedInPayload');

        // console.log(payLoad);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', isLoggedIn: isLoggedIn, userPayload: payLoad });
    }, 100);
  }, []);
  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
  if (loginState.checkingLoginState) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#0000ff" size="large" />
      </View>
    );
  }




  return (



    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {(loginState.isLoggedIn == 'false' || loginState.isLoggedIn == null || loginState.isLoggedIn == undefined) ?
          <SignIn /> :
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={RootTabNavigation} />
            <Drawer.Screen name="SetttingStackScreen" component={SetttingStackScreen} />
            <Drawer.Screen name="SupportStackScreen" component={SupportStackScreen} />
          </Drawer.Navigator>


        }
      </NavigationContainer>
    </AuthContext.Provider>




  );
}


