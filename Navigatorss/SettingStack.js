import React from 'react';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import SettingtScreen from '../Screens/Setting';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { createStackNavigator } from '@react-navigation/stack';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';


const SettingsStack = createStackNavigator();
const { height, width } = Dimensions.get('window');

export default function SetttingStackScreen({ navigation }) {
    return (
        <SettingsStack.Navigator>
            <SettingsStack.Screen name="SettingtScreen" component={SettingtScreen} options={{
                title: "Settings",
                headerTintColor: "#fff",
                headerStyle: {
                    // backgroundColor: "#0041c4"
                    backgroundColor: "#008080"
                },
                headerShown: true,
                headerLeft: () => (
                    // <Ionicons.Button name="arrow-back" size={24} color="#fff" ></Ionicons.Button>
                    <TouchableOpacity style={{ paddingHorizontal: 5 }} onPress={() => { navigation.navigate('HomeStackScreen') }}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                ),
            }} />
        </SettingsStack.Navigator>
    );
}