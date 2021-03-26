import React from 'react';
import { View, TouchableOpacity, Text, Image, Dimensions } from 'react-native';
import HomeStackScreen from "./HomeStack";
import NotificationStackScreen from "./NotificatonStack"
import ProfileStackScreen from './ProfileStack';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height, width } = Dimensions.get('window');
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

// const HomeStack = createStackNavigator();
// const NotiStack = createStackNavigator();
// const ProfileStack = createStackNavigator();
// const RootTab = createMaterialBottomTabNavigator();

const RootTab = createBottomTabNavigator();


export default function RootTabNavigation() {

    return (

        <RootTab.Navigator

            // activeColor="#f0edf6"
            // barStyle={{
            //     backgroundColor: '#0041c4'
            // }}
            tabBarPosition='bottom'
            tabBarOptions={{
                activeTintColor: '#f0edf6',
                inactiveTintColor: '#B0B0B0',
                style: {
                    // backgroundColor: '#0041c4',
                    backgroundColor: '#008080'
                },
                labelStyle: {
                    fontSize: 13,
                },
            }}
            initialRouteName={HomeStackScreen}
        >
            <RootTab.Screen name='HomeStackScreen' component={HomeStackScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="ios-home" color={color} size={24} />
                    ),

                }} />
            {/* <RootTab.Screen name='NotificationStackScreen' component={NotificationStackScreen}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="notifications" size={24} color={color} />
                    ),
                }} /> */}
            <RootTab.Screen name='ProfileStackScreen' component={ProfileStackScreen}
                options={{
                    unmountOnBlur: true,
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }) => (
                        <AntDesign name="user" size={24} color={color} />
                    ),
                }} />
        </RootTab.Navigator>


    );
}


// const HomeStackScreen = ({ navigation }) => (


//     <HomeStack.Navigator>
//         <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{
//             title: "",
//             headerTintColor: "#fff",
//             headerStyle: {
//                 backgroundColor: "#0041c4"
//             },
//             headerTitleStyle: { flex: 1, textAlign: 'right' },

//             headerTitle: (props) => ( // App Logo
//                 //     // <Image
//                 //     //     style={{ width: 200, height: 50 }}
//                 //     //     source={require('../assets/logo.png')}
//                 //     //     resizeMode='contain'
//                 //     // />

//                 <Avatar.Image source={require('../assets/logo.png')}
//                     style={{ position: 'relative', alignSelf: 'flex-end' }}
//                     size={wp('15%')}
//                 />
//             ),
//             headerShown: true,
//             headerLeft: () => (
//                 <FontAwesome.Button name="bars" backgroundColor="#0041c4" onPress={() => { navigation.openDrawer(); }}>
//                 </FontAwesome.Button>
//             ),
//             headerRight: () => (
//                 <TouchableOpacity onPress={() => { signOut() }}>
//                     <Text style={{
//                         fontWeight: 'bold',
//                         borderRadius: 1,
//                         color: '#fff',
//                         borderRadius: 1,
//                         paddingRight: 5
//                     }}>Sign Out</Text>
//                     {/* <FontAwesome.Button name="bars" backgroundColor="#0041c4" onPress={() => { navigation.openDrawer(); }}>
//                     </FontAwesome.Button> */}
//                 </TouchableOpacity>


//             )
//         }} />
//     </HomeStack.Navigator>
// );


// const NotificationStackScreen = ({ navigation }) => (
//     <NotiStack.Navigator>
//         <NotiStack.Screen name="NotificationsScreen" component={NotificationsScreen} options={{
//             title: "Notifications",
//             headerShown: true,
//             headerTintColor: "#fff",
//             headerStyle: {
//                 // backgroundColor: "#009387"
//                 backgroundColor: "#0041c4"
//             },
//             headerTitleStyle: { flex: 1, textAlign: 'auto' },
//             headerLeft: () => (
//                 <FontAwesome.Button name="bars" backgroundColor="#0041c4" onPress={() => { navigation.openDrawer(); }}>
//                 </FontAwesome.Button>
//             ),


//         }} />
//     </NotiStack.Navigator>

// )

// const ProfileStackScreen = ({ navigation }) => (

//     <ProfileStack.Navigator
//     // initialRouteName="Login"
//     // screenOptions={{
//     //     headerStyle: {
//     //         backgroundColor: '#009387'
//     //     },
//     //     headerTintColor: '#fff',
//     //     headerTitleStyle: {
//     //         fontWeight: 'bold'
//     //     }
//     // }}
//     >
//         <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{
//             title: "Profile",
//             headerShown: true,
//             headerTintColor: "#fff",
//             headerStyle: {
//                 // backgroundColor: "#009387"
//                 backgroundColor: "#0041c4"
//             },
//             headerTitleStyle: { flex: 1, textAlign: 'center' },
//             headerLeft: () => (
//                 <FontAwesome.Button name="bars" backgroundColor="#0041c4" onPress={() => { navigation.openDrawer(); }}>
//                 </FontAwesome.Button>
//             ),


//         }} />
//     </ProfileStack.Navigator>
// );