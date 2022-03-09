import 'react-native-gesture-handler';
import React from 'react';
import { View, ActivityIndicator, Text, LogBox } from 'react-native';
import RootTabNavigation from './Navigatorss/RootTabs';
import SignIn from './Screens/SignIn';
import DrawerContent from './Screens/DrawerContents'
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './Components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SupportStackScreen from './Navigatorss/SupportStack';
import SetttingStackScreen from './Navigatorss/SettingStack';
import AssetScanStackScreen from './Navigatorss/AssetStack';

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
// import Constants from 'expo-constants';
import Constants from 'expo-constants';


const Drawer = createDrawerNavigator();
LogBox.ignoreAllLogs();
export default function App() {

  const [loading, IsLoading] = React.useState(true);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  // React.useEffect(() => {
  //   registerForPushNotificationsAsync().then((token) => {
  //     console.log('getTokenExpo', token);
  //     storeTokenInLocalStorage(token);

  //   }).catch((e) => {
  //     console.log('Notification Error', e);
  //   });

  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     console.log('abc', notification);
  //   });

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log('abbb', response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener);
  //     Notifications.removeNotificationSubscription(responseListener);
  //   };
  // }, []);

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      console.log('Token', token);
      storeTokenInLocalStorage(token);
    })
      .catch((e) => {
        console.log("Notification Error", e);
      });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification1stTimeLogin", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("abbb", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);;

  storeTokenInLocalStorage = async (token) => {
    try {
      await AsyncStorage.setItem('@Token', token)
      console.log("StoreToken",token);
      IsLoading(false);
    }
    catch {
      console.log('Token not save in storage')
    }
  }

  // registerForPushNotificationsAsync = async () => {

  //   let token;
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data;

  //   } else {
  //     alert('Must use physical device for Push Notifications');

  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  //   return token;
  // };

  async function registerForPushNotificationsAsync() {

    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    return token;
  };

  const initialLoginState = {

    isLoggedIn: 'false',
    userPayload: null, // usertoken.
    checkingLoginState: true


  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN': // user first time open App to check login or not.
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

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);


  const authContext = React.useMemo(() => ({
    signIn: async (payload) => {

      try {
        await AsyncStorage.setItem('@loggedIn', 'true');
        await AsyncStorage.setItem('@loggedInPayload', JSON.stringify(payload));

        await AsyncStorage.setItem('@value' , '123')


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
let Value = await AsyncStorage.getItem('@value')
if(Value !== "123")
{
        await AsyncStorage.removeItem('@loggedIn');
        await AsyncStorage.removeItem('@loggedInPayload');
}
        // console.log(payLoad);
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', isLoggedIn: isLoggedIn, userPayload: payLoad });
    }, 100);
  }, []);


  if (loginState.checkingLoginState) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="#008080" size="large" />
      </View>
    );
  }


  return (
    (loading ?
      <View style={{ flex: 1, justifyContent: 'center' }} >
        <ActivityIndicator size="small" color="#008080" />
      </View> 
      :
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {(loginState.isLoggedIn == 'false' || loginState.isLoggedIn == null || loginState.isLoggedIn == undefined) ?
          <SignIn /> :
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={RootTabNavigation} options={{ headerShown: false,}} />
            <Drawer.Screen name="SetttingStackScreen" component={SetttingStackScreen} options={{ headerShown: false,}} />
            <Drawer.Screen name="SupportStackScreen" component={SupportStackScreen} options={{ headerShown: false,}} />
            <Drawer.Screen name="AssetScanStackScreen" component={AssetScanStackScreen} options={{ headerShown: false,}} />
          </Drawer.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
    )




  );
}


